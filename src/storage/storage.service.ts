import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const region = this.configService.get<string>('AWS_REGION');
  
    console.log('AWS Access Key:', accessKeyId); 
    console.log('AWS Secret Key:', secretAccessKey); 
    console.log('AWS Region:', region); 
  
    if (!accessKeyId || !secretAccessKey || !bucketName || !region) {
      throw new Error('AWS credentials, bucket name or region are missing from environment variables');
    }
  
    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  
    this.bucketName = bucketName;
  }
  
  async uploadFile(file: Express.Multer.File, fileName: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(params));
    return { url: `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}` };
  }

  async getFileUrl(fileName: string) {
    return `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
  }

  async deleteFile(fileName: string) {
    const params = { Bucket: this.bucketName, Key: fileName };
    await this.s3.send(new DeleteObjectCommand(params));
    return { message: 'Archivo eliminado' };
  }

  async renameFile(oldName: string, newName: string): Promise<any> {
    try {
      
      await this.s3.send(new CopyObjectCommand({
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${encodeURIComponent(oldName)}`,
        Key: newName,
      }));
  
      
      await this.s3.send(new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: oldName,
      }));
  
      return { message: 'Archivo renombrado con éxito' };
    } catch (error) {
      console.error(`Error al renombrar: ${error.message}`);
      throw new Error(`Error al renombrar el archivo: ${error.message}`);
    }
  }
  
  async uploadUnsplashImage(imageUrl: string) {
    try {
     
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
  
      
      const fileName = `unsplash/${uuidv4()}.jpg`;
  
      
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: 'image/jpeg',
      };
  
      
      await this.s3.send(new PutObjectCommand(params));
  
      return {
        message: 'Imagen subida con éxito',
        s3Url: `https://${this.bucketName}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`,
      };
    } catch (error) {
      throw new Error(`Error al subir imagen a S3: ${error.message}`);
    }
  }
}
