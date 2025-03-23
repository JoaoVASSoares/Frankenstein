import { User } from "src/routes/users/entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "last_name", nullable: false })
  lastName: string;

  @Column({ name: "birthday", type: "date", nullable: false })
  birthday: Date;

  @Column({ name: "email", unique: true, nullable: false })
  email: string;

  @Column({ name: "contact_image", nullable: true })
  contactImage: string;

  @Column({ name: "phone", nullable: true })
  phone: string;

  @Column({ name: "whatsapp", nullable: true })
  whatsapp: string;

  @Column({ name: "zip_code", nullable: false })
  zipCode: string;

  @Column({ name: "public_place", nullable: false })
  publicPlace: string;

  @Column({ name: "neighborhood", nullable: false })
  neighborhood: string;

  @Column({ name: "city", nullable: false })
  city: string;

  @Column({ name: "state", nullable: false })
  state: string;

  @Column({ name: "number", nullable: false })
  number: string;

  @Column({ name: "complement", nullable: false })
  complement: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;
}
