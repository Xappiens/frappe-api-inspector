# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added schema export for the selected DocType in CSV, JSON, and Markdown formats.
- Added a reusable `downloadFile` helper for browser-based file downloads.
- Added configurable API test generation with method selection for `GET`, `POST`, `PUT`, and `DELETE`.
- Added a test generator modal where users choose the maximum number of tests to create.
- Added response previews in the API test execution log so returned Frappe payloads can be inspected after running tests.
- Added support for multi-status assertions such as `201/200` in API tests.

### Changed
- Refined the dashboard UI with flatter, more minimal styling and less generated-looking copy.
- Improved the light/dark theme transition using browser view transitions when available.
- Made header actions more responsive for laptop-sized screens.
- Improved schema table readability by preserving a minimum table width and allowing horizontal scrolling.
- Updated API test generation to avoid automatically creating every possible test without user confirmation.
- Made `DELETE` generated tests safe by using a placeholder docname instead of a real record.

### Fixed
- Fixed poor contrast in the Create Document modal for field labels, fieldname chips, and field type badges.
- Fixed low-contrast styling for the "Run All Tests" button.
- Removed distracting emojis from header/test controls for a cleaner professional UI.
- Improved toast wording when generated API tests already exist.

## [1.0.0] - 2026-03-23

### Added
- **Smart Permission Scanner**: Brute-force scanner gracefully extracts allowed DocTypes for non-admin accounts.
- **Schema Diff Visualizer**: Easily spot added, modified, or removed fields between environments.
- **Automated API Test Runner**: Build, save, and execute a suite of manual API tests directly from the UI.
- **Local Webhook Listener**: Catch incoming events seamlessly via local NodeJS Proxy.
- **JSON Payload Generator**: Instant "Copy Payload" utility for Postman/Bruno integrations.
- **Global Search**: Quick navigation (Ctrl+K) for high productivity across cached schemas.
- **Themes**: Implemented Dark/Light mode toggle.
