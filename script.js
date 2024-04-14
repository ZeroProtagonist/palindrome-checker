function isPalindrome(str) {
    var normalizedStr = str.replace(/[\W_]/g, '').toLowerCase();
    var reversedStr = normalizedStr.split('').reverse().join('');
    return normalizedStr === reversedStr;
}

const noteFrequencies = {
    'C': 261.63, // C4
    'D': 293.66, // D4
    'E': 329.63, // E4
    'F': 349.23, // F4
    'G': 392.00, // G4
    'A': 440.00, // A4
    'B': 493.88  // B4
};

function playScale(notes) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let now = audioCtx.currentTime;
    let noteDuration = 0.5; // duration of each note in seconds

    let currentTime = now;
    notes.toUpperCase().split('').forEach((note, index) => {
        if (noteFrequencies[note]) {
            let oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = noteFrequencies[note];
            oscillator.connect(audioCtx.destination);

            let duration = note === 'B' ? noteDuration * 2 : noteDuration;
            oscillator.start(currentTime);
            oscillator.stop(currentTime + duration);
            currentTime += duration;
        }
    });

    setTimeout(() => {
        audioCtx.close();
    }, (currentTime - now) * 1000 + 500); // Ensure all notes are played
}

var anticipationGifs = [
    "Gifs_Anticipation/Ant_01.gif",
    "Gifs_Anticipation/Ant_02.gif",
    "Gifs_Anticipation/Ant_03.gif"
];

var palindromeGifs = [
    "Gifs_celebrate/Cel_01.gif",
    "Gifs_celebrate/Cel_02.gif",
    "Gifs_celebrate/Cel_03.gif"
];

var nonPalindromeGifs = [
    "Gifs_OhWell/OW_01.gif",
    "Gifs_OhWell/OW_02.gif",
    "Gifs_OhWell/OW_03.gif"
];

document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById("text-input");
    var button = document.getElementById("check-btn");
    var resultDiv = document.getElementById("result");
    var gifDisplay = document.getElementById("gif-display");

    function showGifFrom(array) {
        var randomGif = array[Math.floor(Math.random() * array.length)];
        gifDisplay.src = randomGif;
        gifDisplay.style.display = 'block'; // Ensure the GIF is visible
    
        // Set a timeout to hide the GIF after 6 seconds
        setTimeout(() => {
            gifDisplay.style.display = 'none'; // Hide the GIF
        }, 6000); // 6000 milliseconds equals 6 seconds
    }
    
    function performCheck() {
        var inputValue = input.value.trim();
        if (inputValue === "") {
            alert("Please input a value");
        } else {
            // Show the anticipation GIF immediately.
            showGifFrom(anticipationGifs); 
            resultDiv.textContent = "Calculating..."; // Display 'Calculating...' during anticipation.
    
            // After the initial 3 seconds of anticipation...
            setTimeout(() => {
                var isPalin = isPalindrome(inputValue);
                var message = `${inputValue} is${isPalin ? '' : ' not'} a palindrome.`;
                resultDiv.textContent = message; // Update result after the 3 seconds of calculation.
    
                // Show the appropriate GIF based on the palindrome result.
                showGifFrom(isPalin ? palindromeGifs : nonPalindromeGifs); 
    
                // Wait 6 seconds after showing the result GIF, then update the message.
                setTimeout(() => {
                    resultDiv.textContent = "Would you like to try another one?";
                    gifDisplay.style.display = 'none'; // Make sure to hide the GIF.
                }, 6000); // This timeout matches the display duration of the GIF.
    
                if (inputValue.toUpperCase().replace(/[\W_]/g, '') === "CDEFGABAGFEDC") {
                    playScale(inputValue); // Optionally play the scale, this does not affect timing.
                }
    
            }, 3000); // This is the delay for the 'Calculating...' and anticipation GIF.
        }
    }
    
    function showGifFrom(array) {
        var randomGif = array[Math.floor(Math.random() * array.length)];
        gifDisplay.src = randomGif;
        gifDisplay.style.display = 'block'; // Ensure the GIF is visible.
    }
    
    
    
    

    button.addEventListener("click", performCheck);

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            performCheck();
            event.preventDefault(); // Prevent form submission
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var currentYear = new Date().getFullYear(); // Gets the current year
    document.getElementById('current-year').textContent = currentYear; // Sets the current year in the footer
});



