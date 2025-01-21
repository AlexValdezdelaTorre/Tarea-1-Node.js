import { regularExp } from "../../../config";

export class UpdateUsersDTO {
    constructor(
        public name: string, 
        public email: string, 
        ){}

    static create(object: { [key: string]: any }): [string?, UpdateUsersDTO?]{
        const { name, email } = object;

        if(!name) return ['Missing name', undefined];
        //if(name.length <= 2) return ['The name must be at least a 5 characters'];
        //if ( typeof name !== 'string') ["The name must be a string"]
        if(!email) return ['Missing email'];
        //if(email.length <= 8) return ['The email must be at least 10 characters'];
        //if ( typeof name !== 'string') ["The name must be a string"]
        if(!regularExp.email.test(email)) return ["Invalid email"]
        //const paragraphs = content.split('/\n+/').filter(paragraphs =>paragraphs.trim().length > 0)
        //if(paragraphs.length < 2) return ["The content must be at least 2 paragraphs"] 

        return [undefined, new UpdateUsersDTO(name, email)];
    }
}