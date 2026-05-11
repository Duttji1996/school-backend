import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fee_structures')
export class FeeStructure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  className: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  annualFee: number;
}
