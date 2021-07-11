import { IsString, MinLength, IsEmail, MaxLength, Matches, Length, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @ValidateIf(o => !o.phone || o.email) // такое условие устанавливает что одно но должно быть
  email: string;

  @IsString()
  @Length(11, 11)
  @Matches(/^\d+$/, {message: 'not a phone number'})
  @ValidateIf(o => !o.email || o.phone) // такое условие устанавливает что одно но должно быть
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;
}
