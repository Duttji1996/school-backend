import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('school_classes')
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. "Class 4-A"

  @Column({ nullable: true })
  roomNumber: string;

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
