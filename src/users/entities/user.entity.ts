import { Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { IsEmail } from 'class-validator';
import { Role } from "src/common/enums/role.enum";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;
    @Column()
    name: string;
    @Column({unique: true, nullable: false})
    @IsEmail()
    email: string;
    @Column({nullable: false, select: false})
    password: string;
    @Column({type:"enum", default: Role.USER, enum: Role})
    role: string;
    @DeleteDateColumn()
    deleted_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @CreateDateColumn()
    created_at: Date;
}
