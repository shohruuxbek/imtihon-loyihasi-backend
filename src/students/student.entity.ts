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

  @Column()
  groupId: number;

  @Column()
  courseName: string;

  @Column({ nullable: true })
  courseId: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'date' })
  enrolledDate: string;

  @Column({ nullable: true })
  notes: string;
}
