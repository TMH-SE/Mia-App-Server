import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/commons/auth/auth.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [AuthModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AppGuardModule {}
