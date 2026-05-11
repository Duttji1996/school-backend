import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../curriculum/entities/subject.entity';

@Entity('exam_results')
export class ExamResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Subject)
  subject: Subject;

  @Column()
  examName: string; // e.g. "Final Term 2026"

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  totalMarks: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  obtainedMarks: number;

  @Column()
  grade: string;

  @Column({ type: 'date' })
  date: string;
}
