import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "src/common/constants/roles.enum";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role?: UserRole;

  @Column({ type: "boolean", default: false })
  email_confirmed!: boolean;
}
