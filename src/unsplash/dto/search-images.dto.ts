import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchImagesDto {
  @ApiProperty({ example: 'nature', description: 'Palabra clave para buscar imágenes en Unsplash' })
  @IsNotEmpty()
  @IsString()
  query: string;

  @ApiProperty({ example: 10, description: 'Cantidad de imágenes por página', required: false })
  @IsOptional()
  @Type(() => Number) 
  @IsInt()
  @Min(1)
  perPage?: number = 10;
}
