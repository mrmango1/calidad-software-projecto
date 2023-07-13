import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  findOne(id: string) {
    return this.customerModel.findById(id);
  }
  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = this.customerModel.findByIdAndUpdate(
      id,
      updateCustomerDto,
      { new: true },
    );
    return updatedCustomer;
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
