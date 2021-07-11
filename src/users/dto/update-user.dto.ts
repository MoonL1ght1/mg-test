import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// ну и как предполагается описать поля если они наследуются???
export class UpdateUserDto extends PartialType(CreateUserDto) {}
