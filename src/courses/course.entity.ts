import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number; // soatda

  @Column()
  price: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  teacherId: number;

  @Column({ nullable: true })
  schedule: string;
}
