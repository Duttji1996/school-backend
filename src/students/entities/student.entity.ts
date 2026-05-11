import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SchoolClass } from '../../curriculum/entities/school-class.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students)
  schoolClass: SchoolClass;

  @Column()
  section: string;

  @Column({ nullable: true })
  rollNumber: string;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  fatherName: string;

  @Column({ nullable: true })
  contactNo: string;

  @Column({ nullable: true })
  motherName: string;

  @Column({ nullable: true })
  aadharId: string;

  @Column({ nullable: true })
  bloodGroup: string;

  @Column({ type: 'date', nullable: true })
  admissionDate: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ default: 'pending' })
  status: 'active' | 'pending' | 'rejected';

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
