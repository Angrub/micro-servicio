type Status = 'Pendiente' | 'Pagado' | 'Atrasado';

interface DebtSchema {
    user: string;
    date: Date;
    amount: number;
    status: Status;
}

export { Status, DebtSchema }