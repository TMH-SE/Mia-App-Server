import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    // console.log(gqlHost.getRoot());
    // console.log(gqlHost.getArgs());
    // console.log(gqlHost.getContext());
    // console.log( gqlHost.getInfo());
    return exception;
    // const ctx = gqlHost.switchToHttp();
    // const res = ctx.getResponse<Response>();
    // const req = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    // res
    //   .status(status)
    //   .json({
    //     statusCode: status,
    //     timestamp: new Date().toISOString(),
    //     path: req.url,
    //   });
  }
}
