import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto'; 
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')  
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos de entrada' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 302, description: 'Redirige a Google para autenticación OAuth' })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con Google' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  googleAuthRedirect(@Request() req): GoogleAuthDto {
    const { name, email, googleId, accessToken } = req.user;
    
    return {
      name,
      email,
      googleId,
      accessToken,
    };
  }

  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto })  // Utiliza el DTO
  @ApiResponse({ status: 200, description: 'Correo de recuperación enviado' })
  @ApiResponse({ status: 400, description: 'Correo no encontrado' })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida exitosamente' })
  @ApiResponse({ status: 400, description: 'Token inválido o datos incorrectos' })
  async resetPassword(@Body() body: ResetPasswordDto) {
  return this.authService.resetPassword(body.email, body.token, body.newPassword);
  }

}
