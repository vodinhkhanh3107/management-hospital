import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity.js";
import { Room } from "./room.entity.js";


@Entity('doctor_room_assignments')
export class DoctorRoomAssignment {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'doctor_id',
  })
  doctorId: number;

  @Column({
    name: 'room_id',
  })
  roomId: number;

  @Column({
    name: 'assigned_at',
    type: 'datetime',
  })
  assignedAt: Date;

  @Column({
    name: 'unassigned_at',
    type: 'datetime',
    nullable: true,
  })
  unassignedAt: Date | null;

  @ManyToOne(
    () => Doctor,
    (doctor) => doctor.roomAssignments,
  )
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(
    () => Room,
    (room) => room.doctorAssignments,
  )
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
