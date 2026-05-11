import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity('salary_payments')
export class SalaryPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Teacher)
  teacher: Teacher;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  creditDate: string;

  @Column()
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;
}
