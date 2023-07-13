'use strict';

import TypedText from './features/typed.js';
import {Modal, TodoTask} from './features/todo.js';


// Animation Type Text
new TypedText(
	'.todo-top__text',
	document.querySelector('.todo-top__text').textContent,
	50
).start(7000);

// Modals

// Modal which create a new task
new Modal(
	document.querySelector('[data-modal-create]'),
	document.querySelector('[data-modal-create-btn]')
);


// Todo

// Check if Todo task element contains 1 or more tasks
if (document.querySelector('.todo-center__content').children.length) {
	new TodoTask(
		document.querySelector('.todo-center__content'),
		'',
		false
	);
}