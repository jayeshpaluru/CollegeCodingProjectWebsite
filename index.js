const fetch = require("isomorphic-fetch");

const API_KEY = "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"

async function getProjectIdea(userInput) {
    const endpoint = "https://api.openai.com/v1/engines/text-davinci-002/completions"

    const body = {
        prompt: userInput,
        max_tokens: 250,
        stop: "Project completed",
        temperature: 0.75
    }

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        if (json.choices && json.choices.length > 0) {
            return json.choices[0].text;
        } else {
            console.error('No project ideas found');
            return '';
        }
    } catch (err) {
        console.error(err);
    }
}

async function main() {
    const userInput = "I am a beginner coder and I want to create a project using java, what are some project ideas that I can work on?";
    const projectIdea = await getProjectIdea(userInput);
    console.log(projectIdea);
}

main();
