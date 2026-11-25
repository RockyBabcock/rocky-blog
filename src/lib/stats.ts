import { getPostWordStats, getSortedPosts } from '@lib/content/posts';

export async function getSiteStats() {
  const posts = await getSortedPosts();
  let totalWords = 0;
  let totalMinutes = 0;

  for (const post of posts) {
    const { words, minutes } = getPostWordStats(post);
    totalWords += words;
    totalMinutes += minutes;
  }

  const formattedWords = totalWords >= 1000 ? `${(totalWords / 1000).toFixed(1)}k` : String(totalWords);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const formattedTime = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return {
    postCount: posts.length,
    totalWords,
    formattedWords,
    totalMinutes,
    formattedTime,
  };
}
