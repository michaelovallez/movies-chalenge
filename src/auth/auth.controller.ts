import { Body, Controller, Post, Get,Req,UseGuards  } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginrDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './utils/role.enum';
import { Auth } from './decorators/auth.decorator';
// import { requestWithUser } from './utils/request-with-user';
interface requestWithUser extends Request {
    user: {
        email: string;
        role: string;
    }
}
@Controller('auth')
export class AuthController  {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() RegisterDto: RegisterDto ) {
        console.log(RegisterDto);
        return this.authService.register(RegisterDto);
    }

    @Post('login')
    login(@Body() LoginrDto: LoginrDto) {
        return this.authService.login(LoginrDto);
    }

    @Get('profile')
    @Auth(Role.ADMIN)
    profile(
        @Req() req: requestWithUser,
    ){
        return this.authService.profile(req.user);
    }
}
