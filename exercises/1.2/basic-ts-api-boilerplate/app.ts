import express from "express";


import myMoviesRouter from "./routes/myMovies";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/myMovies", myMoviesRouter);

export default app;
