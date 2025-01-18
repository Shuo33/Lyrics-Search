const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// Route URL
const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`); 
    const data = await res.json(); 

    // console.log(data);

    showData(data);
}

// Display song & artist to DOM
function showData(data) {
    result.innerHTML = `
    <ul class="songs">
    ${data.data.map(song =>
        `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`
    ).join('')}
    </ul>
    `;

    // if there's next page or prev page ... 
    if (data.prev || data.next) {
        more.innerHTML = `
        ${
            data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ''
        }
        ${
            data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ''
        }
        `;
    } else {
        more.innerHTML = '';
    }
}

// Get prev & next page songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json(); 

    showData(data);
}


// Get lyrics for a song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    // console.log(data);

    // r = return, n = newline, g = global scope search
    // if any letter r and letter n, or, letter r, or letter n, has been found in the global scope, replace them with a break 

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;

    more.innerHTML = ''; 
}

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim(); 

    if (!searchTerm) {
        alert('please enter a search term');
    } else {
        searchSongs(searchTerm); 
    }
}); 

//Get lyrics button click
result.addEventListener('click', e => {
    const clickedEl = e.target; 

    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
});
