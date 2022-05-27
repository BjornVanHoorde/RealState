import { IsDefined } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Property from "../Property/Property.entity";
import RealEstate from "../RealEstate/RealEstate.entity";
import User from "../User/User.entity";

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

  @IsDefined({ always: true })
  @Column()
  read: boolean;
}