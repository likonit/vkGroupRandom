// файл записи
const DATA_FILE = 'dataBest.txt'

const express = require("express"), app = express(), readline = require("readline"),
      fs = require("fs")

function add() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question('Добавь любимую группу: ', (ans) => {
        fs.readFile(DATA_FILE, 'utf8', (err, dt) => {
            if (err) {console.log('Произошла какая-то фигня с ошибкой: ') + err; return}
            fs.writeFile(DATA_FILE, dt+ans+"\n", (err) => {
                if (err) {console.log('Произошла какая-то фигня с ошибкой: ') + err; return}
                rl.close(); add()
            })
        })
    })
}

app.listen(3000, add)