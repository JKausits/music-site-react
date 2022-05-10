import * as Yup from "yup";
import jwtDecode from "jwt-decode";

interface JwtPayload {
    sub: string;
    exp: number;
}

export class AuthenticatedUserDto {
    id: string;
    expiration: number;

    constructor(token: string) {
        const decoded = jwtDecode<JwtPayload>(token);
        this.id = decoded.sub;
        this.expiration = decoded.exp;
    }

    public isExpired() {
        return this.expiration * 1000 < Date.now();
    }
}

export class UserLoginRequestDto {
    email: string = "";
    password: string = "";

    public static getSchema() {
        return Yup.object().shape({
            email: Yup.string().label("Email").required().email(),
            password: Yup.string().label("Password").required(),
        });
    }
}

export class UserRegistrationRequestDto {
    email: string = "";
    password: string = "";
    passwordConfirmation: string = "";
    firstName: string = "";
    lastName: string = "";

    public static getSchema() {
        return Yup.object().shape({
            email: Yup.string().label("Email").required().email(),
            password: Yup.string().label("Password").required(),
            passwordConfirmation: Yup.string()
                .label("Password Confirmation")
                .required(),
            firstName: Yup.string().label("First Name").required().max(100),
            lastName: Yup.string().label("Last Name").required().max(100),
        });
    }
}
