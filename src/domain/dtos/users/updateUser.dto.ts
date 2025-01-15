export class UpdateUsersDTO {
    constructor(
        public readonly name: string, 
        public readonly email: string, 
        public readonly password: string, 
        public readonly rol: string, ){}

    static create(object: { [key: string]: any }): [string?, UpdateUsersDTO?]{
        const { name, email, password, rol } = object;

        if(!name) return ['Missing name', undefined];
        if(name.length <= 2) return ['The name must be at least a 5 characters'];
        if ( typeof name !== 'string') ["The name must be a string"]
        if(!email) return ['Missing email'];
        if(email.length <= 8) return ['The email must be at least 10 characters'];
        if ( typeof name !== 'string') ["The name must be a string"]
        
        //const paragraphs = content.split('/\n+/').filter(paragraphs =>paragraphs.trim().length > 0)
        //if(paragraphs.length < 2) return ["The content must be at least 2 paragraphs"] 
        return [undefined, new UpdateUsersDTO(name, email, password, rol)];
    }
}