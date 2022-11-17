import { validate } from "uuid";

export default class UuidValidator {
    public static validator(uuid: String): string | null {
        if (!validate(uuid.toString())) {
            return "Invalid uuid";
        }
        return null;
    }
}
