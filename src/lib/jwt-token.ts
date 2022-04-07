import Jwt from "jsonwebtoken";

interface Payload {
    sub: string;
}

function signToken(payload: Payload, secret: string) {
    return Jwt.sign(payload, secret);
}

function verifyToken(token: string, secret: string) {
    return Jwt.verify(token, secret);
}

export { signToken, verifyToken }