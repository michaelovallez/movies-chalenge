import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from 'src/common/jwt.constant';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(
    context: ExecutionContext):Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException('Invalid token')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
    return true; 
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers.authorization) {
      return undefined;
    }
    const [bearer, token] = request.headers.authorization.split(' ');
    return (bearer !== 'Bearer' || !token) ? undefined : token;
  }
}
