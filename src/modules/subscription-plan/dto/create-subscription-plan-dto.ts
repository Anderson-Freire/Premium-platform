import { IsString, Min, IsNumber } from "class-validator";

export class CreateSubscriptionPlanDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  durationindays!: number;
}
