fetch('http://localhost:8080/user/userNameRole')
    .then(response => response.json())
    .then((data) => {
            getCurrentUser(data);
        }
    )

let current = document.getElementById("userTable");

let currUser = document.getElementById("currUser");
let currRole = document.getElementById("currRole");


function getCurrentUser() {
   fetch('http://localhost:8080/user/userNameRole')
        .then(res => {
            res.json().then(
                data => {
                    current.innerHTML = `
                                <td>${data.id}</td>
                                <td>${data.firstName}</td>
                                <td>${data.lastName}</td>
                                <td>${data.age}</td>
                                <td>${data.username}</td>
                                <td>${data.roles.map(u => u.role)}</td>                            
                                `;

                })
        })
}
fetch('http://localhost:8080/user/userNameRole')
    .then(response => response.json())
    .then((data) => {
        document.getElementById('currUser').innerHTML = data.username;
        document.getElementById('currRole').innerHTML = data.roles.map(v => v.role);

    })
    .catch(err => console.log(err)
    )

