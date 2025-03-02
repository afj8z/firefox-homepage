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
  const links = [...document.querySelectorAll(".column a")]; // Collect all links
  let selectedIndex = -1; // -1 means search bar is selected
  let inSearchMode = true; // Start in insert mode

  if (searchBox) {
    searchBox.addEventListener("input", function () {
      output.innerText = searchBox.value;
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

    searchBox.addEventListener("blur", () => searchBox.focus());
    searchBox.focus();
  }

  // Function to update selection highlighting
  function updateSelection() {
    links.forEach((link, index) => {
      if (index === selectedIndex) {
        link.style.backgroundColor = "#5bbbe3"; // Highlight selected link
        link.style.color = "#1b1b21"; // Change text color for contrast
      } else {
        link.style.backgroundColor = "transparent";
        link.style.color = "#e3a65b"; // Reset color
      }
    });
  }

  // Vim-style keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (inSearchMode) {
      if (event.key === "Escape") {
        // Exit search mode
        inSearchMode = false;
        searchBox.blur();
        selectedIndex = 0; // Move to first link
        updateSelection();
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case "h": // Move left
        if (selectedIndex > 0) selectedIndex--;
        updateSelection();
        break;

      case "l": // Move right
        if (selectedIndex < links.length - 1) selectedIndex++;
        updateSelection();
        break;

      case "j": // Move down (go to search box)
        selectedIndex = -1;
        inSearchMode = true;
        searchBox.focus();
        updateSelection();
        break;

      case "k": // Move up (go to first link)
        selectedIndex = 0;
        updateSelection();
        break;

      case "i": // Enter insert mode (focus search)
        inSearchMode = true;
        selectedIndex = -1;
        searchBox.focus();
        updateSelection();
        event.preventDefault();
        break;

      case "Enter": // Open selected link
        if (selectedIndex >= 0) {
          links[selectedIndex].click();
        }
        break;
    }
  });

  // Start in search mode by default
  searchBox.focus();
});
