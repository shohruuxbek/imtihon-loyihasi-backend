import { Repository } from 'typeorm';
import { Payment } from './payment.entity.js';
export declare class PaymentsController {
    private paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment | null>;
    create(payment: Payment): Promise<Payment>;
    update(id: string, payment: Partial<Payment>): Promise<Payment | null>;
    remove(id: string): Promise<void>;
}
