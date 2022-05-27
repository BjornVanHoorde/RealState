import { IsDefined } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Address from "../Address/Address.entity";
import Category from "../Category/Category.entity";
import Favorite from "../Favorite/Favorite.entity";
import Message from "../Message/Message.entity";
import Photo from "../Photo/Photo.entity";
import RealEstate from "../RealEstate/RealEstate.entity";
import { PropertyStatus } from "./Property.constants";

@Entity()
export default class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  surface: number;

  @Column({
    type: "enum",
    enum: PropertyStatus,
  })
  role: PropertyStatus;

  @IsDefined({ always: true })
  @Column()
  yearOfConstruction: number;

  @IsDefined({ always: true })
  @Column()
  price: number;

  @OneToMany(() => Favorite, (favorite) => favorite.property)
  favorites: Favorite[];

  @OneToMany(() => Message, (message) => message.property)
  messages: Message[];

  @OneToMany(() => Photo, (photo) => photo.property)
  photos: Photo[];

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.properties)
  realEstate: RealEstate;

  @ManyToOne(() => Category, (category) => category.properties)
  category: Category;

  @OneToOne(() => Address, (address) => address.property)
  address: Address;
}
