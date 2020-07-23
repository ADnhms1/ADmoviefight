let fetchData = async (val) => {
	let response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'dc45f4df',
			s: val
		}
	});

	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

reusable.createSearch('movieSearch1', 'searchContainer1', 'search1');

reusable.createSearch('movieSearch2', 'searchContainer2', 'search2');

let showData = async (searchVal, searchNO, inputNO) => {
	let data = await fetchData(searchVal);
	reusable.removeItems(searchNO);
	for (let e of data) {
		console.log(e.Title);
		let option = document.createElement('a');
		option.classList.add('dropdown-item');
		let imgSrc = '';
		if (e.Poster === 'N/A') {
			imgSrc = '';
		} else {
			imgSrc = e.Poster;
		}
		option.innerHTML = `<img height="50" width="50" src=${imgSrc}> <p>${e.Title} (${e.Year})</p>`;
		option.addEventListener('click', function() {
			document.querySelector(`#${inputNO}`).value = this.children[1].textContent;

			let summaryNO, noForHidingMenu;
			if (searchNO === 'searchContainer1') {
				summaryNO = 'summary1';
				noForHidingMenu = 'search1';
			} else {
				summaryNO = 'summary2';
				noForHidingMenu = 'search2';
			}
			hideDropdown(noForHidingMenu);
			searchMovie(document.querySelector(`#${inputNO}`).value, summaryNO);
		});
		document.querySelector(`#${searchNO}`).appendChild(option);
	}
};

let input1 = document.querySelector('#movieSearch1');
let stopKey1;

input1.addEventListener('input', function() {
	clearTimeout(stopKey1);

	let searchVal = input1.value;
	if (searchVal === '') {
		hideDropdown('search1');
		return;
	}

	stopKey1 = setTimeout(async function() {
		showData(searchVal, 'searchContainer1', 'movieSearch1');
		showDropdown('search1');
	}, 1000);
});

let input2 = document.querySelector('#movieSearch2');
let stopKey2;

input2.addEventListener('input', function() {
	clearTimeout(stopKey2);

	let searchVal = input2.value;
	if (searchVal === '') {
		hideDropdown('search2');
		return;
	}

	stopKey2 = setTimeout(async function() {
		showData(searchVal, 'searchContainer2', 'movieSearch2');
		showDropdown('search2');
	}, 1000);
});

document.addEventListener('click', function(event) {
	let dd1 = document.querySelector('#search1');
	let dd2 = document.querySelector('#search2');
	if (!dd1.contains(event.target) && !dd2.contains(event.target)) {
		hideDropdown('search1');
		hideDropdown('search2');
	}
});

function showDropdown(dropdownNO) {
	let el = document.querySelector(`#${dropdownNO}`).children;
	el[0].classList.add('is-active');
}

function hideDropdown(dropdownNO) {
	let el = document.querySelector(`#${dropdownNO}`).children;
	el[0].classList.remove('is-active');
}

let leftMovie, rightMovie;

async function searchMovie(movieName, summaryNO) {
	movieName = movieName.substring(0, movieName.length - 6);
	console.log(movieName);
	let response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'dc45f4df',
			t: movieName
		}
	});
	console.log(response.data);
	if (summaryNO === 'summary1') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	document.querySelector('.tutorial').classList.add('is-hidden');
	document.querySelector(`#${summaryNO}`).innerHTML = reusable.createSumary(response.data);

	if (leftMovie && rightMovie) {
		let articles1 = document.querySelectorAll('#summary1 article');
		let articles2 = document.querySelectorAll('#summary2 article');
		articles1.forEach((val, i) => {
			if (articles1[i].hasAttribute('data-value') && articles2[i].hasAttribute('data-value')) {
				let leftValue = parseInt(articles1[i].getAttribute('data-value'));
				let rightValue = parseInt(articles2[i].getAttribute('data-value'));
				if (leftValue > rightValue) {
					articles1[i].classList.remove('is-primary');
					articles1[i].classList.add('is-warning');
				} else {
					articles2[i].classList.remove('is-primary');
					articles2[i].classList.add('is-warning');
				}
			}
		});
	}
}
