import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.model";



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
    repairStatus: RepairStatus;

    @ManyToOne(() => Users, (users) => users.repairs)
    user: Users;

}
