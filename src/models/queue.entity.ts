import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QueuePriority, QueueSource, QueueStatus } from "../common/constants/queue.const.js";
import { Patient } from "./patient.entity.js";
import { Doctor } from "./doctor.entity.js";
import { Room } from "./room.entity.js";
import { User } from "./user.entity.js";
import { QueueEvent } from "./queue-event.entity.js";


@Entity('queues')
export class Queue {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'patient_id',
  })
  patientId: number;

  @Column({
    name: 'doctor_id',
    nullable: true,
  })
  doctorId: number | null;

  @Column({
    name: 'room_id',
  })
  roomId: number;

  @Column({
    name: 'created_by',
    nullable: true,
  })
  createdByUserId: number | null;

  @Column({
    name: 'queue_number',
  })
  queueNumber: number;

  @Column({
    name: 'queue_date',
    type: 'date',
  })
  queueDate: string;

  @Column({
    type: 'enum',
    enum: QueuePriority,
    default: QueuePriority.NORMAL,
  })
  priority: QueuePriority;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({
    type: 'enum',
    enum: QueueSource,
  })
  source: QueueSource;

  @Column({
    name: 'called_at',
    type: 'datetime',
    nullable: true,
  })
  calledAt: Date | null;

  @Column({
    name: 'started_at',
    type: 'datetime',
    nullable: true,
  })
  startedAt: Date | null;

  @Column({
    name: 'completed_at',
    type: 'datetime',
    nullable: true,
  })
  completedAt: Date | null;

  @ManyToOne(
    () => Patient,
    (patient) => patient.queues,
  )
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(
    () => Doctor,
    (doctor) => doctor.queues,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor | null;

  @ManyToOne(
    () => Room,
    (room) => room.queues,
  )
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(
    () => User,
    (user) => user.createdQueues,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'created_by' })
  createdByUser: User | null;

  @OneToMany(
    () => QueueEvent,
    (event) => event.queue,
  )
  events: QueueEvent[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
