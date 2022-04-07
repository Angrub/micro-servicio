import bcrypt from 'bcrypt';

async function createHashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

async function verifyPassword(hash: string, password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

export { createHashPassword, verifyPassword }