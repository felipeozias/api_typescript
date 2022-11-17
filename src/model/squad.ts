import StringValitador from "../validators/string-validator";
import UuidValidator from "../validators/uuid-validator";

export default class Squad {
    id: string | null;
    name: string | null;
    idLeader: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor() {
        this.id = null;
        this.name = null;
        this.idLeader = null;
        this.createdAt = null;
        this.updatedAt = null;
    }

    validate(): string | null {
        let result;
        if (this.id !== null) {
            result = UuidValidator.validator(this.id);
            if (result !== null) {
                return "id: " + result;
            }
        }
        result = StringValitador.validator(this.name, 3, 50);
        if (result !== null) {
            return "name: " + result;
        }

        result = UuidValidator.validator(this.idLeader);
        if (result !== null) {
            return "leader id: " + result;
        }

        return null;
    }
}
