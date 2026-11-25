import type { AudioTimeStore } from '@hooks/useAudioPlayer';
import type { MetingSong } from '@lib/meting';
import { cn } from '@lib/utils';

interface PlayerPreviewProps {
  track: MetingSong | null;
  playing: boolean;
  timeStore: AudioTimeStore;
  lrcLineHeight?: number;
  lrcContainerHeight?: number;
  reserveLyrics?: boolean;
}

export function PlayerPreview({ track, playing }: PlayerPreviewProps) {
  return (
    <div className="audio-player-preview flex items-center gap-3 p-3.5">
      <div
        className={cn(
          'audio-player-disc-wrapper h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary/25 bg-muted shadow-sm',
          playing && 'animate-spin',
        )}
        style={playing ? { animationDuration: '12s' } : undefined}
      >
        {track?.pic ? (
          <img src={track.pic} alt={track.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary text-lg font-bold">
            ♪
          </div>
        )}
      </div>
      <div className="audio-player-info min-w-0 flex-1">
        <div className="audio-player-song-name truncate font-semibold text-sm text-foreground">
          {track?.name ?? 'Untitled Track'}
        </div>
        <div className="audio-player-artist truncate text-xs text-muted-foreground">
          {track?.artist ?? 'Unknown Artist'}
        </div>
      </div>
    </div>
  );
}
