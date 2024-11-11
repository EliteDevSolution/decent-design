import { IsNumber, IsString } from 'class-validator';

export class CreateDesignTemp {
  @IsString()
  design_name: string;

  @IsString()
  content: string;
}
