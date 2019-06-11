import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/modules/commons/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = await ctx.getContext();
    const authorizationHeader = await req.headers.authorization;
    const useridHeader = await req.headers.userid;
    return this.authService.validateToken(authorizationHeader, useridHeader);
  }
}
