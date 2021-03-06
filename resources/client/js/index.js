function UsersLogout() {
    //debugger;
    console.log("Invoked logout");
    let url = "/users/logout";
    fetch(url, {method: "POST"
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.remove("Token", response.Token);    //UserName and Token are removed
            Cookies.remove("UserName", response.UserName);
            window.open("login.html", "_self");       //open index.html in same tab
        }
    });
}
function pageload(){
    //debugger;
    let Userdiv = document.getElementById("uNameDetail");
    let UserName = Cookies.get("UserName");
    Userdiv.innerHTML = "You are signed in as " + UserName;

}
function DarkMode() {
    var element = document.body; //Inverts white to black, does not effect navbars
    element.classList.toggle("dark-mode");
}

function Playlists() {
    //debugger;
    console.log("Invoked Playlists() ");
    window.open("playlists.html", "_self");
}
function Songs() {
    //debugger;
    console.log("Invoked Songs() ");
    window.open("songs.html", "_self");
}
function Creator() {
    //debugger;
    console.log("Invoked toCreato() ");
    window.open("creator.html", "_self");
}