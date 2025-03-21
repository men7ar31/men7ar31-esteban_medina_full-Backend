import { 
    Controller, Post, UploadedFile, UseInterceptors, 
    Get, Param, Body, Delete 
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { StorageService } from './storage.service';
  import { ApiConsumes, ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { UploadFileDto } from './dto/upload-file.dto';
  import { RenameFileDto } from './dto/rename-file.dto';
  import { FileResponseDto } from './dto/file-response.dto';
  
  @ApiTags('Storage')  // Categoría en Swagger
  @Controller('upload')
  export class UploadController {
    constructor(private readonly storageService: StorageService) {}
  
    @Post()
    @ApiOperation({ summary: 'Subir un archivo a S3' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadFileDto })
    @ApiResponse({ status: 201, description: 'Archivo subido con éxito' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        return { message: 'No se recibió ningún archivo' };
      }
  
      const result = await this.storageService.uploadFile(file, file.originalname);
      return { message: 'Archivo subido con éxito', result };
    }
  
    @Get('file/:fileName')
    @ApiOperation({ summary: 'Obtener la URL de un archivo' })
    @ApiResponse({ status: 200, type: FileResponseDto })
    async getFile(@Param('fileName') fileName: string) {
      try {
        const fileUrl = await this.storageService.getFileUrl(fileName);
        return { fileUrl };
      } catch (error) {
        throw new Error('Error al obtener el archivo');
      }
    }
  
    @Delete('file/:fileName')
    @ApiOperation({ summary: 'Eliminar un archivo' })
    @ApiResponse({ status: 200, description: 'Archivo eliminado con éxito' })
    async deleteFile(@Param('fileName') fileName: string) {
      try {
        const result = await this.storageService.deleteFile(fileName);
        return { message: 'Archivo eliminado con éxito', result };
      } catch (error) {
        throw new Error('Error al eliminar el archivo');
      }
    }
  
    @Post('rename')
    @ApiOperation({ summary: 'Renombrar un archivo' })
    @ApiBody({ type: RenameFileDto })
    @ApiResponse({ status: 200, description: 'Archivo renombrado con éxito' })
    async renameFile(@Body() body: RenameFileDto) {
      try {
        const result = await this.storageService.renameFile(body.oldFileName, body.newFileName);
        return { message: 'Archivo renombrado con éxito', result };
      } catch (error) {
        throw new Error('Error al renombrar el archivo');
      }
    }
  }
  