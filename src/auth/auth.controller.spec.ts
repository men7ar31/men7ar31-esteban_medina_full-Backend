import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue({ email: 'test@example.com' }),
            login: jest.fn().mockResolvedValue({ access_token: 'fake-jwt-token' }),
            forgotPassword: jest.fn().mockResolvedValue({ message: 'Email enviado con código de recuperación' }),
            resetPassword: jest.fn().mockResolvedValue({ message: 'Contraseña actualizada exitosamente' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería estar definido', () => {
    expect(authController).toBeDefined();
  });

  it('debería registrar un usuario', async () => {
    const dto: RegisterDto = { email: 'test@example.com', password: 'password123' };
    const result = await authController.register(dto);

    expect(result).toEqual({ email: 'test@example.com' });
    expect(authService.register).toHaveBeenCalledWith(dto.email, dto.password);
  });

  it('debería iniciar sesión', async () => {
    const dto: LoginDto = { email: 'test@example.com', password: 'password123' };
    const result = await authController.login(dto);

    expect(result).toEqual({ access_token: 'fake-jwt-token' });
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('debería enviar un email de recuperación de contraseña', async () => {
    const dto: ForgotPasswordDto = { email: 'test@example.com' };
    const result = await authController.forgotPassword(dto);

    expect(result).toEqual({ message: 'Email enviado con código de recuperación' });
    expect(authService.forgotPassword).toHaveBeenCalledWith(dto.email);
  });

  it('debería restablecer la contraseña', async () => {
    const dto: ResetPasswordDto = { email: 'test@example.com', token: 'valid-token', newPassword: 'newpassword123' };
    const result = await authController.resetPassword(dto);

    expect(result).toEqual({ message: 'Contraseña actualizada exitosamente' });
    expect(authService.resetPassword).toHaveBeenCalledWith(dto.email, dto.token, dto.newPassword);
  });
});
