export class Modal {
  constructor(modalEl, btnModalOpenEl, indexTodoTaskEl = null) {
    this.modalEl = modalEl;
    this.btnModalOpenEl = btnModalOpenEl;
    if (indexTodoTaskEl !== null) {
      this.indexTodoTaskEl = indexTodoTaskEl;
    } else {
      this.modalOpen();
    }
  }

  #modalClose() {
    this.modalEl.addEventListener('click', (e) => {
      const modalOverlay = this.modalEl.querySelector('[data-modal-overlay]');
      const textArea = this.modalEl.querySelector('.modal__textarea');
      const checkCloseModal = e.target === modalOverlay || e.target.closest('[data-modal-close-btn]');
      if (checkCloseModal) {
        this.modalEl.classList.remove('_active');
        document.body.style = '';
        textArea.value = '';
      }
    });
  }

  #createNewTask() {
    const modalBtn = this.modalEl.querySelector('[data-modal-btn]');
    const textArea = this.modalEl.querySelector('.modal__textarea');

    modalBtn.addEventListener('click', (e) => {
      if (textArea.value.trim()) {
        this.modalEl.classList.remove('_active');
        document.body.style = '';
        new TodoTask(document.querySelector('.todo-center__content'), textArea.value);
        textArea.value = '';
      }
    });
  }

  #editTask() {
    const modalBtn = this.modalEl.querySelector('[data-modal-btn]');
    const textArea = this.modalEl.querySelector('.modal__textarea');
    modalBtn.addEventListener(
      'click',
      (e) => {
        if (textArea.value.trim()) {
          this.modalEl.classList.remove('_active');
          document.body.style = '';
          const todoTaskEl = document.querySelector('.todo-center__content').children[this.indexTodoTaskEl];
          const todoTaskText = todoTaskEl.querySelector('.todo-task__text');
          todoTaskText.textContent = textArea.value;
          textArea.value = '';
        }
      },
      { once: true }
    );
  }

  modalOpen(isOpenByModalEditBtnEl = false) {
    if (isOpenByModalEditBtnEl) {
      const todoTaskEl = document.querySelector('.todo-center__content').children[this.indexTodoTaskEl];
      const todoTaskText = todoTaskEl.querySelector('.todo-task__text');
		const todoTaskTextArea = this.modalEl.querySelector('.modal__textarea');

      this.modalEl.classList.add('_active');
      document.body.style.overflow = 'hidden';
		todoTaskTextArea.value = todoTaskText.textContent;

      this.#editTask(this.indexTodoTaskEl);

    } else {
      this.btnModalOpenEl.addEventListener('click', (e) => {
        this.modalEl.classList.add('_active');
        document.body.style.overflow = 'hidden';
        this.#createNewTask();
      });
    }
    this.#modalClose();
  }
}

export class TodoTask {
  static isMethodCall = false;

  constructor(todoTaskParentEl, text, isRendering = true) {
    this.todoTaskParentEl = todoTaskParentEl;
    if (isRendering) {
      this.text = text;
      this.#render(this.text);
    } else {
      this.text = text;
    }
    this.#addBtnsConfigHandler();
  }

  #convertData() {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return `${new Date().toLocaleDateString('en', options)}`;
  }

  #render(text) {
    const getFormatDate = this.#convertData();
    const template = `
		<div class="todo-center__task todo-task">
			<span class="todo-task__text">${text}</span>
			<div class="todo-task__btns">
				<button type="button" data-todo-btn-config class="todo-task__btn-config">
					<img src="img/icons/three-dots.svg" alt="three dots icon">
				</button>
				<button type="button" data-todo-complete-btn class="todo-task__btn-complete">
					<img src="img/icons/complete.svg" alt="check icon">
				</button>
				<button type="button" data-todo-delete-btn class="todo-task__btn-delete">
					<img src="img/icons/delete.svg" alt="delete icon">
				</button>
				<button type="button" data-todo-edit-btn class="todo-task__btn-edit">
					<img src="img/icons/edit.svg" alt="edit icon">
				</button>
			</div>
			<time class="todo-task__date">${getFormatDate}</time>

		</div>
		`;
    this.todoTaskParentEl.insertAdjacentHTML('beforeend', template);
  }

  #addBtnsConfigHandler() {
    if (!TodoTask.isMethodCall) {
      const parentEl = document.querySelector('.todo-center__content');

      parentEl.addEventListener('click', (e) => {
        // Main todo config btn
        if (e.target.closest('[data-todo-btn-config]')) {
          const taskEl = e.target.closest('.todo-task');
          taskEl.classList.toggle('_active');
        }
        // Complete todo btn
        else if (e.target.closest('[data-todo-complete-btn]')) {
          const todoTaskParentEl = e.target.closest('.todo-task');
          if (todoTaskParentEl) {
            todoTaskParentEl.classList.add('_complete');
          }
        }
        // Delete todo btn
        else if (e.target.closest('[data-todo-delete-btn]')) {
          const todoTaskParentEl = e.target.closest('.todo-task');
          if (todoTaskParentEl) {
            todoTaskParentEl.classList.add('_delete');
            todoTaskParentEl.addEventListener('animationend', () => {
              todoTaskParentEl.remove();
            });
          }
        }
        // Edit todo btn
        else if (e.target.closest('[data-todo-edit-btn]')) {
          const todoSectionEl = document.querySelector('.todo-center');
          const todoTaskParentEl = document.querySelector('.todo-center__content');
          const btnModalOpenEl = e.target.closest('[data-todo-edit-btn]');
          const todoTaskEl = e.target.closest('[data-todo-edit-btn]').closest('.todo-task');
          const todoModalEditParentEl = todoSectionEl.querySelector('[data-modal-edit]');
          const indexTodoTask = Array.from(todoTaskParentEl.children).findIndex((el) => el === todoTaskEl);

          const modalEdit = new Modal(todoModalEditParentEl, btnModalOpenEl, indexTodoTask);

          modalEdit.modalOpen(true);
        }
      });

      TodoTask.isMethodCall = true;
    }
  }
}
