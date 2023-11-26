fetch("http://localhost:5678/api/works") 
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
	categories.unshift({id: 0, name: "Tous"});
	console.log(categories);
	categories.forEach((category, index) => {
		let buttonElement = document.createElement("button");
		buttonElement.classList.add("work-filter");
		buttonElement.classList.add("filters-design");
		if(category.id === 0) buttonElement.classList.add("filter-active", "filter-tous");
		buttonElement.setAttribute("data-filter", category.id);
		buttonElement.textContent = category.name;
		
		document.querySelector(".filters").appendChild(buttonElement);

		buttonElement.addEventListener("click", function(event) {
			event.preventDefault();

			document.querySelectorAll(".work-filter").forEach((workFilter) => {
                workFilter.classList.remove("filter-active");
            });
            event.target.classList.add("filter-active");

			let categoryId = buttonElement.getAttribute("data-filter");
			document.querySelectorAll(".work-item").forEach(workItem => {
				workItem.style.display = "none";
			});
			document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => {
				workItem.style.display = "block";
			});
		});
	});
})
.catch(function(err) {
	console.log(err);
});


document.addEventListener("DOMContentLoaded", function() {

	// Vérification si le token et userId sont dans le localStorage
	if(localStorage.getItem("token") != null && localStorage.getItem("userId") != null) {
		document.querySelector("body").classList.add("connected");
		let topBar = document.getElementById("barre-edition");
		topBar.style.display = "flex";
		let filters = document.getElementById("filters-container");
		filters.style.display = "none";
		let space = document.getElementById("modal-admin");
		space.style.paddingBottom = "100px";
	}

	// Déconnexion
	document.getElementById("nav-logout").addEventListener("click", function(event) {
		event.preventDefault();
		localStorage.removeItem("userId");
		localStorage.removeItem("token");
		document.querySelector("body").classList.remove(`connected`);
		let topBar = document.getElementById("barre-edition");
		topBar.style.display = "none";
		let filters = document.getElementById("filters-container");
		filters.style.display = "flex";
		let space = document.getElementById("modal-admin");
		space.style.paddingBottom = "0";
	});

});

document.addEventListener("DOMContentLoaded", function() {
	let modal = null

	const openModal = function (e) {
		e.preventDefault()
		const target = document.querySelector(e.target.getAttribute("href"))
		target.style.display = "flex"
		target.removeAttribute("aria-hidden")
		target.setAttribute("aria-modal", "true")
		modal = target
		modal.addEventListener("click", closeModal)
		modal.querySelector(".modal-xmark").addEventListener("click", closeModal)
		modal.querySelector(".modal-xmark-ajout").addEventListener("click", closeModal)
		modal.querySelector(".modal-stop").addEventListener("click", stopPropagation)
		modal.querySelector(".modal-ajout-travaux").addEventListener("click", stopPropagation)
	}
	
	const closeModal = function (e) {
		e.preventDefault()
		const target = document.querySelector(e.target.getAttribute("href"))
		modal.style.display = "none"
		modal.setAttribute("aria-hidden", "true")
		modal.removeAttribute("aria-modal")
		modal.removeEventListener("click", closeModal)
		modal.querySelector(".modal-xmark").removeEventListener("click", closeModal)
		modal.querySelector(".modal-xmark-ajout").removeEventListener("click", closeModal)
		modal.querySelector(".modal-stop").removeEventListener("click", stopPropagation)
		modal.querySelector(".modal-ajout-travaux").removeEventListener("click", stopPropagation)	
		modal = null
		let modal1 = document.getElementById("modal1");
		modal1.style.display = "block";
		let modal2 = document.getElementById("modal2");
		modal2.style.display = "none";
		if(document.getElementById("input-img-preview") != null) {
			document.getElementById("input-img-preview").remove();
		}
		document.getElementById("form-modal-ajout-photo").reset();
		let iconImg = document.getElementById("icon-img");
		iconImg.style.display= "block";
		let btnAjout = document.getElementById("btn-ajout-image");
		btnAjout.style.display= "block";
		let textImg = document.getElementById("text-taille-img");
		textImg.style.display= "block";	
		let containerPhoto = document.getElementById("container-photo");
		containerPhoto.style.padding = "30px 0 19px 0";
		document.getElementById("btn-envoie").style.backgroundColor = "#A7A7A7";
	}

	const stopPropagation = function (e) {
		e.stopPropagation()
	}

	document.querySelectorAll(".lien-modal").forEach(a => {
		a.addEventListener("click", openModal)
	})


});


