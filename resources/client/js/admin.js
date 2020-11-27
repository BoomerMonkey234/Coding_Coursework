function checkLogin(onSuccess) {

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