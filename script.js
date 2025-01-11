// script.js

// Select DOM elements
const addTab = document.getElementById('add-tab');
const collectionsTab = document.getElementById('collections-tab');
const addQuoteView = document.getElementById('add-quote-view');
const collectionsView = document.getElementById('collections-view');
const saveQuoteButton = document.getElementById('save-quote');
const quoteInput = document.getElementById('quote-input');
const cardsContainer = document.getElementById('cards-container');

// Color array
const colors = [
    '#0496FF',
    '#F06449',
    '#5BC3EB',
    '#21897E',
    '#49A078',
    '#3B28CC',
    '#BB4430',
    '#C44900',
    '#C7EF00',
    '#E59500',
    '#840032',
    '#77ACA2',
    '#DB504A'
];

// Initialize collections from localStorage or empty array
let collections = JSON.parse(localStorage.getItem('collections')) || [];

// Initialize color index
let colorIndex = 0;

// Function to switch views
function showView(view) {
    if (view === 'add') {
        addQuoteView.classList.add('active');
        collectionsView.classList.remove('active');
        addTab.classList.add('active');
        collectionsTab.classList.remove('active');
    } else {
        addQuoteView.classList.remove('active');
        collectionsView.classList.add('active');
        addTab.classList.remove('active');
        collectionsTab.classList.add('active');
        renderCollections();
    }
}

// Event listeners for tabs
addTab.addEventListener('click', () => showView('add'));
collectionsTab.addEventListener('click', () => showView('collections'));

// Function to render collections
function renderCollections() {
    // Clear existing cards
    cardsContainer.innerHTML = '';

    if (collections.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No quotes added yet. Click the + button to add a new quote.";
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#777';
        cardsContainer.appendChild(emptyMessage);
        return;
    }

    // Iterate over collections and create card elements
    collections.forEach((quote, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = quote;
        // Assign background color
        card.style.backgroundColor = colors[index % colors.length];
        cardsContainer.appendChild(card);
    });
}

// Function to save a new quote
function saveQuote() {
    const quote = quoteInput.value.trim();
    if (quote === '') {
        alert('Please enter a quote.');
        return;
    }

    // Add to collections
    collections.push(quote);
    // Save to localStorage
    localStorage.setItem('collections', JSON.stringify(collections));
    // Clear input
    quoteInput.value = '';
    // Switch to Collections view
    showView('collections');
}

// Event listener for save button
saveQuoteButton.addEventListener('click', saveQuote);

// Allow saving quote by pressing Enter while focused on textarea
quoteInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        saveQuote();
    }
});

// Initial render
renderCollections();

// Swipe functionality is handled by CSS scroll snapping
// Additional JavaScript for enhanced swipe can be implemented if needed
