import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Correo del usuario' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  password: string;
}
