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
import UsersRoutes from "./routes/users";
import "dotenv/config";
import errorMiddleware from "./middlewares/errorMiddleware";
import { Server } from "socket.io";
import http from "http";
import { CustomRequest } from "./middlewares/authMiddleware";
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use((req: CustomRequest, res, next) => {
  req.io = io;
  next();
});

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
app.use("/api/users", UsersRoutes);

app.use(errorMiddleware);

// Handle the connection event
io.on("connection", (socket) => {
  console.log("a user connected");

  // You can set up other events here or in separate files

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
