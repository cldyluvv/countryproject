function goBackHome() {  // back to mainpage button
    window.location.href = "index.html";}
function goCurrencyConverter() {
    window.location.href = "converter.html";}
function goBackHome2() {
    window.location.href = "currency.html";}
function goMaps() {  // back to mainpage button
    window.location.href = "maps.html";}
function goFlags() {  // back to mainpage button
    window.location.href = "flags.html";}
function goContinentsssss() {
    window.location.href = "allc.html";}
// ------------------------------------------------------------------------------------------------------------------------------------------- //
// Function to retrieve saved bookmarks from local storage
function getSavedBookmarks() {
    const savedBookmarksJson = localStorage.getItem('savedBookmarks');
    return savedBookmarksJson ? JSON.parse(savedBookmarksJson) : [];}
// Function to save bookmarks to local storage
function saveBookmarks(bookmarks) {
    localStorage.setItem('savedBookmarks', JSON.stringify(bookmarks));}
// Function to delete a saved bookmark
function deleteBookmark(countryName) {
    // Get the saved bookmarks from local storage
    const savedBookmarks = getSavedBookmarks();
    // Find the index of the bookmark to delete
    const indexToDelete = savedBookmarks.findIndex(bookmark => bookmark.name === countryName);
    if (indexToDelete !== -1) {
        // Remove the bookmark from the saved bookmarks
        savedBookmarks.splice(indexToDelete, 1);
        // Save the updated bookmarks to local storage
        saveBookmarks(savedBookmarks);
        // Reload and display saved flags on the bookmarks page
        loadSavedFlags();
    }}
// Modify the loadSavedFlags function to include an "Update" button
function loadSavedFlags() {
    const bookmarksList = document.getElementById('bookmarksList');
    bookmarksList.innerHTML = ''; // Clear existing list
    const savedBookmarks = getSavedBookmarks();
    savedBookmarks.forEach(bookmark => {
        const listItem = document.createElement('li');
        listItem.textContent = bookmark.name;
        // Add an "Update" button for each bookmark
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.classList.add('update'); // Add the 'update' class
        updateButton.addEventListener('click', () => {
            handleUpdateBookmark(bookmark.name);
        });
        // Add a "Delete" button for each bookmark
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete'); // Add the 'delete' class
        deleteButton.addEventListener('click', () => {
            deleteBookmark(bookmark.name);
        });
        // Append buttons to the list item
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        bookmarksList.appendChild(listItem);
    });}
// Function to toggle the favorite status of a country
function toggleFavorite(country, favoriteIcon) {
    const isFavorite = favoriteIcon.style.color === 'yellow';
    // Get the saved bookmarks from local storage
    const savedBookmarks = getSavedBookmarks();
    if (isFavorite) {
        // Remove the country from the saved bookmarks
        const indexToRemove = savedBookmarks.findIndex(b => b.name === country.name.common);
        if (indexToRemove !== -1) {
            savedBookmarks.splice(indexToRemove, 1);
        }
    } else {
        // Add the country to the saved bookmarks
        savedBookmarks.push({ name: country.name.common });
    }
    // Save the updated bookmarks to local storage
    saveBookmarks(savedBookmarks);
    // Toggle the color of the favorite icon
    favoriteIcon.style.color = isFavorite ? 'gray' : 'yellow';
    // Reload and display saved flags on the bookmarks page
    loadSavedFlags();}
// Function to update the name of a saved bookmark
function updateBookmark(oldName, newName) {
    // Get the saved bookmarks from local storage
    const savedBookmarks = getSavedBookmarks();
    // Find the index of the bookmark to update
    const indexToUpdate = savedBookmarks.findIndex(bookmark => bookmark.name === oldName);
    if (indexToUpdate !== -1) {
        // Update the name of the bookmark
        savedBookmarks[indexToUpdate].name = newName;
        // Save the updated bookmarks to local storage
        saveBookmarks(savedBookmarks);
        // Reload and display saved flags on the bookmarks page
        loadSavedFlags();
    }}
// Function to handle updating a bookmark (triggered by a user action)
function handleUpdateBookmark(oldName) {
    // Prompt the user for a new name
    const newName = prompt('Enter a new name for the bookmark:');
    if (newName !== null) {  // User pressed OK in the prompt
        // Update the bookmark
        updateBookmark(oldName, newName);
    }}
// Load and display saved flags when the bookmarks page is loaded
document.addEventListener('DOMContentLoaded', loadSavedFlags);


