import { regularExp } from "../../../config";
import { Role } from "../../../data";


export class CreateUsersDTO {
    constructor(
        public name: string, 
        public email: string, 
        public password: string, 
        public role: Role, ){}

        

        static create(object: { [key: string]: any }): [string?, CreateUsersDTO?]{
        const { name, email, password, role } = object;

        if(!name) return ['Missing name'];
        if(!email) return ['Missing email'];
        if(!regularExp.email.test(email)) return ['Invalid email'];
        if(!password) return ["Missing password"];
        if(!regularExp.password.test(password)) return ['The password must be at least 10 characters, and contain at least one uppercase letter, one lowercase and one especial character']
        if(!role) return ['Missing rol']
        return [undefined, new CreateUsersDTO(name, email, password, role)];
    }
}