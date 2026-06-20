const queens = [

{
    name:"Jinkx Monsoon",
    image:"images/jinkx.jpg"
},

{
    name:"Alaska",
    image:"images/alaska.jpg"
},

{
    name:"Bianca Del Rio",
    image:"images/bianca.jpg"
},

{
    name:"Sasha Colby",
    image:"images/sasha.jpg"
}

];

let selectedQueens = [];
let episodes = [];
let currentEpisode = 0;

const queenGrid =
document.getElementById("queenGrid");

queens.forEach(queen => {

    const card =
    document.createElement("div");

    card.className =
    "queen-card";

    card.innerHTML = `
        <img src="${queen.image}">
        <h3>${queen.name}</h3>
    `;

    card.onclick = () => {

        if(selectedQueens.includes(queen)){

            selectedQueens =
            selectedQueens.filter(
                q => q !== queen
            );

            card.classList.remove(
                "selected"
            );

        }else{

            selectedQueens.push(
                queen
            );

            card.classList.add(
                "selected"
            );

        }

    };

    queenGrid.appendChild(card);

});

function showPage(id){

    document
    .querySelectorAll(".page")
    .forEach(page => {

        page.classList.remove(
            "active"
        );

    });

    document
    .getElementById(id)
    .classList.add(
        "active"
    );

}

function goToSetup(){

    showPage("setupPage");

}

function goToEpisodes(){

    showPage(
        "episodeSetupPage"
    );

}

function addEpisode(){

    const name =
    document
    .getElementById(
        "episodeName"
    ).value;

    const challenge =
    document
    .getElementById(
        "challengeType"
    ).value;

    episodes.push({

        name,
        challenge

    });

    renderEpisodes();

}

function renderEpisodes(){

    const list =
    document.getElementById(
        "episodeList"
    );

    list.innerHTML = "";

    episodes.forEach(ep => {

        const li =
        document.createElement(
            "li"
        );

        li.textContent =
        `${ep.name} (${ep.challenge})`;

        list.appendChild(li);

    });

}

function goToOverview(){

    document
    .getElementById(
        "overview"
    ).innerHTML = `

        <h3>
            Queens:
            ${selectedQueens.length}
        </h3>

        <h3>
            Episodes:
            ${episodes.length}
        </h3>

    `;

    showPage(
        "overviewPage"
    );

}

function startSeason(){

    currentEpisode = 0;

    showPage(
        "simulationPage"
    );

    loadEpisode();

}

function loadEpisode(){

    if(
        currentEpisode >=
        episodes.length
    ){

        document
        .getElementById(
            "episodeTitle"
        ).innerText =
        "Season Complete!";

        document
        .getElementById(
            "episodeResults"
        ).innerHTML =
        "<h2>Winner Coming Soon</h2>";

        return;

    }

    document
    .getElementById(
        "episodeTitle"
    ).innerText =
    episodes[currentEpisode].name;

}

function simulateEpisode(){

    if(
        currentEpisode >=
        episodes.length
    ){
        return;
    }

    let ranking =
    [...selectedQueens];

    ranking.sort(
        () =>
        Math.random() - 0.5
    );

    const winner =
    ranking[0];

    const bottom2 =
    ranking.slice(-2);

    const eliminated =
    bottom2[
        Math.floor(
            Math.random()*2
        )
    ];

    selectedQueens =
    selectedQueens.filter(
        q =>
        q !== eliminated
    );

    document
    .getElementById(
        "episodeResults"
    ).innerHTML = `

        <h2>
            Winner:
            ${winner.name}
        </h2>

        <h3>
            Bottom 2
        </h3>

        <p>
            ${bottom2[0].name}
            vs
            ${bottom2[1].name}
        </p>

        <h3>
            Eliminated:
            ${eliminated.name}
        </h3>

    `;

    currentEpisode++;

}
