import { IsString, Length, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {

  @IsString()
  name: string;

  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @IsAlphanumeric()
  @Length(6, 30)
  password: string;
}
