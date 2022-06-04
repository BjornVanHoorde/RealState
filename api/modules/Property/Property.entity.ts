import { IsDefined } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Address from "../Address/Address.entity";
import { BaseEntity } from "../BaseEntity";
import Category from "../Category/Category.entity";
import Favorite from "../Favorite/Favorite.entity";
import Message from "../Message/Message.entity";
import Photo from "../Photo/Photo.entity";
import Agency from "../Agency/Agency.entity";
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
  status: PropertyStatus;

  @IsDefined({ always: true })
  @Column()
  yearOfConstruction: number;

  @IsDefined({ always: true })
  @Column()
  price: number;

  @IsDefined({ always: true })
  @Column()
  description: string;

  @OneToMany(() => Favorite, (favorite) => favorite.property)
  favorites: Favorite[];

  @OneToMany(() => Message, (message) => message.property)
  messages: Message[];

  @OneToMany(() => Photo, (photo) => photo.property)
  photos: Photo[];

  @ManyToOne(() => Agency, (agency) => agency.properties)
  agency: Agency;

  @ManyToOne(() => Category, (category) => category.properties)
  category: Category;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
