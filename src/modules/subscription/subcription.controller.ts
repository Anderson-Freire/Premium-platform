import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/create-subscription-dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription-dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/roles.enum";
import { AuthRequest } from "src/types/express";

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subservice: SubscriptionService) {}

  @Post("create")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  createSubscription(
    @Body() dto: CreateSubscriptionDto,
    @Req() req: AuthRequest
  ) {
    const userId = req.user.id;
    return this.subservice.createSubscription(userId, dto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PUBLISHER)
  findAllSubscriptions() {
    return this.subservice.findAllSubscriptions();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PUBLISHER, UserRole.USER)
  findSubById(@Param("id") id: number) {
    return this.subservice.findSubscriptionById(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PUBLISHER)
  updateSubscription(
    @Param("id") id: number,
    @Body() dto: UpdateSubscriptionDto
  ) {
    return this.subservice.updateSubscription(id, dto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteSubscription(@Param("id") id: number) {
    return this.subservice.deleteSubscription(id);
  }
}
