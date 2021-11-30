var text = document.getElementById("textarea");
var leftdiv = document.getElementById("leftpane");
var rightdiv = document.getElementById("rightpane");
var addNewTask = document.getElementById("addNewTask");
var photo = document.getElementById("taskphoto");
var data = []


var dataServerRequest = function() {
    console.log("a");
    let request = new XMLHttpRequest();
    request.open("GET", "/getdata");
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.addEventListener('load', function() {
        data = JSON.parse(request.responseText);
        data.forEach(item => {
            addtask(item.taskName, item.isChecked, item.url);
        })
    })
}

dataServerRequest();

addNewTask.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("c");
    if (text.value === "") {
        alert("Enter the task name");
    } else {
        setTimeout(function() {
            console.log("b");
            let req = new XMLHttpRequest();
            req.open('GET', '/savephoto');
            req.addEventListener('load', () => {
                let path = JSON.parse(req.responseText);
                console.log(JSON.parse(req.responseText))
                addtask(text.value, false, path);
                data.push({
                    taskName: text.value,
                    isChecked: false,
                    url: path
                });

                let data_string = JSON.stringify(data);
                saveTOServer(data_string);
                text.value = "";
            })
        }, 5000);
    }
});

function addtask(name, ischecked, url) {
    console.log("b");
    var task = document.createElement("div");
    task.setAttribute("id", "newTask");
    var taskname = document.createElement("p");
    taskname.innerHTML = name;
    var image = document.createElement("img");
    image.src = url;
    var xsymbol = document.createElement("span");
    xsymbol.innerHTML = "X";
    xsymbol.addEventListener("click", function() {
        leftdiv.removeChild(task);
        let index = data.findIndex(x => x.taskName === taskname.innerHTML);
        data.splice(index, 1);
        let data_string = JSON.stringify(data);
        saveTOServer(data_string);
    });
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (ischecked) {
        checkbox.checked = ischecked;
        taskname.style.textDecoration = "line-through";
    }
    checkbox.addEventListener("click", function() {
        if (checkbox.checked) {
            taskname.style.textDecoration = "line-through";
            let index = data.findIndex(x => x.taskName === taskname.innerHTML);
            data[index].isChecked = true;
            let data_string = JSON.stringify(data);
            saveTOServer(data_string);
        } else {
            taskname.style.textDecoration = "initial";
            let index = data.findIndex(x => x.taskName === taskname.innerHTML);
            data[index].isChecked = false;
            let data_string = JSON.stringify(data);
            saveTOServer(data_string);
        }
    });
    var edit = document.createElement("input")
    edit.value = "edit";
    edit.setAttribute("type", "button");
    edit.addEventListener("click", function() {
        let newTaskName = prompt("Enter new Task Name");
        let index = data.findIndex(x => x.taskName === taskname.innerHTML);
        data[index].taskName = newTaskName;
        let data_string = JSON.stringify(data);
        saveTOServer(data_string);
        taskname.innerHTML = newTaskName;
    });
    task.appendChild(taskname);
    task.appendChild(image);
    task.appendChild(xsymbol);
    task.appendChild(checkbox);
    task.appendChild(edit);
    leftdiv.appendChild(task);
    checkbox.style.float = "right";
    xsymbol.style.cursor = "default";
    xsymbol.style.float = "right";
    edit.style.float = "right";
    taskname.style.display = "inline-block";
    taskname.style.outline = "none";
}

function saveTOServer(data_server) {
    let req = new XMLHttpRequest();
    req.open('POST', '/save');
    req.setRequestHeader('Content-type', 'application/JSON');
    req.send(data_server);
}