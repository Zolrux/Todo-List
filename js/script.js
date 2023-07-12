'use strict';

import TypedText from './features/typed.js';
import Modal from './features/modals.js';


// Animation Type Text
new TypedText(
	'.todo-top__text',
	document.querySelector('.todo-top__text').textContent,
	50
).start(7000);

// Modals

// Modal create task
new Modal(
	document.querySelector('[data-modal-create]'),
	document.querySelector('[data-modal-create-btn]'),
	document.querySelector('[data-modal-create-close-btn]'),
);