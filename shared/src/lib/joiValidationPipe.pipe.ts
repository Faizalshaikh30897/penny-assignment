import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Schema, ValidationOptions } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private readonly schema: Schema,
    private options: ValidationOptions = {},
  ) {}
  transform(raw: unknown): unknown {
    const { error, value } = this.schema.validate(
      raw,
      Object.assign(
        {
          abortEarly: false,
          allowUnknown: false,
          presence: 'required',
          convert: true,
        },
        this.options,
      ),
    );

    if (error) {
      console.log(error.details);
      throw new BadRequestException('Validation failed: ' + error.message);
    }
    return value;
  }
}
