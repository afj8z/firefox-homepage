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
      header.innerText = text;
    }
  })
  .catch((error) => console.error("Error loading ASCII art:", error));

// Handle search input and command prompt display
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const output = document.getElementById("search-output");
  const cursorSpan = document.querySelector(".cursor");
  const columns = document.querySelectorAll(".column");
  let selectedColumn = 0; // Track current column index
  let selectedIndex = 0; // Track row index inside column
  let inSearchMode = true; // Start in insert mode

  // Collect links for each column
  const columnLinks = Array.from(columns).map((column) => [
    ...column.querySelectorAll("a"),
  ]);

  function updateSelection() {
    columnLinks.forEach((links, colIndex) => {
      links.forEach((link, rowIndex) => {
        if (colIndex === selectedColumn && rowIndex === selectedIndex) {
          link.classList.add("selected");
        } else {
          link.classList.remove("selected");
        }
      });
    });
  }

  document.addEventListener("keydown", (event) => {
    if (inSearchMode) {
      if (event.key === "Escape") {
        // Exit search mode
        inSearchMode = false;
        searchBox.blur();
        selectedColumn = 0;
        selectedIndex = 0;
        updateSelection();
        event.preventDefault();
      }

      if (event.key === "Enter") {
        // Perform Google Search
        let query = searchBox.value.trim();
        if (query) {
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
            query
          )}`;
        }
      }
      return;
    }

    switch (event.key) {
      case "h": // Move left (previous column)
        if (selectedColumn > 0) {
          selectedColumn--;
          selectedIndex = Math.min(
            selectedIndex,
            columnLinks[selectedColumn].length - 1
          );
          updateSelection();
        }
        break;

      case "l": // Move right (next column)
        if (selectedColumn < columnLinks.length - 1) {
          selectedColumn++;
          selectedIndex = Math.min(
            selectedIndex,
            columnLinks[selectedColumn].length - 1
          );
          updateSelection();
        }
        break;

      case "j": // Move down within column
        if (selectedIndex < columnLinks[selectedColumn].length - 1) {
          selectedIndex++;
          updateSelection();
        }
        break;

      case "k": // Move up within column
        if (selectedIndex > 0) {
          selectedIndex--;
          updateSelection();
        }
        break;

      case "i": // Enter insert mode (focus search)
        inSearchMode = true;
        searchBox.focus();
        event.preventDefault();
        break;

      case "Enter": // Open selected link
        if (columnLinks[selectedColumn][selectedIndex]) {
          columnLinks[selectedColumn][selectedIndex].click();
        }
        break;
    }
  });

  // Start in search mode by default
  searchBox.focus();
});
