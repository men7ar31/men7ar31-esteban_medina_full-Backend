import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, POST, PUT, DELETE',
    origin: '*', 
  });
  const config = new DocumentBuilder()
  .setTitle('Gestor de archivos API')
  .setDescription('API para gestionar archivos con AWS S3 y autenticación')
  .setVersion('1.0')
  .addBearerAuth() // Para usar JWT en los endpoints protegidos
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
