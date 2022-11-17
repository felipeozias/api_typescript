import { validate } from 'uuid';
import StringValidator from "./string-validator"

export default class EmailValidator extends StringValidator{

    public static override validator(data: any, minLength?: number, maxLength?: number): string | null {
        let result =  super.validator(data, minLength, maxLength);

        if( result != null){
            return "email: " + result;
        }

        const regex : RegExp = /^(\w{1,}\@\w{1,}\.\w{3}(\.\w{2}){0,1})$/gim;

        if ( !regex.test(data)){
            return "invalid email";
        }

        return null;
    }



}