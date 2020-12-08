function Home() {
    debugger;
    console.log("Invoked ReturnHome() ");
    window.open("index.html", "_self");
}
// adds songs
function addSong() {

    let manufacturer = prompt("add song");

    let formData = new FormData();
    formData.append("name", Song);

    if (Song != null) {
        fetch('/song/new', {method: 'post', body: formData}
        ).then(response => response.json()
        ).then(data => {
                if (data.hasOwnProperty('error')) {
                    alert(data.error);
                } else {
                    loadSong();
                }
            }
        );
    }

}