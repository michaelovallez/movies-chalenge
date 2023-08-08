import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { Role } from "src/common/enums/role.enum";

export class RegisterDto {
    @IsString()
    name: string;
    @IsString()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    password: string;
    @IsEmail()
    email: string;
    @IsString()
    @IsEnum(Role, { message: 'Invalid role' })
    role: string;
}