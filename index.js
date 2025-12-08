let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


items = loadTasks();
items.forEach(function(item){
  const itemElement = createItem(item);
  listElement.append(itemElement);
});

function loadTasks() {
    const textTask = localStorage.getItem("tasks");
    if (textTask) {
        const parsedTasks = JSON.parse(textTask);
        if (parsedTasks.length === 0) {
            return items;
        }
        return parsedTasks;
    } else {
        return items;    
    }
}


function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");

  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");

	deleteButton.addEventListener("click", function(evt){
		evt.preventDefault();
		clone.remove(item);
		const items = getTasksFromDOM();
		saveTasks(items);
	});

  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");

	duplicateButton.addEventListener("click" , function(evt){
		evt.preventDefault();
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	});

  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	editButton.addEventListener("click", function(evt){
		evt.preventDefault();
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});
	
	textElement.addEventListener("blur", function(evt){
		evt.preventDefault();
		textElement.setAttribute("contenteditable", "false");
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});

	textElement.textContent = item; 
	return clone;
}

formElement.addEventListener("submit", function(evt){
	evt.preventDefault();
	const text = inputElement.value;
	const textApending = createItem(text);
  listElement.prepend(textApending);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value="";
});

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach(function(item){
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

