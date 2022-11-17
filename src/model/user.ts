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
}
