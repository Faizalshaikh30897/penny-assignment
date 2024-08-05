import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User.model';
import { Model } from 'mongoose';
import { RegisterUserDTO } from './dto';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async register(body: RegisterUserDTO): Promise<User> {
    // check duplicate email

    const existingEmail = await this.userModel
      .findOne({ email: body.email })
      .exec();

    if (existingEmail) {
      throw new BadRequestException(
        'Email already exists please provide a unique email'
      );
    }

    // check password strength
    const passwordStrengthMatch = PASSWORD_REGEX.test(body.password);
    if (!passwordStrengthMatch) {
      throw new BadRequestException(
        'Password should be minimum 8 letters and should contain 1 of each, upper case, lower case, number and special character'
      );
    }

    //hash password
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // create user
    const newUser = await this.userModel.create({
      email: body.email,
      name: body.name,
      password: hashedPassword,
      isEmailValidated: false,
      token: randomUUID(),
    });

    console.log(newUser);
    const payload = { sub: newUser._id, username: newUser.email };

    const token = await this.jwtService.signAsync(payload);

    // print validation email token

    // return user
    return {...newUser, token};
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if(!user) {
      throw new BadRequestException('Incorrect username or password'); // Hide incorrect username error separately
    }
    const comparision = await bcrypt.compare(password, user.password!);
    if (!comparision) {
      throw new UnauthorizedException('invalid username or password');
    }
    const payload = { sub: user._id, username: user.email };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
