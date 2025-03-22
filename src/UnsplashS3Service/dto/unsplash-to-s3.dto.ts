import { ApiProperty } from '@nestjs/swagger';

export class UnsplashS3Dto {
  @ApiProperty({
    description: 'Search query for fetching image from Unsplash',
    example: 'nature',
  })
  query: string;
}
