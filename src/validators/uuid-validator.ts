import { validate } from "uuid";

export default class UuidValidator {
    public static validator(uuid: any): string | null {
        if (typeof uuid !== "string") {
            return "type is not uuid";
        }
        if (!validate(uuid.toString())) {
            return "Invalid uuid";
        }
        return null;
    }
}
