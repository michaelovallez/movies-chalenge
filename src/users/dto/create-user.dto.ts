import { IsString, IsEmail, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    @IsEnum(Role, { message: 'Invalid role' })
    @IsOptional()
    role: string;
}
