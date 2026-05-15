import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  subject: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({ type: 'date' })
  joiningDate: string;

  @Column({ nullable: true })
  lastSalaryCredited: string;

  @Column({ default: 100 })
  attendancePercentage: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  contactNo: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;
}
