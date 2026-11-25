export interface MetingSong {
  name: string;
  artist: string;
  url: string;
  cover?: string;
  lrc?: string;
}

export async function resolvePlaylist(_urls: string[], _apiBase?: string): Promise<MetingSong[]> {
  return [];
}
