export class User{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    displayInfo(){
        console.log(`Name: ${this.username} Email: ${this.email}`);
    }
}