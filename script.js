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

// Handle search input and command prompt display
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const prompt = document.querySelector(".search-container");
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  cursorSpan.innerText = "_";

  if (searchBox && prompt) {
    searchBox.addEventListener("input", function () {
      document.getElementById("search-output").innerText = searchBox.value;
    });

    searchBox.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        let query = searchBox.value.trim();
        if (query) {
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
            query
          )}`;
        }
      }
    });

    // Keep focus on input field
    searchBox.addEventListener("blur", () => searchBox.focus());
    searchBox.focus();
  }
});
