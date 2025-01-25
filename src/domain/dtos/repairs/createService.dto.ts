import { regularExp } from "../../../config";


export class CreateServicesDTO {
    constructor(
        
        public date: Date,
        public motorsNumber: string,
        public description: string, 
        public userId: string
         
         ){}

    static create(object: { [key: string]: any }): [string?, CreateServicesDTO?]{
        const {date, motorsNumber, description, userId } = object;

        if(!userId) return ['Missing Id', undefined];
        if(!userId|| typeof userId !== 'string' || !regularExp.uuid.test(userId)){
            return ['Invalid userId format, must be a UUID']
        }
        if(!motorsNumber) return ['Missing motor number', undefined];
        if(!description) return ['You have to include a description of reparation service', undefined];
        
        
        return [undefined, new CreateServicesDTO( date, motorsNumber, description, userId)];
    }
}