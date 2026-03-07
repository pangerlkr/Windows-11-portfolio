// Windows 11 Functionality Script
document.addEventListener('DOMContentLoaded', () => {

    // --- Time and Date ---
    function updateDateTime() {
        const now = new Date();
        const timeEl = document.getElementById('time');
        const dateEl = document.getElementById('date');

        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        timeEl.textContent = `${hours}:${minutes} ${ampm}`;
        dateEl.textContent = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

        // Update Widget Time
        const widgetTimeEl = document.getElementById('widget-time');
        const widgetDateEl = document.getElementById('widget-date');
        if (widgetTimeEl) widgetTimeEl.textContent = `${hours}:${minutes} ${ampm}`;
        if (widgetDateEl) widgetDateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

        // Update Lock Screen Time
        const lsTimeEl = document.getElementById('ls-time');
        const lsDateEl = document.getElementById('ls-date');
        if (lsTimeEl) lsTimeEl.textContent = `${hours}:${minutes} ${ampm}`;
        if (lsDateEl) lsDateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

        // Update Calendar Header
        const calHeaderEl = document.getElementById('calendar-date-header');
        if (calHeaderEl) calHeaderEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }

    // Update immediately and then every minute
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // --- Lock Screen & Welcome Toast ---
    const lockScreen = document.getElementById('lock-screen');
    let lockScreenDismissed = false;

    function showWelcomeToast() {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <img src="https://img.icons8.com/color/48/000000/windows-11.png" class="toast-img">
            <div class="toast-content">
                <h4>Welcome to Windows 11</h4>
                <p>Pangerkumzuk's Portfolio is ready.</p>
            </div>
        `;
        container.appendChild(toast);

        // Force reflow
        toast.offsetWidth;
        toast.classList.add('show');

        // Hide and remove after 4.5s
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    }

    function dismissLockScreen() {
        if (!lockScreenDismissed && lockScreen) {
            lockScreenDismissed = true;
            lockScreen.classList.add('hidden');
            setTimeout(showWelcomeToast, 1000);
        }
    }

    ['click', 'keydown'].forEach(evt => {
        document.addEventListener(evt, dismissLockScreen);
    });

    // --- Custom Context Menu ---
    const contextMenu = document.getElementById('context-menu');
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.window') || e.target.closest('.taskbar') || e.target.closest('.start-menu') || e.target.closest('.glass-panel') || !lockScreenDismissed) {
            // Let normal context menu happen in windows/panels
            return;
        }
        e.preventDefault();
        if (contextMenu) {
            // keep menu within bounds
            let x = e.clientX;
            let y = e.clientY;
            if (x + 250 > window.innerWidth) x -= 250;
            if (y + 300 > window.innerHeight) y -= 300;

            contextMenu.style.left = `${x}px`;
            contextMenu.style.top = `${y}px`;
            contextMenu.classList.add('show');
        }
    });

    document.addEventListener('click', () => {
        if (contextMenu && contextMenu.classList.contains('show')) {
            contextMenu.classList.remove('show');
        }
    });

    const menuRefresh = document.getElementById('menu-refresh');
    if (menuRefresh) {
        menuRefresh.addEventListener('click', () => {
            location.reload();
        });
    }

    // --- Start Menu ---
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');

    function toggleStartMenu() {
        startMenu.classList.toggle('open');
        startBtn.classList.toggle('active-app');
    }

    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStartMenu();
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        // Start Menu
        if (!startMenu.contains(e.target) && !startBtn.contains(e.target) && startMenu.classList.contains('open')) {
            startMenu.classList.remove('open');
            startBtn.classList.remove('active-app');
        }

        // Widgets Panel
        if (!widgetsPanel.contains(e.target) && !weatherBtn.contains(e.target) && widgetsPanel.classList.contains('open')) {
            widgetsPanel.classList.remove('open');
            weatherBtn.classList.remove('active-app'); // custom active styling if needed
        }

        // Control Center
        if (!controlCenter.contains(e.target) && !ccBtn.contains(e.target) && controlCenter.classList.contains('open')) {
            controlCenter.classList.remove('open');
        }

        // Calendar
        if (!calendarPanel.contains(e.target) && !datetimeBtn.contains(e.target) && (!notificationBtn || !notificationBtn.contains(e.target)) && calendarPanel.classList.contains('open')) {
            calendarPanel.classList.remove('open');
        }
    });

    // --- Taskbar Flyouts ---
    const weatherBtn = document.getElementById('weather-btn');
    const widgetsPanel = document.getElementById('widgets-panel');

    const ccBtn = document.getElementById('control-center-btn');
    const controlCenter = document.getElementById('control-center');

    const datetimeBtn = document.getElementById('datetime');
    const calendarPanel = document.getElementById('calendar-panel');

    weatherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        startMenu.classList.remove('open');
        startBtn.classList.remove('active-app');
        controlCenter.classList.remove('open');
        calendarPanel.classList.remove('open');

        widgetsPanel.classList.toggle('open');
    });

    ccBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        startMenu.classList.remove('open');
        startBtn.classList.remove('active-app');
        widgetsPanel.classList.remove('open');
        calendarPanel.classList.remove('open');

        controlCenter.classList.toggle('open');
    });

    datetimeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        startMenu.classList.remove('open');
        startBtn.classList.remove('active-app');
        widgetsPanel.classList.remove('open');
        controlCenter.classList.remove('open');

        calendarPanel.classList.toggle('open');
    });

    const notificationBtn = document.getElementById('notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close others
            startMenu.classList.remove('open');
            startBtn.classList.remove('active-app');
            widgetsPanel.classList.remove('open');
            controlCenter.classList.remove('open');

            calendarPanel.classList.toggle('open');
        });
    }

    // --- Weather & Location Fetching ---
    async function fetchLocationAndWeather() {
        try {
            // 1. Fetch location using IPAPI
            const locRes = await fetch('https://ipapi.co/json/');
            const locData = await locRes.json();

            if (!locData.latitude || !locData.longitude) throw new Error("Could not determine location");

            const lat = locData.latitude;
            const lon = locData.longitude;
            const city = locData.city || locData.region;

            // 2. Fetch weather using Open-Meteo (No API key needed)
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const weatherData = await weatherRes.json();

            const temp = Math.round(weatherData.current_weather.temperature);
            const code = weatherData.current_weather.weathercode;

            // WMO Weather interpretation codes
            let desc = "Clear";
            if (code >= 1 && code <= 3) desc = "Partly cloudy";
            else if (code >= 45 && code <= 48) desc = "Foggy";
            else if (code >= 51 && code <= 67) desc = "Rain";
            else if (code >= 71 && code <= 77) desc = "Snow";
            else if (code >= 95) desc = "Thunderstorm";

            // Update UI elements
            const taskbarTemp = document.getElementById('taskbar-temp');
            const taskbarDesc = document.getElementById('taskbar-desc');
            const panelTemp = document.getElementById('panel-temp');
            const panelDesc = document.getElementById('panel-desc');
            const panelLocation = document.getElementById('panel-location');

            if (taskbarTemp) taskbarTemp.textContent = `${temp}°C`;
            if (taskbarDesc) taskbarDesc.textContent = desc;

            if (panelTemp) panelTemp.textContent = `${temp}°`;
            if (panelDesc) panelDesc.textContent = desc;
            if (panelLocation) panelLocation.textContent = city;

        } catch (err) {
            console.error('Error fetching weather data:', err);
            const taskbarDesc = document.getElementById('taskbar-desc');
            if (taskbarDesc) taskbarDesc.textContent = "Offline";
            const panelLocation = document.getElementById('panel-location');
            if (panelLocation) panelLocation.textContent = "Location unknown";
        }
    }

    // Call once to load immediately
    fetchLocationAndWeather();

    // --- Window Management ---
    const windowsContainer = document.getElementById('windows-container');
    const windowTemplate = document.getElementById('window-template');
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const appIcons = document.querySelectorAll('.app-icon');
    const taskbarApps = document.getElementById('taskbar-apps');

    let zIndexCounter = 100;
    const activeWindows = {}; // Store open windows by appId

    function getAppContent(appId) {
        const contentMap = {
            'mypc': {
                title: 'This PC',
                icon: 'https://img.icons8.com/color/96/000000/monitor--v1.png',
                html: `
                    <div class="inner-container" style="color: black;">
                        <h2>This PC</h2>
                        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                            <div style="width: 150px; text-align: center; padding: 20px; border: 1px solid var(--win-border-light); border-radius: 8px; background: rgba(0,0,0,0.02); cursor: pointer;" class="hover-effect">
                                <img src="https://img.icons8.com/color/96/000000/hdd.png" width="48" height="48">
                                <div style="margin-top: 10px; font-size: 14px;">Local Disk (C:)</div>
                                <div style="background: #ccc; height: 6px; border-radius: 3px; margin-top: 8px; overflow: hidden;"><div style="width: 75%; background: var(--win-accent); height: 100%;"></div></div>
                            </div>
                        </div>
                    </div>
                `
            },
            'explorer': {
                title: 'File Explorer',
                icon: 'https://img.icons8.com/color/96/000000/folder-invoices.png',
                html: `
                    <div class="inner-container" style="color: black;">
                        <h2>File Explorer</h2>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 10px; border-bottom: 1px solid var(--win-border-light); display: flex; align-items: center; gap: 10px;">
                                <img src="https://img.icons8.com/color/48/000000/folder-invoices.png" width="24" height="24"> Documents
                            </li>
                            <li style="padding: 10px; border-bottom: 1px solid var(--win-border-light); display: flex; align-items: center; gap: 10px;">
                                <img src="https://img.icons8.com/color/48/000000/picture.png" width="24" height="24"> Pictures
                            </li>
                            <li style="padding: 10px; border-bottom: 1px solid var(--win-border-light); display: flex; align-items: center; gap: 10px;">
                                <img src="https://img.icons8.com/color/48/000000/video.png" width="24" height="24"> Videos
                            </li>
                        </ul>
                    </div>
                `
            },
            'edge': {
                title: 'Microsoft Edge',
                icon: 'https://img.icons8.com/color/96/000000/ms-edge-new.png',
                html: `
                    <div style="height: 100%; display: flex; flex-direction: column;">
                        <div style="padding: 8px; border-bottom: 1px solid var(--win-border-light); display: flex; gap: 8px;">
                            <input type="text" value="https://google.com" style="flex: 1; padding: 6px 12px; border: 1px solid #ccc; border-radius: 16px; outline: none;">
                        </div>
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: black; background: #fff;">
                            <h2>Edge Browser View</h2>
                        </div>
                    </div>
                `
            },
            'about': {
                title: 'About Me',
                icon: 'https://img.icons8.com/color/96/000000/info.png',
                html: `
                    <div class="inner-container" style="color: black; font-family: 'Segoe UI Variable', 'Segoe UI', sans-serif;">
                        <h1 style="font-weight: 600; font-size: 2.5rem; margin-bottom: 0.5rem;">Pangerkumzuk Longkumer</h1>
                        <h2 style="color: var(--win-accent); font-weight: 500; margin-bottom: 2rem;">Software Engineer & Designer</h2>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 24px; border-radius: 8px; border: 1px solid var(--win-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px;">
                            <h3 style="margin-bottom: 12px; font-weight: 600;">Welcome</h3>
                            <p style="line-height: 1.6; color: #444;">Welcome to my Windows 11 themed portfolio. I specialize in building clean, interactive, and user-focused web experiences.</p>
                            <p style="line-height: 1.6; color: #444; margin-top: 12px;">This interface showcases my ability to replicate complex OS-level UI patterns using nothing but Vanilla HTML, CSS, and JavaScript—demonstrating deep understanding of the DOM, styling architectures, and component-based logic.</p>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 24px; border-radius: 8px; border: 1px solid var(--win-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                            <h3 style="margin-bottom: 16px; font-weight: 600;">Technical Arsenal</h3>
                            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                                <span style="background: var(--win-accent); color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px;">JavaScript (ES6+)</span>
                                <span style="background: var(--win-accent); color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px;">TypeScript</span>
                                <span style="background: var(--win-accent); color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px;">React & Next.js</span>
                                <span style="background: var(--win-accent); color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px;">HTML5 / CSS3</span>
                                <span style="background: var(--win-accent); color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px;">Node.js</span>
                                <span style="background: var(--win-accent); color: white; padding: 6px 12px; border-radius: 16px; font-size: 14px;">UI/UX Design</span>
                            </div>
                        </div>
                    </div>
                `
            },
            'projects': {
                title: 'Projects',
                icon: 'https://img.icons8.com/color/96/000000/folder-invoices.png',
                html: `
                    <div class="inner-container" style="color: black;">
                        <h1 style="margin-bottom: 30px;">Portfolio Projects</h1>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
                            
                            <!-- Project 1 -->
                            <div class="hover-effect" style="background: rgba(255,255,255,0.8); border: 1px solid var(--win-border-light); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; cursor: default;">
                                <div style="height: 140px; background: linear-gradient(135deg, var(--win-accent), #88d4f7); display: flex; align-items: center; justify-content: center; color: white;">
                                    <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                                </div>
                                <div style="padding: 20px;">
                                    <h3 style="margin-bottom: 8px; font-size: 18px;">Win11 OS Replica</h3>
                                    <p style="color: #555; font-size: 14px; line-height: 1.5; margin-bottom: 16px;">A full frontend recreation of the Windows 11 desktop environment featuring glassmorphism, draggable windows, and interactive start menu.</p>
                                    <div style="display: flex; gap: 8px;">
                                        <span style="font-size: 12px; padding: 4px 8px; background: #eee; border-radius: 4px;">Vanilla JS</span>
                                        <span style="font-size: 12px; padding: 4px 8px; background: #eee; border-radius: 4px;">CSS3</span>
                                    </div>
                                </div>
                            </div>

                             <!-- Project 2 -->
                            <div class="hover-effect" style="background: rgba(255,255,255,0.8); border: 1px solid var(--win-border-light); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; cursor: default;">
                                <div style="height: 140px; background: linear-gradient(135deg, #FF6B6B, #FF8E53); display: flex; align-items: center; justify-content: center; color: white;">
                                     <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                                </div>
                                <div style="padding: 20px;">
                                    <h3 style="margin-bottom: 8px; font-size: 18px;">E-Commerce Dashboard</h3>
                                    <p style="color: #555; font-size: 14px; line-height: 1.5; margin-bottom: 16px;">A comprehensive analytics dashboard for online retailers with real-time data visualization and inventory management.</p>
                                    <div style="display: flex; gap: 8px;">
                                        <span style="font-size: 12px; padding: 4px 8px; background: #eee; border-radius: 4px;">React</span>
                                        <span style="font-size: 12px; padding: 4px 8px; background: #eee; border-radius: 4px;">Chart.js</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                `
            },
            'contact': {
                title: 'Contact',
                icon: 'https://img.icons8.com/color/96/000000/new-post.png',
                html: `
                    <div class="inner-container" style="color: black;">
                        <h1 style="margin-bottom: 10px;">Get In Touch</h1>
                        <p style="color: #555; margin-bottom: 30px;">I'm actively looking for new opportunities. Let's build something amazing together.</p>
                        
                        <div style="background: rgba(255,255,255,0.7); padding: 32px; border-radius: 8px; border: 1px solid var(--win-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 500px;">
                            <form onsubmit="event.preventDefault(); alert('Message sent simulated!');" style="display: flex; flex-direction: column; gap: 16px;">
                                <div>
                                    <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">Name</label>
                                    <input type="text" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; outline: none; font-family: inherit;" required>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">Email</label>
                                    <input type="email" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; outline: none; font-family: inherit;" required>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px;">Message</label>
                                    <textarea rows="4" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; outline: none; font-family: inherit; resize: vertical;" required></textarea>
                                </div>
                                <button type="submit" style="background: var(--win-accent); color: white; border: none; padding: 12px; border-radius: 4px; font-weight: 600; cursor: pointer; margin-top: 8px; transition: background 0.15s;" onmouseover="this.style.background='var(--win-accent-hover)'" onmouseout="this.style.background='var(--win-accent)'">Send Message</button>
                            </form>
                        </div>
                    </div>
                `
            },
            'linkedin': {
                title: 'LinkedIn',
                icon: 'https://img.icons8.com/color/96/000000/linkedin.png',
                html: `
                    <div style="height: 100%; background: #f3f2ef; color: black; display: flex; flex-direction: column;">
                        <div style="background: white; padding: 10px 20px; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 10px;">
                            <img src="https://img.icons8.com/color/48/000000/linkedin.png" width="32" height="32" alt="LinkedIn">
                            <span style="font-weight: 600; font-size: 20px; color: #0a66c2;">LinkedIn</span>
                            <div style="flex: 1;"></div>
                            <input type="text" placeholder="Search" style="padding: 6px 12px; border-radius: 4px; border: 1px solid #ddd; background: #eef3f8; width: 250px;">
                        </div>
                        <div class="inner-container" style="flex: 1; padding: 20px; max-width: 800px; margin: 0 auto; width: 100%;">
                            <div style="background: white; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; margin-top: 20px;">
                                <div style="height: 120px; background: #a0b4b7;"></div>
                                <div style="padding: 20px; position: relative;">
                                    <img src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" width="100" height="100" style="border-radius: 50%; border: 4px solid white; position: absolute; top: -50px; background: white;">
                                    <div style="margin-top: 50px;">
                                         <h1 style="font-size: 24px; margin-bottom: 4px;">Pangerkumzuk Longkumer</h1>
                                         <p style="font-size: 16px; color: #666; margin-bottom: 12px;">Software Engineer & Designer</p>
                                         <p style="font-size: 14px; color: #666;">India</p>
                                         <div style="margin-top: 16px; display: flex; gap: 10px;">
                                              <a href="https://linkedin.com/in/pangerlkr" target="_blank" style="background: #0a66c2; color: white; padding: 6px 16px; border-radius: 16px; text-decoration: none; font-weight: 600; font-size: 14px;">Open Official Profile</a>
                                              <button style="background: white; color: #0a66c2; border: 1px solid #0a66c2; padding: 6px 16px; border-radius: 16px; font-weight: 600; font-size: 14px; cursor: pointer;">Message</button>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'instagram': {
                title: 'Instagram',
                icon: 'https://img.icons8.com/color/96/000000/instagram-new--v1.png',
                html: `
                    <div style="height: 100%; background: #fafafa; color: black; display: flex; flex-direction: column;">
                        <div style="background: white; padding: 10px 20px; border-bottom: 1px solid #dbdbdb; display: flex; align-items: center; justify-content: center;">
                            <span style="font-family: 'Segoe UI', cursive; font-weight: 600; font-size: 24px; font-style: italic;">Instagram</span>
                        </div>
                        <div class="inner-container" style="flex: 1; padding: 30px; max-width: 900px; margin: 0 auto; width: 100%;">
                            <div style="display: flex; gap: 40px; margin-bottom: 40px; align-items: center;">
                                <img src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" width="150" height="150" style="border-radius: 50%; border: 2px solid #dbdbdb; padding: 4px;">
                                <div>
                                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 16px;">
                                        <h2 style="font-size: 28px; font-weight: 300;">panger__lkr</h2>
                                        <a href="https://instagram.com/panger__lkr" target="_blank" style="background: #0095f6; color: white; padding: 6px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">View on Web</a>
                                    </div>
                                    <div style="display: flex; gap: 40px; margin-bottom: 16px;">
                                        <span><strong>0</strong> posts</span>
                                        <span><strong>0</strong> followers</span>
                                        <span><strong>0</strong> following</span>
                                    </div>
                                    <p style="font-weight: 600;">Pangerkumzuk Longkumer</p>
                                    <p style="color: #666; max-width: 300px;">Design & Code.</p>
                                </div>
                            </div>
                            <div style="border-top: 1px solid #dbdbdb; display: flex; justify-content: center; padding-top: 10px;">
                                <span style="font-weight: 600; font-size: 12px; letter-spacing: 1px; color: #262626;">POSTS</span>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
                                <div style="aspect-ratio: 1; background: #efefef;"></div>
                                <div style="aspect-ratio: 1; background: #efefef;"></div>
                                <div style="aspect-ratio: 1; background: #efefef;"></div>
                            </div>
                        </div>
                    </div>
                `
            },
            'facebook': {
                title: 'Facebook',
                icon: 'https://img.icons8.com/color/96/000000/facebook-new.png',
                html: `
                    <div style="height: 100%; background: #f0f2f5; color: black; display: flex; flex-direction: column;">
                        <div style="background: white; padding: 10px 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 10px;">
                            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" width="40" height="40" alt="FB">
                            <input type="text" placeholder="Search Facebook" style="padding: 10px 16px; border-radius: 20px; border: none; background: #f0f2f5; width: 250px;">
                        </div>
                        <div class="inner-container" style="flex: 1; padding: 20px; max-width: 900px; margin: 0 auto; width: 100%;">
                            <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                                <div style="height: 300px; background: linear-gradient(180deg, #d3d3d3 0%, #e0e0e0 100%);"></div>
                                <div style="padding: 20px; position: relative;">
                                    <img src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" width="168" height="168" style="border-radius: 50%; border: 4px solid white; position: absolute; top: -84px; left: 30px; background: white;">
                                    <div style="margin-top: 80px; margin-left: 20px; display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <h1 style="font-size: 32px; font-weight: 700;">Pangerkumzuk Longkumer</h1>
                                            <p style="color: #65676b; font-weight: 600; margin-top: 4px;">lkr.panger</p>
                                        </div>
                                        <a href="https://facebook.com/lkr.panger" target="_blank" style="background: #1877f2; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Profile</a>
                                    </div>
                                    <div style="margin-top: 20px; border-top: 1px solid #ced0d4; padding-top: 16px; display: flex; gap: 20px; color: #65676b; font-weight: 600;">
                                        <span style="color: #1877f2; border-bottom: 3px solid #1877f2; padding-bottom: 12px;">Posts</span>
                                        <span style="cursor: pointer;">About</span>
                                        <span style="cursor: pointer;">Friends</span>
                                        <span style="cursor: pointer;">Photos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'youtube': {
                title: 'YouTube',
                icon: 'https://img.icons8.com/color/96/000000/youtube-play.png',
                html: `
                    <div style="height: 100%; background: #0f0f0f; color: white; display: flex; flex-direction: column;">
                        <div style="padding: 10px 20px; display: flex; align-items: center; gap: 16px;">
                            <img src="https://img.icons8.com/color/48/000000/youtube-play.png" width="32" height="32" alt="YT">
                            <span style="font-weight: 600; font-size: 20px; letter-spacing: -1px;">YouTube</span>
                            <div style="flex: 1; display: flex; justify-content: center;">
                                <div style="display: flex; width: 50%;">
                                    <input type="text" placeholder="Search" style="flex: 1; padding: 8px 16px; border-radius: 20px 0 0 20px; border: 1px solid #303030; background: #121212; color: white; outline: none;">
                                    <button style="padding: 8px 20px; border-radius: 0 20px 20px 0; border: 1px solid #303030; border-left: none; background: #222; color: white; cursor: pointer;">Q</button>
                                </div>
                            </div>
                        </div>
                        <div class="inner-container" style="flex: 1; padding: 20px; max-width: 1200px; margin: 0 auto; width: 100%;">
                            <div style="background: #212121; height: 180px; border-radius: 12px; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; position: relative;">
                                <div style="position: absolute; width: 100%; height: 100%; object-fit: cover; border-radius: 12px; border: 1px solid #333;"></div>
                            </div>
                            <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 24px;">
                                <img src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" width="80" height="80" style="border-radius: 50%;">
                                <div>
                                    <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 4px;">Pangerkumzuk Longkumer</h1>
                                    <p style="color: #aaa; margin-bottom: 8px;">@Pangerkumzuk • 0 subscribers • 0 videos</p>
                                    <a href="https://youtube.com" target="_blank" style="background: white; color: black; padding: 8px 16px; border-radius: 18px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Open YouTube</a>
                                </div>
                            </div>
                            <div style="border-bottom: 1px solid #3f3f3f; display: flex; gap: 32px; font-weight: 500; font-size: 14px; padding-bottom: 12px; margin-bottom: 24px;">
                                <span style="color: white; border-bottom: 2px solid white; padding-bottom: 10px;">HOME</span>
                                <span style="color: #aaa;">VIDEOS</span>
                                <span style="color: #aaa;">PLAYLISTS</span>
                            </div>
                            <p style="color: #aaa;">This channel doesn't have any content.</p>
                        </div>
                    </div>
                `
            },
            'resume': {
                title: 'Resume',
                icon: 'https://img.icons8.com/color/96/000000/pdf.png',
                html: `
                    <div class="inner-container" style="color: black;">
                        <h1 style="margin-bottom: 10px;">Resume</h1>
                        <p style="color: #555; margin-bottom: 30px;">Pangerkumzuk Longkumer — Software Engineer &amp; Designer</p>

                        <div style="background: rgba(255,255,255,0.7); padding: 32px; border-radius: 8px; border: 1px solid var(--win-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px;">
                            <h2 style="color: var(--win-accent); margin-bottom: 16px; font-size: 18px;">Experience</h2>
                            <div style="margin-bottom: 16px;">
                                <h3 style="font-size: 15px; font-weight: 600;">Software Engineer &amp; Front-End Developer</h3>
                                <p style="font-size: 13px; color: #888; margin-bottom: 6px;">Self-employed · 2022 – Present</p>
                                <p style="font-size: 14px; color: #555; line-height: 1.6;">Built interactive web applications and UI components with a focus on modern design systems, performance, and accessibility.</p>
                            </div>
                        </div>

                        <div style="background: rgba(255,255,255,0.7); padding: 32px; border-radius: 8px; border: 1px solid var(--win-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 24px;">
                            <h2 style="color: var(--win-accent); margin-bottom: 16px; font-size: 18px;">Skills</h2>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <span style="background: var(--win-accent); color: white; padding: 5px 12px; border-radius: 16px; font-size: 13px;">JavaScript (ES6+)</span>
                                <span style="background: var(--win-accent); color: white; padding: 5px 12px; border-radius: 16px; font-size: 13px;">TypeScript</span>
                                <span style="background: var(--win-accent); color: white; padding: 5px 12px; border-radius: 16px; font-size: 13px;">React &amp; Next.js</span>
                                <span style="background: var(--win-accent); color: white; padding: 5px 12px; border-radius: 16px; font-size: 13px;">HTML5 / CSS3</span>
                                <span style="background: var(--win-accent); color: white; padding: 5px 12px; border-radius: 16px; font-size: 13px;">Node.js</span>
                                <span style="background: var(--win-accent); color: white; padding: 5px 12px; border-radius: 16px; font-size: 13px;">UI/UX Design</span>
                            </div>
                        </div>

                        <div style="background: rgba(255,255,255,0.7); padding: 32px; border-radius: 8px; border: 1px solid var(--win-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                            <h2 style="color: var(--win-accent); margin-bottom: 16px; font-size: 18px;">Education</h2>
                            <h3 style="font-size: 15px; font-weight: 600;">Bachelor of Technology</h3>
                            <p style="font-size: 13px; color: #888;">Computer Science &amp; Engineering</p>
                        </div>
                    </div>
                `
            },
            'github': {
                title: 'GitHub',
                icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/000000/external-github-with-cat-logo-an-online-community-for-software-development-logo-color-tal-revivo.png',
                html: `
                    <div style="height: 100%; background: #0d1117; color: #c9d1d9; display: flex; flex-direction: column;">
                        <div style="background: #161b22; padding: 16px 24px; border-bottom: 1px solid #30363d; display: flex; align-items: center; gap: 16px;">
                            <img src="https://img.icons8.com/fluency-systems-filled/48/ffffff/github.png" width="32" height="32" alt="GH">
                            <span style="font-weight: 600; font-size: 16px; color: white;">pangerlkr</span>
                        </div>
                        <div class="inner-container" style="flex: 1; padding: 32px; max-width: 900px; margin: 0 auto; width: 100%;">
                            <div style="display: flex; gap: 32px; flex-wrap: wrap;">
                                <div style="width: 250px;">
                                     <img src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" width="250" height="250" style="border-radius: 50%; border: 1px solid #30363d;">
                                     <h1 style="font-size: 26px; font-weight: 600; color: white; margin-top: 16px;">Pangerkumzuk Longkumer</h1>
                                     <p style="font-size: 20px; color: #8b949e; margin-bottom: 16px;">pangerlkr</p>
                                     <a href="https://github.com/pangerlkr" target="_blank" style="display: block; width: 100%; text-align: center; background: #21262d; border: 1px solid #363b42; color: #c9d1d9; padding: 6px 16px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-bottom: 16px; transition: background 0.2s;" onmouseover="this.style.background='#30363d'" onmouseout="this.style.background='#21262d'">Visit Official GitHub</a>
                                </div>
                                <div style="flex: 1; min-width: 300px;">
                                     <h2 style="font-size: 16px; margin-bottom: 16px; border-bottom: 1px solid #30363d; padding-bottom: 8px;">Popular repositories</h2>
                                     <div style="border: 1px solid #30363d; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                                         <h3 style="color: #58a6ff; font-size: 16px; font-weight: 600; margin-bottom: 8px;">win11-portfolio</h3>
                                         <p style="color: #8b949e; font-size: 12px; margin-bottom: 16px;">A web-based recreation of the Windows 11 desktop environment.</p>
                                         <div style="display: flex; gap: 16px; font-size: 12px;">
                                              <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 12px; height: 12px; background: #f1e05a; border-radius: 50%;"></span> JavaScript</span>
                                              <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 12px; height: 12px; background: #563d7c; border-radius: 50%;"></span> CSS3</span>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        };

        return contentMap[appId] || { title: 'Application', icon: '', html: '<div class="inner-container"><p>Content not found.</p></div>' };
    }

    function bringToFront(winElement) {
        zIndexCounter++;
        winElement.style.zIndex = zIndexCounter;

        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => {
            w.style.opacity = '1';
            // In a real OS inactive windows differ visually, we can add a class here
        });
    }

    function createTaskbarIcon(appId, appData) {
        let tbIcon = document.getElementById(`tb-${appId}`);
        const exists = !!tbIcon;

        if (!exists) {
            tbIcon = document.createElement('div');
            tbIcon.id = `tb-${appId}`;
            tbIcon.title = appData.title;
            tbIcon.innerHTML = `<img src="${appData.icon}" alt="${appData.title}" width="24" height="24">`;
            taskbarApps.appendChild(tbIcon);
        }

        tbIcon.classList.add('open-app', 'active-app');

        // Remove existing listeners if any (by replacing the node) to avoid double toggling for pinned apps
        const newTbIcon = tbIcon.cloneNode(true);
        tbIcon.parentNode.replaceChild(newTbIcon, tbIcon);

        newTbIcon.addEventListener('click', () => {
            const win = activeWindows[appId];
            if (win) {
                if (win.classList.contains('minimized')) {
                    win.classList.remove('minimized');
                    bringToFront(win);
                } else if (win.style.zIndex == zIndexCounter) {
                    win.classList.add('minimized');
                    newTbIcon.classList.remove('active-app');
                } else {
                    bringToFront(win);
                }
            } else {
                openWindow(appId);
            }
        });

        return newTbIcon;
    }

    function openWindow(appId) {
        // If window already exists, just bring it to front and un-minimize
        if (activeWindows[appId]) {
            const win = activeWindows[appId];
            win.classList.remove('minimized');
            bringToFront(win);

            const tbIcon = document.getElementById(`tb-${appId}`);
            if (tbIcon) tbIcon.classList.add('active-app');
            return;
        }

        const appData = getAppContent(appId);

        // Clone template
        const templateNode = windowTemplate.content.cloneNode(true);
        const winElement = templateNode.querySelector('.window');

        // Populate content
        winElement.querySelector('.window-title').textContent = appData.title;
        winElement.querySelector('.window-icon').src = appData.icon;
        winElement.querySelector('.window-content-area').innerHTML = appData.html;

        // Add to DOM
        windowsContainer.appendChild(winElement);

        // Store reference
        activeWindows[appId] = winElement;

        // Create Taskbar Icon
        createTaskbarIcon(appId, appData);

        // Initial setup
        bringToFront(winElement);
        winElement.classList.add('opening');
        setTimeout(() => winElement.classList.remove('opening'), 250);

        // --- Setup Window Controls ---
        const closeBtn = winElement.querySelector('.close-btn');
        const maxBtn = winElement.querySelector('.maximize-btn');
        const minBtn = winElement.querySelector('.minimize-btn');
        const titleBar = winElement.querySelector('.title-bar');

        closeBtn.addEventListener('click', () => {
            winElement.classList.add('closing');
            setTimeout(() => {
                winElement.remove();
                delete activeWindows[appId];
                const tbIcon = document.getElementById(`tb-${appId}`);
                if (tbIcon) {
                    tbIcon.classList.remove('open-app', 'active-app');
                    // if it's a pinned app, we shouldn't remove the DOM element
                    if (appId !== 'explorer' && appId !== 'edge') {
                        tbIcon.remove();
                    } else {
                        // Re-attach standard pinned behavior
                        tbIcon.onclick = () => openWindow(appId);
                    }
                }
            }, 150); // wait for animation
        });

        maxBtn.addEventListener('click', () => {
            winElement.classList.toggle('fullscreen');
        });

        minBtn.addEventListener('click', () => {
            winElement.classList.add('minimized');
        });

        winElement.addEventListener('mousedown', () => {
            bringToFront(winElement);
        });

        // --- Draggable Logic ---
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        titleBar.addEventListener('mousedown', (e) => {
            if (winElement.classList.contains('fullscreen')) return;
            // Don't drag if clicking buttons
            if (e.target.closest('.window-controls')) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = winElement.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            // Use capturing phase on document to ensure smooth drag
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            winElement.style.left = `${initialLeft + dx}px`;
            winElement.style.top = `${initialTop + dy}px`;
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // --- Icon Click Handlers ---

    function handleIconClick(e) {
        const icon = e.currentTarget;

        // Handle external links
        if (icon.hasAttribute('data-link')) {
            window.open(icon.getAttribute('data-link'), '_blank');
            return;
        }

        // Handle app windows
        const appId = icon.getAttribute('data-window');
        if (appId) {
            startMenu.classList.remove('open');
            startBtn.classList.remove('active-app');
            openWindow(appId);
        }
    }

    desktopIcons.forEach(icon => {
        // Double click for desktop icons
        icon.addEventListener('dblclick', handleIconClick);
        // Enter key support for accessibility
        icon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleIconClick(e);
        });
    });

    appIcons.forEach(icon => {
        // Single click for start menu items
        icon.addEventListener('click', handleIconClick);
    });

    // Make static taskbar icons work too
    const staticTaskbarIcons = document.querySelectorAll('.taskbar-center .taskbar-icon[data-window]');
    staticTaskbarIcons.forEach(icon => {
        icon.addEventListener('click', handleIconClick);
    });

    // --- Desktop Selection Box ---
    const desktop = document.getElementById('desktop');
    const selectionBox = document.getElementById('selection-box');
    let isSelecting = false;
    let startX, startY;

    desktop.addEventListener('mousedown', (e) => {
        if (e.target !== desktop && e.target !== document.querySelector('.desktop-bg')) return;
        if (e.button !== 0) return; // Only left click

        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;

        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isSelecting) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        const left = Math.min(startX, currentX);
        const top = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        selectionBox.style.left = `${left}px`;
        selectionBox.style.top = `${top}px`;
        selectionBox.style.width = `${width}px`;
        selectionBox.style.height = `${height}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isSelecting) {
            isSelecting = false;
            selectionBox.style.display = 'none';
        }
    });

    // Show desktop button
    document.getElementById('show-desktop').addEventListener('click', () => {
        Object.values(activeWindows).forEach(win => {
            win.classList.add('minimized');
        });
    });
});

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
}
