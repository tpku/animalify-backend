import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// const configuration = new Configuration({
//     organization: "org-thvUGc7r2scw1qSDx9IMKlu3",
//     apiKey: process.env.OPENAI_API_KEY,
// });

console.log(configuration);

const openai = new OpenAIApi(configuration);
const port = process.env.PORT || 5500;

app.post("/ask", async (req, res) => {
    const prompt = req.body.prompt;

    try {
        if (prompt == null) {
            throw new Error("Shit hit the fan!");
        }

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            // model: "gpt-3.5-turbo",
            prompt,
            temperature: 0.8,
        });

        const completion = response.data.choices[0].text;

        return res.status(200).json({
            success: true,
            message: completion,
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => console.log(`Server is running on ${port}`));
