import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/roles.enum";
import { RolesGuard } from "src/common/guards/roles.guard";
import { AuthGuard } from "src/common/guards/auth.guard";
import { CreateSubscriptionPlanDto } from "./dto/create-subscription-plan-dto";
import { UpdateSubscriptionPlanDto } from "./dto/update-subcription-plan-dto";
import { SubscriptionPlansService } from "./subscription.plan.service";

@Controller("subPlan")
export class SubscriptionPlanController {
  constructor(private readonly subPlanService: SubscriptionPlansService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post("create")
  createSubPlan(@Body() dto: CreateSubscriptionPlanDto) {
    return this.subPlanService.createSubPlan(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAllSubPlan() {
    return this.subPlanService.findAllSubPlan();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(":id")
  findSubPlanById(@Param("id") id: number) {
    return this.subPlanService.findSubPlanById(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(":id")
  updateSubPlan(
    @Param("id") id: number,
    @Body() dto: UpdateSubscriptionPlanDto
  ) {
    return this.subPlanService.updateSubPlan(+id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  deleteSubPlan(@Param("id") id: number) {
    return this.subPlanService.deleteSubPlan(+id);
  }
}
