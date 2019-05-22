import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { CompanyModule } from './graphql/company/company.module'
import { ConfigModule } from './config/config.module'
import { TypeOrmService } from './config/typeorm.service'
import { ApolloGraphqlService } from './config/apollograpql.service'
import { TaskModule } from './graphql/task/task.module'
import { UserModule } from './graphql/user/user.module'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmService
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ApolloGraphqlService
    }),
    CompanyModule,
    TaskModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
