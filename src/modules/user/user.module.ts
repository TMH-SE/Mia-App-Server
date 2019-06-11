import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AppGuardModule } from 'src/guards/app-guard.module';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AppGuardModule],
  providers: [UserService, UserResolver, AuthGuard],
})
export class UserModule {}
