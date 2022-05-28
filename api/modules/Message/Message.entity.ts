import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";
import RealEstate from "../RealEstate/RealEstate.entity";
import User from "../User/User.entity";
import { MessageStatus } from "./Message.constants";

@Entity()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  message: string

  @ManyToOne(() => Property, (property) => property.messages)
  property: Property;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.messages)
  receiver: RealEstate;

  @Column({
    type: "enum",
    enum: MessageStatus,
    default: MessageStatus.unread,
  })
  status: MessageStatus;
}