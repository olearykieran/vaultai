// Helper functions for generating journal prompts

// List of journal prompt templates
const promptTemplates = [
  {
    id: 'wealth_identity',
    text: 'How does someone with a net worth of ${{amount}} think and act differently than you do now?',
    variables: ['amount'],
  },
  {
    id: 'gratitude',
    text: 'List three financial blessings in your life today, no matter how small.',
    variables: [],
  },
  {
    id: 'habits',
    text: 'What is one wealth habit you want to develop in the next {{timeframe}}?',
    variables: ['timeframe'],
  },
  {
    id: 'belief',
    text: 'What limiting belief about money did you inherit from your family, and how can you reframe it?',
    variables: [],
  },
  {
    id: 'vision',
    text: 'Describe your ideal financial situation {{timeframe}} from now in vivid detail.',
    variables: ['timeframe'],
  },
  {
    id: 'values',
    text: 'How do your current spending habits align (or not align) with your core values?',
    variables: [],
  },
  {
    id: 'mindset',
    text: 'In what situations do you find yourself thinking from scarcity rather than abundance?',
    variables: [],
  },
  {
    id: 'goal',
    text: 'What is your next significant financial goal, and what specific steps will you take to achieve it?',
    variables: [],
  },
];

// Time frame options for prompts
const timeFrames = ['30 days', '3 months', '1 year', '5 years', '10 years'];

// Wealth amounts for prompts
const wealthAmounts = ['250,000', '1 million', '5 million', '10 million', '100 million'];

// Get a random value from an array
const getRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a complete prompt by filling in template variables
export const generatePrompt = (templateId = null) => {
  // Get a template (specific or random)
  const template = templateId
    ? promptTemplates.find(p => p.id === templateId)
    : getRandomValue(promptTemplates);
  
  if (!template) return '';
  
  // Fill in the variables
  let promptText = template.text;
  
  if (template.variables.includes('timeframe')) {
    promptText = promptText.replace('{{timeframe}}', getRandomValue(timeFrames));
  }
  
  if (template.variables.includes('amount')) {
    promptText = promptText.replace('{{amount}}', getRandomValue(wealthAmounts));
  }
  
  return promptText;
};

// Get a prompt based on user's streak (more advanced prompts for higher streaks)
export const getStreakBasedPrompt = (streak = 0) => {
  if (streak < 3) {
    // Beginner prompts: gratitude, vision
    const beginnerPromptIds = ['gratitude', 'vision'];
    const templateId = getRandomValue(beginnerPromptIds);
    return generatePrompt(templateId);
  } else if (streak < 10) {
    // Intermediate prompts: habits, values, goal
    const intermediatePromptIds = ['habits', 'values', 'goal'];
    const templateId = getRandomValue(intermediatePromptIds);
    return generatePrompt(templateId);
  } else {
    // Advanced prompts: wealth_identity, belief, mindset
    const advancedPromptIds = ['wealth_identity', 'belief', 'mindset'];
    const templateId = getRandomValue(advancedPromptIds);
    return generatePrompt(templateId);
  }
};