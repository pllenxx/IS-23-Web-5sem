function highlightActivePage() {
    let currentPageUrl = document.location.href;
    let url = new URL(currentPageUrl)
    let relativePath = url.pathname

    let menuItems = document.querySelectorAll('body main div section aside nav p a .nav-item');

    menuItems.forEach(function(menuItem) {
        let menuItemLink = menuItem.getAttribute('href');

        if (relativePath === menuItemLink) {
            menuItem.classList.add('active');
        }
    })
}

document.addEventListener('DOMContentLoaded', () => highlightActivePage);