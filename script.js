const games = [
  {
    id: "scheduleI",
    title: "Schedule I",
    image: "/Logos/s1.png",
    description: "You're a small-time drug dealer rolling into a fresh town with no cash, no product and no connections. Build your drug empire from the ground up in the grungy west-coast city of Hyland Point. Contend against intensifying law enforcement and deadly cartel competitors to expand your empire and reach the peak of the underworld.",
    requirements: [
      "OS: Windows 10 (64-bit)",
      "Processor: 3GHz 4-Core or similar",
      "Memory: 8 GB RAM",
      "Graphics: GeForce GTX 1060 or Radeon RX 580",
      "Storage: 8 GB available space"
    ],
    downloadLinks: [
      { label: "MediaFire", url: "https://www.mediafire.com/file/hld2ers7bpqny8c/Schedule.I+MP.zip/file" },
      { label: "Mega", url: "https://mega.nz/file/2UkQxKjJ#z-yL0qrNFMVm8im7Rc-2QTdQcNeBgJDYOEW3KG2eM5A" }
    ]
  },
  {
    id: "mysumercar",
    title: "My Summer Car",
    image: "/Logos/msc.png",
    description: "MY SUMMER CAR is the ultimate car owning, building, fixing, tuning, maintenance AND permadeath life survival simulator. You start the game with hundreds of loose parts and assemble both car and engine. Not only you need to maintain your car, but yourself as well. Sausages, beer and sleeping will do just fine.",
    requirements: [
      "64bit versions of Windows 7, Windows 8, Windows 10",
      "Processor: 3GHz 4-Core or similar",
      "Memory: 6 GB RAM",
      "Graphics: Nvidia GTX 960 or AMD equivalent",
      "Storage: 1 GB available space"
    ],
    downloadLinks: [
      { label: "MediaFire", url: "https://www.mediafire.com/file/bsnb1rou0ltmbdo/My.Summer.Car+MP.zip/file" },
      { label: "Mega", url: "https://mega.nz/file/adc0CTgR#0d3mvfEZYbO9J2h42oCp7Z6fEj_wK52f_lkO-PiDqOE" }
    ]
  },
  {
    id: "thelongdrive",
    title: "The Long Drive",
    image: "/Logos/tld.png",
    description: "This is a road trip game in an almost infinite random generated desert. The focus is on freedom, driving, exploration and immersion. It has minimal car maintenance and survival elements.",
    requirements: [
      "OS: Windows 10 (64-bit)",
      "Processor: 3 GHZ dual core processor",
      "Memory: 4 GB RAM",
      "Graphics: Nvidia GTX 650 TI or AMD equivalent",
      "Storage: 700 MB available space"
    ],
    downloadLinks: [
      { label: "MediaFire", url: "https://www.mediafire.com/file/nhif4yn0cbxlaok/The.Long.Drive+MP.zip/file"},
      { label: "Mega", url: "https://mega.nz/file/GEFC1AyB#VYCvdu5b0QSNCl9o8kXp6BBd-1yTP1rh_t8Um0aFMOc" }
    ]
  },
  {
    id: "comingsoon",
    title: "Coming Soon!",
    image: "/Logos/bigfoot.png",
    description: "???",
    requirements: [
      "???",
      "???",
      "???",
      "???",
      "???"
    ],
    downloadLinks: [
      { label: "Mega", url: "https://mega.nz/file/fYNRCbpS#LKsAr0tqYGuB_So3wpfBNXRT4zPscmyZwzNxkLEO5Ik"},
      { label: "???", url: "/index.html" }
    ]
  },
];

const gameList = document.getElementById('gameList');
const searchBar = document.getElementById('searchBar');
const popupContainer = document.createElement('div');
popupContainer.id = 'comingSoonPopup';
popupContainer.className = 'popup hidden';
popupContainer.innerHTML = `
  <div class="popup-content">
    <h2 class="popup-title">COMING SOON!</h2>
    <button class="close-button">X</button>
    <p class="popup-message">This game is coming soon and cannot be downloaded yet.</p>
    <p class="popup-countdown">Closing in <span id="countdown">10</span>...</p>
  </div>
`;
document.body.appendChild(popupContainer);

