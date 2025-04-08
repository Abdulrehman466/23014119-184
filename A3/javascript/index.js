// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        document.body.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Coffee facts for rotating display
    const coffeeFacts = [
        "Coffee is the second most traded commodity in the world, after oil.",
        "It takes about 42 coffee beans to make an espresso.",
        "Coffee trees can live up to 100 years.",
        "Brazil produces around 40% of the world's coffee.",
        "The word 'coffee' comes from the Arabic word 'qahwah'."
    ];

    // Add facts to the page dynamically if the element exists
    const factsContainer = document.getElementById('coffee-facts');
    if (factsContainer) {
        let currentFact = 0;
        // Display first fact
        factsContainer.textContent = coffeeFacts[currentFact];
        
        // Rotate facts every 5 seconds
        setInterval(function() {
            currentFact = (currentFact + 1) % coffeeFacts.length;
            // Fade out
            factsContainer.style.opacity = 0;
            
            setTimeout(function() {
                // Change content
                factsContainer.textContent = coffeeFacts[currentFact];
                // Fade in
                factsContainer.style.opacity = 1;
            }, 500);
        }, 5000);
    }

    // Removed video/play button functionality
});