function Home() {
    //debugger;
    console.log("Invoked ReturnHome() ");
    window.open("index.html", "_self");
}
function swag() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
//
function getSongs(){
    //debugger;
    console.log("Invoked getSongs()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/songs/list/";    		// API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            dataHTML = "";
            for (let item of response) {
                dataHTML += `<audio controls><source class='alertMusicName' type='audio/mpeg' src='${item.SongName}'></audio>`;
            }
            document.getElementById("MusicList").innerHTML += dataHTML;

            let musicList = document.getElementsByClassName("alertMusicName");
            for (let music of musicList){
                    music.addEventListener("play", plays());
            }
        }
    });
}

function plays(){
    debugger;
    console.log("This function needs the SongName (from src) so that it can update the songs table to say it has been played");
}


function UpdatePlays() {
    //debugger;
    console.log("Invoked UpdatePlays() ");
    let url = "/songs/update";
    let formData = new FormData(document.getElementById('PlaysForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            alert("Added one to plays");
        }
    });
}
