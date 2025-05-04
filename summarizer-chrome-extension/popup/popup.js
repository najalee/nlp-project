// chrome.runtime.sendMessage({type: "getVal"}, (response) => {
//   // if (response.value === "empty") 
//   // {
//   //   // do nothing
//   // }
//   // else
//   // {
//   //   const summaryEle = document.getElementById("summary-output");
//   //   summaryEle.textContent = response.value;
//   // }

//   const summaryEle = document.getElementById("summary-output");
//   summaryEle.textContent = response.value;

// });

// document.addEventListener("DOMContentLoaded", () => {
//   const summaryEle = document.getElementById("summary-output");

//   // Request the current value when the popup is opened
//   chrome.runtime.sendMessage({ type: "getVal" }, (response) => {
//     if (response.value) {
//       summaryEle.textContent = response.value;
//     }
//   });

//   // Listen for real-time updates from the background script
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "summaryUpdated") {
//       summaryEle.textContent = message.value; // Update the popup content dynamically
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const summaryEle = document.getElementById("summary-output");
  const loadingEle = document.getElementById("loading");

  // Function to toggle visibility of loading and summary elements
  function toggleLoading() {
    if (summaryEle.textContent.trim() === "") {
      loadingEle.style.display = "block"; // Show loading
      summaryEle.style.display = "none"; // Hide summary
    } else {
      loadingEle.style.display = "none"; // Hide loading
      summaryEle.style.display = "block"; // Show summary
    }
  }

  // Request the current value when the popup is opened
  chrome.runtime.sendMessage({ type: "getVal" }, (response) => {
    if (response.value) {
      summaryEle.textContent = response.value;
    } else {
      summaryEle.textContent = ""; // Ensure it's empty if no value
    }
    toggleLoading(); // Update visibility based on the content
  });

  // Listen for real-time updates from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "summaryUpdated") {
      summaryEle.textContent = message.value; // Update the popup content dynamically
      toggleLoading(); // Update visibility based on the content
    }
  });

  // Initial state: Show loading, hide summary
  toggleLoading();
});


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type == "summary") {
//     summary = message.value;
//   }

//   const summaryEle = document.getElementById("summary-output");
//   summaryEle.textContent = summary;

// });


// const summaryEle = document.getElementById("summary-output");
// summaryEle.textContent = "";


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "getVal") {
//     summary = message.value;
//   }

//   const summaryEle = document.getElementById("summary-output");

//   if (summaryEle) {
//     summaryEle.textContent = summary;
//   }
// });

