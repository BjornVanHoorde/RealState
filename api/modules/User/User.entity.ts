import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { hash, compare } from "bcrypt";
import { UserRole } from "./User.constants";
import { BaseEntity } from "../BaseEntity";
import { IsDefined, IsEmail } from "class-validator";
import RealEstate from "../RealEstate/RealEstate.entity";
import Message from "../Message/Message.entity";
import Favorite from "../Favorite/Favorite.entity";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  firstName: string;

  @IsDefined({ always: true })
  @Column()
  lastName: string;

  @IsDefined({ always: true })
  @IsEmail(undefined, { always: true })
  @Column({ unique: true })
  email: string;

  @IsDefined({ always: true })
  @Column({ unique: true })
  tel: string;

  @IsDefined({ groups: ["create"] })
  @Column({ select: false })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @IsDefined({ always: false })
  @Column({ select: true })
  avatar: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.users)
  realEstate: RealEstate;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  async checkPassword(passwordToCheck: string) {
    return await compare(passwordToCheck, this.password);
  }

  isAdmin() {
    return this.role === UserRole.Admin;
  }
}
