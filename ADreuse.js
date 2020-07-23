let awardString;
let reusable = {
	createSumary(movieDetails) {
		const boxoffice = parseInt(movieDetails.BoxOffice.replace('$', '').replace(/,/g, ''));
		const imdbRating = parseFloat(movieDetails.imdbRating);
		const metascore = parseInt(movieDetails.Metascore);
		const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''));
		awardString = movieDetails.Awards.split(' ');
		let totalAwards = 0;
		for (let e of awardString) {
			if (parseInt(e)) {
				totalAwards += parseInt(e);
			}
		}

		console.log(totalAwards, boxoffice, imdbRating, metascore);

		return `<article class="media">
                    <figure class="media-left">
                      <p class="image">
                        <img src="${movieDetails.Poster}">
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>${movieDetails.Title}</strong> <small>(${movieDetails.Year})</small>
                          <br>
                          <i>${movieDetails.Genre}</i>
                          <br>
                          ${movieDetails.Plot}
                        </p>
                      </div>
                    </div>
                </article>
                <article data-value=${totalAwards} class="notification is-primary">
                    <p class="title">${movieDetails.Awards}</p>
                    <p class="subtitle">Awards</p>
                </article>
                <article data-value=${boxoffice} class="notification is-primary">
                    <p class="title">${movieDetails.BoxOffice}</p>
                    <p class="subtitle">Boxoffice Collection</p>
                </article>    
                <article data-value=${imdbRating} class="notification is-primary">
                    <p class="title">${movieDetails.imdbRating}</p>
                    <p class="subtitle">IMDB Rating</p>
                </article>    
                <article data-value=${metascore} class="notification is-primary">
                    <p class="title">${movieDetails.Metascore}</p>
                    <p class="subtitle">Metascore</p>
                </article>    
                <article data-value=${imdbVotes} class="notification is-primary">
                    <p class="title">${movieDetails.imdbVotes}</p>
                    <p class="subtitle">IMDB Votes</p>
                </article>    
                    `;
	},
	removeItems(searchContainerID) {
		let el = document.querySelector(`#${searchContainerID}`);
		el.innerHTML = '';
	},
	createSearch(inputID, searchContainerID, searchNO) {
		let div1 = document.createElement('div');
		div1.classList.add('dropdown');
		let input = document.createElement('input');
		input.id = inputID;
		input.classList.add('input');
		let div2 = document.createElement('div');
		div2.classList.add('dropdown-menu');
		let div3 = document.createElement('div');
		div3.classList.add('dropdown-content');
		div3.id = searchContainerID;
		div2.appendChild(div3);
		div1.appendChild(input);
		div1.appendChild(div2);
		document.querySelector(`#${searchNO}`).appendChild(div1);
	}
};
