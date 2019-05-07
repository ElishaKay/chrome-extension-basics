# The Chrome Extension Scraper

Fetch Data from the DOM or the Network Tab directly.

Step 1: Unzip the folder.

Step 2: Go to the Chrome Extensions tab at chrome://extensions/

Step 3: Click the "Developer Mode" switch (should be enabled)

Step 4: Click "Load Unpacked". Choose the directory of the unzipped folder (the manifest.json file should be in the root directory chosen)

Step 5: Visit https://www.amazon.com/s?k=funny+gifts 

The Browser will automatically cycle between pages 1 and 18 and then loop back around.

While this is happening, visit the chrome://extensions/ page again, and click "background.html" - this will give you a Chrome developer tools GUI for view what's happening in the "background.js" of your Chrome Extension (your Amazon Network activity will get logged to the console, and can be sent to any server of your choice).
