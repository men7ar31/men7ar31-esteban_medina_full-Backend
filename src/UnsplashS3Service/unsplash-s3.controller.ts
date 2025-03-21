import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashS3Service } from './unsplash-s3.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnsplashS3Dto } from './dto/unsplash-to-s3.dto';

@ApiTags('Unsplash S3')
@Controller('unsplash-s3')
export class UnsplashS3Controller {
  constructor(private readonly unsplashS3Service: UnsplashS3Service) {}

  @Get('upload')
  @ApiOperation({ summary: 'Fetch and upload image from Unsplash' })
  @ApiQuery({
    name: 'query',
    description: 'Search query to fetch the image from Unsplash',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully uploaded.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query or image fetch error.',
  })
  async uploadUnsplashImage(@Query() query: UnsplashS3Dto) {
    return await this.unsplashS3Service.fetchAndUploadImage(query.query);
  }
}
