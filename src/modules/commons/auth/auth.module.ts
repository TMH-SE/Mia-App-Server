import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
