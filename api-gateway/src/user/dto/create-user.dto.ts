import { IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!:string 

    @IsPhoneNumber("UZ")
    phone!:string 

    @IsStrongPassword()
    password!:string

    
}