import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Queue } from './queue.entity.js';
import { DoctorRoomAssignment } from './doctor-room-assignment.entity.js';
import { QueueCounter } from './queue-counter.entity.js';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'room_code',
    unique: true,
    length: 30,
  })
  roomCode: string;

  @Column({
    name: 'room_name',
    length: 150,
  })
  roomName: string;

  @Column({
    name: 'queue_prefix',
    length: 10,
  })
  queuePrefix: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'ACTIVE',
  })
  status: string;

  @OneToMany(() => Queue, (queue) => queue.room)
  queues: Queue[];

  @OneToMany(() => QueueCounter, (counter) => counter.room)
  queueCounters: QueueCounter[];

  @OneToMany(() => DoctorRoomAssignment, (assignment) => assignment.room)
  doctorAssignments: DoctorRoomAssignment[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
