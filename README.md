# Windows 11 Portfolio

Welcome to the **Windows 11 Portfolio** – a highly interactive, realistic, and responsive personal portfolio website designed to emulate the user interface and experience of Microsoft's Windows 11 Operating System.

Built entirely with standard **HTML, CSS, and Vanilla JavaScript**.

## ✨ Features

- **Authentic UI/UX**: Replicates the Windows 11 Light Mode aesthetic with Mica glassmorphism (`backdrop-filter`), smooth curved corners, and dynamic animations.
- **Realistic Lock Screen**: A full-screen lock overlay featuring a live clock that must be dismissed on startup.
- **Window Management System**: Fully draggable, restackable (z-index), minimizable, and maximizable application windows.
- **Interactive Taskbar & Start Menu**: 
  - Centralized pinned applications that track open window states.
  - A responsive Start Menu overlay.
  - Functional flyout widgets for **Weather & Location**, **Control Center**, and **Calendar/Notifications**.
- **Desktop Interactivity**: 
  - Draggable selection box (click and drag on the background).
  - Custom Windows 11 themed right-click context menu.
  - Functional desktop application shortcuts.
- **Integrated Apps**:
  - **This PC**: Simulated hard drive view.
  - **About Me**: Professional profile and skillset overview.
  - **Projects / Portfolio**: Card-based showcase of work.
  - **Socials**: In-window browsers mimicking native applications for LinkedIn, GitHub, Instagram, Facebook, and YouTube.
- **Dynamic Data**: Fetches real device geolocation and current weather conditions using public APIs (IPAPI & Open-Meteo).

## 🚀 How to Run Locally

Since this is a vanilla front-end project, running it is extremely straightforward:

1. Clone or download this repository.
2. Open the `win11-portfolio` directory.
3. Simply double-click on `index.html` to open it in your default web browser.

*(For the best experience across all features, especially those requiring API fetches like Weather, it is recommended to run it via a local development server like VS Code's "Live Server" extension, or `npx serve`, though not strictly required).*

## 🛠️ Technology Stack

- **HTML5**: Semantic document structure.
- **CSS3**: Extensive use of Flexbox, CSS Grid, Custom Properties (Variables), Keyframe Animations, and Backdrop Filters.
- **Vanilla JS (ES6+)**: Event delegation, DOM manipulation, state management, and asynchronous Fetch API calls—all without any external heavy frameworks like React or Vue.
- **External APIs**: `ipapi.co` & `api.open-meteo.com`.
- **Icons**: Sourced primarily from [Icons8](https://icons8.com/).

## 💡 About

This project was developed by Pangerkumzuk Longkumer to serve as a unique, interactive portfolio demonstrating advanced front-end web development capabilities, deep understanding of DOM manipulation, and a keen eye for modern UI/UX design patterns.
