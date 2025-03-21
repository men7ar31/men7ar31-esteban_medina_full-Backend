import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from '../email/email.service';

@Module({
  imports: [ ConfigModule.forRoot(), 
    PassportModule.register({ defaultStrategy: 'google' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Debe ser igual al de jwt.strategy.ts
      signOptions: { expiresIn: '1h' }, // Token válido por 1 hora
    }),
  ],
  controllers: [AuthController],
  exports: [EmailService],
  providers: [AuthService, JwtStrategy, GoogleStrategy, EmailService], // ¡Importante!
})
export class AuthModule {}
