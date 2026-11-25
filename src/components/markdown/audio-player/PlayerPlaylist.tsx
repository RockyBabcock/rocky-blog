import type { AudioTimeStore } from '@hooks/useAudioPlayer';
import type { MetingSong } from '@lib/meting';
import { cn } from '@lib/utils';

export interface PlaylistGroup {
  title: string;
  startIndex: number;
  count: number;
}

interface PlayerPlaylistProps {
  tracks: MetingSong[];
  groups: PlaylistGroup[];
  currentIndex: number;
  timeStore: AudioTimeStore;
  activeTab: number;
  onTabChange: (index: number) => void;
  onTrackSelect: (index: number) => void;
  onSeek?: (seconds: number) => void;
}

export function PlayerPlaylist({
  tracks,
  groups,
  currentIndex,
  activeTab,
  onTabChange,
  onTrackSelect,
}: PlayerPlaylistProps) {
  const activeGroup = groups[activeTab];
  const visibleTracks = activeGroup
    ? tracks.slice(activeGroup.startIndex, activeGroup.startIndex + activeGroup.count).map((track, offset) => ({
        track,
        index: activeGroup.startIndex + offset,
      }))
    : tracks.map((track, index) => ({ track, index }));

  return (
    <div className="audio-player-playlist border-t border-border/60 pt-2">
      {groups.length > 1 && (
        <div className="audio-player-tabs mb-2 flex gap-1.5 overflow-x-auto px-3">
          {groups.map((group, idx) => (
            <button
              key={group.title}
              type="button"
              onClick={() => onTabChange(idx)}
              className={cn(
                'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                idx === activeTab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/70 text-muted-foreground hover:text-foreground',
              )}
            >
              {group.title}
            </button>
          ))}
        </div>
      )}
      <div className="audio-player-song-list max-h-44 overflow-y-auto px-2 pb-2">
        {visibleTracks.map(({ track, index }) => {
          const active = index === currentIndex;
          return (
            <button
              key={`${track.name}-${index}`}
              type="button"
              onClick={() => onTrackSelect(index)}
              className={cn(
                'flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors',
                active
                  ? 'bg-primary/12 font-semibold text-primary'
                  : 'text-foreground/85 hover:bg-muted/70',
              )}
            >
              <span className="truncate">
                <span className="mr-2 font-mono text-[10px] opacity-60">{index + 1}</span>
                {track.name}
              </span>
              <span className="shrink-0 text-[11px] text-muted-foreground">{track.artist}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
