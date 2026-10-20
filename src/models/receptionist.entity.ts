import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity.js";


@Entity('receptionists')
export class Receptionist {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    unique: true,
  })
  userId: number;

  @Column({
    name: 'employee_code',
    unique: true,
    length: 30,
  })
  employeeCode: string;

  @Column({
    name: 'full_name',
    length: 150,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  department: string | null;

//   @Column({
//     type: 'varchar',
//     length: 30,
//     default: 'ACTIVE',
//   })
//   status: string;

  @OneToOne(
    () => User,
    (user) => user.receptionist,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
