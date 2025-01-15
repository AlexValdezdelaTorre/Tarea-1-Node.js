export class CreateServicesDTO {
    constructor(
        public readonly userId: string, 
         ){}

    static create(object: { [key: string]: any }): [string?, CreateServicesDTO?]{
        const { userId } = object;

        if(!userId) return ['Missing name', undefined];
        if(userId.length <= 2) return ['The name must be at least a 2 characters'];
        //if(!userId) return ['Missing email'];
        //if(userId.length <= 8) return ['The email must be at least 10 characters'];
        
        return [undefined, new CreateServicesDTO(userId)];
    }
}