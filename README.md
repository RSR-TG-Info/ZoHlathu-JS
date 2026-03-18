# zohlathu

A Node.js package for fetching Mizo song lyrics from [www.zohlathu.in](https://www.zohlathu.in).

## Installation

You can install the package using npm:
```bash
npm install zohlathu
```

## Usage

Since fetching data is an asynchronous operation, use `async/await` or `.then()`.

```javascript
const { get_lyrics } = require('zohlathu');

async function fetchSong() {
    const song_name = "C. Sanga - Tawnmang Lasi"; // Replace with the requested song
    const lyrics = await get_lyrics(song_name); // Get the lyrics

    if (lyrics) {
        // Format the response
        const response = `${lyrics.title}\n\n${lyrics.lyrics}\n\nSource: ${lyrics.source_url}`;
        console.log(response);
    } else {
        console.log("Lyrics not found.");
    }
}

fetchSong();
```

### Response Object format
* `lyrics.title` = The title of the lyrics
* `lyrics.lyrics` = The lyrics content
* `lyrics.source_url` = The url of the original post

## Handle Errors

The function handles most errors internally and returns `null` if it fails. You can add your own `try...catch` block around the execution.

```javascript
const { get_lyrics } = require('zohlathu');

async function safeFetch() {
    try {
        const song_name = "C. Sanga - Tawnmang Lasi";
        const lyrics = await get_lyrics(song_name);
        
        if (lyrics) {
            console.log(`${lyrics.title}\n\n${lyrics.lyrics}\n\nSource: ${lyrics.source_url}`);
        }
    } catch (e) {
        console.error(`An error occurred: ${e.message}`);
    }
}

safeFetch();
```

**Requirements:** Node.js 14 or higher.
