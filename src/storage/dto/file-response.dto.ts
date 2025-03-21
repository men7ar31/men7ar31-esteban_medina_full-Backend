import { ApiProperty } from '@nestjs/swagger';

export class FileResponseDto {
  @ApiProperty({ example: 'https://my-bucket.s3.amazonaws.com/file.jpg' })
  fileUrl: string;
}
