const fs = require('fs');
const Parser = require('rss-parser');
const animeInput = require('./anime-input')
const parser = new Parser();
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));


class AnimeParser {

    constructor() {
        this.anime_input = new animeInput();
    } 
    parseAnimeFeed() {
        return new Promise((resolve, reject) => {
            try {
                parser.parseURL(config.NYAA_RSS_FEED_URL, (err, feed)  => {
                    if (err) {
                        console.log("Failed to Parse Nyaa Feed")
                        return reject(err)
                    }
                    resolve(feed.items)
                })
            } catch(err) {
                return Promise.reject(err)
            }
        })
    }

    getAnimeOnList(feeds) {
        return new Promise((resolve, reject) => {
            try {
                let on_list_anime = []
                feeds.forEach( feed => {
                    let anime_details = this.animeTitleParser(feed.title)
                    let findAnime = this.anime_input.findAnimeOnList(anime_details)
                    if ( findAnime !== undefined) {
                        on_list_anime.push(feed)
                    }
                });
                if (on_list_anime.length > 0) {
                    resolve(on_list_anime)
                } else {
                    reject("No Updated Anime")
                }
            } catch(err) {
                return Promise.reject(err)
            }
        })
    }

    animeTitleParser(title) {
        try {
            let AnimeSubber = title.match(/^\[.*?\]/g).toString();
            let AniEp = title.replace(AnimeSubber, '').replace('_', ' ').match(/\S.*?-\s?\w{1,}?\s?\d{1,}/g).toString();
            let AnimeTitle = AniEp.substring(0, AniEp.lastIndexOf('-')).toString().replace(/\s+$/, '');
            let AnimeEpisode = AniEp.toString().substring(AniEp.lastIndexOf('-')+1, AniEp.length).toString();
            let AnimeResolution = title.match(/\d{1,}p/g) != null ? title.match(/\d{1,}p/g).toString() : '720p';
            let AnimeType = title.match(/(BD|Blu-Ray|DVD)/g) != null ? title.match(/(BD|Blu-Ray|DVD)/g).toString() : 'TV Series';
            let AnimeFormat = title.match(/\.(\w{1,}|\d{1,})$/g) != null ? title.match(/\.(\w{1,}|\d{1,})$/g).toString() : '.mkv';
        
            let anime = {
              subber: AnimeSubber,
              title:  AnimeTitle,
              episode: AnimeEpisode,
              resolution: AnimeResolution,
              type: AnimeType,
              format: AnimeFormat
            };

            return anime;
        
          } catch(e){
              return `Regex Failed, Error: ${e}`
          }
    }
}

module.exports = AnimeParser;
