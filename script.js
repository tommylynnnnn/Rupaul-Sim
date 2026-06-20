const queens = [
    {
        name: "Jinkx Monsoon",
        comedy: 100,
        acting: 95,
        design: 60
    },
    {
        name: "Alaska",
        comedy: 90,
        acting: 85,
        design: 70
    },
    {
        name: "Bianca Del Rio",
        comedy: 98,
        acting: 90,
        design: 80
    },
    {
        name: "Sasha Colby",
        comedy: 75,
        acting: 85,
        design: 90
    }
];

let selectedQueens = [];
let episodes = [];
let currentEpisode = 0;

const queenGrid = document.getElementById("queenGrid");

queens.forEach(queen => {

    const card = document.createElement("div");
    card.classList.add("queen-card");

    card.innerHTML = `
        <h3>${queen.name}</h3>
    `;

    card.onclick = () => {

        if (selectedQueens.includes(queen)) {
            selectedQueens =
                selectedQueens.filter(q => q !== queen);

            card.classList.remove("selected");
        } else {
            selectedQueens.push(queen);

            card.classList.add("selected");
        }
    };

    queenGrid.appendChild(card);
});

function addEpisode() {

    const name =
        document.getElementById("episodeName").value;

    const challenge =
        document.getElementById("challengeType").value;

    episodes.push({
        name,
        challenge
    });

    renderEpisodes();
}

function renderEpisodes() {

    const list =
        document.getElementById("episodeList");

    list.innerHTML = "";

    episodes.forEach(ep => {

        const li =
            document.createElement("li");

        li.textContent =
            `${ep.name} (${ep.challenge})`;

        list.appendChild(li);
    });
}

function startSeason() {

    alert(
        `Season started with ${selectedQueens.length} queens!`
    );
}

function simulateEpisode() {

    if (
        currentEpisode >= episodes.length ||
        selectedQueens.length < 2
    ) {
        return;
    }

    const ep = episodes[currentEpisode];

    let rankings = [...selectedQueens];

    rankings.sort(() =>
        Math.random() - 0.5
    );

    const winner = rankings[0];

    const bottom2 =
        rankings.slice(-2);

    const eliminated =
        bottom2[Math.floor(Math.random() * 2)];

    selectedQueens =
        selectedQueens.filter(
            q => q !== eliminated
        );

    document.getElementById("results")
        .innerHTML = `
        <h3>${ep.name}</h3>

        <p>🏆 Winner:
        ${winner.name}</p>

        <p>⚠ Bottom:
        ${bottom2[0].name}
        &
        ${bottom2[1].name}</p>

        <p>❌ Eliminated:
        ${eliminated.name}</p>
    `;

    currentEpisode++;
}
