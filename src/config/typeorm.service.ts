import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MONGO_URI } from "src/contants/env";

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  createTypeOrmOptions () : TypeOrmModuleOptions {
    return {
      "type": "mongodb",
      "url": MONGO_URI,
      "useNewUrlParser": true,
      "entities": ["src/**/**.entity{.ts,.js}"],
      "synchronize": true
    }
  }

}