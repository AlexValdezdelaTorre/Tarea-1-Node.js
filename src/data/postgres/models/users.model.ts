import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
        
        nullable: true,
        length: 255,
        unique: true,
        default: 'mail@gmail.com'
    })
    email: string;

    @Column("varchar", {  
        nullable: false
    })
    password: string | null
    
    @Column('varchar', {
        length: 255,
        nullable: true,
        //unique: true,
        default: ""
    })
    rol?: string | null

    @Column('bool', {
        default: true        
    })
    status: boolean

}
