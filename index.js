const torrentBox = require("./src/server/torrent-runner")
const express = require("express");
const path = require('path');
const route = require("./src/server/app");
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const torrent_box = new torrentBox()
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'index',
    layoutsDir: path.resolve(__dirname  + '/src/client')
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname  + '/src/client'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",express.static("src/client"));
app.use(route);

app.listen(config.ANIRANT_PORT, () => {
    console.log(`Torrent Box Is Running on Port ${config.ANIRANT_PORT}`)
});

setInterval(() => {
    torrent_box.runTorrentBox()
}, 10 * 60 * 1000);
