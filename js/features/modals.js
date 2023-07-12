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
}