const closePopupButton = popupContainer.querySelector('.close-button');
const countdownSpan = popupContainer.querySelector('#countdown');
let popupTimeout;
let countdownInterval;
const popupDuration = 10; // seconds

function updateCountdown() {
  let timeLeft = parseInt(countdownSpan.textContent, 10);
  timeLeft--;
  countdownSpan.textContent = timeLeft;
  if (timeLeft <= 0) {
    closePopup();
  }
}

function showComingSoonPopup() {
  popupContainer.classList.remove('hidden');
  countdownSpan.textContent = popupDuration;
  clearInterval(countdownInterval);
  clearTimeout(popupTimeout);

  countdownInterval = setInterval(updateCountdown, 1000);
  popupTimeout = setTimeout(closePopup, popupDuration * 1000);
}

function closePopup() {
  popupContainer.classList.add('hidden');
  clearInterval(countdownInterval);
  clearTimeout(popupTimeout);
}

closePopupButton.addEventListener('click', closePopup);

function renderGames(filter = "") {
  gameList.innerHTML = "";
  const filtered = games.filter(game =>
    game.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    gameList.innerHTML = "<p>No games found.</p>";
    return;
  }

  filtered.forEach(game => {
    const card = document.createElement('div');
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <div class="content">
        <h2>${game.title}</h2>
        <a href="${game.id === 'comingsoon' ? '#' : `game.html?game=${game.id}`}" class="download-btn ${game.id === 'comingsoon' ? 'coming-soon-download' : ''}">Download</a>
      </div>
    `;
    gameList.appendChild(card);
  });

  // Add event listener specifically for the "Coming Soon!" download buttons
  const comingSoonButtons = document.querySelectorAll('.download-btn.coming-soon-download');
  comingSoonButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      showComingSoonPopup();
    });
  });
}

searchBar.addEventListener('input', (e) => {
  renderGames(e.target.value);
});

renderGames();

// Help modal logic
const helpButton = document.getElementById("helpButton");
const helpModal = document.getElementById("helpModal");
const closeModal = document.getElementById("closeModal");

helpButton.addEventListener("click", () => {
  helpModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  helpModal.classList.add("hidden");
});

// Close modal if clicked outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === helpModal) {
    helpModal.hidden = true;
  }
});

// Updated CSS for the popup to match the website theme and the provided image style
const style = document.createElement('style');
style.textContent = `
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: #1a1a1a; Remove background */
    color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    z-index: 1000;
    box-shadow: 0 0 20px #00ffc8aa; /* Green glow */
    max-width: 400px; /* Adjust width */
    width: 90%;
    text-align: center;
    border: 2px solid #00ffc8; /* Green outline */
    background: none; /* Make the background transparent */
  }

  .popup-content {
    position: relative;
    background-color: rgba(26, 26, 26, 0.8); /* Add a slightly transparent dark background to the content */
    padding: 20px; /* Add some padding to the content area */
    border-radius: 8px; /* Match content border radius */
  }

  .popup-title {
    font-size: 1.8rem;
    color: #00ffc8;
    margin-bottom: 15px;
    text-transform: uppercase; /* Similar to "GRIVO !" */
    letter-spacing: 0.1em;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: 2px solid #ffffff; /* White border for the button */
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    width: 30px; /* Adjust size */
    height: 30px; /* Adjust size */
    border-radius: 50%; /* Make it circular */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    opacity: 0.8;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    opacity: 1;
    color: #00ffc8;
    border-color: #00ffc8;
  }

  .popup-message {
    margin-bottom: 20px;
    font-size: 1.1rem;
  }

  .popup-countdown {
    font-size: 0.9rem;
    color: #888;
  }

  .hidden {
    display: none !important;
  }

  .download-btn.coming-soon-download {
    background: #333; /* Darker background for disabled button */
    color: #777;
    cursor: not-allowed;
    box-shadow: none;
  }

  .download-btn.coming-soon-download:hover {
    background: #333;
  }
`;
document.head.appendChild(style);
