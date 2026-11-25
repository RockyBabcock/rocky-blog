/**
 * Tweet embed component using react-tweet
 * Provides a lightweight, theme-aware Twitter/X embed
 */

import { useElementVisibility, useIsDarkTheme } from '@hooks/index';
import { createContext, useContext } from 'react';
import { Tweet } from 'react-tweet';

interface TweetEmbedProps {
  element: Element;
  tweetId: string;
  sourceUrl: string;
}

const TweetSourceUrlContext = createContext('');

function TweetNotFound() {
  const sourceUrl = useContext(TweetSourceUrlContext);
  return (
    <div className="border-border bg-card w-full max-w-[550px] rounded-xl border p-5 text-center">
      <p className="text-foreground m-0 font-medium">Tweet unavailable</p>
      <a
        href={sourceUrl}
        target="_blank"
        className="text-primary mt-2 block truncate text-sm hover:underline"
        rel="noopener noreferrer"
        title={sourceUrl}
      >
        {sourceUrl}
      </a>
    </div>
  );
}

const tweetComponents = { TweetNotFound };

function TweetEmbed({ element, sourceUrl, tweetId }: TweetEmbedProps) {
  const isDark = useIsDarkTheme();
  const isVisible = useElementVisibility(element);

  const theme = isDark ? 'dark' : 'light';

  return (
    <TweetSourceUrlContext value={sourceUrl}>
      <div className="not-prose my-6 flex justify-center" data-theme={theme}>
        {isVisible ? (
          <Tweet id={tweetId} components={tweetComponents} />
        ) : (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            {sourceUrl}
          </a>
        )}
      </div>
    </TweetSourceUrlContext>
  );
}

export default TweetEmbed;
