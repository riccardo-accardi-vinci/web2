import express from "express";


import myMoviesRouter from "./routes/myMovies";
import textsRouter from './routes/texts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/myMovies", myMoviesRouter);
app.use('/texts', textsRouter);

export default app;
