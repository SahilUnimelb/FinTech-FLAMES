const handleChatbotInput = async (userMessage) => {
  try {
    const response = await axios.post('http://localhost:5000/api/chatbot', {
      message: userMessage
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // if you need authentication
      }
    });

    // Assuming the backend sends back a responseMessage
    setMessage(response.data.responseMessage); // Set the chatbot response in the UI
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setMessage(`${error.response.data.message}`); // Handle errors
    } else {
      setMessage('An unknown error occurred');
    }
  }
};
