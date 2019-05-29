
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AddCompanyDto {
    name?: string;
    pic?: string;
    address?: string;
    phone?: string;
    email?: string;
    skype?: string;
    note?: string;
    status?: number;
    user?: string;
}

export class ChangePasswordInfoDto {
    id: string;
    oldPwd: string;
    newPwd: string;
}

export class CreateUserInfoDto {
    name: string;
    username: string;
    password: string;
}

export class LoginInfoDto {
    username: string;
    password: string;
}

export class UpdateCompanyDto {
    id: string;
    name?: string;
    pic?: string;
    address?: string;
    phone?: string;
    email?: string;
    skype?: string;
    note?: string;
    status?: number;
    user?: string;
}

export class Auth {
    token?: string;
    id?: string;
}

export class Company {
    id?: string;
    name?: string;
    pic?: string;
    address?: string;
    phone?: string;
    email?: string;
    skype?: string;
    note?: string;
    status?: number;
    user?: string;
}

export abstract class IMutation {
    abstract addCompany(addCompanyDto?: AddCompanyDto): Company | Promise<Company>;

    abstract updateCompany(updateCompanyDto?: UpdateCompanyDto): Company | Promise<Company>;

    abstract deleteCompany(companyId?: string): Company | Promise<Company>;

    abstract createUser(userInfo?: CreateUserInfoDto): User | Promise<User>;

    abstract updatePassword(changePasswordInfo?: ChangePasswordInfoDto): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract companies(userId: string): Company[] | Promise<Company[]>;

    abstract company(id: string): Company | Promise<Company>;

    abstract user(id: string): User | Promise<User>;

    abstract login(loginInfo?: LoginInfoDto): Auth | Promise<Auth>;
}

export class User {
    id?: string;
    name?: string;
    username?: string;
    password?: string;
}
