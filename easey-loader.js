class EasyLoaderImage extends HTMLElement {
	constructor() {
		super();
		this.template = `<img alt="test" src=""/>`;
		this.attachShadow({
			mode: 'open'
		});
		this.element = document.createElement('template');
		this.element.innerHTML = this.template;
		this.shadowRoot.appendChild(this.element.content.cloneNode(true));
	}

	connectedCallback() {
		const imgElement = this.shadowRoot.querySelector('img')
		let imageSrc = this.getAttribute('src');
		let imageAlt = this.getAttribute('alt');
		let imageAnimation = this.getAttribute('easy-animation');

		function getAnimate(element) {
			switch (imageAnimation) {
				case 'fade':
					element.animate([{
							'opacity': '0'
						},
						{
							'opacity': '1'
						}
					], {
						duration: 750,
						easing: 'linear'
					})
					break;
				case 'scale':
					element.animate([{
							transform: 'scale(0)'
						},
						{
							transform: 'scale(1)'
						}
					], {
						duration: 500,
						easing: 'ease'
					})
					break;
			}
		}

		function observerCallback(entries) {
			entries.forEach(entrie => {
				console.log(imageSrc);
				if (entrie.isIntersecting) {
					entrie.target.src = imageSrc;
					getAnimate(entrie.target);
					observer.disconnect();
				}
			})
		}

		const observer = new IntersectionObserver(observerCallback, {
			rootMargin: '10px'
		})
		observer.observe(imgElement)
		if (imageSrc != undefined && imageSrc != null && imageSrc.trim() != '') {
			imgElement.src = imageSrc.trim()
			if (imageAlt != undefined && imageAlt != null && imageAlt.trim() != '') {
				imgElement.alt = imageAlt
			} else {
				imgElement.alt = 'Easy Loader Error'
			}
		} else {
			imgElement.alt = 'Easy Loader Error'
		}
	}
}
window.customElements.define('easy-img', EasyLoaderImage);