console.log('client side JS file loaded');

const weatherForm = document.querySelector('form');
const searchBoxContent = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    messageOne.textContent = "";
    messageTwo.textContent = "";
    if(!searchBoxContent.value) { return alert('Please Enter Location'); }
    messageOne.textContent = "Loading...";
    fetch('http://localhost:3000/weather?location='+searchBoxContent.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageTwo.textContent = "";
                return messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.weather;
                return messageTwo.textContent = data.location;
            }
        });
    });
});