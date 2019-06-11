import { Injectable, NotAcceptableException, UnauthorizedException, ForbiddenException, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { SECRET_CODE, EXPIRED_TOKEN } from 'src/contants/env';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ChangePasswordInfoDto } from './dto/change-password.dto';
import { LoginInfoDto } from './dto/login.dto';
import { Auth } from './dto/auth.dto';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v1');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({ _id: userId });
  }

  async findUserByUsn(usn: string): Promise<User> {
    return await this.userRepository.findOne({ username: usn });
  }

  async isPasswordMatched(rawPwd: string, encryptedPwd: string): Promise<boolean> {
    return await bcrypt.compare(rawPwd, encryptedPwd);
  }

  async updatePassword(userId: string, pwd: string): Promise<boolean> {
    if (await this.userRepository.updateOne({ _id: userId }, { $set: { password: pwd } })) {
      return true;
    } else {
      return false;
    }
  }

  async generateToken(user: User) {
    return await jwt.sign({
      userId: user._id,
      userUsn: user.username,
    },
    SECRET_CODE,
    {
      expiresIn: EXPIRED_TOKEN,
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const isUsnFound = await this.findUserByUsn(user.username);
    if (!isUsnFound) {
      Object.assign(user, { _id: uuid() });
      return await this.userRepository.save(user);
    } else {
      throw new NotAcceptableException('Username have been taken already');
    }
  }

  async login(loginInfo: LoginInfoDto): Promise<Auth> {
    const { username, password } = loginInfo;
    const userFound = await this.findUserByUsn(username);
    if (userFound !== null) {
      if (await this.isPasswordMatched(password, userFound.password)) {
        return await { token: await this.generateToken(userFound), id: userFound._id };
      } else {
        throw new UnauthorizedException('Password is incorrect!');
      }
    } else {
      throw new UnauthorizedException('Username does not exist!');
    }
  }

  public async changePassword(changePwdInfo: ChangePasswordInfoDto) {
    const { userId, newPwd, oldPwd } = changePwdInfo;
    const userFound = await this.findUserById(userId);
    if (userFound !== null) {
      if (await this.isPasswordMatched(oldPwd, userFound.password)) {
        await this.updatePassword(userId, newPwd);
      } else {
        throw new ForbiddenException('Old password incorrect!');
      }
      return true;
    }
    return false;
  }
}
