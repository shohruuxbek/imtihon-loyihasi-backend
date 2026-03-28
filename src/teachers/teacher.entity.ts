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

  @Column({ unique: true })
  email: string;

  @Column()
  specialization: string;

  @Column()
  experience: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  notes: string;
}
