import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UsePipes } from '@nestjs/common';
import { UserTransFormPipe } from 'src/pipes/transformations/user-transform.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordInfoDto } from './dto/change-password.dto';
import { LoginInfoDto } from './dto/login.dto';
// import { JoiValidationPipe } from 'src/commons/pipes/validations/joi-validation.pipe';
// import { CreateUserSchema } from 'src/commons/pipes/validations/schema/user.schema';

@Resolver('User')
@UsePipes(UserTransFormPipe)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query('user')
  async user(@Args('userId') userId: string) {
    return await this.userService.findUserById(userId);
  }

  @Query('login')
  async login(@Args('loginInfo') loginInfo: LoginInfoDto) {
    return await this.userService.login(loginInfo);
  }

  @Mutation('createUser')
  async createUser(@Args('userInfo') createUserInfo: CreateUserDto) {
    return await this.userService.createUser(createUserInfo);
  }

  @Mutation('updatePassword')
  async changePassword(@Args('changePasswordInfo') changePwdInfo: ChangePasswordInfoDto) {
    return await this.userService.changePassword(changePwdInfo);
  }

}
