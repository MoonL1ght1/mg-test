import { IsString, IsEmail, Matches, Length, IsInt, IsOptional } from 'class-validator';

export class FindStrictnessDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/, {message: 'not a phone number'})
  @IsOptional()
  phone?: string;

  @IsInt()
  @IsOptional()
  pageSize?: number;

  @IsInt()
  @IsOptional()
  pageIndex?: number;
}
