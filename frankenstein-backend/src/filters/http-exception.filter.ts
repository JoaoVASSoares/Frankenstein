import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: any = exception instanceof HttpException ? exception.getResponse() : exception;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message instanceof Error ? message.message : message,
    });
  }
}
