import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmService } from './config/typeorm.service';
import { ApolloGraphqlService } from './config/apollograpql.service';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
// import { APP_FILTER } from '@nestjs/core';
// import { TotalExceptionFilter } from './commons/filters/total-exception.filter';
import { AuthModule } from './modules/commons/auth/auth.module';
import { AppGuardModule } from './guards/app-guard.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmService,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ApolloGraphqlService,
    }),
    CompanyModule,
    TaskModule,
    UserModule,
    AuthModule,
    AppGuardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: TotalExceptionFilter
    // }
  ],
})
export class AppModule {}
