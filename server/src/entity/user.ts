import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import bcrypt from "bcrypt";
import { Chat } from "./chat";
import { BaseEntity } from "./base-entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Exclude()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true})
    email!: string;

    @Column()
    @Exclude()
    password!: string;

    @Column({ type: 'date'})
    birthDate!: Date;

    @OneToMany(() => Chat, chat => chat.user)
    chats!: Chat[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if(!this.password.startsWith("$2b$")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    constructor(firstName: string, lastName: string, email: string, password: string, birthDate: Date){
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
    }
}