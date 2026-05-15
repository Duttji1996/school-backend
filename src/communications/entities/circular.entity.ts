import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('circulars')
export class Circular {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 'All' })
  targetAudience: string; // 'All', 'Students', 'Teachers'

  @Column({ nullable: true })
  category: string; // 'Academic', 'Holiday', 'Event', 'Notice'

  @CreateDateColumn()
  createdAt: Date;
}
