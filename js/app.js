document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
document.getElementById('team-details').textContent = ''
const searchTeam = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    // Handle empty search request
    if (searchText == '') {
        // please write something to display
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Team Details
        document.getElementById('team-details').textContent = '';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // load data
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('team-numbers').textContent = '';
    document.getElementById('team-details').textContent = '';

}
// Display Search Result
const displaySearchResult = teams => {
    // console.log(teams);
    document.getElementById('team-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const teamList = teams.teams;
    console.log(teamList);
    if (teamList == null) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('team-numbers').innerText = `Teams Found ${teamList.length}`;
        // Retrieve each book and display in a card
        teamList.forEach(team => {
            
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="${team.strTeamBadge}" class="w-50 h-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Title: ${team.strTeam}</h5>
                    <p class="card-text">League Name:${team.strLeague}</p>
                    <p class="card-text">Publisher: ${team.strStadium}</p>
                    
                </div>
                <div class = "card-footer">
                    <button class="btn btn-outline-dark" onclick="loadTeamDetail('${team.idTeam}')">Load More <i class="fas fa-arrow-right"></i></button> 
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }

}

// // Fetch team detail
const loadTeamDetail = teamId => {
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`)
        .then(res => res.json())
        .then(res => displayTeamDetail(res));
}
// // Display team detail at the top
const displayTeamDetail = (teamDetail) => {
    const team = teamDetail.teams[0];
    window.scrollTo(0, 40);
    const teamShow = document.getElementById('team-details');
    teamShow.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card','bg-dark','text-warning', 'text-center');
    div.innerHTML = `
    <img src="${team.strStadiumThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Team: ${team.strTeam}</h5>
        <p class="card-text">Home: ${team.strStadium}</p> 
        <p><small class="card-text">Team Description: ${team.strDescriptionEN ? team.strDescriptionEN.slice(0,100): "N/a"}</small></p>
        <a href="https://${team.strYoutube}" target="_blank" class="btn btn-primary">Watch Videos</a>
    </div>
    `;
    teamShow.appendChild(div);
}