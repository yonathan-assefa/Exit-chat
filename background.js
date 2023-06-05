// Example background.js

// Event listener for the extension installation or update
chrome.runtime.onInstalled.addListener(function(details) {
    // Perform any necessary actions when the extension is installed or updated
    if (details.reason === 'install') {
      // Extension was installed for the first time
      console.log('Extension installed');
  
      // Set the authentication status to false initially
      chrome.storage.local.set({ authenticated: false });
  
      // Set the API key status to false initially
      chrome.storage.local.set({ apiKeySet: false });
    } else if (details.reason === 'update') {
      // Extension was updated to a new version
      console.log('Extension updated');
    }
  });
  
  // Event listener for receiving messages from the extension's content scripts
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Handle the message from the content script
    console.log('Received message:', message);
  
    // Perform any necessary actions based on the message
    // You can also send a response back to the content script if needed
  
    // Example: Send a response back to the content script
    var response = 'Background script received the message';
    sendResponse(response);
  });
  
  // Schedule the extension to ask for password only once for the first time
  chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get(['authenticated'], function(result) {
      if (!result.authenticated) {
        askForPassword();
      }
    });
  });
  
  // Function to ask for password
  function askForPassword() {
    // Perform the necessary actions to prompt for password
    // For example, you can display a browser action popup or create a new tab with a password prompt
  
    // Once authenticated, set the authenticated status to true
    chrome.storage.local.set({ authenticated: true });
  }
  
  // Function to update the API key
  function updateApiKey(apiKey) {
    // Perform the necessary actions to update the API key
    // For example, you can validate the key and save it to the storage
  
    // Set the API key status to true
    chrome.storage.local.set({ apiKeySet: true });
  }
  
  // Example function to interact with the chatbot API
  function callChatbotAPI(question, choices) {
    // Perform the necessary actions to call the chatbot API
    // Replace 'YOUR_CHATBOT_API_URL' with the actual URL of the chatbot API
  
    // Retrieve the API key from storage
    chrome.storage.local.get(['apiKeySet'], function(result) {
      if (result.apiKeySet) {
        // API key is set, proceed with the API call
  
        fetch('YOUR_CHATBOT_API_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question: question,
            choices: choices
          })
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            // Handle the chatbot API response
            console.log('Chatbot API response:', data);
          })
          .catch(function(error) {
            console.error('Error calling the chatbot API:', error);
          });
      } else {
        // API key is not set, prompt for the API key
  
        // Perform the necessary actions to prompt for the API key
        // For example, you can display a browser action popup or create a new tab with an API key input form
  
        // Once the API key is obtained, call the updateApiKey function
        var apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with the actual API key obtained from the user
        updateApiKey(apiKey);
      }
    });
  }
  
  // Check if the extension is already authenticated on startup
  chrome.storage.local.get(['authenticated'], function(result) {
    if (result.authenticated) {
      console.log('Extension already authenticated');
    }
  });
  
  // Check if the API key is already set on startup
  chrome.storage.local.get(['apiKeySet'], function(result) {
    if (result.apiKeySet) {
      console.log('API key already set');
    }
  });
  