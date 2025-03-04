import express from "express";
import { AppDataSource } from "../data-source"
import jwtMiddleware from "./middleware";
import { User } from "./entity/user";
import FailureResult from "./core/results/failure-result";
import SuccessResult from "./core/results/success-result";
import { instanceToPlain } from "class-transformer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Chat } from "./entity/chat";
import { Message } from "./entity/message";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET_KEY;
if(!SECRET_KEY) {
    console.error("JWT secret key not provided!");
    process.exit(1);
}

const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.info("Database connected!");

        const router = express.Router();

        router.post("/auth/login", async (req, res) => {
            const { email, password } = req.body;
            if(!email || !password) {
                const response = new FailureResult("Email and password are required");
                res.status(400).send(response);
                return;
            }
            const user = await AppDataSource.getRepository(User).findOneBy({ email });
            if(user != null && await bcrypt.compare(password, user.password)) {
                const payload = { email: user.email };
                const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
                const response = new SuccessResult("Login Successfull! Redirecting to main page...", { token, user: instanceToPlain(user) });
                res.status(200).send(response);
                return;
            }
            const response = new FailureResult("Invalid password!");
            res.status(400).send(response);
        })

        router.post("/auth/create-account", async (req, res) => {
            const { firstName, lastName, email, password, birthDate } = req.body;
            if(!firstName || !lastName || !email || !password || !birthDate) {
                const response = new FailureResult("All fields are required");
                res.status(400).send(response);
                return;
            }
            const userExists = await AppDataSource.getRepository(User).findOneBy({ email });
            if(userExists) {
                const response = new FailureResult("Email already exists");
                res.status(400).send(response);
                return;
            }
            const user = new User(firstName, lastName, email, password, birthDate);
            await AppDataSource.getRepository(User).save(user);
            const response = new SuccessResult("Account created successfully!", instanceToPlain(user));
            res.status(201).send(response);
        })

        router.get("/chats", jwtMiddleware, async (req, res) => {
            const { email } = req.body;
            const user = await AppDataSource.getRepository(User).findOneBy({ email });
            if(user == null) {
                const response = new FailureResult("User not found");
                res.status(404).send(response);
                return;
            }
            const chats = await AppDataSource.getRepository(Chat).findBy({ user });
            const response = new SuccessResult("Chats retrieved successfully!", chats);
            res.status(200).send(response);
        })

        router.post("/auth/token-check", jwtMiddleware, async (req, res) => {
            const response = new SuccessResult("Token is valid");
            res.status(200).send(response);
        })

        router.post("/chat", jwtMiddleware, async (req, res) => {
            const { chatId, message } = req.body;

            const queryRunner = AppDataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                let chat: Chat | null = null;
                if(chatId) {
                    chat = await AppDataSource.getRepository(Chat).findOneBy({ id: Number(chatId) });
                }

                if(!chat) {
                    const user = await AppDataSource.getRepository(User).findOneBy({ email: req.body.email });
                    if(user == null) {
                        const response = new FailureResult("User not found");
                        res.status(404).send(response);
                        return;
                    }
                    chat = AppDataSource.getRepository(Chat).create({
                        user,
                        messages: []
                    });
                    chat = await AppDataSource.getRepository(Chat).save(chat);
                }

                const response = (await axios.post("http://localhost:11434/api/generate", {
                    model: "deepseek-r1:14b",
                    prompt: message,
                    stream: false
                })).data.response;

                const _message = AppDataSource.getRepository(Message).create({
                    chat,
                    message: message ?? "",
                    response: response ?? ""
                })
                
                chat.messages.push(_message);
                await AppDataSource.getRepository(Chat).save(chat);
                await AppDataSource.getRepository(Message).save(_message);
                
                await queryRunner.commitTransaction();

                const result = new SuccessResult("Message sent successfully!", _message);
                res.status(200).send(result);
            } catch(err:any) {
                await queryRunner.rollbackTransaction();
                const response = new FailureResult(err.message);
                res.status(500).send(response);
            } finally {
                await queryRunner.release();
            }
        })

        app.use("/api", router);

        app.listen(Number(PORT), HOST, () => {
            console.info(`Server running on port ${PORT}...`);
        });
    })