import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity.js';

@Entity('queue_counters')
@Unique(['roomId', 'queueDate'])
export class QueueCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'room_id',
  })
  roomId: number;

  @Column({
    name: 'queue_date',
    type: 'date',
  })
  queueDate: string;

  @Column({
    name: 'last_number',
    default: 0,
  })
  lastNumber: number;

  @ManyToOne(() => Room, (room) => room.queueCounters)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
