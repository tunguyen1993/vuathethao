import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const user_verify = this.reflector.get<string[]>(
      "verify",
      context.getHandler(),
    );
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (err || !user || user.status === 1) {
      throw err || new UnauthorizedException();
    }

    if (user_verify && parseInt(user.verify) !== 1) {
      throw new HttpException(
        "Permission denied User is not verify",
        HttpStatus.FORBIDDEN,
      );
    } else if (roles && roles.length) {
      if (user.role) {
        let role: string = user.role.role.name;
        this.matchRoles(roles, role);
      } else {
        throw new HttpException("Permission denied", HttpStatus.FORBIDDEN);
      }
    }

    return user;
  }

  matchRoles(roles, role) {
    const permission = roles.includes(role);
    if (!permission) {
      throw new HttpException("Permission denied", HttpStatus.UNAUTHORIZED);
    }
  }
}
