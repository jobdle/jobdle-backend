import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmployeeDto } from '../dto/employee.dto';
import { Category } from './category.schema';

@Schema({ timestamps: true })
export class Work {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  detail: string;

  @Prop()
  category: Category;

  @Prop()
  wage: string;

  @Prop()
  note: string;

  @Prop()
  location: string;

  @Prop()
  fullname: string;

  @Prop()
  status: string;

  @Prop()
  deadline: Date;

  @Prop([EmployeeDto])
  employee: [EmployeeDto];
}

export const WorkSchema = SchemaFactory.createForClass(Work);
