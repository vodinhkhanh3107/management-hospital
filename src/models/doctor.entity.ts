import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity.js';
import { UserStatus } from '../common/constants/user.const.js';
import { Queue } from './queue.entity.js';
import { DoctorRoomAssignment } from './doctor-room-assignment.entity.js';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    unique: true,
  })
  userId: number;

  @Column({
    name: 'doctor_code',
    unique: true,
    length: 30,
  })
  doctorCode: string;

  @Column({
    name: 'full_name',
    length: 150,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  specialization: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string | null;

//   @Column({
//     type: 'enum',
//     length: 30,
//     default: UserStatus.ACTIVE,
//   })
//   status: UserStatus;

  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Queue, (queue) => queue.doctor)
  queues: Queue[];

  @OneToMany(() => DoctorRoomAssignment, (assignment) => assignment.doctor)
  roomAssignments: DoctorRoomAssignment[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
