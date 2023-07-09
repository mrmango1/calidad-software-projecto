import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  birthdate: string;
}
