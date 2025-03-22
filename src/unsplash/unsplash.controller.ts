import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchImagesDto } from './dto/search-images.dto';

@ApiTags('Unsplash') 
@Controller('unsplash')
export class UnsplashController {
  constructor(private readonly unsplashService: UnsplashService) {}

  @Get('search')
  @ApiOperation({ summary: 'Buscar imágenes en Unsplash' })
  @ApiResponse({ status: 200, description: 'Lista de imágenes obtenidas de Unsplash' })
  async searchImages(@Query() searchParams: SearchImagesDto) {
    return this.unsplashService.searchImages(searchParams.query, searchParams.perPage);
  }
}
