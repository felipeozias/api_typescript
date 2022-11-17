import ConnectDB from "../database";
import Models from "./models";

class UsersModels extends Models {
    constructor() {
        super("users", new ConnectDB());
    }

    public async getOneByEmail() {}
}
