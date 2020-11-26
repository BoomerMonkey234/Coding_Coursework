function UsersLogout() {
    //debugger;
    console.log("Invoked logout");
    let url = "/users/login";
    fetch(url, {method: "POST"
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.remove("Token", response.Token);    //UserName and Token are removed
            Cookies.remove("UserName", response.UserName);
            window.open("index.html", "_self");       //open index.html in same tab
        }
    });
}