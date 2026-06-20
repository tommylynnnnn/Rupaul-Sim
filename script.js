const queens = [
    { name: "Jinkx Monsoon", image: "images/jinkx.jpg", trackRecord: [] },
    { name: "Alaska", image: "images/alaska.jpg", trackRecord: [] },
    { name: "Bianca Del Rio", image: "images/bianca.jpg", trackRecord: [] },
    { name: "Sasha Colby", image: "images/sasha.jpg", trackRecord: [] }
];

let selectedQueens = [];
let episodes = [];
let currentEpisode = 0;

// --------------------
// QUEEN GRID
// --------------------
const queenGrid = document.getElementById("queenGrid");

queens.forEach(queen => {

    const card = document.createElement("div");
    card.className = "queen-card";

    card.innerHTML = `
        <img src="${queen.image}">
        <h3>${queen.name}</h3>
    `;

    card.onclick = () => {

        if (selectedQueens.includes(queen)) {

            selectedQueens = selectedQueens.filter(q => q !== queen);
            card.classList.remove("selected");

        } else {

            selectedQueens.push(queen);
            card.classList.add("selected");

        }

    };

    queenGrid.appendChild(card);
});

// --------------------
// PAGE SYSTEM
// --------------------
function showPage(id) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function goToSetup() {
    showPage("setupPage");
}

function goToEpisodes() {
    showPage("episodeSetupPage");
}

// --------------------
// EPISODES
// --------------------
function addEpisode() {

    const name = document.getElementById("episodeName").value;
    const challenge = document.getElementById("challengeType").value;

    if (!name) return;

    episodes.push({
        name,
        challenge
    });

    document.getElementById("episodeName").value = "";

    renderEpisodes();
}

function renderEpisodes() {

    const list = document.getElementById("episodeList");
    list.innerHTML = "";

    episodes.forEach((ep, i) => {

        const li = document.createElement("li");
        li.textContent = `EP${i + 1}: ${ep.name} (${ep.challenge})`;
        list.appendChild(li);

    });
}

// --------------------
// OVERVIEW
// --------------------
function goToOverview() {

    document.getElementById("overview").innerHTML = `
        <h3>Queens: ${selectedQueens.length}</h3>
        <h3>Episodes: ${episodes.length}</h3>
    `;

    showPage("overviewPage");
}

// --------------------
// START SEASON
// --------------------
function startSeason() {

    currentEpisode = 0;

    // reset track records
    selectedQueens.forEach(q => q.trackRecord = []);

    showPage("simulationPage");
    loadEpisode();
}

// --------------------
// LOAD EPISODE
// --------------------
function loadEpisode() {

    const title = document.getElementById("episodeTitle");
    const results = document.getElementById("episodeResults");

    if (currentEpisode >= episodes.length) {

        title.innerText = "Season Complete!";
        results.innerHTML = "<h2>👑 Final Winner TBD System Coming Next</h2>";
        return;

    }

    title.innerText = episodes[currentEpisode].name;
    results.innerHTML = "<p>Ready to simulate episode...</p>";
}

// --------------------
// SIMULATION CORE
// --------------------
function simulateEpisode() {

    if (currentEpisode >= episodes.length) return;

    let ep = episodes[currentEpisode];

    let ranking = [...selectedQueens];

    // soft randomness shuffle
    ranking.sort(() => Math.random() - 0.5);

    const winner = ranking[0];

    const high = ranking.slice(1, 3);

    const safe = ranking.slice(3, ranking.length - 2);

    const bottom2 = ranking.slice(-2);

    const eliminated = bottom2[Math.floor(Math.random() * 2)];

    // --------------------
    // BUILD EPISODE DISPLAY
    // --------------------
    const container = document.getElementById("episodeResults");

    container.innerHTML = `
        <h2>${ep.name}</h2>
        <h3>Challenge: ${ep.challenge}</h3>

        <div class="result-grid" id="resultGrid"></div>

        <h2>Track Record</h2>
        <table id="trackTable"></table>
    `;

    const grid = document.getElementById("resultGrid");

    function addCard(q, placement) {

        const div = document.createElement("div");
        div.className = "result-card";

        div.innerHTML = `
            <img src="${q.image}">
            <h4>${q.name}</h4>
            <div class="badge ${placement}">
                ${placement}
            </div>
        `;

        grid.appendChild(div);
    }

    // placements
    addCard(winner, "WIN");

    high.forEach(q => addCard(q, "HIGH"));
    safe.forEach(q => addCard(q, "SAFE"));
    bottom2.forEach(q => addCard(q, "BTM"));

    addCard(eliminated, "ELIM");

    // --------------------
    // TRACK RECORD UPDATE
    // --------------------
    ranking.forEach(q => {

        let placement =
            q === winner ? "WIN" :
            high.includes(q) ? "HIGH" :
            safe.includes(q) ? "SAFE" :
            bottom2.includes(q) ? "BTM" :
            "ELIM";

        q.trackRecord.push(placement);

    });

    renderTrackTable();

    // remove eliminated queen
    selectedQueens = selectedQueens.filter(q => q !== eliminated);

    currentEpisode++;

    loadEpisode();
}

// --------------------
// TRACK RECORD TABLE
// --------------------
function renderTrackTable() {

    const table = document.getElementById("trackTable");

    table.innerHTML = "";

    // header
    let header = "<tr><th>Queen</th>";

    const maxEpisodes = currentEpisode;

    for (let i = 0; i < maxEpisodes; i++) {
        header += `<th>E${i + 1}</th>`;
    }

    header += "</tr>";
    table.innerHTML += header;

    // rows
    selectedQueens.forEach(q => {

        let row = `<tr><td>${q.name}</td>`;

        q.trackRecord.forEach(p => {
            row += `<td>${p}</td>`;
        });

        row += "</tr>";

        table.innerHTML += row;

    });
}
