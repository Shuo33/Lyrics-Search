const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// Route URL
const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
    const rep = await fetch(`${apiURL}/suggest/${term}`); 
    const data = await rep.json(); 
    // console.log(data);

    showData(data);
}

// Display song & artist to DOM
// function showData(data) {
    
// }

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim(); 

    if (!search.value.trim()) {
        alert('please enter a search term');
    } else {
        searchSongs(searchTerm); 
    }
}); 

