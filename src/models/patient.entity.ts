import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity.js';
import { Queue } from './queue.entity.js';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    unique: true,
  })
  userId: number;

  @Column({
    name: 'patient_code',
    unique: true,
    length: 30,
  })
  patientCode: string;

  @Column({
    name: 'full_name',
    length: 150,
  })
  fullName: string;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  gender: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  address: string | null;

  @Column({
    name: 'created_by',
    nullable: true,
  })
  createdBy: number | null;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.createdPatients, {
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdByUser: User | null;

  @OneToMany(() => Queue, (queue) => queue.patient)
  queues: Queue[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
