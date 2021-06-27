 // dev
 let todoList = [{
     text: "important",
     priority: true,
     done: true,
     id: 1624483295227
 }, {
     text: "not",
     priority: false,
     done: false,
     id: 16244835531
 }, {
     text: "vit",
     priority: true,
     done: false,
     id: 16244833187227
 }, {
     text: "done",
     priority: true,
     done: true,
     id: 1624483313727
 }];
 window.addEventListener('DOMContentLoaded', (event) => {
     renderProgressList();
     renderDoneList();
     asideCounter();
 });
 /*
    The array to hold the list
 */
 // let todoList = [];

 /*
     Desktop form
 */
 const desktopForm = document.getElementById('desktopTodoForm');

 // Add a submit event listener
 desktopForm.addEventListener('submit', event => {
     // prevent page refresh on form submission
     event.preventDefault();
     // select the text input
     const input = document.getElementById('desktopTaskInput');
     const priority = document.getElementById('desktopPriority').checked;

     // Get the value of the input and remove whitespace
     const text = input.value.trim();
     if (text == '') {
         // alert('hola');
     } else {
         addTodo(text, priority);
         input.value = '';
         input.focus();
         // uncheck high priority checkbox on input
         desktopForm.reset();
         checkForm();
     }
 });

 /*
     Mobile form
 */
 const mobileForm = document.getElementById('mobileTodoForm');
 // Add a submit event listener
 mobileForm.addEventListener('submit', event => {
     // prevent page refresh on form submission
     event.preventDefault();
     // select the text input
     const input = document.getElementById('mobileTaskInput');
     const priority = document.getElementById('mobilePriority').checked;

     // Get the value of the input and remove whitespace
     const text = input.value.trim();
     if (text == '') {
         // alert('hola');
     } else {
         addTodo(text, priority);
         input.value = '';
         input.focus();
         // uncheck high priority checkbox on input
         mobileForm.reset();
         checkForm();
         closeModal();
     }
 });
 // enables button  
 const checkForm = () => {
    // desktop
    const desktopInput = document.getElementById('desktopTaskInput').value;
    const desktopSubmitButton = document.getElementById('desktopSubmit');
    if(desktopInput == ''){
        desktopSubmitButton.classList.add("btn-disabled");
        desktopSubmitButton.classList.remove("btn-active");
    }else{
        desktopSubmitButton.classList.add("btn-active");
        desktopSubmitButton.classList.remove("btn-disabled");
    }
    // mobile
    const mobileInput = document.getElementById('mobileTaskInput').value;
    const mobileSubmitButton = document.getElementById('mobileSubmit');

    if(mobileInput == ''){
        mobileSubmitButton.classList.add("btn-disabled");
        mobileSubmitButton.classList.remove("btn-active");
    }else{
        mobileSubmitButton.classList.add("btn-active");
        mobileSubmitButton.classList.remove("btn-disabled");
    }
}
 /*
     Add task to the array
 */
 const addTodo = (text, priority) => {
     const todo = {
         text,
         priority: priority,
         done: false,
         id: Date.now(),
     };
     //  use push instead to set the task below in the list
     todoList.unshift(todo);
     renderProgressList();
     asideCounter();
 };

 /*
     Render progress list
 */
 const renderProgressList = () => {
     const progressList = document.getElementById('progressList');
     const progressCounter = document.getElementById('progressCounter');
     // filter the list for undone things
     let progress = todoList.filter(todoList => todoList.done == false);
     // render counter
     progressCounter.innerHTML = progress.length;
     // sort high priority
     progress.sort((a, b) => b.priority - a.priority);
     // after a check, iterates the list to render
     progressList.innerHTML = progress.map(list => `<li id="${list.id}" class="task"><input type="checkbox" onClick="markDone(${list.id})"><span class="task--priority ${highPriority(list.priority)}"></span>${ list.text } <img class="task-remove" onClick="deleteTask(${list.id})" src="../img/icon-trash.svg"/></li>`).join('');
 }

 /*
     Render aside counter
 */
const asideCounter = () =>{
    const asideCounter = document.getElementById('asideCounter');

    let progress = todoList.filter(todoList => todoList.done == false).length;
    let allTask = todoList.length;

    asideCounter.innerHTML = progress + "/" + allTask;
}
 /*
     Set color of Priority
 */
const highPriority = priority => {
    if(priority) return 'high-priority'; 
}
 /*
     Delete task
 */
 const deleteTask = taskId => {
     todoList = todoList.filter(item => item.id !== taskId);
     deleteAnimation(taskId);
     setTimeout(function () {
         renderProgressList();
         renderDoneList();
     }, 300);
 }

 /*
     Mark task as Done
 */
 const markDone = taskId => {
     todoList.map(taskList => {
         if (taskList.id === taskId) taskList.done = true
     });
     setTimeout(function () {
         renderProgressList();
         renderDoneList();
         asideCounter();
     }, 500);
 }


 /*
     Render done list
 */
 const renderDoneList = () => {
     const doneList = document.getElementById('doneList');
     const doneCounter = document.getElementById('doneCounter');
     // filter the list for undone things
     let done = todoList.filter(task => task.done == true);
     // render counter
     doneCounter.innerHTML = done.length;
     // sort high priority
     done.sort((a, b) => b.priority - a.priority);
     // after a check, iterates the list to render
     doneList.innerHTML = done.map(list => `<li id="${list.id}" class="task task--done"><input type="checkbox" checked onClick="markUndone(${list.id})"><span class="task--priority ${highPriority(list.priority)}"></span>${ list.text }  <img class="task-remove" onClick="deleteTask(${list.id})" src="../img/icon-trash.svg"/></li>`).join('');
     // console.log(todoList);
 }

 /*
     Mark task as Undone
 */
 const markUndone = taskId => {
     todoList.map(taskList => {
         if (taskList.id === taskId) taskList.done = false
     });
     setTimeout(function () {
         renderProgressList();
         renderDoneList();
         asideCounter();
     }, 500);
 }

 /*
     Launch the modal on mobile
     adapted from: https://www.w3schools.com/howto/howto_css_modals.asp
 */
 const modal = document.getElementById("myModal");
 const btn = document.getElementById("myBtn");

 // When the user clicks on the button, open the modal
 const openModal = () => {
     modal.style.display = "block";
 }
 // Get the <span> element that closes the modal
 var modalSpan = document.getElementsByClassName("close")[0];
 // When the user clicks on <span> (x), close the modal
 modalSpan.onclick = () => {
    closeModal();
 }
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = (event) => {
     if (event.target == modal) {
        closeModal();
     }
 }

 const closeModal = () =>{
    modal.style.display = "none";
 }

/*
    Delete animation
*/
const deleteAnimation = taskId => {
    const task = document.getElementById(taskId);
    task.classList.add('delete-animation');

}



