const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (title === '' || description === '') {
    return; // Let HTML5 handle the required message
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${title}</td>
    <td>${description}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  row.querySelector('.delete-btn').addEventListener('click', () => {
    taskList.removeChild(row);
  });

  taskList.appendChild(row);

  // Reset form
  form.reset();
});