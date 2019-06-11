import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { MongoRepository } from 'typeorm';
import { SECRET_CODE } from 'src/contants/env';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: MongoRepository<User>,
  ) { }

  async validateToken(authorizationHeader, userId) {
    if (authorizationHeader === undefined) {
      return false;
    }
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await this.userRepository.findOne({ _id: userId });
    if (userId === decoded.userId && user._id === decoded.userId) {
      return true;
    }
    throw new UnauthorizedException('Something went wrong!');
  }
}
