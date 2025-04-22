// Visualization scenes for the ritual

export const visualizationScenes = [
  {
    id: '1',
    title: 'Penthouse View',
    description: 'A luxurious penthouse overlooking a vibrant city skyline',
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    prompt: 'Imagine yourself waking up to this view every morning. How does it feel to have achieved this level of success?',
  },
  {
    id: '2',
    title: 'Beach Retreat',
    description: 'A private beach with crystal clear waters and pristine sand',
    imageUrl: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    prompt: 'Visualize yourself walking along this private beach, financially free and at peace. What decisions led you here?',
  },
  {
    id: '3',
    title: 'Investment Success',
    description: 'A powerful image representing financial growth and investment returns',
    imageUrl: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
    prompt: 'See yourself confidently making investment decisions that consistently grow your wealth. What knowledge have you gained?',
  },
  {
    id: '4',
    title: 'Business Achievement',
    description: 'A modern office representing your successful business venture',
    imageUrl: 'https://images.pexels.com/photos/7070/space-desk-workspace-coworking.jpg',
    prompt: 'Envision running your own successful business. How many people do you employ? What impact are you making?',
  },
  {
    id: '5',
    title: 'Generous Philanthropy',
    description: 'A scene depicting your philanthropic impact on the world',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    prompt: 'Imagine using your wealth to create positive change in the world. What causes are you supporting?',
  },
];

// Get a random visualization scene
export const getRandomScene = () => {
  const randomIndex = Math.floor(Math.random() * visualizationScenes.length);
  return visualizationScenes[randomIndex];
};

// Get scene by ID
export const getSceneById = (id) => {
  return visualizationScenes.find(scene => scene.id === id);
};

// Get user's preferred scene based on preferences
export const getPreferredScene = (preferences) => {
  if (preferences && preferences.preferredSceneId) {
    const preferred = getSceneById(preferences.preferredSceneId);
    if (preferred) return preferred;
  }
  return getRandomScene();
};