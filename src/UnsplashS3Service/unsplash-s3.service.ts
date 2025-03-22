import { Injectable } from '@nestjs/common';
import { UnsplashService } from '../unsplash/unsplash.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UnsplashS3Service {
  constructor(
    private readonly unsplashService: UnsplashService,
    private readonly storageService: StorageService
  ) {}

  async fetchAndUploadImage(query: string) {
  
    const imageUrl = await this.unsplashService.getRandomImageUrl(query);

  
    return await this.storageService.uploadUnsplashImage(imageUrl);
  }
}
