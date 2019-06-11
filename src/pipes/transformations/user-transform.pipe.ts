import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
const bcrypt = require('bcrypt');
@Injectable()
export class UserTransFormPipe implements PipeTransform {
  async encryptPwd(pwd) {
    const cryptSalt = await bcrypt.genSalt(6);
    return await bcrypt.hash(pwd, cryptSalt);
  }
  private initUser(user, ...propertyOptions) {
    let initializedUser = user;
    propertyOptions.forEach(opt => {
      initializedUser = Object.assign(initializedUser, opt);
    });
    return initializedUser;
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    const user = value;
    switch (metadata.data) {
      case 'userInfo':
        return await this.initUser(user, { password: await this.encryptPwd(user.password) });
      case 'changePasswordInfo':
        return await this.initUser(user, { newPwd: await this.encryptPwd(user.newPwd) });
      default:
        return user;
    }
  }
}
