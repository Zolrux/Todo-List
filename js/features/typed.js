export default class TypedText {
	constructor(element, text, animationDuration) {
		this.element = document.querySelector(element);
		this.text = text;
		this.animationDuration = animationDuration;
	}
	start(repeatTime) {
		const makeAnimation = () => {
			let str = '';
			this.element.innerHTML = '';
			const input = i => {
				setTimeout(() => {
					str += this.text[i];
					this.element.textContent = str;
				}, this.animationDuration * i)
			}
			for (let i = 0; i < this.text.length; i++) {
				requestAnimationFrame(() => {
					input(i);
				});
			}
		}

		makeAnimation();

		const timerId = setInterval(() => {
			makeAnimation();
		}, repeatTime);
	}
}

