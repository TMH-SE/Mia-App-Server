import { Injectable, NotAcceptableException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, ChangePasswordInfoDto, CreateUserInfoDto, LoginInfoDto, Auth } from 'src/graphql.schema';
import { MongoRepository } from 'typeorm';
import { SECRET_CODE, EXPIRED_TOKEN } from 'src/contants/env';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ){}

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id)
  }

  async findUserByUsn(usn: string): Promise<User> {
    return await this.userRepository.findOne({username: usn})
  }

  async isPasswordMatched(rawPwd: string, encryptedPwd: string): Promise<Boolean> {
    return await bcrypt.compare(rawPwd, encryptedPwd)
  }

  async updatePassword(userId: string, pwd: string): Promise<Boolean> {
    if (await this.userRepository.updateOne({id: userId}, {password: pwd})){
      return true
    } else {
      return false
    }
  }

  async generateToken(user: User) {
    return await jwt.sign({
      userId: user.id,
      userUsn: user.username
    }, SECRET_CODE, {
      expiresIn: EXPIRED_TOKEN
    })
  }

  async createUser(user: CreateUserInfoDto): Promise<User> {
    const isUsnFound = await this.findUserByUsn(user.username)
    if(!isUsnFound){
      return await this.userRepository.save(user)
    } else {
      throw new NotAcceptableException('Username have been taken already')
    }
  }

  async login(loginInfo: LoginInfoDto): Promise<Auth> {
    const { username, password } = loginInfo
    const userFound = await this.findUserByUsn(username)
    if (userFound !== null){
      if (await this.isPasswordMatched(password, userFound.password)) {
        return await { token: await this.generateToken(userFound), id: userFound.id }
      } else {
        throw new UnauthorizedException('Password is incorrect!')
      }
    } else {
      throw new UnauthorizedException('Username does not exist!')
    }
  }

  public async changePassword (changePwdInfo: ChangePasswordInfoDto) {
    const { id, newPwd, oldPwd } = changePwdInfo
    const userFound = await this.findUserById(id)
    if(await this.isPasswordMatched(oldPwd, userFound.password)) {
      await this.updatePassword(id, newPwd)
    } else {
      throw new ForbiddenException('Old password incorrect!')
    }
    return true
  }

}
