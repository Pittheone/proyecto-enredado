const axios = require('axios');

axios.get('https://dog.ceo/api/breeds/image/random')
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});