function customLog(message, fg = 33, bg = 0) {
    console.log('\x1b[' + fg + 'm' + message + ' \x1b[' + bg + 'm');
}
module.exports = {
    customLog
}
