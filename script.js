// Load ASCII Art from header.txt safely
fetch("assets/header.txt")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load ASCII header");
    }
    return response.text();
  })
  .then((text) => {
    const header = document.getElementById("ascii-header");
    if (header) {
      header.innerText = text; // Ensures ASCII formatting is preserved
    }
  })
  .catch((error) => console.error("Error loading ASCII art:", error));

// Handle search input
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");

  if (searchBox) {
    searchBox.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        let query = this.value.trim();
        if (query) {
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
            query
          )}`;
        }
      }
    });
  }
});
