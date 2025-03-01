// Load ASCII Art from header.txt
fetch("ascii/header.txt")
  .then((response) => response.text())
  .then((text) => {
    document.getElementById("ascii-header").textContent = text;
  });

// Handle search input
document
  .getElementById("search-box")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let query = this.value.trim();
      if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`;
      }
    }
  });
