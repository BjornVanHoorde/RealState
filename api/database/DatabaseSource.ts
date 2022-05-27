import "reflect-metadata";
import { DataSource } from "typeorm";
import Address from "../modules/Address/Address.entity";
import Category from "../modules/Category/Category.entity";
import City from "../modules/City/City.entity";
import Favorite from "../modules/Favorite/Favorite.entity";
import Message from "../modules/Message/Message.entity";
import Photo from "../modules/Photo/Photo.entity";
import Property from "../modules/Property/Property.entity";
import RealEstate from "../modules/RealEstate/RealEstate.entity";
import User from "../modules/User/User.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Address, Category, City, Favorite, Message, Photo, Property, RealEstate, User],
    migrations: [],
    subscribers: [],
});