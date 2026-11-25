/**
 * VideoPlaylist — song list with play icon, time display,
 * progress background on current track, and click-to-seek.
 *
 * Reuses audio-player CSS classes for consistent styling.
 * Progress and time text are updated outside React's render cycle.
 */

import { usePlaybackFormattedTime, usePlaybackProgress } from '@hooks/usePlaybackTime';
import { Icon } from '@iconify/react';
import type { PlaybackTimeStore } from '@lib/playback-time-store';
import { cn } from '@lib/utils';
import { memo, useRef } from 'react';
import type { VideoTrack } from './utils';

interface VideoPlaylistProps {
  tracks: VideoTrack[];
  currentIndex: number;
  timeStore: PlaybackTimeStore;
  onTrackSelect: (index: number) => void;
  onSeek: (time: number) => void;
}

/** Isolated time display — re-renders at most 1/s via useSyncExternalStore. */
function TrackTimeDisplay({ timeStore }: { timeStore: PlaybackTimeStore }) {
  return <>{usePlaybackFormattedTime(timeStore)}</>;
}

export const VideoPlaylist = memo(function VideoPlaylist({
  tracks,
  currentIndex,
  timeStore,
  onTrackSelect,
  onSeek,
}: VideoPlaylistProps) {
  const progressBgRef = useRef<HTMLDivElement>(null);
  usePlaybackProgress(timeStore, progressBgRef);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (index === currentIndex) {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onSeek(ratio * timeStore.getDuration());
    } else {
      onTrackSelect(index);
    }
  };

  return (
    <div className="audio-player-playlist">
      <div className="audio-player-song-list">
        {(() => {
          const seen = new Map<string, number>();
          return tracks.map((track, index) => {
            const isCurrent = index === currentIndex;
            const base = `${track.url}-${track.name}`;
            const count = (seen.get(base) ?? 0) + 1;
            seen.set(base, count);
            return (
              <button
                key={`${base}#${count}`}
                type="button"
                className={cn('audio-player-song-item', isCurrent && 'current')}
                onClick={(e) => handleClick(e, index)}
              >
                {isCurrent && <div ref={progressBgRef} className="audio-player-song-progress-bg" style={{ width: '0%' }} />}
                <span className="audio-player-song-index">{isCurrent ? <Icon icon="ri:play-fill" /> : index + 1}</span>
                <span className="audio-player-song-title">{track.name}</span>
                <span className="audio-player-song-artist">
                  {isCurrent ? <TrackTimeDisplay timeStore={timeStore} /> : (track.author ?? '')}
                </span>
              </button>
            );
          });
        })()}
      </div>
    </div>
  );
});
