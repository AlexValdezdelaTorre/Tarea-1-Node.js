import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum RepairStatus {
  
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
   
}

@Entity()
export class Repairs extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date', {
        nullable: true
    })
    date: Date;

    @Column("varchar", {
       length: 255,
       nullable: true,
       unique: true 
    })
    motorsNumber: string;

    @Column( 'varchar', {
        length: 1000,
        nullable: true,
    })
    description: string;
    
    @Column('enum', {
        enum: RepairStatus,
        default: RepairStatus.PENDING
    })
    status: RepairStatus;

    @Column('varchar', {
        nullable: true
    })
    userId: string;

}
