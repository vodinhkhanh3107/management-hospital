import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QueueEventType } from "../common/constants/queue.const.js";
import { Queue } from "./queue.entity.js";
import { User } from "./user.entity.js";


@Entity('queue_events')
export class QueueEvent {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'queue_id',
  })
  queueId: number;

  @Column({
    name: 'performed_by',
    nullable: true,
  })
  performedByUserId: number | null;

  @Column({
    name: 'event_type',
    type: 'enum',
    enum: QueueEventType,
  })
  eventType: QueueEventType;

  @Column({
    type: 'json',
    nullable: true,
  })
  metadata: Record<string, any> | null;

  @ManyToOne(
    () => Queue,
    (queue) => queue.events,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'queue_id' })
  queue: Queue;

  @ManyToOne(
    () => User,
    (user) => user.performedQueueEvents,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'performed_by',
  })
  performedByUser: User | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}