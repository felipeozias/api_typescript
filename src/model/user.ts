import EmailValidator from "../validators/email-validator";
import PasswordValidator from "../validators/password-validator";
import StringValidator from "../validators/string-validator";
import UuidValidator from "../validators/uuid-validator";

export default class User {
    id: string | null;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    password: string | null;
    type: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    idSquad: string | null;

    constructor() {
        this.id = null;
        this.username = null;
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.password = null;
        this.type = null;
        this.createdAt = null;
        this.updatedAt = null;
        this.deletedAt = null;
        this.idSquad = null;
    }


    validate(): string | null {
        let result;
        if (this.id !== null) {
            result = UuidValidator.validator(this.id);
            if (result !== null) {
                return "id: " + result;
            }
        }
        result = StringValidator.validator(this.username, 3, 80);
        if (result !== null) {
            return "username: " + result;
        }

        result = StringValidator.validator(this.firstName, 3, 80);
        if (result !== null) {
            return "firstName: " + result;
        }

        result = StringValidator.validator(this.lastName, 3, 80);
        if (result !== null) {
            return "lastName: " + result;
        }

        result = EmailValidator.validator(this.email, 3, 80);
        if (result !== null) {
            return "email: " + result;
        }

        result = PasswordValidator.validator(this.password, 3, 80);
        if (result !== null) {
            return "password: " + result;
        }


        return null;
    }




}
