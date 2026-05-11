import { User } from '../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  user!: User;

  @Column({ type: 'date' })
  date!: string;

  @Column({
    type: 'enum',
    enum: ['present', 'absent', 'holiday', 'sunday'],
    default: 'present',
  })
  status!: string;

  @Column({ nullable: true })
  remarks!: string;
}
