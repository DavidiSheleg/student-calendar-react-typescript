import jwt_decode from "jwt-decode";

export const jwtIsExpired = (token: string) => {
    let decodedToken: any = jwt_decode(token);
    let currentDate = new Date();

    if (decodedToken?.exp * 1000 < currentDate.getTime())
        return true;

    return false;
}

