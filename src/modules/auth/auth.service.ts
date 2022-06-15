import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { catchError } from "rxjs";
import { AST } from "eslint";
import Token = AST.Token;
import { DefaultLoginDto } from "./dto/auth.dto";
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user) {
    let user_data_format = {
      id: user.id,
      full_name: user.full_name,
    };
    const token = await this.generateToken(user_data_format);
    const refresh_token = this.jwtService.sign(
      user_data_format,
      AuthService.getTokenOptions("refresh", user),
    );
    await this.setCurrentRefreshToken(refresh_token, user.id);
    return { user, token, refresh_token };
  }

  private async generateToken(user) {
    return this.jwtService.sign(user, {
      secret: process.env.JWTKEY,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  }

  public async createAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken);
      if (!decoded) {
        throw new Error();
      }
      const user = await this.userService.findOneById(decoded["id"]);
      if (!user) {
        throw new HttpException(
          "User with this id does not exist",
          HttpStatus.NOT_FOUND,
        );
      }
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.refresh_token,
      );

      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException("Invalid token");
      }
      await this.jwtService.verifyAsync<Token>(
        refreshToken,
        this.getRefreshTokenOptions(user),
      );
      return this.login(user);
    } catch (e) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  public async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return await this.userService.updateUser(
      {
        id: userId,
      },
      {
        refresh_token: currentHashedRefreshToken,
      },
    );
  }

  public async removeRefreshToken(user: UserEntity | any) {
    return await this.userService.updateUser(user, {
      refresh_token: null,
    });
  }

  getRefreshTokenOptions(user: UserEntity): JwtSignOptions {
    return AuthService.getTokenOptions("refresh", user);
  }

  private static getTokenOptions(type: string, user: UserEntity) {
    const options: JwtSignOptions = {
      secret: process.env.JWTKEY,
    };
    const expiration: string = process.env.REFRESHTOKEN_EXPIRATION;
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }

  public async validateUserDefault(
    userLogin: DefaultLoginDto,
  ): Promise<UserEntity> {
    let user: UserEntity | undefined = await this.userService.findByEmail(
      userLogin.email.trim(),
    );
    if (!user) {
      throw new HttpException("Invalid email and password!", 400);
    }
    let compare = await bcrypt.compare(
      userLogin.password + process.env.PASS_SALT,
      user.password,
    );
    if (!compare) {
      throw new HttpException("invalid email and password!", 400);
    }
    return user;
  }
}
