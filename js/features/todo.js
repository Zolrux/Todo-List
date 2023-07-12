export default class Modal {
  constructor(modalEl, btnModalOpen, btnModalClose) {
    this.modalEl = modalEl;
    this.btnModalOpen = btnModalOpen;
    this.btnModalClose = btnModalClose;
    this.#modalOpen();
  }

  #modalOpen() {
    this.btnModalOpen.addEventListener('click', (e) => {
      this.modalEl.classList.add('_active');
      document.body.style.overflow = 'hidden';
      this.#addHandlerBtn();
    });
    this.#modalClose();
  }

  #modalClose() {
    const modalOverlay = this.modalEl.querySelector('[data-modal-overlay]');
    window.addEventListener('click', (e) => {
      const checkCloseModal = e.target === modalOverlay || e.target.closest('[data-modal-create-close-btn]');
      if (checkCloseModal) {
        this.modalEl.classList.remove('_active');
        document.body.style = '';
      }
    });
  }

  #addHandlerBtn() {
    const addBtn = document.querySelector('[data-modal-add-btn]');
    const textArea = document.querySelector('.modal__textarea');
    addBtn.addEventListener('click', (e) => {
      if (textArea.value.trim()) {
        this.modalEl.classList.remove('_active');
        document.body.style = '';
        new TodoTask(document.querySelector('.todo-center__content'), textArea.value);
        textArea.value = '';
      }
    });
  }
}

class TodoTask {
  constructor(todoTaskParentEl, text) {
    this.todoTaskParentEl = todoTaskParentEl;
    this.text = text;
    this.#render(this.text);
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
				<button type="button" class="todo-task__btn-complete">
					<img src="img/icons/complete.svg" alt="check icon">
				</button>
				<button type="button" class="todo-task__btn-delete">
					<img src="img/icons/delete.svg" alt="delete icon">
				</button>
				<button type="button" class="todo-task__btn-edit">
					<img src="img/icons/edit.svg" alt="edit icon">
				</button>
			</div>
			<time class="todo-task__date">${getFormatDate}</time>
		</div>
		`;
    this.todoTaskParentEl.insertAdjacentHTML('beforeend', template);
    TodoTask.addBtnConfigHandler();
  }

  static addBtnConfigHandler() {
	console.log(TodoTask.isMethodCall);
    if (!TodoTask.isMethodCall) {
      const parentEl = document.querySelector('.todo-center__content');
      parentEl.addEventListener('click', (e) => {
        if (e.target.closest('[data-todo-btn-config]')) {
          const taskEl = e.target.closest('.todo-task');
          taskEl.classList.toggle('_active');
        }
      });
      TodoTask.isMethodCall = true;
    }
  }
}