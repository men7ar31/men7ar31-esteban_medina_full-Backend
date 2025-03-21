import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { UnsplashModule } from './unsplash/unsplash.module';
import { UnsplashS3Module } from './UnsplashS3Service/unsplash-s3.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
    StorageModule,
    UnsplashModule,
    UnsplashS3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
