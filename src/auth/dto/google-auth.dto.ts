import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthDto {
  @ApiProperty({ type: String, description: 'El nombre del usuario' })
  name: string;

  @ApiProperty({ type: String, description: 'El correo electrónico del usuario' })
  email: string;

  @ApiProperty({ type: String, description: 'El ID del usuario en Google' })
  googleId: string;

  @ApiProperty({ type: String, description: 'Token de acceso recibido de Google' })
  accessToken: string;
}
