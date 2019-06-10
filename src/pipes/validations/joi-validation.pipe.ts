import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
const Joi = require('@hapi/joi')

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Object){}
  transform(value: any, metadata: ArgumentMetadata) {
    Joi.validate(value, this.schema, (err, value) => {
      if (err) {
        throw new BadRequestException('Validation failed!')
      } else {
        return value
      }
    })
  }
}
