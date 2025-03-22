import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, 
      secretOrKey: process.env.JWT_SECRET || 'secretKey', 
    });
  }

  async validate(payload: any) {
    console.log('Payload recibido en JwtStrategy:', payload);
    return { userId: payload.sub, email: payload.email }; 
  }
  
}
