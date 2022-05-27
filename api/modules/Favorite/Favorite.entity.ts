import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";

@Entity()
export default class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, (property) => property.favorites)
  property: Property;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}