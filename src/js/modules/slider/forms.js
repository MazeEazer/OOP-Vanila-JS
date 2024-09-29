export default class Form {
	constructor (forms) {
		this.forms = document.querySelectorAll(forms);
		this.message = {
			success: 'Your message has been sent successfully!',
			error: 'Something went wrong. Please try again later.',
			failure: 'Something went wrong. Please try again later.'
		}
		this.path = 'assets/question.php';
	}

	async postData(url, data) {
		const response = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await response.text();

	}


	init() {
		this.forms.forEach(form => {
			item.addEventListener('submit', (e) => {
				e.preventDefault();

				let statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px;
					color: grey;
				`
				item.parentNode.appendChild(statusMessage);


				statusMessage.textContent = this.message.loading;
				const formData = new FormData(form);
				
				this.postData(this.path, formData)
				.then(data => {
					console.log(data);
					statusMessage.textContent = this.message.success;
				})
				.catch(() => {
					statusMessage.textContent = this.message.failure;
				});
			});
		});
	}

	
}