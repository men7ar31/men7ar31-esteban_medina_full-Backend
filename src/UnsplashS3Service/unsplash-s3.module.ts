import { Module } from '@nestjs/common';
import { UnsplashS3Service } from './unsplash-s3.service';
import { UnsplashS3Controller } from './unsplash-s3.controller';
import { UnsplashModule } from '../unsplash/unsplash.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [UnsplashModule, StorageModule],
  providers: [UnsplashS3Service],
  controllers: [UnsplashS3Controller],
})
export class UnsplashS3Module {}
