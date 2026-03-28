import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  groupId: number;

  @Column()
  courseName: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'date' })
  enrolledDate: string;

  @Column({ nullable: true })
  notes: string;
}
