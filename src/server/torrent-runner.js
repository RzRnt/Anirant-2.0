const animeParser = require('./anime-parser');
const torrenter = require('./torrenter')


class TorrentRunner {

    constructor(){
        this.anime_parser = new animeParser();
        this.torrenter = new torrenter();
    }

    runTorrentBox(){
        Promise.resolve().then(() => {
            console.log("Torrent Runner is Running")
            return this.anime_parser.parseAnimeFeed();
        }).then(anime_feeds => {
            return this.anime_parser.getAnimeOnList(anime_feeds);
        }).then(anime_on_list => {
            return this.torrenter.checkIsDownloaded(anime_on_list)
        }).then(anime_not_downloaded => {
            return this.torrenter.addAnimeToTorrent(anime_not_downloaded)
        }).catch( err => {
            console.log("Torrent Runner Failed to Run: ", err);
        })
    }
}

module.exports = TorrentRunner