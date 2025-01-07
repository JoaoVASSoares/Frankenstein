import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ type: "date", nullable: false })
  birthday: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  contact_image: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: false })
  zip_code: string;

  @Column({ nullable: false })
  public_place: string;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  complement: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
