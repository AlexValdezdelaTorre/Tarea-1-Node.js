import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Repairs extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp', {
        default: () => 
        'CURRENT_TIMESTAMP',
    })
    date: Date;
    
    @Column('bool', {
        default: true
    })
    status: boolean;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    userId: string;

}
