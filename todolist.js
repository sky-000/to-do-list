document.addEventListener('DOMContentLoaded', () => {
      const taskInput = document.getElementById('task-input');
      const addTaskBtn = document.getElementById('add-task-btn');
      const taskList = document.getElementById('task-list');
      const emptyImage = document.querySelector('.empty-image');
      const todoContainer = document.querySelector('.todo-container');


      const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todoContainer.style.width = taskList.children.length > 0 ? '100%':'50%';
      };


      const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox"/>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
            
        `;
        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

           checkbox.addEventListener('change', () => {
               const isChecked = checkbox.checked;
               li.classList.toggle('completed', isChecked);
               editBtn.disabled = isChecked;
               editBtn.style.opacity = isChecked ? '0.5' : '1';
               editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
           });


            editBtn.addEventListener('click', () => {
                if(!checkbox.checked){
                    taskInput.value = li.querySelector('span').textContent;
                    li.remove();
                    toggleEmptyState();
                }
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();
                toggleEmptyState();
            });


        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addTask(e);
        }
    });

});
