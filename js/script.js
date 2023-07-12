'use strict';

import TypedText from './features/typed.js';

const animationText = new TypedText(
	'.todo-top__text',
	document.querySelector('.todo-top__text').textContent,
	50
);

animationText.start(7000);