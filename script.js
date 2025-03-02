// Toggle Dog Mode
let dogMode = false;
function toggleDogMode() {
  const body = document.body;
  dogMode = !dogMode;

  // Define the Dog Mode SVG (Replace with your actual Dog Mode icon)
  const dogModeSVG = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 122.88 122.87" xml:space="preserve">
      <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
      <g><path class="st0" d="M16.69,101.1l-0.22-0.02c-4.9-0.42-9.18-2.78-12.14-6.24c-2.97-3.48-4.63-8.07-4.27-12.97
        c0-0.08,0.01-0.18,0.02-0.26c0.42-4.9,2.78-9.18,6.24-12.14c3.51-3,8.15-4.66,13.1-4.27l11.88,0.96
        c11.62-11.62,23.23-23.24,34.85-34.86l-0.96-11.88c-0.38-4.96,1.27-9.6,4.27-13.1c3-3.5,7.33-5.87,12.27-6.25
        c4.96-0.38,9.6,1.27,13.1,4.27c3.5,3,5.87,7.33,6.25,12.27l0.43,5.33l2.85-0.1l0-0.01h0.14c4.88-0.1,9.34,1.73,12.66,4.82
        c3.36,3.14,5.53,7.55,5.7,12.51v0.09h0.01v0.14c0.12,4.88-1.73,9.34-4.82,12.66c-3.14,3.36-7.55,5.53-12.52,5.7l-15.46,0.58
        C79.47,68.91,68.91,79.49,58.3,90.09l-0.58,15.46c-0.18,4.96-2.34,9.38-5.7,12.51c-3.36,3.13-7.92,4.98-12.88,4.81
        c-4.96-0.18-9.38-2.34-12.51-5.7c-3.13-3.36-4.98-7.92-4.81-12.88l0.1-2.75L16.69,101.1L16.69,101.1L16.69,101.1z"/></g>
    </svg>`;

  // Select all span.icon elements that contain the SVGs
  const iconContainers = document.querySelectorAll(".icon");

  if (dogMode) {
    body.classList.add("dog-mode");
    generateRandomBackground();
    loadAsciiArt("assets/dogo.txt", true); // Load Dog ASCII with styling

    // Replace all SVGs with Dog Mode SVG
    iconContainers.forEach((icon) => {
      if (!icon.dataset.originalSvg) {
        icon.dataset.originalSvg = icon.innerHTML; // Store original SVG
      }
      icon.innerHTML = dogModeSVG;
    });
  } else {
    body.classList.remove("dog-mode");
    loadAsciiArt("assets/header.txt", false); // Load Standard ASCII

    // Restore original icons
    iconContainers.forEach((icon) => {
      if (icon.dataset.originalSvg) {
        icon.innerHTML = icon.dataset.originalSvg;
      }
    });

    // Remove background tiles
    let bgContainer = document.getElementById("dog-background");
    if (bgContainer) bgContainer.innerHTML = "";

    let bgSecondaryContainer = document.getElementById(
      "dog-background-secondary"
    );
    if (bgSecondaryContainer) bgSecondaryContainer.innerHTML = "";
  }
}

// Function to load ASCII Art
function loadAsciiArt(file, applyStyling = false) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load ASCII header");
      return response.text();
    })
    .then((text) => {
      const header = document.getElementById("ascii-header");
      if (header) {
        header.innerHTML = applyStyling
          ? text
              .split("")
              .map(
                (char) => `<span class="ascii-random">${char}</span>` // Wrap each character
              )
              .join("")
          : text;

        // Add shadow to ASCII in dog mode for contrast
        if (applyStyling) {
          header.style.textShadow = "4px 4px 10px 10pxrgb(0, 0, 0)";
        } else {
          header.style.textShadow = "none";
        }
      }
    })
    .catch((error) => console.error("Error loading ASCII art:", error));
}

// Generate randomized dog background with uniform dimming
function generateRandomBackground() {
  const tileSizeX = 80;
  const tileSizeY = 80;
  const tileMargin = -1;

  const offsetX = -tileSizeX;
  const offsetY = -tileSizeY;

  const numRows =
    Math.ceil((window.innerHeight - offsetY) / (tileSizeY + tileMargin)) + 1;
  const numCols =
    Math.ceil((window.innerWidth - offsetX) / (tileSizeX + tileMargin)) + 1;

  let bgHTML = "";
  let bgSecondaryHTML = "";

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const flipX = Math.random() > 0.5 ? "-1" : "1";
      const flipY = Math.random() > 0.5 ? "-1" : "1";

      // 🎲 Improved rotation randomization
      const rotationOptions = [-90, -45, -30, -15, 0, 15, 30, 45, 90, 180, 270];
      const rotation =
        rotationOptions[Math.floor(Math.random() * rotationOptions.length)];

      // Primary background
      bgHTML += `<div class="dog-tile"
                      style="left: ${
                        col * (tileSizeX + tileMargin) + offsetX
                      }px;
                             top: ${row * (tileSizeY + tileMargin) + offsetY}px;
                             width: ${tileSizeX}px;
                             height: ${tileSizeY}px;
                             background-image: url('/assets/dogo.png');
                             background-size: contain;
                             background-repeat: no-repeat;
                             transform: scaleX(${flipX}) scaleY(${flipY}) rotate(${rotation}deg);
                             filter: brightness(0.8);
                             ">
                  </div>`;

      // Secondary background (larger, deeper layer)
      bgSecondaryHTML += `<div class="dog-tile secondary"
                      style="left: ${
                        col * (tileSizeX + tileMargin) + offsetX - 30
                      }px;
                             top: ${
                               row * (tileSizeY + tileMargin) + offsetY - 30
                             }px;
                             width: ${tileSizeX * 3}px;
                             height: ${tileSizeY * 3}px;
                             background-image: url('/assets/dogo.png');
                             background-size: contain;
                             background-repeat: no-repeat;
                             transform: scaleX(${flipX}) scaleY(${flipY}) rotate(${
        rotation + 10
      }deg);
                             filter: brightness(0.5);
                             ">
                  </div>`;
    }
  }

  let bgContainer = document.getElementById("dog-background");
  let bgSecondaryContainer = document.getElementById(
    "dog-background-secondary"
  );

  if (!bgContainer) {
    bgContainer = document.createElement("div");
    bgContainer.id = "dog-background";
    document.body.appendChild(bgContainer);
  }

  if (!bgSecondaryContainer) {
    bgSecondaryContainer = document.createElement("div");
    bgSecondaryContainer.id = "dog-background-secondary";
    document.body.insertBefore(bgSecondaryContainer, bgContainer);
  }

  bgContainer.innerHTML = bgHTML;
  bgSecondaryContainer.innerHTML = bgSecondaryHTML;
}

// Handle Search & Keyboard Navigation
document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("search-box");
  const searchOutput = document.getElementById("search-output");
  const cursorSpan = document.querySelector(".cursor");
  const columns = document.querySelectorAll(".column");
  let selectedColumn = 0;
  let selectedIndex = 0;
  let inSearchMode = true;

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

  function toggleCursorBlockMode(enable) {
    if (enable) {
      cursorSpan.classList.add("block");
    } else {
      cursorSpan.classList.remove("block");
    }
  }

  function toggleCursorBlinking(enable) {
    if (enable) {
      cursorSpan.classList.add("blinking");
    } else {
      cursorSpan.classList.remove("blinking");
    }
  }

  // Update search output and move cursor dynamically
  searchBox.addEventListener("input", () => {
    searchOutput.textContent = searchBox.value;

    // Ensure cursor follows text position
    cursorSpan.style.display = "inline";
    cursorSpan.style.marginLeft = "5px"; // Adjust spacing dynamically

    toggleCursorBlinking(false);
  });

  // Re-enable blinking when search box is empty & loses focus
  searchBox.addEventListener("blur", () => {
    if (searchBox.value.trim() === "") {
      toggleCursorBlinking(true);
    }
    toggleCursorBlockMode(false);
  });

  document.addEventListener("keydown", (event) => {
    if (inSearchMode) {
      toggleCursorBlinking(false);
      toggleCursorBlockMode(true);

      if (event.key === "Escape") {
        inSearchMode = false;
        searchBox.blur();
        selectedColumn = 0;
        selectedIndex = 0;
        toggleCursorBlinking(true);
        toggleCursorBlockMode(false);
        updateSelection();
        event.preventDefault();
      }
      if (event.key === "Enter") {
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
      case "h":
        if (selectedColumn > 0) {
          selectedColumn--;
          selectedIndex = Math.min(
            selectedIndex,
            columnLinks[selectedColumn].length - 1
          );
          updateSelection();
        }
        break;

      case "l":
        if (selectedColumn < columnLinks.length - 1) {
          selectedColumn++;
          selectedIndex = Math.min(
            selectedIndex,
            columnLinks[selectedColumn].length - 1
          );
          updateSelection();
        }
        break;

      case "j":
        if (selectedIndex < columnLinks[selectedColumn].length - 1) {
          selectedIndex++;
          updateSelection();
        }
        break;

      case "k":
        if (selectedIndex > 0) {
          selectedIndex--;
          updateSelection();
        }
        break;

      case "i":
        inSearchMode = true;
        searchBox.focus();
        searchOutput.textContent = "";
        toggleCursorBlinking(false);
        toggleCursorBlockMode(true);
        updateSelection();
        event.preventDefault();
        break;

      case "d":
        toggleDogMode(); // Enable Dog Mode on pressing "d"
        break;

      case "Enter":
        if (columnLinks[selectedColumn][selectedIndex]) {
          columnLinks[selectedColumn][selectedIndex].click();
        }
        break;
    }
  });

  // Load standard ASCII on startup
  loadAsciiArt("assets/header.txt");

  setTimeout(() => {
    searchBox.focus();
    toggleCursorBlinking(true);
  }, 10);
});
