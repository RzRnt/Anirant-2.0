const express = require('express');
const anime_parser = require('./server/anime-parser');


class AppRunner {
    let app = express();
    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(3000, () => 
        Promise.resolve
            .then() => {
                anime_parser
            }
        )
}

module.exports = AppRunner;