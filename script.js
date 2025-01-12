// DOM elements
const addTab = document.getElementById('add-tab');
const collectionsTab = document.getElementById('collections-tab');
const addQuoteView = document.getElementById('add-quote-view');
const collectionsView = document.getElementById('collections-view');
const saveQuoteButton = document.getElementById('save-quote');
const cancelQuoteButton = document.getElementById('cancel-quote');
const quoteInput = document.getElementById('quote-input');
const cardsContainer = document.getElementById('cards-container');
const charCounter = document.getElementById('char-counter');

// Constants
const MAX_CHAR = 400;

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

// Collections from localStorage or empty
let collections = JSON.parse(localStorage.getItem('collections')) || [];

// Switch views function
function showView(view) {
  if (view === 'add') {
    addQuoteView.classList.add('active');
    collectionsView.classList.remove('active');
    addTab.classList.add('active');
    collectionsTab.classList.remove('active');
    // Reset the form
    quoteInput.value = '';
    updateCharCounter();
    saveQuoteButton.disabled = true;
    // Set focus to textarea
    quoteInput.focus();
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

// Render existing quotes
function renderCollections() {
  cardsContainer.innerHTML = '';

  if (collections.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent =
      'No quotes added yet. Click the + button to add a new quote.';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.color = '#777';
    emptyMessage.style.fontSize = '1.2rem';
    emptyMessage.style.marginTop = '50px';
    cardsContainer.appendChild(emptyMessage);
    return;
  }

  collections.forEach((quote, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = quote; // Use textContent to preserve formatting
    card.style.backgroundColor = colors[index % colors.length];
    cardsContainer.appendChild(card);
  });
}

// Update character counter
function updateCharCounter() {
  const currentLength = quoteInput.value.length;
  charCounter.textContent = `${currentLength} / ${MAX_CHAR}`;
  if (currentLength > MAX_CHAR) {
    charCounter.style.color = 'red';
    saveQuoteButton.disabled = true;
  } else {
    charCounter.style.color = '#555';
    saveQuoteButton.disabled = currentLength === 0;
  }
}

// Save a new quote
function saveQuote() {
  const quote = quoteInput.value.trim();
  if (!quote) {
    alert('Please enter a quote.');
    return;
  }
  if (quote.length > MAX_CHAR) {
    alert(`Quote exceeds the maximum length of ${MAX_CHAR} characters.`);
    return;
  }
  collections.push(quote);
  localStorage.setItem('collections', JSON.stringify(collections));
  // Provide feedback to the user
  showTemporaryMessage('Quote saved successfully!', 'success');
  // Switch to collections view
  showView('collections');
}

// Show temporary message
function showTemporaryMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add('temporary-message', type);
  document.body.appendChild(messageDiv);
  // Animate the message
  setTimeout(() => {
    messageDiv.classList.add('show');
  }, 10);
  // Remove after 3 seconds
  setTimeout(() => {
    messageDiv.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 3000);
}

// Cancel adding quote
function cancelAddingQuote() {
  if (quoteInput.value.trim() !== '') {
    const confirmCancel = confirm('Are you sure you want to discard your quote?');
    if (!confirmCancel) return;
  }
  showView('collections');
}

// Save with button
saveQuoteButton.addEventListener('click', saveQuote);

// Save with Enter key (unless Shift+Enter)
quoteInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (!saveQuoteButton.disabled) {
      saveQuote();
    }
  }
});

// Update character counter on input
quoteInput.addEventListener('input', updateCharCounter);

// Cancel button event
cancelQuoteButton.addEventListener('click', cancelAddingQuote);

// Initial render
renderCollections();
