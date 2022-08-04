import { Router } from 'express';

const router = Router();

router.post('/test', (req, res) => {
    console.log("Test Used")
    res.json({
        message: 'Hello World'
    })
});

export default router;