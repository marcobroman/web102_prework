/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (const game of games) {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `
        <img class="game-img" src="${game.img}" width="100px">
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
    `;

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p>
        ${totalContributions.toLocaleString("en-US")}
    </p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmount = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
    <p>
    $${totalAmount.toLocaleString("en-US")}
    </p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `
    <p>
        ${GAMES_JSON.length}
    </p>
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const gamesNeedFunding = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(gamesNeedFunding);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const gamesMetFunding = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(gamesMetFunding);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", () => {
  filterUnfundedOnly();
});
fundedBtn.addEventListener("click", () => {
  filterFundedOnly();
});
allBtn.addEventListener("click", () => {
  showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce((acc, game) => {
  let t = game.pledged < game.goal ? 1 : 0;
  return acc + t;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const templateString = `
    A total of $${GAMES_JSON.reduce((acc, game) => {
      return acc + game.pledged;
    }, 0).toLocaleString()} has been raised for ${
  GAMES_JSON.length
} games. Currently, only ${unfundedGames} game${
  unfundedGames > 1 ? "s" : ""
} remain unfunded. We need
    your help to fund these amazing games!
`;

// create a new DOM element containing the template string and append it to the description container

const container = document.createElement("p");
container.innerText = templateString;
descriptionContainer.appendChild(container);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerText = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);
// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.innerText = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

//CUSTOM

/************************************************************************************
 * Search Bar
 */

// Add search bar and display game

const searchBarOuterContainer = document.getElementById("searchBarContainer");
const input = document.createElement("input");
const button = document.createElement("button");
button.id = "buttonSearch";
button.innerText = "Search";
searchBarOuterContainer.appendChild(input);
searchBarOuterContainer.appendChild(button);

// add eventlistener for button
button.addEventListener("click", (event) => {
  const text = input.value.toLowerCase().trim();
  const filteredGames = GAMES_JSON.filter((game) => {
    return game.name.toLowerCase().includes(text);
  });
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(filteredGames);
});

/******************************
 * navbar
 */
const offsets = [65, 340, 260];
const navTags = ["Welcome", "Stats", "Our Games"];
const tags = ["description-container", "top-games", "games-container"];
const navbar = document.getElementById("navbar");

navTags.forEach((tag, index) => {
  const link = document.createElement("a");
  link.innerText = tag;
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const offsetTop = document.getElementById(tags[index]).offsetTop;

    window.scrollTo({
      top: offsetTop - offsets[index],
      behavior: "smooth",
    });
  });
  navbar.appendChild(link);
});
