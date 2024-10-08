export class Login{
    token: string = '';
    rol: string = '';
    user: string = '';

    constructor(token: string, rol: string, user: string){
        this.token = token;
        this.rol = rol;
        this.user = user;
    }
}