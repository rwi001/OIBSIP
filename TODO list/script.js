const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  li.querySelector('.task-text').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  taskList.appendChild(li);
  taskInput.value = '';
}
