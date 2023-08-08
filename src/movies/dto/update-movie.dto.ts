import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateMovieDto {
    @IsString()
    @IsOptional()
    title: string;
    @IsOptional()
    @IsDateString({ strict: false, strictSeparator: true })
    release_date: string;
    @IsString()
    @IsOptional()
    director: string;
    @IsString()
    @IsOptional()
    description: string;
}
