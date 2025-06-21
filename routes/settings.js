// טוען את ההגדרות מהשרת בעת טעינת הדף
// window.addEventListener("DOMContentLoaded", () => {
//   fetch("http://localhost:3000/api/settings")
//     .then((res) => res.json())
//     .then((settings) => {
//       applySettings(settings);
//       setInitialSelections(settings);
//     })
//     .catch((err) => console.error("Failed to load settings:", err));
// });

// document.querySelectorAll(".custom-select").forEach(select => {
//   const selected = select.querySelector(".selected-option");
//   const options = select.querySelector(".select-options");

//   selected.addEventListener("click", () => {
//     select.classList.toggle("open");
//   });

//   options.querySelectorAll("li").forEach(option => {
//     option.addEventListener("click", () => {
//       selected.textContent = option.textContent;
//       select.classList.remove("open");
//       const settings = collectSettings();
//       saveSettings(settings); 
//     });
//   });

//   document.addEventListener("click", (e) => {
//     if (!select.contains(e.target)) {
//       select.classList.remove("open");
//     }
//   });
// });

// function collectSettings() {
//   const settings = {};
//   document.querySelectorAll(".custom-select").forEach(select => {
//     const key = select.getAttribute("data-name");
//     const value = select.querySelector(".selected-option").textContent.trim();
//     settings[key] = value;
//   });
//   return settings;
// }

// function saveSettings(settings) {
//   fetch("http://localhost:3000/api/settings", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(settings),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Settings saved:", data);
//       applySettings(settings);
//     })
//     .catch((err) => console.error("Failed to save settings:", err));
// }

// function applySettings(settings) {
//   if (settings.theme === "Dark") {
//     document.body.style.backgroundColor = "#1a1a1a";
//     document.body.style.color = "#fff";
//   } else if (settings.theme === "Light") {
//     document.body.style.backgroundColor = "#ffffff";
//     document.body.style.color = "#000";
//   } else {
//     document.body.style.background = "";
//     document.body.style.color = "";
//   }

//   if (settings.language === "עברית") {
//     document.body.dir = "rtl";
//     document.querySelector("header h1").textContent = "הגדרות";
//   } else {
//     document.body.dir = "ltr";
//     document.querySelector("header h1").textContent = "Settings";
//   }

// }

// function setInitialSelections(settings) {
//   document.querySelectorAll(".custom-select").forEach(select => {
//     const key = select.getAttribute("data-name");
//     const selectedOption = select.querySelector(".selected-option");
//     const options = select.querySelectorAll("li");
//     options.forEach(option => {
//       if (option.textContent.trim() === settings[key]) {
//         selectedOption.textContent = option.textContent;
//       }
//     });
//   });
// }



const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const settingsFile = path.join(__dirname, '../data/settings.json');

// POST – שמירה
router.post('/', (req, res) => {
  const settings = req.body;
  fs.writeFile(settingsFile, JSON.stringify(settings, null, 2), (err) => {
    if (err) {
      console.error('Error saving settings:', err);
      return res.status(500).json({ message: 'Failed to save settings' });
    }
    console.log('Settings saved:', settings);
    res.json({ message: 'Settings saved successfully' });
  });
});

// GET – שליפה
router.get('/', (req, res) => {
  fs.readFile(settingsFile, (err, data) => {
    if (err) {
      console.error('Error reading settings:', err);
      return res.status(500).json({ message: 'Failed to read settings' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
