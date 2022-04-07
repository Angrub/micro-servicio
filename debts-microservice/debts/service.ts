import { Model } from 'mongoose'
import { DebtSchema } from './interfaces'
import { debtModel } from './model'

class DebtsService {

    model: Model<DebtSchema>

    constructor() {
        this.model = debtModel;
    }

    async findDebts(id: string, limit?: number) {
        const debts = await this.model.find({
            user: id,
        }).sort({date: -1}).limit(limit || 1);

        return debts;
    }

    async createDebts(debt: DebtSchema) {
        const newDebt = new this.model(debt);
        const _newDebt = await newDebt.save();
        return _newDebt;
    }
}

export { DebtsService }