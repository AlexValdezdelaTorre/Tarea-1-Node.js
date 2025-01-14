/*export class CreateUsersDTO {
    constructor(
        public readonly name: string, 
        public readonly email: string, 
        public readonly password: string, 
        public readonly rol: string, ){}

    static create(object: { [key: string]: any }): [string?, CreateUsersDTO?]{
        const { name, email, password, rol } = object;

        if(!name) return ['Missing name', undefined];
        if(name.length <= 2) return ['The name must be at least a 5 characters'];
        if(!email) return ['Missing email'];
        if(email.length <= 8) return ['The email must be at least 10 characters'];
        
        return [, new CreateUsersDTO(name, email, password, rol)];
    }
}*/