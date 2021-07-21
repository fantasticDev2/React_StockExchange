export interface ICreateUser {
    userName: string;
    password: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    roleId: 1,
    pic: string;
    firstName: string;
    lastName: string;
    fullname: string;
    occupation: string;
    companyName: string;
    phone: string;
    address: {
        addressLine: string;
        city: string;
        state: string;
        postCode: string;
    },
    socialNetworks: {
        linkedIn: string;
        facebook: string;
        twitter: string;
        instagram: string;
    },
    workspaceIds: number[]
}
