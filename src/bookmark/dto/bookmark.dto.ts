import { User } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class BookmarkDto {
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  user: User;
}
