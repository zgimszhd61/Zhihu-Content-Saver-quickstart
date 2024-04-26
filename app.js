// ==UserScript==
// @name         Zhihu Content Saver
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Save Zhihu contents to a file
// @author       You
// @match        *://*.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to handle the data extraction and file saving
    function extractAndSave() {
        // Use XPath to extract content
        const xpath = '//*[@id="TopstoryContent"]//a/h2';
        let result = [];
        let nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
            let node = nodesSnapshot.snapshotItem(i);
            result.push(node.textContent.trim());
        }

        // Convert result to a string
        let content = result.join('\n');

        // Create a Blob with the content
        let blob = new Blob([content], {type: 'text/plain;charset=utf-8'});

        // Create a download link and trigger the download
        let downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'hello.txt';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    // Set a delay to ensure the page loads before extraction
    window.addEventListener('load', function() {
        setTimeout(extractAndSave, 3000);
    });
})();
