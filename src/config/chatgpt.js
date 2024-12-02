import OpenAI from "openai";


const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true});

async function run(prompt) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

export default run; 