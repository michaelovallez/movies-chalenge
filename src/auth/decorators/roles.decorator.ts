import { SetMetadata } from '@nestjs/common';
import { Role } from '../utils/role.enum';
export const ROLES_KEY = 'roles';
//export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);