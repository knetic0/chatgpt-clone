import { Column, Entity, ManyToOne } from "typeorm";
import { Chat } from "./chat";
import { BaseEntity } from "./base-entity";

@Entity()
export class Message extends BaseEntity {
    @Column()
    message!: string;

    @Column()
    response!: string;

    @ManyToOne(() => Chat, chat => chat.messages)
    chat!: Chat;
}