const fs = require('fs');
const axios = require("axios");
require('dotenv').config();

async function chatgpt(message) {
    try {

        const inicio = performance.now(); // Registrar o tempo de início
        const axios = require("axios");
        const apiKey = "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";
        const endPoint = "https://api.openai.com/v1/chat/completions";
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: message,
                }
            ]
        };
        const requestHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        const response = await axios.post(endPoint, requestBody, { headers: requestHeaders });

        const fim = performance.now(); // Registrar o tempo de fim

        const tempoDeExecucao = fim - inicio; // Calcular o tempo de execução em milissegundos
        return JSON.stringify({
            time: `Tempo de execução: ${tempoDeExecucao / 1000} s`,
            response: response.data.choices[0].message.content
        }, null, 4)

    } catch (error) {
        console.log({
            error
        })
    }
}

module.exports = {
    chatgpt
}
