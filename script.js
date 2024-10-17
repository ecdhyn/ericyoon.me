document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const originalHTML = content.innerHTML;
    content.innerHTML = '';

    let textIndex = 0;
    let currentElement = document.createElement('div');
    content.appendChild(currentElement);

    function typeWriter() {
        if (textIndex < originalHTML.length) {
            if (originalHTML[textIndex] === '<') {
                // Handle HTML tags
                let tagEnd = originalHTML.indexOf('>', textIndex);
                if (tagEnd !== -1) {
                    let tag = originalHTML.slice(textIndex, tagEnd + 1);
                    let tempDiv = document.createElement('div');
                    tempDiv.innerHTML = tag;
                    let newNode = tempDiv.firstChild;
                    
                    if (tag.startsWith('</')) {
                        // Closing tag, move up to parent
                        currentElement = currentElement.parentNode || content;
                    } else {
                        // Opening tag, append new element
                        currentElement.appendChild(newNode);
                        if (!newNode.outerHTML.startsWith('<br')) {
                            currentElement = newNode;
                        }
                    }
                    textIndex = tagEnd + 1;
                }
            } else {
                // Regular text
                let textNode = document.createTextNode(originalHTML[textIndex]);
                currentElement.appendChild(textNode);
                textIndex++;
            }
            setTimeout(typeWriter, 40); 
        }
    }
    
    typeWriter();
});