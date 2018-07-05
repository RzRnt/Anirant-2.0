const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./storage/anime_db.json');
const anime_db = low(adapter);


class AnimeInput {

    insertAnimeToList(anime_details) {
        anime_db.get('anime_details').push({ 
            title: anime_details.title,
            subber: anime_details.subber,
            resolution: anime_details.resolution
        }).write()
    }

    deleteAnimeFromList(anime_details) {
        anime_db.get('anime_details').remove({
            title: anime_details.title,
            subber: anime_details.subber,
            resolution: anime_details.resolution
        }).write()
    }

    getAllAnimeOnList() {
        return anime_db.get('anime_details').value()
    }
}
module.exports = AnimeInput