import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RenameFileDto {
  @ApiProperty({ example: 'oldFile.jpg' })
  @IsNotEmpty()
  @IsString()
  oldFileName: string;

  @ApiProperty({ example: 'newFile.jpg' })
  @IsNotEmpty()
  @IsString()
  newFileName: string;
}
