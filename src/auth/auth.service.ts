import { LoginrDto } from './dto/login.dto';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    async register({name, email, role, password}: RegisterDto) {
        const user = await this.usersService.fineOneByEmail(email);
        if(user){
            throw new BadRequestException('User already exists');
        }
        await this.usersService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
            role
        });
        return {
            name,
            email,
            role
        }
    }
    async login({email, password}: LoginrDto){
        const user = await this.usersService.fineOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('Invalid email');
        }
        const isPasswordValid = bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid password');
        }
        const payload = {email: user.email, role: user.role};
        const token = await this.jwtService.signAsync(payload);
        return {
            token,
            email,
            role: user.role
        };
    }
    async profile ({email, role}: {email: string, role: string}){
        if(role !== 'admin'){
            throw new UnauthorizedException('Unauthorized role');
        }
        return await this.usersService.fineOneByEmail(email);
    }
}
