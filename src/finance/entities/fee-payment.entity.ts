import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('fee_payments')
export class FeePayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student)
  student: Student;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentDate: string;

  @Column()
  receiptNumber: string;

  @Column()
  method: string; // e.g. "Online", "Cash"

  @CreateDateColumn()
  createdAt: Date;
}
