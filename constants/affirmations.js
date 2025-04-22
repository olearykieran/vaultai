// Daily affirmations for wealth identity

export const wealthAffirmations = [
  {
    id: '1',
    text: 'I am worthy of financial abundance and prosperity.',
    category: 'self-worth',
  },
  {
    id: '2',
    text: 'Money flows to me easily and effortlessly.',
    category: 'abundance',
  },
  {
    id: '3',
    text: 'I make decisions from a place of financial empowerment.',
    category: 'empowerment',
  },
  {
    id: '4',
    text: 'I attract wealth through my actions and mindset.',
    category: 'attraction',
  },
  {
    id: '5',
    text: 'My relationship with money improves every day.',
    category: 'growth',
  },
  {
    id: '6',
    text: 'I am a magnet for financial opportunities.',
    category: 'opportunity',
  },
  {
    id: '7',
    text: 'I invest in myself and my future with confidence.',
    category: 'confidence',
  },
  {
    id: '8',
    text: 'My income increases steadily, regardless of external circumstances.',
    category: 'income',
  },
  {
    id: '9',
    text: 'I release all limiting beliefs about money.',
    category: 'mindset',
  },
  {
    id: '10',
    text: 'I am capable of creating lasting wealth.',
    category: 'capability',
  },
  {
    id: '11',
    text: 'Every dollar I spend returns to me multiplied.',
    category: 'abundance',
  },
  {
    id: '12',
    text: 'My financial intelligence grows daily.',
    category: 'growth',
  },
  {
    id: '13',
    text: 'I transform my financial challenges into opportunities.',
    category: 'resilience',
  },
  {
    id: '14',
    text: 'My wealth identity strengthens with every choice I make.',
    category: 'identity',
  },
  {
    id: '15',
    text: 'I am the creator of my financial reality.',
    category: 'creation',
  },
];

// Get a random affirmation
export const getRandomAffirmation = () => {
  const randomIndex = Math.floor(Math.random() * wealthAffirmations.length);
  return wealthAffirmations[randomIndex];
};

// Get today's affirmation (based on day of year)
export const getTodaysAffirmation = () => {
  const date = new Date();
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % wealthAffirmations.length;
  return wealthAffirmations[index];
};

// Get affirmation by category
export const getAffirmationsByCategory = (category) => {
  return wealthAffirmations.filter(affirmation => affirmation.category === category);
};