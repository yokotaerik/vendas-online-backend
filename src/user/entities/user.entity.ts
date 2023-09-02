import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export default class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({ name: 'name', nullable: false })
  name: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'cpf', nullable: false })
  cpf: string;
  @Column({ name: 'type_user', nullable: false })
  typeUser: number;
  @Column({ name: 'phone' })
  phone: string;
  @Column({ name: 'password', nullable: false })
  password: string;
  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
