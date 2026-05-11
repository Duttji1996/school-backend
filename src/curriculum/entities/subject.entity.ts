import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { SchoolClass } from './school-class.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. "Mathematics"

  @Column({ nullable: true })
  code: string;

  @ManyToMany(() => SchoolClass)
  @JoinTable()
  classes: SchoolClass[];
}
