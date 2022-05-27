import { IsDefined } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Address from "../Address/Address.entity";

@Entity()
export default class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsDefined({ always: true })
    @Column()
    zip: number;
    
    @IsDefined({ always: true })
    @Column()
    name: string;

    @OneToMany(() => Address, (address) => address.city)
    addresses: Address[];
}