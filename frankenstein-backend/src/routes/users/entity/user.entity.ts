import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "email", unique: true, nullable: false })
  email: string;

  @Column({ name: "user_image", nullable: true })
  userImage: string;

  @Column({ name: "password", nullable: false })
  password: string;

  @Column({ name: "is_admin", nullable: false, default: false })
  isAdmin: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;
}
