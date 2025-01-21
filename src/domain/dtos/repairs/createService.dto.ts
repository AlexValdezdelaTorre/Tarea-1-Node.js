//import z from "zod"

export class CreateServicesDTO {
    constructor(
        //public date: Date,
        public motorsNumber: string,
        public description: string, 
        public userId: string,
        public date: Date, 
         ){}

    static create(object: { [key: string]: any }): [string?, CreateServicesDTO?]{
        const { motorsNumber, description, userId, date } = object;

        if(!userId) return ['Missing name', undefined];
        //if(userId.length <= 2) return ['The name must be at least a 2 characters'];
        //if(!userId) return ['Missing email'];
        //if(userId.length <= 8) return ['The email must be at least 10 characters'];
        
        return [undefined, new CreateServicesDTO( motorsNumber, description, userId, date)];
    }
}