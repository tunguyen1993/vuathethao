import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../../core/guards/jwtAuth.guard";
import { Request } from "express";

@UseGuards(JwtAuthGuard)
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

  @Get()
  async getUser(@Query() query) {
    return {
      code: 200,
      data: await this._userService.getListUser(query.page, query.limit),
    };
  }

  @Put(":user_id")
  async updateUser(
    @Body() body,
    @Param("user_id") user_id: number,
    @Req() request: Request,
  ) {
    return {
      code: 200,
      data: await this._userService.updateUserClone(user_id, body),
    };
  }

  @Delete(":user_id")
  async DeleteUser(@Param("user_id") user_id: number) {
    return {
      code: 200,
      data: await this._userService.deActiveUser(user_id),
    };
  }

  @Put("active/:user_id")
  async activeUser(@Param("user_id") user_id: number) {
    return {
      code: 200,
      data: await this._userService.activeUser(user_id),
    };
  }
}
