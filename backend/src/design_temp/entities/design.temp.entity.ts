import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class DesignTemp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  design_name: string;

  @Column('text')
  content: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.design_temp, {
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  isTemplate: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modified: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted: Date;
}
