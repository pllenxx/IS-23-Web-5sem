(function() {
    function displayLoadTime() {
        let loadTime = performance.now();
        let footer = document.querySelector('footer');
        let loadTimeElement = document.createElement('p');
        loadTimeElement.textContent = 'Page load time is ' + loadTime + ' ms';
        footer.appendChild(loadTimeElement);
    }

    window.addEventListener('load', displayLoadTime);
})();