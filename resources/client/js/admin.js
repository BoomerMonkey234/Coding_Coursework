
function ToAdmin() {
    //debugger;
    console.log("Invoked ToAdmin() ");
    let url = "/users/Admin";
    window.open("admin.html", "_self");
}
    function getUsers() {
        console.log("Invoked getUser()");     //console.log your BFF for debugging client side
        const UserID = document.getElementById("UserID").value;  //get the UserId from the HTML element with id=UserID
        //let UserID = 1; 			  //You could hard code it if you have problems
        debugger;				  //debugger statement to allow you to step through the code in console dev F12
        let url = "/users/add/";
        let formData = new FormData(document.getElementById('LoginForm'));

        // API method on webserver
        fetch(url , {                // UserID as a path parameter
            method: "POST",
            body: formData,
        }).then(response => {
            return response.json();                         //return response to JSON
        }).then(response => {
            if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
                alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
            } else {
                document.getElementById("DisplayOneUser").innerHTML = response.UserID + " " + response.UserName;  //output data
            }
        });
    }
    function getUsersList() {
        //debugger;
        console.log("Invoked getUsersList()");     //console.log your BFF for debugging client side - also use debugger statement
        const url = "/users/list/";    		// API method on web server will be in Users class, method list
        fetch(url, {
            method: "GET",				//Get method
        }).then(response => {
            return response.json();                 //return response as JSON
        }).then(response => {
            if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
                alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
            } else {
                formatUsersList(response);          //this function will create an HTML table of the data (as per previous lesson)
            }
            //getUser() returns one row of data from the database using a GET and path parameter


        });
    }
    function formatUsersList(myJSONArray){
        let dataHTML = "";
        for (let item of myJSONArray) {
            dataHTML += "<tr><td>" + item.UserID + "<td><td>" + item.UserName + "<tr><td>";
        }
        document.getElementById("UsersTable").innerHTML = dataHTML;

}
    function CheckLogin(onSuccess) {

        let currentPage = window.location.pathname;
        let token = Cookies.get("sessionToken");

        if (token !== undefined) {

            fetch('/admin/check', {method: 'get'}
            ).then(response => response.json()
            ).then(data => {


                    if (data.hasOwnProperty("username") && data.username !== "") {
                        document.getElementById("logout").addEventListener("click", logout);
                        onSuccess();
                    } else {
                        if (data.hasOwnProperty("error")) {
                            alert(data.error);
                        }
                        if (currentPage !== '/client/login.html') {
                            window.location.href = '/client/login.html';
                        }
                    }
                }
            );
        } else {
            if (currentPage !== '/client/login.html') {
                window.location.href = '/client/login.html';
            }
        }
    }