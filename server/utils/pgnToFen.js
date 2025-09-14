import { Chess } from "chess.js";



export async function toFen(pgn) {
    try {
        const chess = new Chess();
        const ok = chess.loadPgn(pgn);
        if (!ok) return res.status(400).json({ error: "Invalid PGN" });
        const positionFen = chess.fen(); // последняя позиция из PGN

        return positionFen
    } catch (error) {
        console.log(error)
    }
}