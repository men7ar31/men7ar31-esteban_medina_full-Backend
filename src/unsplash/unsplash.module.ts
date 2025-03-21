import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UnsplashService } from './unsplash.service';
import { UnsplashController } from './unsplash.controller';

@Module({
  imports: [HttpModule], 
  controllers: [UnsplashController],
  providers: [UnsplashService],
  exports: [UnsplashService], 
})
export class UnsplashModule {}
