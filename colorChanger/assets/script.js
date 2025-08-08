const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach(function (button) {
    console.log(button);

    // Add a click event listener to each button
    button.addEventListener('click', function (e) {
        console.log(e);
        console.log(e.target);

        if (e.target.id === 'grey') {
            body.style.backgroundColor = '#808080';
        }
        if (e.target.id === 'white') {
            body.style.backgroundColor = '#ffffff';
        }
        if (e.target.id === 'blue') {
            body.style.backgroundColor = '#3498db';
        }
        if (e.target.id === 'yellow') {
            body.style.backgroundColor = '#ffd700';
        }
    });
});