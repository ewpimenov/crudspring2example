fetch('http://localhost:8080/user/userNameRole')
    .then(response => response.json())
    .then((data) => {
            getCurrentUser(data);
            console.log(data)
        }
    )

let current = document.getElementById("userTable")

function getCurrentUser(u) {
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
            document.getElementById('currRole').innerHTML = data.roles.map(u => u.role);
            console.log(data)
        }
    )
