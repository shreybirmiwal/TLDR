async function parseData(userEmail) {
    const promptText = `
      Given the following email, generate a SHORT (EXTREMELY CONSISE, you will be rewarded for using as FEW WORDS as possible) list of to do action items TLDR:\n${userEmail}
    `;

    const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
            prompt: promptText,
            max_tokens: 150
        })

    });

    if (!response.ok) {
        throw new Error('Failed to fetch to-do action items');
    }

    const data = await response.json();
    return data.choices[0].text;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchData') {
        const textContent = document.body.innerText;
        parseData(textContent).then((toDoActions) => {
            chrome.runtime.sendMessage({ action: 'showText', text: toDoActions });
        }).catch((error) => {
            console.error("Error parsing data:", error);
        });
    }
});

// Call fetchData when the page loads
fetchData();
