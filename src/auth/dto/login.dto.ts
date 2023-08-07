import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginrDto {
    @IsString()
    @MinLength(6)
    @Transform(({value}) => value.trim())
    password: string;
    @IsEmail()
    email: string;
}