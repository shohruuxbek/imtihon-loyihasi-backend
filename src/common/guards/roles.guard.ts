import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // For demo purposes, allow all requests if no user object
    // In production, you should validate JWT token here
    const user = request.user;

    if (!user) {
      // No user in request - this is OK for public endpoints
      return true;
    }

    // Get the required roles from the handler or class metadata
    const requiredRoles = this.getMetadata(context);
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Check if user has required role
    const hasRole = requiredRoles.includes(user.role);
    console.log(`Roles check: user role=${user.role}, required=${requiredRoles}, allowed=${hasRole}`);
    return hasRole;
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
