
var taskList = new Set();
function tasks(task) {
    var container = document.getElementById("form-container");
    
    if (taskList.has(task)) {
        alert("Task already added!");
        return; 
    }
 
    taskList.add(task);
    var fieldContainer = document.createElement("div");
    fieldContainer.className = "field-container";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var textField = document.createElement("input");
    textField.type = "text";
    textField.value = task;
    var dropdown = document.createElement("select");
    textField.readOnly = true;

    var options = ["Select","TODO", "In Progress", "Completed"];
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        var optionElement = document.createElement("option");
        optionElement.text = option;
        dropdown.appendChild(optionElement);
    }
    dropdown.addEventListener("change", ()=>{
        if (dropdown.value=="Completed"){
            checkbox.checked = true;
            taskList.delete(task);
            textField.classList.add("strike");
    }
    })
    
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.class="delete_button";
    deleteButton.addEventListener("click", function () {
        if (container) {
            container.removeChild(fieldContainer);
            taskList.delete(task); 
        }
    });
    fieldContainer.appendChild(checkbox);
    fieldContainer.appendChild(textField);
    fieldContainer.appendChild(dropdown);
    fieldContainer.appendChild(deleteButton);
    if (container) {
        container.appendChild(fieldContainer);
    }
}

var addButton = document.getElementById("add-button");
if (addButton) {
    addButton.addEventListener("click", function () {
        var userText = document.getElementById("user_text").value.trim();
        if (userText !== "") {
            tasks(userText);
        }
        else {
            alert("Please enter a task.");
        }
    });
}

const searchInput = document.getElementById("search") ;

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchText= searchInput.value.trim().toLowerCase();
        const taskContainers= document.querySelectorAll(".field-container");

        taskContainers.forEach(container => {
            const textField= container.querySelector("input[type='text']") ;
            const shouldDisplay = textField.value.toLowerCase().includes(searchText);
            container.style.display = shouldDisplay ? "block" : "none";
        });
    });
}
