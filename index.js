// файл записи
const DATA_FILE = 'data.txt'

const express = require("express"), app = express(), req = require("request"), 
      cheerio = require("cheerio"), fs = require("fs")

function getGroup() {
    var r = Math.round(Math.random() * 200000000) + 1, // случайная группа
        l = `https://vk.com/club${r}`, type = 0,
        t = 'Произошла какая-то фигня с ошибкой: ',
        c = console.log

    req(l, (err, res) => {
        c(l); if (err) throw err
            else {
                var $ = cheerio.load(res.body)
                $('a').each((i, item) => {
                    if ($(item).text() === 'Чтобы вступить в группу, Вам необходимо войти.') type = 1
                })
                if ($('div .wall_item').length === 0) {c('Пустая группа, перезапуск'); getGroup(); return}
                if (type === 0) {c('Закрытая группа, перезапуск'); getGroup()}
                    else {
                        fs.readFile(DATA_FILE, 'utf8', (err, dt) => {
                            if (err) {c(t + err); return}
                            let d = dt == null ? [] : dt, h = $('div .wall_item').length,
                                w = d+l+ ` (постов: ${h === 5 ? 'много' : h})` + ' : '+$('h2').text().trim()+"\n"
                            fs.writeFile(DATA_FILE, w, (err) => {
                                if (err) {c(t + err); return}
                                c('Файл записан, продолжаю...'); getGroup()
                            })
                        })
                    }
                
            }
    })
}

app.listen(3000, getGroup)