console.log('Client Side Javascript is loaded');

fetch('http://puzzle.mead.io/puzzle')
    .then((response) => {
        response.json().then((data) => {
            console.log(data)
        })
    });

// Manipulating the DOM for the search input
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('p#message-1');
const messageTwo = document.querySelector('p#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = ''; 

    fetch('/weather?address='+encodeURIComponent(location))
    .then((response) => {

        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                // console.log(data.location);
                // console.log(data.forecast);
            }
        })
    })
})






