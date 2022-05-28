import { IsDefined, IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Address from "../Address/Address.entity";
import { BaseEntity } from "../BaseEntity";
import Message from "../Message/Message.entity";
import Property from "../Property/Property.entity";
import User from "../User/User.entity";

@Entity()
export default class RealEstate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDefined({ always: true })
    @Column({ unique: true })
    name: string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @IsDefined({ always: true })
    @IsEmail(undefined, { always: true })
    @Column({ unique: true })
    email: string;

    @IsDefined({ always: true })
    @Column({ unique: true })
    tel: string

    @IsDefined({ always: true })
    @Column()
    logo: string;

    @OneToMany(() => User, (user) => user.realEstate)
    users: User[];

    @OneToMany(() => Message, (message) => message.receiver)
    messages: Message[];

    @OneToMany(() => Property, (property) => property.realEstate)
    properties: Property[];
}