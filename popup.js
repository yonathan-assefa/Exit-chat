document.addEventListener('DOMContentLoaded', function() {
    var passwordInput = document.getElementById('passwordInput');
    var authenticateButton = document.getElementById('authenticateButton');
    var apiKeyInput = document.getElementById('apiKeyInput');
    var saveApiKeyButton = document.getElementById('saveApiKeyButton');
    var questionInput = document.getElementById('questionInput');
    var choicesInput = document.getElementById('choicesInput');
    var submitButton = document.getElementById('submitButton');
    var responseContainer = document.getElementById('responseContainer');
    var authContainer = document.getElementById('authContainer');
    var apiKeyContainer = document.getElementById('apiKeyContainer');
    var chatbotContainer = document.getElementById('chatbotContainer');
  
    var apiKey = '';
  
    // Authenticate the user with the password
    authenticateButton.addEventListener('click', function() {
      var password = passwordInput.value;
  
      // Check the password
      if (password === 'your_password') { // Replace 'your_password' with your desired password
        authContainer.style.display = 'none';
        apiKeyContainer.style.display = 'block';
      } else {
        alert('Invalid password');
      }
    });
  
    // Save the API key
    saveApiKeyButton.addEventListener('click', function() {
      apiKey = apiKeyInput.value;
      apiKeyContainer.style.display = 'none';
      chatbotContainer.style.display = 'block';
    });
  
    // Submit the question and choices to the chatbot
    submitButton.addEventListener('click', function() {
      var question = questionInput.value;
      var choices = choicesInput.value.split(',');
  
      // Call the chatbot API with the question and choices
      callChatbot(question, choices)
        .then(function(response) {
          // Update the response container with the chatbot's message
          responseContainer.textContent = response;
        })
        .catch(function(error) {
          console.error('Error calling the chatbot:', error);
          responseContainer.textContent = 'Error: Failed to call the chatbot';
        });
    });
  
    // Function to call the chatbot API
    function callChatbot(question, choices) {
      // Implement your logic to call the chatbot API or perform necessary processing here
      // Return the chatbot response (a sample response is used in this example)
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve('Chatbot response: This is the response from the chatbot!');
        }, 2000); // Simulating an asynchronous API call
      });
    }
  
    // Check if the API key is saved (for subsequent usage after authentication)
    chrome.storage.local.get(['apiKey'], function(result) {
      if (result.apiKey) {
        apiKey = result.apiKey;
        authContainer.style.display = 'none';
        chatbotContainer.style.display = 'block';
      }
    });
  
    // Save the API key to local storage
    chrome.storage.local.set({ apiKey: apiKey });
  });
  