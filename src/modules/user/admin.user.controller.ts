import { Body, Controller, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("api/v1/admin/user")
export class AdminUserController {
  constructor(private _userService: UserService) {}

  @Post("create-user")
  async createUser(@Body() body) {
    return {
      code: 200,
      data: await this._userService.create(body),
    };
  }
}
