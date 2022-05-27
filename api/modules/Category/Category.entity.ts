import { IsDefined } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Property from "../Property/Property.entity";

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  name: string;

  @OneToMany(() => Property, (property) => property.category)
  properties: Property[];
}
