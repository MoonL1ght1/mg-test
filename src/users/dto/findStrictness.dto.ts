import { IsString, IsEmail, Matches, Length, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindStrictnessDto {
  @ApiProperty({ example: 'Vasya@test.com', description: 'Email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '89997777777', description: 'Phone' })
  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/, {message: 'not a phone number'})
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 10, description: 'Size of pages' })
  @IsInt()
  @IsOptional()
  pageSize?: number;

  @ApiProperty({ example: 2, description: 'Index of page' })
  @IsInt()
  @IsOptional()
  pageIndex?: number;
}
