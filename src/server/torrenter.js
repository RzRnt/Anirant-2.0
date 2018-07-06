const Transmission = require('transmission')
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
 
const transmission = new Transmission({
	port: config.TRANSMISSION_PORT,
	host: config.TRANSMISSION_HOST,
	username: config.TRANSMISSION_USERNAME,
	password: config.TRANSMISSION_PASSWORD
})

class Torrenter {

    addAnimeToTorrent(anime_not_downloaded){
        return new Promise((resolve, reject) => {
            anime_not_downloaded.forEach( anime => {
                transmission.addUrl(anime.link, (error, result) => {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    console.log(`Now Downloading: ${anime.title}`)
                })
            });
            resolve(anime_not_downloaded)
        })
    }

    checkIsDownloaded(anime_on_list) {
        return new Promise ( (resolve, reject) => {
            try {
                let anime_not_downloaded = anime_on_list
                anime_on_list.forEach( (anime, index) => {
                    transmission.get((err, result) => {
                        result.torrents.forEach( (torrent) => {
                           if(torrent.name === anime.title) {
                                anime_not_downloaded.splice(index, 1)
                                return;
                           }
                        })
                    });
                })
                if (anime_not_downloaded.length > 0) {
                    resolve(anime_not_downloaded)
                } else {
                    reject("No Updated Anime")
                }
            } catch (err) {
                return Promise.reject(err)
            }
        })
    }
}

module.exports = Torrenter