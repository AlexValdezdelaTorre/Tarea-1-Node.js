export class UpdateServicesDTO {
    constructor(
        public readonly userId: string ){}

    static create(object: { [key: string]: any }): [string?, UpdateServicesDTO?]{
        const { userId } = object;

        if(!userId) return ['Missing name', undefined];
        if(userId.length <= 2) return ['The name must be at least a 2 characters'];
        if ( typeof userId !== 'string') ["The Id must be a string"]
        //if(!email) return ['Missing email'];
        //if(email.length <= 8) return ['The email must be at least 10 characters'];
        //if ( typeof name !== 'string') ["The name must be a string"]
        
        //const paragraphs = content.split('/\n+/').filter(paragraphs =>paragraphs.trim().length > 0)
        //if(paragraphs.length < 2) return ["The content must be at least 2 paragraphs"] 
        return [undefined, new UpdateServicesDTO(userId)];
    }
}