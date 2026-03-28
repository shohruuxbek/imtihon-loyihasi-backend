import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    // Get the required roles from the handler or class metadata
    const requiredRoles = this.getMetadata(context);
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Check if user has required role
    return requiredRoles.includes(user.role);
  }

  private getMetadata(context: ExecutionContext): string[] {
    try {
      const handler = context.getHandler();
      const roles = Reflect.getMetadata('roles', handler);
      return roles || [];
    } catch (error) {
      return [];
    }
  }
}
