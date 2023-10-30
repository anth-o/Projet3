fetch("http://localhost:5678/api/categories") 
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})

.then(function(data) {
	let categories = data;
	console.log(categories);
	// Boucle sur chaque élément 
	categories.forEach((work, index) => {
		// Création de la balise <figure>
		let figureElement = document.createElement("figure");
		figureElement.setAttribute("class", `work-item category-id-0 category-id-${work.categoryId}`);
		figureElement.setAttribute("id", `work-item-${work.id}`);
		// Création de la balise <img>
		let imgElement = document.createElement("img");
		imgElement.setAttribute("src", work.imageUrl);
		imgElement.setAttribute("alt", work.title);
		figureElement.appendChild(imgElement);
		// Création de la balise <figcaption>
		let figcaptionElement = document.createElement("figcaption");
		figcaptionElement.textContent = work.title;
		figureElement.appendChild(figcaptionElement);
		// Ajout de <figure> à la div .gallery
		document.querySelector(".gallery").appendChild(figureElement);
	});
})
.catch(function(err) {
	console.log(err);
});


// Ajout des filtres pour les catégories

fetch("http://localhost:5678/api/categories")
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})

.then(function(data) {
	let categories = data;
	categories.unshift({id: 0, name: "Tous"})
	console.log(categories);
	// Boucle sur chaque catégorie
	categories.forEach((category, index) => {
		// Création de la balise <button>
		let buttonElement = document.createElement("button")
		buttonElement.classList.add("work-filter");
		buttonElement.classList.add("filters-design");
		if(category.id === 0) buttonElement.classList.add("filter-active", "filter-all");
		

