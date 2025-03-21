import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    description: 'Correo electrónico del usuario que ha olvidado su contraseña',
    example: 'user@example.com',
  })
  email: string;
}