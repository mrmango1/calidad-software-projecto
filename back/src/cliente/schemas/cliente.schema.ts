import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClienteDocument = HydratedDocument<Cliente>;

@Schema()
export class Cliente {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  mail: string;

  @Prop()
  phone: number;

  @Prop()
  gender: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
