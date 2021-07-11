import { IsString, MinLength, IsEmail, MaxLength, Matches, Length, IsNotEmpty, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Василий', description: 'Name of User' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Vasya@test.com', description: 'Email' })
  @IsEmail()
  @ValidateIf(o => !o.phone || o.email) // такое условие устанавливает что одно но должно быть
  email: string;

  @ApiProperty({ example: '89997777777', description: 'Phone' })
  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/, {message: 'not a phone number'})
  @ValidateIf(o => !o.email || o.phone) // такое условие устанавливает что одно но должно быть
  phone: string;

  @ApiProperty({ example: 'MySecretPassword', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;
}
