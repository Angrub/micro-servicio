import { Router } from "express";
import { DebtsService } from "./service";

const router = Router();
const Controller = new DebtsService();

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit } = req.query;
        const debt = await Controller.findDebts(id, Number(limit));
        res.json({ data: debt });
    } catch(error) {
        res.status(500).json({ error });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const debt = await Controller.createDebts(req.body);
        res.status(201).json({ data: debt });
    } catch(error) {
        res.status(500).json({ error });
    }
});

const debtRouter = router;
export { debtRouter }