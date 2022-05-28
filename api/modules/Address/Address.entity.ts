import { IsDefined } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import City from "../City/City.entity";
import Property from "../Property/Property.entity";
import RealEstate from "../RealEstate/RealEstate.entity";
import { BaseEntity } from "../BaseEntity";

@Entity()
export default class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column()
    street: string;

    @IsDefined({ always: true })
    @Column()
    number: number;

    @IsDefined({ always: false })
    @Column()
    box: string;

    @ManyToOne(() => City, (city) => city.addresses)
    city: City;

    @OneToOne(() => Property)
    @JoinColumn()
    property: Property;

    @OneToOne(() => RealEstate, (property) => property.address)
    realEstate: RealEstate;
}