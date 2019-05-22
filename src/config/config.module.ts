import { Module } from '@nestjs/common'
import { ApolloGraphqlService } from './apollograpql.service';
import { TypeOrmService } from './typeorm.service';

@Module({
  providers: [ApolloGraphqlService, TypeOrmService],
  exports: [ApolloGraphqlService, TypeOrmService]
})
export class ConfigModule {}
