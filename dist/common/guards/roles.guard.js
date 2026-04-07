var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let RolesGuard = class RolesGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return true;
        }
        const requiredRoles = this.getMetadata(context);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const hasRole = requiredRoles.includes(user.role);
        console.log(`Roles check: user role=${user.role}, required=${requiredRoles}, allowed=${hasRole}`);
        return hasRole;
    }
    getMetadata(context) {
        try {
            const handler = context.getHandler();
            const roles = Reflect.getMetadata('roles', handler);
            return roles || [];
        }
        catch (error) {
            return [];
        }
    }
};
RolesGuard = __decorate([
    Injectable()
], RolesGuard);
export { RolesGuard };
//# sourceMappingURL=roles.guard.js.map