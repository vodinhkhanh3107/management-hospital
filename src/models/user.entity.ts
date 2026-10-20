import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserStatus } from '../common/constants/user.const.js';
import { Role } from './role.entity.js';
import { Patient } from './patient.entity.js';
import { Doctor } from './doctor.entity.js';
import { Receptionist } from './receptionist.entity.js';
import { Queue } from './queue.entity.js';
import { QueueEvent } from './queue-event.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    name: 'role_id',
  })
  roleId: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({
    name: 'change_password',
    default: true,
  })
  changePassword: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Patient, (patient) => patient.user)
  patient: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor;

  @OneToOne(() => Receptionist, (receptionist) => receptionist.user)
  receptionist: Receptionist;

  @OneToMany(() => Patient, (patient) => patient.createdByUser)
  createdPatients: Patient[];

  @OneToMany(() => Queue, (queue) => queue.createdByUser)
  createdQueues: Queue[];

  @OneToMany(() => QueueEvent, (event) => event.performedByUser)
  performedQueueEvents: QueueEvent[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
