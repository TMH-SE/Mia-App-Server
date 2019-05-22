import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { LoginInfoDto, CreateUserInfoDto, ChangePasswordInfoDto } from 'src/graphql.schema';
import { UsePipes } from '@nestjs/common';
import { UserPipe } from 'src/common/pipes/transform/user.pipe';

@Resolver('User')
@UsePipes(UserPipe)
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ){}

  @Query('user')
  async user(@Args('id') id: string) {
    return await this.userService.findUserById(id)
  } 

  @Query('login')
  async login(@Args('loginInfo') loginInfo: LoginInfoDto){
    return await this.userService.login(loginInfo)
  }

  @Mutation('createUser')
  async createUser(@Args('userInfo') createUserInfo: CreateUserInfoDto) {
    return await this.userService.createUser(createUserInfo)
  }

  @Mutation('updatePassword')
  async changePassword(@Args('changePasswordInfo') changePwdInfo: ChangePasswordInfoDto){
    return await this.userService.changePassword(changePwdInfo)
  }

}
