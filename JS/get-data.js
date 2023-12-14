document.addEventListener("DOMContentLoaded", function() {
    const petsContainer = document.querySelector(".pets-slider");
    const preloader = document.createElement("div");
    const numOfPreloaders = 5
    const preloaders = []

    preloader.className = "preloader-grid-item";
    preloader.innerHTML = '<div class="preloader-contents"><img src="../slick/ajax-loader.gif" alt="Загрузка..."></div>';

    for (let i = 0; i < numOfPreloaders; i++) {
        preloaders.push(petsContainer.appendChild(preloader.cloneNode(true)))
    }

    const currentPage = document.location.pathname.split('/').pop().replace('.html', '');

    fetch('https://my-json-server.typicode.com/pllenxx/shelter-mock/' + currentPage)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response was not ok");
            }

            return response.json();
        })
        .then(data => {
            preloaders.forEach(preloader => preloader.style.display = "none")
            renderPets(data, petsContainer);
            $('.pets-slider').slick({
                slidesToShow: 3,
                infinite: true,
                slidesToScroll: 3,
                prevArrow: $('.prev-button-arrow'),
                nextArrow: $('.next-button-arrow')
            });
        })
        .catch(error => {
            console.error("An error occurred during request processing:", error);
            preloader.innerHTML = '<div class="preloader"><p>Что-то пошло не так...</p></div>';
        });
});

function renderPets(data, container) {
    const sortedData = data.sort(() => 0.5 - Math.random());

    sortedData.forEach(pet => {
        const petItem = document.createElement("div");
        petItem.className = "pet-grid-item";

        petItem.innerHTML = `
            <div class="pet-image">
                <img src="${pet.image}" alt="${pet.title}">
            </div>
            <div class="pet-card">
                <div class="pet-name">${pet.title}</div>
                <div class="pet-origin">${pet.origin}</div>
                <div class="learn-more-button">
                    <a id="learn-more-button-text" href="index.html">Узнать больше</a>
                </div>
            </div>
        `;

        container.appendChild(petItem);
    });
}