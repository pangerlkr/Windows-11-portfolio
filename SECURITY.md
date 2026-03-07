# Security Policy

## Supported Versions

This is a static front-end portfolio project. Security updates are applied to the latest version on the `main` branch.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Contact the maintainer directly via the contact details available on the portfolio site.
3. Include a description of the vulnerability, steps to reproduce it, and any potential impact.

You can expect an acknowledgement within 48 hours and a resolution or mitigation plan within 7 days.

## Security Considerations

- This project is a static website with no server-side code or database.
- It uses the following external APIs: `ipapi.co` and `api.open-meteo.com` for weather and location data. No personal data is stored.
- All external resources (icons, images, fonts) are loaded from trusted CDNs. If you notice a compromised CDN resource, please report it.
- The site is hosted on GitHub Pages, which provides HTTPS by default.
