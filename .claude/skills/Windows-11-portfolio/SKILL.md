# Windows-11-portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill covers development patterns for a Windows 11-inspired portfolio website built with vanilla JavaScript. The codebase focuses on creating a modern web portfolio with Windows 11 aesthetic, emphasizing clean project structure, progressive enhancement, and AI-assisted development workflows. The project uses no frameworks, relying on modern JavaScript and web standards.

## Coding Conventions

### File Naming
- Use **camelCase** for JavaScript files: `script.js`, `windowManager.js`
- Use lowercase with hyphens for HTML/config files: `index.html`, `404.html`
- Use standard names for web essentials: `manifest.json`, `robots.txt`, `sitemap.xml`

### Import/Export Style
```javascript
// Mixed import styles - adapt to context
import { Component } from './component.js';
const utils = require('./utils');

// Mixed export styles
export default class WindowManager {}
module.exports = { helper };
```

### Project Structure
```
/
├── index.html          # Main portfolio page
├── script.js           # Core functionality
├── manifest.json       # PWA manifest
├── robots.txt          # SEO configuration
├── sitemap.xml         # Site structure
├── 404.html           # Error page
└── favicon.svg        # Site icon
```

## Workflows

### Project Infrastructure Setup
**Trigger:** When establishing or completing project foundation files
**Command:** `/add-project-files`

1. **Create core web files** - Set up `index.html` with Windows 11 design structure
2. **Add configuration files** - Include `manifest.json`, `robots.txt`, `sitemap.xml`
3. **Setup project essentials** - Add `LICENSE`, `.gitignore`, `favicon.svg`
4. **Create error handling** - Implement `404.html` with consistent styling
5. **Update documentation** - Ensure README reflects current project state
6. **Merge via pull request** - Use PR workflow for infrastructure changes

Example batch commit:
```bash
git add index.html manifest.json robots.txt sitemap.xml LICENSE 404.html .gitignore favicon.svg
git commit -m "Add essential project infrastructure files"
```

### Copilot-Assisted Development
**Trigger:** When leveraging AI assistance for adding standard project components
**Command:** `/copilot-enhance`

1. **Create feature branch** - Use `copilot/*` naming convention
   ```bash
   git checkout -b copilot/add-missing-files
   ```
2. **Generate files via Copilot** - Use AI suggestions for standard web files
3. **Review generated content** - Ensure consistency with project style
4. **Create pull request** - Document AI-assisted changes clearly
5. **Merge changes** - Complete integration of AI-generated improvements

Example PR workflow:
```bash
git checkout -b copilot/enhance-portfolio
# Use Copilot to generate improvements
git add .
git commit -m "Enhance portfolio with Copilot suggestions"
gh pr create --title "Copilot: Add missing project files"
```

### Core Web File Updates
**Trigger:** When modifying the core functionality or structure of the web portfolio
**Command:** `/update-core`

1. **Update HTML structure** - Modify `index.html` for layout/content changes
   ```html
   <!-- Windows 11 inspired structure -->
   <div class="desktop">
     <div class="taskbar">
       <!-- Portfolio navigation -->
     </div>
     <div class="window-container">
       <!-- Project windows -->
     </div>
   </div>
   ```
2. **Modify JavaScript functionality** - Update `script.js` for interactive features
   ```javascript
   class PortfolioWindow {
     constructor(title, content) {
       this.title = title;
       this.content = content;
       this.initialize();
     }
     
     initialize() {
       // Windows 11 window behavior
     }
   }
   ```
3. **Test integration** - Ensure HTML and JS work cohesively
4. **Commit changes together** - Keep related files in sync

## Testing Patterns

### Test File Convention
- Pattern: `*.test.*` for test files
- Framework: Unknown/Not implemented yet
- Suggested approach: Consider adding Jest or Vitest for JavaScript testing

### Recommended Test Structure
```javascript
// portfolio.test.js
describe('Portfolio Windows', () => {
  test('should create window with title', () => {
    const window = new PortfolioWindow('About Me', content);
    expect(window.title).toBe('About Me');
  });
});
```

## Commands

| Command | Purpose |
|---------|---------|
| `/add-project-files` | Set up essential project infrastructure and configuration files |
| `/copilot-enhance` | Use AI assistance to generate and improve project components |
| `/update-core` | Modify main HTML and JavaScript files for core functionality |
| `/setup-pwa` | Configure Progressive Web App features with manifest and service worker |
| `/windows11-theme` | Apply Windows 11 design patterns and styling |