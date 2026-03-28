import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('payments')
@UseGuards(RolesGuard)
export class PaymentsController {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  @Get()
  findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentRepository.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @Roles('admin', 'teacher')
  create(@Body() payment: Payment): Promise<Payment> {
    payment.paymentDate = new Date().toISOString().split('T')[0];
    return this.paymentRepository.save(payment);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  async update(
    @Param('id') id: string,
    @Body() payment: Partial<Payment>,
  ): Promise<Payment | null> {
    await this.paymentRepository.update(Number(id), payment);
    return this.paymentRepository.findOne({ where: { id: Number(id) } });
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    this.paymentRepository.delete(Number(id));
    return Promise.resolve();
  }
}
