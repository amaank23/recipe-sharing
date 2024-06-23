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
import ChatsRoutes from "./routes/chat";
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

const onlineUsers = new Map();

app.use((req: CustomRequest, res, next) => {
  req.io = io;
  req.onlineUsers = onlineUsers;
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
app.use("/api/chats", ChatsRoutes);

app.use(errorMiddleware);

// Handle the connection event
io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle user joining (e.g., after login)
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("userOnline", userId);
    console.log(userId, " is online");

    // Emit current online users to the newly joined user
    socket.emit("currentOnlineUsers", Array.from(onlineUsers.keys()));
  });
  socket.on("join-chat", (chatId) => {
    // Add the user to the chat room
    socket.join(chatId);
  });
  socket.on("sendMessage", (message) => {
    console.log("hello");

    socket.to(message.chat.id).emit("newMessage", message);
  });

  // after user logged out
  socket.on("leave", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);

        console.log(userId, " is offline");
        io.emit("userOffline", userId);
        break;
      }
    }
    socket.emit("currentOnlineUsers", Array.from(onlineUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        io.emit("userOffline", userId);
        break;
      }
    }
    // Emit current online users to the  user
    socket.emit("currentOnlineUsers", Array.from(onlineUsers.keys()));
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
