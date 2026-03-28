import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  amount: number;

  @Column({ default: 'pending' })
  status: string; // pending, paid, cancelled

  @Column({ type: 'date' })
  paymentDate: string;

  @Column()
  courseId: number;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
