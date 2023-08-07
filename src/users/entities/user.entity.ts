import { Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { IsEmail } from 'class-validator';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;
    @Column()
    name: string;
    @Column({unique: true, nullable: false})
    @IsEmail()
    email: string;
    @Column({nullable: false})
    password: string;
    @Column({default: 'user'})
    role: string;
    @DeleteDateColumn()
    deleted_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @CreateDateColumn()
    created_at: Date;
}
