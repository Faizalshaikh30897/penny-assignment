import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto';
import { JoiValidationPipe, AuthGuard } from '@assignment/shared';
import * as Joi from 'joi';

export const RegisterUserValidator = Joi.object({
  name: Joi.string(),
  password: Joi.string(),
  email: Joi.string()
    .regex(/^[^@]+@[^@]+\.[^@]+$/)
    .messages({
      'any.required': 'Please provide a valid email',
      'string.pattern.base': 'Please provide a valid email',
    }),
});

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.findAll();
  }

  @Post('/register')
  register(
    @Body(new JoiValidationPipe(RegisterUserValidator)) body: RegisterUserDTO
  ) {
    return this.userService.register(body);
  }

  @Post('/login')
  login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }
}
