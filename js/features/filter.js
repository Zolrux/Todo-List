export default class TaskFilter {
  constructor(...filterBtnElems) {
    this.filterBtnElems = filterBtnElems;
    this.#todoTaskFilter();
  }

  #setActiveFilterBtn(activeFilterBtnEl) {
    this.filterBtnElems.forEach((filterBtnEl) => {
      if (filterBtnEl !== activeFilterBtnEl) {
        filterBtnEl.classList.remove('_active');
      }
    });

    activeFilterBtnEl.classList.add('_active');
  }

  #todoTaskFilter() {
    this.filterBtnElems.forEach((filterElem) => {
      filterElem.addEventListener('click', (e) => {
        const allTodoTasks = document.querySelectorAll('[data-todo-task]');

        // Filter All todo tasks
        if (e.target.closest('[data-filter-all]')) {
			const getCreateTaskEl = document.querySelector('.todo-top__create');
			getCreateTaskEl.style.display = 'flex';

          allTodoTasks.forEach((todoTask) => {
            const getCompleteBtn = todoTask.querySelector('[data-todo-complete-btn]');
            getCompleteBtn.style.display = 'block';

            todoTask.style = '';
            todoTask.classList.remove('todo-task');
            setTimeout(() => {
              todoTask.classList.add('todo-task');
            }, 0);
          });

          this.#setActiveFilterBtn(e.target);
        }
        // Filter ACTIVE todo tasks
        else if (e.target.closest('[data-filter-active]')) {
			const getCreateTaskEl = document.querySelector('.todo-top__create');
			getCreateTaskEl.style.display = 'flex';

          allTodoTasks.forEach((todoTask) => {
            if (!todoTask.hasAttribute('data-todo-task-active')) {
              todoTask.style.display = 'none';
              todoTask.classList.remove('todo-task');
            } else {
              const getCompleteBtn = todoTask.querySelector('[data-todo-complete-btn]');
              getCompleteBtn.style.display = 'none';

              todoTask.style.display = 'flex';
              todoTask.classList.remove('todo-task');
              setTimeout(() => {
                todoTask.classList.add('todo-task');
              }, 0);
            }
          });

          this.#setActiveFilterBtn(e.target);
        }
        // Filter COMPLETED todo tasks
        else if (e.target.closest('[data-filter-completed]')) {
          const getCreateTaskEl = document.querySelector('.todo-top__create');
          getCreateTaskEl.style.display = 'none';

          allTodoTasks.forEach((todoTask) => {
            if (!todoTask.hasAttribute('data-todo-task-complete')) {
              todoTask.style.display = 'none';
              todoTask.classList.remove('todo-task');
            } else {
              todoTask.style.display = 'flex';
              todoTask.classList.remove('todo-task');
              setTimeout(() => {
                todoTask.classList.add('todo-task');
              }, 0);
            }
          });

          this.#setActiveFilterBtn(e.target);
        }
      });
    });
  }
}
