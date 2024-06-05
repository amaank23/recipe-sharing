import "reflect-metadata";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger/config";
import { myDataSource } from "./app-data-source";
import AuthRouter from "./routes/auth";
import PostRouter from "./routes/posts";
import ProfilesRouter from "./routes/profiles";
import FriendsRouter from "./routes/friends";
import RecipesRouter from "./routes/recipes";
import "dotenv/config";
import errorMiddleware from "./middlewares/errorMiddleware";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// API ROUTES
app.use("/api/auth", AuthRouter);
app.use("/api/profiles", ProfilesRouter);
app.use("/api/posts", PostRouter);
app.use("/api/friends", FriendsRouter);
app.use("/api/recipes", RecipesRouter);

app.use(errorMiddleware);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
