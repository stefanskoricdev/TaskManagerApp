const letsGoBtn = document.getElementById('lets-go');
const homePage = document.querySelector('.home-page-wrapper');
const toDoPage = document.querySelector('.to-do-page-wrapper');
const addTaskBtn = document.getElementById('add-task');
const toDoListSection = document.querySelector('.to-do-list-section');
const toDoAddListModal = document.querySelector('.to-do-list-add-modal');
const cancelAddListBtn = document.getElementById('cancel-add-list');
const confirmAddListBtn = document.getElementById('add-list');
const userNameInput = document.getElementById('user-name');
const userName = document.getElementById('nameID');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const timeInput = document.getElementById('time');
const doneTaskNo = document.getElementById('done-task');
const taskNo = document.getElementById('task-number');
const progressBar = document.getElementById('progress-bar');



const updateUi = () => {
  const toDoList = document.querySelectorAll(".to-do-list-section li");
  const toDoListChecked = document.querySelectorAll(".to-do-list-section .task-checked");
  if (toDoList.length > 0) {
    toDoListSection.classList.remove("visible-background");
  } else {
    toDoListSection.classList.add("visible-background");
  } // Updates if background image will be visible

  taskNo.textContent = toDoList.length;
  doneTaskNo.textContent = toDoListChecked.length;

  let progressValue = (toDoListChecked.length / toDoList.length) * 100;
  if (!toDoListChecked.length || !toDoList.length) {
    progressBar.value = 0;
    return;
  }
  progressBar.value = progressValue; //progressbar update
};

const openToDoListSectionHandler = () => {
    const userNameInputValue = userNameInput.value;
    if(userNameInputValue.trim() === ""){
        alert('Please enter valid name');
        return;
    }
    homePage.classList.toggle('visible');
    toDoPage.classList.toggle('visible');
    userName.textContent = `${userNameInputValue}`;
};

const clearUserInput = () => {
    titleInput.value = '';
    descriptionInput.value = '';
    timeInput.value = '';
};

const toDoListAddModalHandler = () => {
    const toDoList = document.querySelectorAll('.to-do-list-section li');
    toDoAddListModal.classList.toggle('visible');
    toDoList.forEach((list) => {
        list.classList.toggle('visible');
    });
    addTaskBtn.classList.toggle('visible');
    clearUserInput();
};
const addToDoList = () => {
    const toDoList = document.querySelectorAll('.to-do-list-section li');
    const newList = document.createElement('li');
    const titleInputValue = titleInput.value;
    const descriptionInputValue = descriptionInput.value;
    const timeInputValue = timeInput.value;

    if(titleInputValue.trim() === ''){
        alert('Please enter a title of your task!');
        return;
    }
    
    newList.className = 'visible';
    let newTaskListId = newList.id = Math.random().toString();
    newList.innerHTML = 
    `<i data-handler="${newTaskListId}" class="fas fa-check check-task"></i>
    <i data-handler="${newTaskListId}" class="fas fa-times remove-task"></i>
    <h4>Title:</h4>
    <p>${titleInputValue}</p>
    <h4>Description:</h4>
    <p>${descriptionInputValue}</p>
    <h4>Time:</h4>
    <p>${timeInputValue}</p>`;

    toDoListSection.append(newList);
    toDoAddListModal.classList.remove('visible');
    addTaskBtn.classList.toggle('visible');
    toDoList.forEach((list) => {
        list.classList.add('visible');
    });

    const taskCheckBtn = document.querySelectorAll(".check-task");
    for(let i = 0; i < taskCheckBtn.length; i++ ){
        taskCheckBtn[i].addEventListener('click', taskCheck);
    }
    const taskRemoveBtn = document.querySelectorAll('.remove-task')
    for(const btn of taskRemoveBtn){
        btn.addEventListener('click', taskRemove);
    }
    
    updateUi();
};

const taskCheck = (e) => {
    let handler = e.target.getAttribute('data-handler');
    let target = document.getElementById(handler);
    target.classList.toggle('task-checked');
    updateUi();
}
const taskRemove = (e) => {
    let handler = e.target.getAttribute('data-handler');
    let target = document.getElementById(handler);
    target.remove();
    updateUi();
}


letsGoBtn.addEventListener('click', openToDoListSectionHandler); // Opens TO DO LIST page
addTaskBtn.addEventListener('click', toDoListAddModalHandler); // Opens an ADD TASK FORM window and ADD TASK button disapears
cancelAddListBtn.addEventListener('click', toDoListAddModalHandler); // Closes an ADD TASK FORM window and ADD TASK button appears
confirmAddListBtn.addEventListener('click', addToDoList);//Adds task to a list