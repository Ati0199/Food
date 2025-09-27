import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());


app.post("/support", (req, res) =>{

    return res.status(200).send({"message": "success"});
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});