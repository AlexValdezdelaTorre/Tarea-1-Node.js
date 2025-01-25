

export class UpdateServicesDTO {
    constructor(
        public id: string,
        
     ){}

    static create(object: { [key: string]: any }): [string?, UpdateServicesDTO?]{
        const { id } = object;

        if(!id) return ['Service not found', undefined];
       
        return [undefined, new UpdateServicesDTO(id)];
    }
}