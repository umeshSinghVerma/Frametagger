# FrameTagger Documentation

## Project Overview
FrameTagger is a Chrome extension built using the React framework that enables users to capture, annotate, and organize YouTube video snapshots. The project also includes a website built with Next.js that provides detailed information about the extension.

---

## Repository Structure

### 1. Extension Folder
The **Extension** folder contains the complete code for the Chrome extension. It includes the logic to add functionality to the YouTube player and the UI for user interaction.

#### Folder Breakdown:
- **public/**
  - This folder contains core scripts that handle interaction with the YouTube video player.
  - **Key File**: 
    - `updateContent.js`: This file is responsible for adding features such as buttons to the YouTube toolbar. For example, the screenshot button is added here, and it also handles functions related to capturing and editing screenshots.

- **src/**
  - This folder contains the main user interface for the Chrome extension window.
  - Inside this folder, you'll find all the components necessary to build the popup window of the extension.
  - **Key Features**:
    - If you want to **update the UI** of the extension or **add new features** like searching for saved videos, you will need to work in this folder.
    - Here, you can modify components, create new UI elements, and add features to enhance user interaction with saved content.

---

### 2. Website Folder
The **Website** folder contains the code for the FrameTagger website, built using the **Next.js** framework. The website is designed to offer users information about the FrameTagger extension, including how to use it, its features, and other related content.

---

## Key Files and Their Responsibilities

1. **updateContent.js** (Located in `Extension/public/`):
   - Responsible for adding content to the YouTube window, such as:
     - Adding buttons to the YouTube toolbar.
     - Handling interactions like taking screenshots and opening the drawing panel.
   - **Example**: To add a new button for a feature like opening the edit panel, you would need to create a function here similar to the one used for adding the screenshot button.

2. **UI Components** (Located in `Extension/src/`):
   - Responsible for the user interface of the extension window.
   - If you need to update or extend the features, like **searching saved videos**, this is the folder to work in.
   - You can create new components or modify existing ones to add functionality to the extension's popup UI.

---

## How to Contribute
If you wish to contribute to this project:
1. Clone the repository.
2. Explore the **Extension** folder if you're working on the Chrome extension, or the **Website** folder for the website.
3. Follow the folder structure to find the files you need to modify.
4. Open a pull request after making changes.

---

## How to Run and Test the Chrome Extension Locally

## How to Run and Test the Chrome Extension Locally

### 1. Build the Extension

To build the Chrome extension and prepare it for use in your browser, follow these steps:

1. Navigate to the `Extension` folder in your terminal:

   ```bash
   cd Extension
   ```

2. Install all necessary dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Wait for the build process to complete. This will generate a build folder in the Extension directory, which contains the extension files.

### 2. Load the Extension in Chrome

1. Open Google Chrome and go to the extensions page by typing the following into the address bar:
   ```
   chrome://extensions
   ```

2. Enable Developer Mode in the top-right corner of the page.

3. Click on the Load unpacked button.

4. In the file picker, navigate to the build folder inside the Extension directory of the project and select it.

5. Once loaded, pin the FrameTagger extension by clicking the extension icon in Chrome’s toolbar and selecting the pin option.

### 3. Test the Extension

1. Open any YouTube video in Chrome.

2. Check if the FrameTagger button appears in the YouTube player navigation bar. This button should allow you to take screenshots or open the drawing panel with ease.
