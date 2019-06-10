import { IsString, IsEmail, IsInt, Min, Max, Length } from 'class-validator';

export class AddCompanyDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @Length(3, 50)
  pic: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  skype: string;

  @IsString()
  note: string;

  @IsInt()
  @Min(0)
  @Max(2)
  status: number;

  @IsString()
  user: string;
}
