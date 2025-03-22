import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UnsplashService {
  private readonly UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
  private readonly ACCESS_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.ACCESS_KEY = this.configService.get<string>('UNSPLASH_ACCESS_KEY') || '';
  }

  async searchImages(query: string, perPage = 10) {
    if (!this.ACCESS_KEY) {
      throw new Error('Unsplash API Key no está configurada');
    }

    const url = `${this.UNSPLASH_URL}?query=${query}&per_page=${perPage}&client_id=${this.ACCESS_KEY}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data.results; 
    } catch (error) {
      throw new Error('Error al obtener imágenes de Unsplash');
    }
  }
  async getRandomImageUrl(query: string) {
    if (!this.ACCESS_KEY) {
      throw new Error('Unsplash API Key no está configurada');
    }
  
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${this.ACCESS_KEY}`;
  
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data.urls.full; 
    } catch (error) {
      throw new Error('Error al obtener imagen de Unsplash');
    }
  }
  
}

