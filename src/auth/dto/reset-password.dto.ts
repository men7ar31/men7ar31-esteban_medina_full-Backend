import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@example.com', description: 'Correo del usuario' })
  email: string;

  @ApiProperty({ example: 'token123', description: 'Token de restablecimiento' })
  token: string;

  @ApiProperty({ example: 'newPassword123', description: 'Nueva contraseña' })
  newPassword: string;
}
