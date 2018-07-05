const Transmission = require('transmission')
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
 
const transmission = new Transmission({
	port: 4800,
	host: '192.168.0.103',
	username: 'Mashumaro',
	password: 'bastard'
})

class Torrenter {

    addAnimeToTorrent(anime_not_downloaded){
        return new Promise((resolve, reject) => {
            anime_not_downloaded.forEach( anime => {
                transmission.addUrl(anime.link, (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                })
            });
            resolve(anime_not_downloaded)
        })
    }

    checkIsDownloaded(anime_on_list) {
        return new Promise ( (resolve, reject) => {
            try {
                let anime_not_downloaded = anime_on_list
                let promises = []
                anime_on_list.forEach( (anime, index) => {
                    promises.push(transmission.get((err, result) => {
                        result.torrents.forEach( (torrent) => {
                           if(torrent.name === anime.title) {
                                anime_not_downloaded.splice(index, 1)
                                return;
                           }
                        })
                    }));
                })
                Promise.all(promises).then(()=>{
                    console.log(anime_not_downloaded)
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