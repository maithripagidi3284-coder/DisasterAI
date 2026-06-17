export async function semanticSearch(query: string, allChunks: any[]): Promise<any[]> {
  const queryWords = query.toLowerCase().split(/\s+/);
  
  const scored = allChunks.map(chunk => {
    const chunkText = (chunk.title + ' ' + chunk.text).toLowerCase();
    let score = 0;
    queryWords.forEach(word => {
      if (chunkText.includes(word)) score++;
    });
    return { ...chunk, score };
  });

  return scored
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}