import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DesignTemp } from '../../design_temp/entities/design.temp.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  flag: boolean;

  @Column({ nullable: true, length: 4 })
  otp: string;

  @Column({ nullable: true })
  requestedAt: Date;

  @OneToMany(() => DesignTemp, (temp) => temp.user, {
    eager: false,
  })
  design_temp: DesignTemp[];
}
