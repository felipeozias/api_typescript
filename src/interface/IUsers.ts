interface IUsers {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    is_admin: isAdmin;
    created_at?: Date;
    updated_at?: Date | null;
    deleded_at?: Date | null;
    deleted: boolean;
    squad_id?: string;
}

enum isAdmin {
    ADMIN = "admin",
    LEADER = "leader",
    EMPLOYEES = "employees",
}

export default IUsers;
