import { IsBoolean, IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateSubscriptionDto {
  @IsNumber()
  planId!: number;

  @IsNumber()
  userId!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
