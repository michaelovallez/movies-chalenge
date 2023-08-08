import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsString()
    @IsOptional()
    password?: string;
    @IsString()
    @IsOptional()
    @IsEnum(Role, { message: 'Invalid role' })
    role?:string;
}
