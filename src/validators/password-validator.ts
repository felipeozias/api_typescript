import StringValidator from "./string-validator"

export default class PasswordValidator extends StringValidator{

    public static override validator(data: any, minLength?: number, maxLength?: number): string | null {
        let result =  super.validator(data, minLength, maxLength);

        if( result != null){
            return "password: " + result;
        }

        const regex : RegExp = /^\w{6,}$/gim;

        if ( !regex.test(data)){
            return "invalid password";
        }

        return null;
    }



}