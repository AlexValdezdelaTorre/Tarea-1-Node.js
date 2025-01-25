import { regularExp } from "../../../config";

export class UpdateUsersDTO {
    constructor(
        public name: string, 
        public email: string, 
        ){}

    static create(object: { [key: string]: any }): [string?, UpdateUsersDTO?]{
        const { name, email } = object;

        if(!name) return ['Missing name', undefined];
        if ( typeof name !== 'string') ["The name must be a string"]
        if(!email) return ['Missing email'];
        if(!regularExp.email.test(email)) return ["Invalid email"]
         

        return [undefined, new UpdateUsersDTO(name, email)];
    }
}