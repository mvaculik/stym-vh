import express from 'express';
import { downloadGame, getUserLibrary } from '../controllers/gameController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route pro stažení hry a přidání do knihovny
router.post('/download/:userId/:gameId', authMiddleware, (req, res) => {
    downloadGame(req, res).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Neočekávaná chyba.' });
    });
});


// Route pro získání knihovny uživatele
router.get('/library/:userId', authMiddleware, (req, res) => {
    getUserLibrary(req, res).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Neočekávaná chyba.' });
    });
});

export default router;
