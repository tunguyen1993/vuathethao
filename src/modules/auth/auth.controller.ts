import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DefaultLoginDto, refreshTokenDto } from "./dto/auth.dto";
import { JwtAuthGuard } from "../../core/guards/jwtAuth.guard";

@Controller("api/v1/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**

	 *
	 * @param request
	 * @param body
	 */
  @Post("login")
  async login(@Req() request: Request, @Body() body: DefaultLoginDto) {
    let user = await this.authService.validateUserDefault(body);
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data: await this.authService.login(user),
      message: "success",
    };
  }

  /**
   *
   *
   * @param request
   * @param body
   */
  @UseGuards(JwtAuthGuard)
  @Post("refresh-token")
  async refreshToken(@Req() request: Request, @Body() body: refreshTokenDto) {
    let data = await this.authService.createAccessTokenFromRefreshToken(
      body.refresh_token,
    );
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      data,
      message: "success",
    };
  }

  /**
   *
   *
   * @param request
   */
  @UseGuards(JwtAuthGuard)
  @Get("logout")
  async logout(@Req() request: Request) {
    await this.authService.removeRefreshToken(request["user"]);
    // res.setHeader('Authorization', null);
    return {
      statusCode: 200,
      timestamp: new Date().toISOString(),
      message: "success",
    };
  }
}
