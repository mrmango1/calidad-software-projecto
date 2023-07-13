import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  birthdate: string;
}
