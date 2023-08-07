import { IsString, IsDateString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    title: string;
    @IsDateString({ strict: false, strictSeparator: true })
    relase_date: string;
    @IsString()
    director: string;
    @IsString()
    description: string;
}
