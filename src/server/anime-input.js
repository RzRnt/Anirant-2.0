const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./storage/anime_db.json')
const anime_db = low(adapter)

anime_db.defaults(
    { 
        anime_details: []
    }
).write()

anime_db.get('anime_details')
    .push(
        { 
            title: "Asw",
            subber: "HorribleSubs",
            resolution: "1080p"
        }
    ).write()