export default class StringValidator {
    public static validator(data: any, minLength?: number, maxLength?: number): string | null {
        if (typeof data !== "string") {
            return "type is not string";
        }
        if (minLength && data.length < minLength) {
            return "string is too short";
        }
        if (maxLength && data.length > maxLength) {
            return "string is too long";
        }
        return null;
    }
}
