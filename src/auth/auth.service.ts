import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';  // Importamos la librería crypto

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    console.log('Token generado:', token);
    return { access_token: token };
  }

  // Enviar el correo con el código de recuperación
  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('No se encontró un usuario con ese correo');
    }

    // Generar un código aleatorio
    const resetToken = crypto.randomBytes(3).toString('hex');
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1); // El código expira en 1 hora

    // Almacenar el token y la expiración en la base de datos
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Enviar el correo con el código
    await this.emailService.sendEmail(
      email,
      'Recuperación de Contraseña',
      `<h1>Recupera tu cuenta</h1>
       <p>Usa este código para recuperar tu cuenta: <strong>${resetToken}</strong></p>
       <p>Este código expirará en 1 hora.</p>`
    );

    return { message: 'Email enviado con código de recuperación' };
  }

  // Verificar el código de recuperación y permitir cambiar la contraseña
  async resetPassword(email: string, resetToken: string, newPassword: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('No se encontró un usuario con ese correo');
    }

    if (user.resetToken !== resetToken || !user.resetTokenExpiration || new Date() > user.resetTokenExpiration) {
      throw new Error('El código de recuperación es inválido o ha expirado');
    }
  
    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Actualizar la contraseña en la base de datos
    user.password = hashedPassword;
    user.resetToken = null; // Limpiar el token de recuperación
    user.resetTokenExpiration = null; // Limpiar la fecha de expiración
    await user.save();
  
    return { message: 'Contraseña actualizada exitosamente' };
  }
}
