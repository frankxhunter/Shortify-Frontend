import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { UserRegisterService } from "../services/user-register.service";


export const UserLoginResolver: ResolveFn<void> = ()=>{
    const userRegisterService = inject(UserRegisterService);
    return userRegisterService.checkUsername();
}