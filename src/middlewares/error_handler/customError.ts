class CustomError extends Error {
    message: string;
    status: number;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status || 500;
        this.message = message;
    }
}

export { CustomError }