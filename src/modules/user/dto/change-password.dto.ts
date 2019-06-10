import { IsString, IsAlphanumeric, Length } from 'class-validator';

export class ChangePasswordInfoDto {
  userId: string;
  oldPwd: string;

  @IsString()
  @IsAlphanumeric()
  @Length(6, 30)
  newPwd: string;
}
