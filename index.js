const Parser = require('rss-parser');
const { htmlToText } = require('html-to-text');
const ytSearch = require('yt-search');

/**
 * Fetch lyrics for the given song query
 * * @param {string} query - Song name or artist to search for
 * @returns {Promise<Object|null>} - Dictionary containing title and lyrics, or null if not found
 */
async function get_lyrics(query) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (!query || typeof query !== 'string') {
        console.error("Input validation error: Invalid search query. Must be a non-empty string.");
        return null;
    }

    const base_url = "https://www.blogger.com/feeds/690973182178026088/posts/default";
    let feed_url = "";

    try {
        const results = await ytSearch(query);
        const videos = results.videos;

        if (!videos || videos.length === 0) {
            console.log(`No YouTube results found for query: ${query}`);
            return null;
        }

        const titlep = videos[0].title.substring(0, 100);
        const search_query = titlep.replace(/ /g, '+');
        feed_url = `${base_url}?q=${search_query}`;

    } catch (youtube_error) {
        console.error(`Youtube error: ${youtube_error}`);
        return null;
    }

    try {
        const parser = new Parser({
            customFields: {
                item: ['content']
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'application/atom+xml,text/html'
            }
        });


        const feed = await parser.parseURL(feed_url);

        if (!feed.items || feed.items.length === 0) {
            console.log(`No entries found in feed for query: ${query}`);
            return null;
        }

        const entry = feed.items[0];


        let content = htmlToText(entry.content, {
            wordwrap: false,
            preserveNewlines: true
        });


        const pattern = /\* \* \*[\s\S]*?\* \* \*/g;
        const cleaned_content = content.replace(pattern, '').trim();

        return {
            title: entry.title,
            lyrics: cleaned_content,
            source_url: entry.link
        };

    } catch (feed_error) {
        console.error(`Feed parsing or Unexpected error: ${feed_error}`);
        return null;
    }
}

module.exports = { get_lyrics };
