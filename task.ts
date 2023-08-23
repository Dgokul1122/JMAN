
const taskList: Set<string> = new Set();

function tasks(task: string): void {
    const container: HTMLElement | null = document.getElementById("form-container");

   
    if (taskList.has(task)) {
        alert("Task already added!");
        return; 
    }

 
    taskList.add(task);

    const fieldContainer: HTMLDivElement = document.createElement("div");
    fieldContainer.className = "field-container";

    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    
    const textField: HTMLInputElement = document.createElement("input");
    textField.type = "text";

    textField.value = task;

    const dropdown: HTMLSelectElement = document.createElement("select");
    const options: string[] = ["Select","TODO", "In Progress", "Completed"];
    for (const option of options) {
        const optionElement: HTMLOptionElement = document.createElement("option");
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

    

    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => {
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

const addButton: HTMLButtonElement  = document.getElementById("add-button") as HTMLButtonElement;
if (addButton) {
    addButton.addEventListener("click", () => {
        const userText: string = (document.getElementById("user_text") as HTMLInputElement).value.trim();

        if (userText !== "") {
            tasks(userText);
        } else {
            alert("Please enter a  task");
        }
    });
}
const searchInput: HTMLInputElement  = document.getElementById("search") as HTMLInputElement;

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchText: string = searchInput.value.trim().toLowerCase();
        const taskContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll(".field-container");

        taskContainers.forEach(container => {
            const textField: HTMLInputElement = container.querySelector("input[type='text']") as HTMLInputElement;
            const shouldDisplay: boolean = textField.value.toLowerCase().includes(searchText);
            container.style.display = shouldDisplay ? "block" : "none";
        });
    });
}

