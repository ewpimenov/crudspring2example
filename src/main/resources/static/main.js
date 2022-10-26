fetch('http://localhost:8080/admin').then(
    res => {
        res.json().then(
            data => {
                if (data.length > 0) {
                    getAllUsers(data);
                }
            })
    }
)

function getAllUsers(u) {
    fetch('http://localhost:8080/admin').then(
        res => {
            res.json().then(
                data => {
                    let temp = "";
                    data.forEach((u) => {
                        temp += `<tr id = 'userDataId-${u.id}'>`;
                        temp += "<td class='userData'>" + u.id + "</td>";
                        temp += "<td class='userData'>" + u.firstName + "</td>";
                        temp += "<td class='userData'>" + u.lastName + "</td>";
                        temp += "<td class='userData'>" + u.age + "</td>";
                        temp += "<td class='userData'>" + u.username + "</td>";
                        temp += "<td class='userRole'>" + u.roles.map(u => u.role) + "</td>";
                        temp += "<td> <button class=\"btn btn-info\" data-target=\"#editModal\" id=\"#updateForm\" onclick='editOpenModal(this)' data-toggle=\"modal\" type=\"button\">Edit</button></td>";
                        temp += "<td> <button class=\"btn btn-danger\" data-target=\"#deleteModal\" onclick='delOpenModal(this)' data-toggle=\"modal\" type=\"button\">Delete</button></td></tr>";
                    })
                    document.getElementById("data").innerHTML = temp;
                }
            )
        })
}

async function add() {
    let addForm = document.querySelector('#addForm');

    addForm.onsubmit = async (e) => {
        e.preventDefault();

        let arrayRoles = Array.from(document.getElementById('newRoles').selectedOptions)
            .map(id => id.value)

        let newArrayObjectRoles = [];
        for (let i = 0; i < arrayRoles.length; i++) {
            newArrayObjectRoles.push({'id': arrayRoles[i]});
        }

        const newUser = {
            "lastName": document.getElementById('lastName').value,
            "firstName": document.getElementById('firstName').value,
            "age": document.getElementById('age').value,
            "username": document.getElementById('username').value,
            "password": document.getElementById('password').value,
            "roles": newArrayObjectRoles
        }

        await fetch(`http://localhost:8080/admin`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => getAllUsers(data));

        let triggerE1 = document.querySelector('a[href="#Users table"]')
        let tabTrigger = new bootstrap.Tab(triggerE1)
        tabTrigger.show()
    }
}

function editOpenModal(button) {

    let editUserRow = button.parentElement.parentElement

    let editRow = Array.from(editUserRow.querySelectorAll('.userData'));
    let userData = [];
    let formInputs = Array.from(editModal.querySelectorAll('input'));
    for (let node of editRow) {
        userData.push(node.textContent)
    }
    for (let i = 0; i < userData.length; i++) {
        formInputs[i].setAttribute('value', userData[i])
    }
}

function edit() {
    event.preventDefault();

    let arrayEditRoles = Array.from(document.getElementById('editRoles').selectedOptions)
        .map(id => id.value)
    let newArrayEditRoles = [];
    for (let i = 0; i < arrayEditRoles.length; i++) {
        newArrayEditRoles.push({'id': arrayEditRoles[i]})
    }

    let idUserEdit = document.getElementById('idEdit').value

    const editUser = {
        "id": document.getElementById("idEdit").value,
        "lastName": document.getElementById('lastNameEdit').value,
        "firstName": document.getElementById('firstNameEdit').value,
        "age": document.getElementById('ageEdit').value,
        "username": document.getElementById('usernameEdit').value,
        "password": document.getElementById('passwordEdit').value,
        "roles": newArrayEditRoles,
    }

    fetch(`http://localhost:8080/admin/${idUserEdit}`, {
        method: 'PUT',
        body: JSON.stringify(editUser),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then((data) => getAllUsers(data))
        .then(() => {
            console.log('updated');
            $('#editModal').modal('hide')
        })
}

function delOpenModal(button) {
    let getUserRow = button.parentElement.parentElement
    let getRow = Array.from(getUserRow.querySelectorAll('.userData'));
    let userData = [];
    let formInputs = Array.from(deleteModal.querySelectorAll('input'));
    for (let node of getRow) {
        userData.push(node.textContent)
    }
    for (let i = 0; i < userData.length; i++) {
        formInputs[i].setAttribute('value', userData[i])
    }
}

async function del(event, id) {
    event.preventDefault();

    let deleteModal = document.querySelector('.deleteModalForm');

    deleteModal.onsubmit = async (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/admin/${id}`, {
            method: 'DELETE',
        }).then(() => {
            console.log('removed');
            $('#deleteModal').modal('hide')
            let deleteRow = document.querySelector(`#userDataId-${id}`);
            deleteRow.remove();

        }).catch(err => {
            console.error(err)
        });
    }
}

fetch('http://localhost:8080/admin/adminNameRole')
    .then(response => response.json())
    .then((data) => {
        document.getElementById('currentUser').innerHTML = data.username;
        document.getElementById('currentRole').innerHTML = data.roles.map(v => v.role);

    })
    .catch(err => console.log(err)
    )

