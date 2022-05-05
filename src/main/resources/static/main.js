fetch('http://localhost:8080/admin').then(
    res => {
        res.json().then(
            data => {
                if (data.length > 0) {
                    data.forEach((u) => {
                        getAllUsers(u);
                        //   console.log(u)
                    })
                }
            })
    }
)

function getAllUsers(u) {

    let temp = "";
    temp += `<tr id = 'userDataId-${u.id}'>`;
    temp += "<td class='userData'>" + u.id + "</td>";
    temp += "<td class='userData'>" + u.firstName + "</td>";
    temp += "<td class='userData'>" + u.lastName + "</td>";
    temp += "<td class='userData'>" + u.age + "</td>";
    temp += "<td class='userData'>" + u.username + "</td>";
    temp += "<td>" + u.roles.map(u => u.role) + "</td>";
    temp += "<td> <button class=\"btn btn-info\" data-target=\"#editModal\" id=\"#updateForm\" onclick='editOpenModal(this)' data-toggle=\"modal\" type=\"button\">Edit</button></td>";
    temp += "<td> <button class=\"btn btn-danger\" data-target=\"#deleteModal\" onclick='delOpenModal(this)' data-toggle=\"modal\" type=\"button\">Delete</button></td></tr>";

    document.getElementById("data").insertAdjacentHTML('beforeend', temp);
}

async function add() {
    let addForm = document.querySelector('#addForm');

    addForm.onsubmit = async (e) => {
        e.preventDefault();

        /*  let response = await fetch(`http://localhost:8080/admin/allRoles`);
          let jsonRole = await response.json();
          let roleName = Array.from(jsonRole).map(name => name.role)
          console.log(roleName)*/

        /*написать метод в скрипте, который просто будет работать почти также как метод, перерисовывающий всю таблицу,
          но который будет брать данные нового юзера которые ты ввел и рисовать лишь одну строчку в таблице*/

     /*   let arrayRoles = Array.from(document.getElementById('newRoles').selectedOptions)
            .map(id => id.value)
        console.log(arrayRoles)*/

        let arrayRoles = document.getElementById("newRoles")
        let options = ['ADMIN', 'USER'];

        options.forEach(function (element, key) {
            arrayRoles[key] = new Option(element, key, true)});
            console.log(options)

        let newArrayObjectRoles = [];
        for (let i = 0; i < options.length; i++) {
            newArrayObjectRoles.push({'id': options[i]});
            console.log(newArrayObjectRoles)
        }

        const newUser = {
            "lastName": document.getElementById('lastName').value,
            "firstName": document.getElementById('firstName').value,
            "age": document.getElementById('age').value,
            "username": document.getElementById('username').value,
            "password": document.getElementById('password').value,
            "roles": newArrayObjectRoles
        }
        console.log(newUser)

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

    async function edit(event, id) {
        event.preventDefault();

        let editModalInputs = Array.from(document.querySelectorAll('.editModalForm'));
        console.log(editModalInputs);

        let formData = new FormData(document.querySelector('.editModalForm form'));
        let editUserData = {
            id: formData.get('id'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            age: formData.get('age'),
            username: formData.get('username'),
            password: formData.get('password'),
            roles: formData.getAll('roles'),
        }

        fetch(`http://localhost:8080/admin/${id}`, {
            method: 'PUT',
            body: JSON.stringify(editUserData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                console.log('editRow');
                $('#editModal').modal('hide')
                let editRow = document.querySelector(`#userDataId-${id}`);

            }).catch(err => {
            console.error(err)
        });
    }
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


