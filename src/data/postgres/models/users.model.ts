import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { encriptAdapter } from "../../../config";
import { Repairs } from "./repairs.model";

export enum  Role  {
    EMPLOYEE = "EMPLOYEE",
    CLIENT = "CLIENT"
}

export enum Status {
    
  
    AVAILABLE = "AVAILABLE",
    DISABLED = "DISABLED",
   
}

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        length:255,
        nullable: true
    })
    name: string;

    @Column('varchar', {
        
        nullable: false,
        length: 255,
        unique: true,
       
    })
    email: string;

    @Column("varchar", {  
        nullable: false
    })
    password: string 
    
    @Column('enum', {
      enum: Role,
      default: Role.EMPLOYEE
    })
    role: Role

    @Column('enum', {
        enum: Status,
        default: Status.AVAILABLE        
    })
    status: Status;

    @OneToMany(() => Repairs, (repairs) => repairs.user )
    repairs: Repairs[];     

    @BeforeInsert()
    encryptedPassword(){
        this.password = encriptAdapter.hash(this.password)
    }

}
