// This is a stub for the AI service that will eventually connect to OpenAI or another AI provider
// For the MVP, we'll just return predefined responses

// Send a message to the AI
export const sendMessage = async (message, context = {}) => {
  try {
    // In a real implementation, this would call an external API
    // For now, we'll just simulate a response
    
    // Artificial delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a placeholder response
    return {
      message: {
        text: getPlaceholderResponse(message),
        timestamp: new Date().toISOString(),
      },
      error: null
    };
  } catch (error) {
    return { message: null, error };
  }
};

// Get AI summaries for journal entries
export const generateJournalSummary = async (journalText) => {
  try {
    // Artificial delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a placeholder summary
    return {
      summary: `This journal entry reflects on personal growth and financial goals. Key insights include a focus on mindset and practical steps toward financial independence.`,
      error: null
    };
  } catch (error) {
    return { summary: null, error };
  }
};

// Helper function to generate placeholder responses
const getPlaceholderResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm your wealth identity coach. How can I assist you today?";
  } else if (lowerMessage.includes('goal') || lowerMessage.includes('goals')) {
    return "Setting clear, specific financial goals is the first step to building wealth. What specific goal would you like to work on?";
  } else if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
    return "Investing is a powerful way to build wealth. Start small, learn consistently, and increase your investments as your knowledge grows.";
  } else if (lowerMessage.includes('money') || lowerMessage.includes('finance')) {
    return "Your relationship with money is a reflection of your self-worth. Let's work on building a positive money mindset.";
  } else {
    return "💡 Coming soon: Advanced AI coaching to help you develop your wealth identity and achieve financial freedom.";
  }
};