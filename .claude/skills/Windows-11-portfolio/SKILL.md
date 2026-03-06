# Windows-11-portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill covers development patterns for a Windows 11-themed portfolio website built with vanilla JavaScript. The project focuses on creating a desktop-like experience in the browser with standard web technologies, emphasizing clean structure and modern web standards compliance.

## Coding Conventions

### File Naming
- Use **camelCase** for JavaScript files and general naming
- Standard web files use lowercase (index.html, robots.txt, sitemap.xml)
- Configuration files follow standard naming conventions

```javascript
// Examples of expected file names
script.js          // Main JavaScript file
windowManager.js   // Feature-specific modules
taskbarHandler.js  // Component handlers
```

### Import/Export Style
- Mixed import/export patterns depending on module type
- ES6 modules preferred for new code
- Script tags for simple inclusions

```javascript
// Modern ES6 style
export const windowManager = {
  // implementation
};

import { windowManager } from './windowManager.js';
```

### Commit Style
- Freeform commit messages (average 40 characters)
- Focus on clear, concise descriptions
- No strict prefix requirements

## Workflows

### Project Setup Enhancement
**Trigger:** When someone wants to enhance project structure with standard web files
**Command:** `/add-web-standards`

1. **Update main HTML file** - Enhance index.html with proper meta tags, manifest links, and semantic structure
2. **Add project configuration files** - Create package.json or other config files as needed
3. **Add standard web files** - Include manifest.json, robots.txt, sitemap.xml, and favicon.svg
4. **Update project metadata** - Ensure all files reference each other correctly and include proper SEO elements

```html
<!-- Example manifest link in index.html -->
<link rel="manifest" href="manifest.json">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
```

```json
// Example manifest.json structure
{
  "name": "Windows 11 Portfolio",
  "short_name": "Portfolio",
  "description": "A Windows 11-themed portfolio website",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0078d4"
}
```

### Core Project Files Update
**Trigger:** When someone wants to update core project functionality
**Command:** `/update-core`

1. **Modify main HTML structure** - Update index.html with new layout or component changes
2. **Update JavaScript functionality** - Enhance script.js with new features or improvements
3. **Adjust styling if needed** - Update style.css to support new functionality
4. **Update documentation** - Sync README.md with current features and usage

```javascript
// Example core functionality update
const desktopManager = {
  init() {
    this.setupEventListeners();
    this.loadApplications();
  },
  
  setupEventListeners() {
    // Handle desktop interactions
  }
};
```

## Testing Patterns

Testing framework not definitively identified, but the project follows standard web testing conventions:
- Test files should match pattern `*.test.*`
- Focus on DOM manipulation and user interaction testing
- Browser compatibility testing for Windows 11 styling features

```javascript
// Expected test structure
describe('Window Manager', () => {
  test('should create new window', () => {
    // Test implementation
  });
});
```

## Commands

| Command | Purpose |
|---------|---------|
| `/add-web-standards` | Add missing standard web project infrastructure files |
| `/update-core` | Update core project files (HTML, JS, CSS, README) as a unit |
| `/enhance-windows11-theme` | Improve Windows 11 styling and visual elements |
| `/optimize-portfolio` | Optimize performance and SEO elements |