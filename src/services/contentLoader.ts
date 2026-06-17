import { saveChunk, initDB, saveEmbedding } from './storage';

const floodChunks = [
  {
    id: 'flood_001',
    type: 'flood',
    title: 'Immediate Steps',
    text: 'Move to higher ground immediately. Do not walk in moving water. Six inches of moving water can knock you down.'
  },
  {
    id: 'flood_002',
    type: 'flood',
    title: 'First Aid Drowning',
    text: 'Lay person flat. Tilt head back. Give 2 rescue breaths. 30 compressions on chest. Repeat until help arrives.'
  },
  {
    id: 'flood_003',
    type: 'flood',
    title: 'Avoid Contaminated Water',
    text: 'Floodwater contains sewage and chemicals. Do not touch your face. Wash hands with clean water immediately.'
  }
];

const cycloneChunks = [
  {
    id: 'cyclone_001',
    type: 'cyclone',
    title: 'Before Cyclone Hits',
    text: 'Move indoors immediately. Stay away from windows. Go to the lowest floor interior room.'
  },
  {
    id: 'cyclone_002',
    type: 'cyclone',
    title: 'After Cyclone',
    text: 'Do not go outside until authorities confirm it is safe. Watch for fallen power lines and damaged buildings.'
  }
];

export async function loadContentIfEmpty(): Promise<void> {
  initDB();
  const allChunks = [...floodChunks, ...cycloneChunks];
  for (const chunk of allChunks) {
    saveChunk(chunk);
  }
}

export async function embedAllChunks(chunks: any[]): Promise<void> {
  return Promise.resolve();
}