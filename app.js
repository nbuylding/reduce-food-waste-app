const submit = document.querySelector('#submit-btn');
const input = document.querySelector('input');
const results = document.querySelector('.results');

const clearField = function () {
	input.value = '';
};

submit.addEventListener('click', function (e) {
	e.preventDefault();
	console.log(input.value);

	const foodItem = input.value;

	fetch(
		`https://wontxsvtrgdiablifnbp.supabase.co/rest/v1/food waste database`,
		{
			headers: {
				apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbnR4c3Z0cmdkaWFibGlmbmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2MjE5NTYsImV4cCI6MTk5NjE5Nzk1Nn0.ee-krhIqdkBmalwVbSb5afTUP7mDBq5VGpDgvFPQC6k',
				authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbnR4c3Z0cmdkaWFibGlmbmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2MjE5NTYsImV4cCI6MTk5NjE5Nzk1Nn0.ee-krhIqdkBmalwVbSb5afTUP7mDBq5VGpDgvFPQC6k',
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			let foodFound = false;
			for (let i = 0; i < data.length; i++) {
				const food = data[i].food;
				const storage = data[i].storage;
				const freezable = data[i].freezable;
				const freshness = data[i].freshness;
				const use = data[i].use;
				const compostable = data[i].compostable;

				if (foodItem === food) {
					results.innerHTML = `
				    <h2>${food}</h2>
                    <br>
				    <h3>Storage: ${storage}</h3>
				    <h3>Can you freeze it? ${freezable}</h3>
                    <br>
				    <p>Keep it fresh: ${freshness}.</p>
                    <br>
				    <p>Using every part: ${use}.</p>
                    <br>
				    <h3>Is it compostable? ${compostable}</h3>
				    `;
					foodFound = true;
					break;
				}
			}
			if (!foodFound) {
				results.innerHTML = `
                <h3>not found or invalid input</h3>`;
			}
			return results;
		});
	clearField();
});
