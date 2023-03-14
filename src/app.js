const readline = require('readline');
const { chatgpt } = require('./utils/chatgpt');
const { customLog } = require('./utils/customLog');


function initChat() {
    // Cria uma interface readline
    const rl = readline.createInterface({
        input: process.stdin,
        // output: process.stdout,
    });

    // Função que envia as mensagens

    let lastOpcao = ""
    let lastMessage = ""
    const askAndAnswer = []
    function sendMessage(opcao) {
        let responsePrevious = ""
        let _case = ""
        rl.question('', async (message) => {
            switch (message) {
                case '3': {
                    opcao = "3"
                    lastOpcao = "3"
                    break
                }
                case '1': {
                    opcao = "1"
                    lastOpcao = "1"
                    break
                }
                case '0': {
                    opcao = "0"
                    lastOpcao = "0"
                    break
                }
                case '2': {
                    opcao = "2"
                    //lastOpcao = "0"
                    break
                }
                case '5': {
                    opcao = "5"
                    lastOpcao = "5"
                    break
                }

                default: {
                    console.log({
                        lastOpcao,
                        opcao
                    })
                    if (message.length >= 1 && lastOpcao === "1") {
                        opcao = "2"
                        lastOpcao = "2"
                    } else if (message.length > 1 && lastOpcao === "3") {
                        opcao = "3"
                        lastOpcao = "3"
                    } else {
                        opcao = "n"
                    }
                    break
                }
            }
            switch (opcao) {
                case '1': {
                    console.log('\x1b[33m' + 'Digite sua mensagem' + ' \x1b[0m');
                    if (lastOpcao === "3") {
                        sendMessage('3');
                    } else {
                        sendMessage('2');
                    }
                    break
                }
                case '2': {
                    console.log("case => 2")
                    console.log(`Você: ${message}`);

                    console.log(`Aguardando respostas...`);
                    const response = await chatgpt(message)
                    const responseParse = JSON.parse(response)
                    lastMessage = responseParse.response
                    console.log(`time: ${responseParse.time}`);
                    //console.log(`Chat: ${responseParse.response}`);

                    console.log('\x1b[32m' + responseParse.response + ' \x1b[0m');

                    console.log('\x1b[33m' + "Escolha uma opção:" + ' \x1b[0m');
                    sendMessage('1');
                    break
                }
                case '3': {


                    if (message === "3") {
                        console.log("Digite sua mensagem:")
                        sendMessage('3');
                    } else {

                        console.log(`''''''''''''''`);
                        console.log(`LastMessage: ${lastMessage}`);

                        console.log(`Aguardando respostas...`);
                        const response = await chatgpt(`
                        ANTERIOR: "${lastMessage}"
                        NOVA: "${message}"
                    `)

                        const responseParse = JSON.parse(response)
                        lastMessage = responseParse.response
                        console.log(`time: ${responseParse.time}`);
                        console.log(`Chat: ${responseParse.response}`);
                        console.log("$".repeat(100))
                        console.log("Escolha uma opção:")

                        console.log('\x1b[33m' + 'Welcome to the app!' + ' \x1b[0m');

                        sendMessage('3');
                    }
                    break
                }
                case '0': {
                    process.stdout.write('\u001B[2J\u001B[0;0f')
                    console.log("Escolha uma opção:")
                    sendMessage('1');
                    break
                }
                case '5': {
                    console.log("Escolha uma opção:")
                    console.log(`
    [0] = limpar tela
    [1] = fazer uma nova pergunta
    [3] = aproveitar resposta anterior 
                `)
                    console.log('\x1b[33m Welcome to the app! \x1b[0m');

                    sendMessage('1');
                    break
                }
                default: {

                    customLog(`Ops! Opção inválida`, 45, 33);
                    customLog(`Escolha uma opção:`, 31, 41);
                    sendMessage('3');

                    break;
                }
            }
        });
    }

    // Inicia o chat
    console.log(`Bem-vindo ao chat! 
Escolha uma opção:`);
    sendMessage('1');
}

module.exports = {
    initChat
}
