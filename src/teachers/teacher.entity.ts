import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  assignedCourses: string; // Kurs ID lari vergul bilan

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;
}