fetch("http://localhost:5678/api/works") 
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
		figureElement.setAttribute("id", `work-item-modal-${work.id}`);
		// Création de la balise <img>
		let imgElement = document.createElement("img");
		imgElement.setAttribute("src", work.imageUrl);
		imgElement.setAttribute("alt", work.title);
		figureElement.appendChild(imgElement);
		// Création de l"icône suppression
		let suppElement = document.createElement("i");
		suppElement.classList.add("fa-solid", "fa-trash-can", "icone-supp")
		figureElement.appendChild(suppElement);
		// Suppresion du projet 
		suppElement.addEventListener("click", function(event) {
			event.preventDefault();
			if(confirm("Voulez-vous supprimer cet élément ?")) {
				// Fetch pour supprimer un projet
				fetch(`http://localhost:5678/api/works/${work.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token")
					}
				})
				.then(function(response) {
					switch(response.status) {
						case 500:
						case 503:
							alert("Comportement inattendu!");
						break;
						case 401:
							alert("Suppresion impossible!");
						break;
						case 200:
						case 204:
							console.log("Projet supprimé.");
							// Suppression du projet sur la page
							document.getElementById(`work-item-${work.id}`).remove();
							console.log(`work-item-${work.id}`);
							// Suppression du projet sur la modal
							document.getElementById(`work-item-modal-${work.id}`).remove();
							console.log(`work-item-modal-${work.id}`);
						break;
						default:
							alert("Erreur inconnue!");
						break;
					}
				})
			}
		})
		// Ajout de <figure> à la div .modal-gallery
		document.querySelector(".modal-gallery").appendChild(figureElement);
	});
})
.catch(function(err) {
	console.log(err);
});



// affichage seconde modal 
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("btn-ajout").addEventListener("click", function(event) {
		event.preventDefault()
		let modal1 = document.getElementById("modal1");
		modal1.style.display = "none";
		let modal2 = document.getElementById("modal2");
		modal2.style.display = "block";
	});

	document.getElementById("arrow-left").addEventListener("click", function(event) {
		event.preventDefault()
		modal1.style.display = "block";
		modal2.style.display = "none";
		if(document.getElementById("input-img-preview") != null) {
			document.getElementById("input-img-preview").remove();
		}
		document.getElementById("form-modal-ajout-photo").reset();
		let iconImg = document.getElementById("icon-img");
		iconImg.style.display= "block";
		let btnAjout = document.getElementById("btn-ajout-image");
		btnAjout.style.display= "block";
		let textImg = document.getElementById("text-taille-img");
		textImg.style.display= "block";	
		let containerPhoto = document.getElementById("container-photo");
		containerPhoto.style.padding = "30px 0 19px 0";
		document.getElementById("btn-envoie").style.backgroundColor = "#A7A7A7";
	});

	document.getElementById("input-img").addEventListener("change", () => {
		let fileInput = document.getElementById("input-img");
		const maxFileSize = 4 * 1024 * 1024; // 4MB
		if(fileInput.files[0].size > maxFileSize) {
			alert("Le fichier sélectionné est trop volumineux.");
			document.getElementById("input-img").value = "";
		}
		else {
			if(fileInput.files.length > 0) {
            	// Prévisualition de l"image
				let previsuElement = document.createElement("img");
				previsuElement.setAttribute("id","input-img-preview");
				previsuElement.src = URL.createObjectURL(fileInput.files[0]);
				document.querySelector(".container-ajout-photo").appendChild(previsuElement);
				previsuElement.style.display = "block";	
				previsuElement.style.height ="176px";
				let iconImg = document.getElementById("icon-img");
				iconImg.style.display= "none";
				let btnAjout = document.getElementById("btn-ajout-image");
				btnAjout.style.display= "none";
				let textImg = document.getElementById("text-taille-img");
				textImg.style.display= "none";	
				let containerPhoto = document.getElementById("container-photo");
				containerPhoto.style.padding = "0";
			}
		}
	});


	fetch("http://localhost:5678/api/categories")
		.then(function(response) {
			if(response.ok) {
				return response.json();
			}
		})
		.then(function(data) {
			let categories = data;
			categories.forEach((category, index) => {
			// Création de la balise option pour chaque catégorie
			let optionElement = document.createElement("option");
			optionElement.setAttribute("value", category.id);
			optionElement.textContent = category.name;
			document.querySelector(".choix-categorie").appendChild(optionElement);
			});
		})
		.catch(function(err) {
			console.log(err);
		});


	// Récupération du formulaire

	document.getElementById("form-modal-ajout-photo").addEventListener("submit", function(event) {
		event.preventDefault();
		let formData = new FormData();
		formData.append("title", document.getElementById("titre").value);
		formData.append("category", document.getElementById("input-categorie").value);
		formData.append("image", document.getElementById("input-img").files[0]);

		fetch("http://localhost:5678/api/works", {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("token"),
			},
			body: formData
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
				case 503:
					alert("Erreur inattendue!");
				break;
				case 400:
				case 404:
					alert("Impossible d'ajouter le nouveau projet!");
				break;
				case 200:
				case 201:
					console.log("Projet ajouté avec succés!");
					return response.json();
				break;
				default:
					alert("Erreur inconnue!");
				break;
			}
		})
		.then(function(json) {
			console.log(json);

			let figureElement = document.createElement("figure");
			
			figureElement.setAttribute("class", `work-item category-id-0 category-id-${json.categoryId}`);
			
			figureElement.setAttribute("id", `work-item-${json.id}`);
			

			let imgElement = document.createElement("img");
			imgElement.setAttribute("src", json.imageUrl);
			imgElement.setAttribute("alt", json.title);
			figureElement.appendChild(imgElement);
			
			let figcaptionElement = document.createElement("figcaption");
			figcaptionElement.textContent = json.title;
			figureElement.appendChild(figcaptionElement);

			
			document.querySelector(".gallery").appendChild(figureElement);
			


			let figureModalELement = document.createElement("figure");
			figureModalELement.setAttribute("class", `work-item category-id-0 category-id-${json.categoryId}`);
			figureModalELement.setAttribute("id", `work-item-modal-${json.id}`);
			let imgModalElement = document.createElement("img");
			imgModalElement.setAttribute("src", json.imageUrl);
			imgModalElement.setAttribute("alt", json.title);
			figureModalELement.appendChild(imgModalElement);
			let suppElement = document.createElement("i");
			suppElement.classList.add("fa-solid", "fa-trash-can", "icone-supp");
			figureModalELement.appendChild(suppElement);
			document.querySelector(".modal-gallery").appendChild(figureModalELement);


			let modal = document.getElementById("modal")
			modal.style.display = "none";
			let modal1 = document.getElementById("modal1");
			modal1.style.display = "block";
			let modal2 = document.getElementById("modal2");
			modal2.style.display = "none";
			if(document.getElementById("input-img-preview") != null) {
				document.getElementById("input-img-preview").remove();
			}
			document.getElementById("form-modal-ajout-photo").reset();
			let iconImg = document.getElementById("icon-img");
			iconImg.style.display= "block";
			let btnAjout = document.getElementById("btn-ajout-image");
			btnAjout.style.display= "block";
			let textImg = document.getElementById("text-taille-img");
			textImg.style.display= "block";	
			let containerPhoto = document.getElementById("container-photo");
			containerPhoto.style.padding = "30px 0 19px 0";
			document.getElementById("btn-envoie").style.backgroundColor = "#A7A7A7";
			
		})
		.catch(function(err) {
			console.log(err);
		});
	});

	function checkNewProjectFields() {
		let titre = document.getElementById("titre");
		let categorie = document.getElementById("input-categorie");
		let image = document.getElementById("input-img");
		let btnEnvoie = document.getElementById("btn-envoie");
		if(titre.value.trim() === "" || categorie.value.trim() === "" || image.files.length === 0) {
			btnEnvoie.style.backgroundColor= "#A7A7A7";
		} else {
			btnEnvoie.style.backgroundColor= "#1D6154";
		}
	};

	document.getElementById("titre").addEventListener("input", checkNewProjectFields);
	document.getElementById("input-categorie").addEventListener("input", checkNewProjectFields);
	document.getElementById("input-img").addEventListener("input", checkNewProjectFields);
})

