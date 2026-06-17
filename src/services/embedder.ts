export async function loadEmbedder(): Promise<void> {
  return Promise.resolve();
}

export async function embed(text: string): Promise<Float32Array> {
  const words = text.toLowerCase().split(/\s+/);
  const vec = new Float32Array(384).fill(0);
  words.forEach((w, i) => {
    vec[i % 384] += w.length;
  });
  return vec;
}