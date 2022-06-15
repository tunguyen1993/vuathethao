import { Module } from "@nestjs/common";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";
import { AdminUserController } from "./admin-user.controller";

@Module({
  providers: [...userProviders, UserService],
  exports: [UserService],
  controllers: [AdminUserController],
})
export class UserModule {}
