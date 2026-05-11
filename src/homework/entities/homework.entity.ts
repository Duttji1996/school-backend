import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Subject } from '../../curriculum/entities/subject.entity';
import { SchoolClass } from '../../curriculum/entities/school-class.entity';

@Entity('homeworks')
export class Homework {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => SchoolClass)
  schoolClass: SchoolClass;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  dueDate: string;

  @CreateDateColumn()
  createdAt: Date;
}
