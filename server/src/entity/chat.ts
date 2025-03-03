import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Message } from "./message";
import { BaseEntity } from "./base-entity";

@Entity()
export class Chat extends BaseEntity {
    @ManyToOne(() => User, user => user.chats)
    user!: User;

    @OneToMany(() => Message, message => message.chat)
    messages!: Message[];
}