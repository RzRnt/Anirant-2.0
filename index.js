const torrentBox = require("./src/server/torrent-runner")
const torrent_box = new torrentBox()
const express = require("express");
const app = express();
const path = require('path');
const port = 2350;
const route = require("./src/server/app");
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');

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
app.listen(port, () => {
    console.log(`Torrent Box Is Running on Port ${port}`)
});

var minutes = 0.25;
var the_interval = minutes * 60 * 1000;
setInterval(() => {
    torrent_box.runTorrentBox()
}, the_interval);
