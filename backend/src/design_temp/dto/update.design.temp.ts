import { IsString, IsNumber } from 'class-validator';

export class UpdateDesignTemp {
  @IsNumber()
  id: number;

  @IsString()
  design_name: string;

  @IsString()
  content: string;
}
