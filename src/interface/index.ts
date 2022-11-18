interface IStatusResponse<T> {
    status: number;
    response: T;
}

interface IUserDataToken {
    userId: string;
    userEmail: string;
    userName: string;
    userAdmin: string;
    userFirstName: string;
    userLastName: string;
    squadName: any;
    squadId: string;
}

interface ILogin {
    email: string;
    password: string;
}

export { IStatusResponse, IUserDataToken, ILogin };
