export async function generateVideoIdeas(popularTitles) {
    try {
      const response = await fetch('http://localhost:5002/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ popularTitles }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate video ideas.');
      }
  
      const data = await response.json();
      return data.ideas.map((idea) => idea.trim()); // Ensure clean titles
    } catch (error) {
      console.error('Error generating video ideas:', error);
      return [];
    }
}