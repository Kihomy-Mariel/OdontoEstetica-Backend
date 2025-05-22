// src/auth/constants/jwt.constants.ts

/**
 * Aquí defines tu secreto para firmar JWT.
 * En producción deberías usar una variable de entorno
 * (por ejemplo process.env.JWT_SECRET) y nunca subirla a Git.
 */
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'miSecretoUltraSeguro', 
};
