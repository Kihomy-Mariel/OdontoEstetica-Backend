import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

// src/common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}   

  canActivate(ctx: ExecutionContext) {
    const required = this.reflector.get<number[]>('roles', ctx.getHandler());
    if (!required || required.length === 0) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return required.includes(user.idRol);
  }
}
