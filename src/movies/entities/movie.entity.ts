import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id_movie: number;
    @Column()
    title: string;
    @Column()
    release_date: string;
    @Column()
    director: string;
    @Column()
    description: string;
    @DeleteDateColumn()
    deleted_at: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
