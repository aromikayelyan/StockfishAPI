import express from "express";
import { spawn } from "child_process";
import { toFen } from "./utils/pgnToFen.js";

const app = express();
app.use(express.json());



app.post("/analyze", async (req, res) => {

  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

  if (!fen) return res.status(400).json({ error: "FEN required" });

  const engine = spawn("stockfish");

  let bestMove = null;

  engine.stdout.on("data", (data) => {
    const line = data.toString();
    console.log("Stockfish:", line);

    if (line.startsWith("bestmove")) {
      bestMove = line.split(" ")[1];
      res.json({ bestMove, fen: fen });
      engine.kill();
    }
  });

  engine.stdin.write("uci\n");
  engine.stdin.write("ucinewgame\n");
  engine.stdin.write(`position fen ${fen}\n`);
  engine.stdin.write("go depth 12\n");
});

app.listen(3000, () => console.log("Server running on port 3000"));