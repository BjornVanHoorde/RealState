import { IsDefined } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../BaseEntity";
import Property from "../Property/Property.entity";

@Entity()
export default class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  path: string;

  @IsDefined({ always: true })
  @Column()
  alt: string;

  @ManyToOne(() => Property, (property) => property.photos)
  property: Property;
}
