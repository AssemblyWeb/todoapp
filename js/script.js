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
 });
 // the array to hold the list
 // let todoList = [];

 const form = document.getElementById('todoForm');
 // Add a submit event listener
 form.addEventListener('submit', event => {
     // prevent page refresh on form submission
     event.preventDefault();
     // select the text input
     const input = document.getElementById('taskInput');
     const priority = document.getElementById('priority').checked;

     // console.log(input.value);
     // Get the value of the input and remove whitespace
     const text = input.value.trim();
     if (text == '') {
         // alert('hola');
     } else {
         addTodo(text, priority);
         input.value = '';
         input.focus();
         // uncheck high priority checkbox on input
         form.reset();
     }

 });

 const addTodo = (text, priority) => {
     const todo = {
         text,
         priority: priority,
         done: false,
         id: Date.now(),
     };
     todoList.push(todo);
     renderProgressList();
 };

 // render Progress list
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
     progressList.innerHTML = progress.map(list => `<li><input type="checkbox" onClick="markDone(${list.id})">${ list.text } ${ list.priority } <span onClick="deleteTask(${list.id})">🗑</span></li>`).join('');
 }

 //delete task
 const deleteTask = taskId => {
     todoList = todoList.filter(item => item.id !== taskId);
     setTimeout(function () {
         renderProgressList();
         renderDoneList();
     }, 300);
 }
 // mark task as done
 const markDone = taskId => {
     todoList.map(taskList => {
         if (taskList.id === taskId) taskList.done = true
     });
     setTimeout(function () {
         renderProgressList();
         renderDoneList();
     }, 500);
 }


 // render done list
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
     doneList.innerHTML = done.map(list => `<li><input type="checkbox" checked onClick="markUndone(${list.id})">${ list.text } ${ list.priority } <span onClick="deleteTask(${list.id})">🗑</span></li>`).join('');
     // console.log(todoList);
 }

 // mark task as done
 const markUndone = taskId => {
     todoList.map(taskList => {
         if (taskList.id === taskId) taskList.done = false
     });
     setTimeout(function () {
         renderProgressList();
         renderDoneList();
     }, 500);
 }