import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { Cliente } from './schemas/cliente.schema';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const createdCliente = new this.clienteModel(createClienteDto);
    return createdCliente.save();
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClineteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
