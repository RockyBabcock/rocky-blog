import type { AudioTimeStore, PlayMode } from '@hooks/useAudioPlayer';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

interface MediaControlsProps {
  playing: boolean;
  loading: boolean;
  mode: PlayMode;
  volume: number;
  muted: boolean;
  timeStore: AudioTimeStore;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onSetMode: (mode: PlayMode) => void;
  onSetVolume: (volume: number) => void;
  onToggleMute: () => void;
}

function formatSec(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function MediaControls({
  playing,
  loading,
  mode,
  muted,
  timeStore,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onSetMode,
  onToggleMute,
}: MediaControlsProps) {
  const [snap, setSnap] = useState(() => timeStore.getSnapshot());

  useEffect(() => {
    return timeStore.subscribe(() => setSnap(timeStore.getSnapshot()));
  }, [timeStore]);

  const cycleMode = () => {
    const order: PlayMode[] = ['list', 'single', 'random'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    onSetMode(next);
  };

  return (
    <div className="audio-player-controls flex flex-col gap-2 px-3.5 pb-3">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground tabular-nums">
        <span>{formatSec(snap.currentTime)}</span>
        <input
          type="range"
          min={0}
          max={snap.duration || 100}
          value={snap.currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer accent-primary"
          aria-label="Seek"
        />
        <span>{formatSec(snap.duration)}</span>
      </div>
      <div className="audio-player-buttons flex items-center justify-between">
        <button
          type="button"
          onClick={cycleMode}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Play mode: ${mode}`}
        >
          <Icon
            icon={mode === 'random' ? 'ri:shuffle-line' : mode === 'single' ? 'ri:repeat-one-line' : 'ri:repeat-2-line'}
            className="h-4 w-4"
          />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full p-1.5 text-foreground transition-colors hover:bg-muted"
            aria-label="Previous track"
          >
            <Icon icon="ri:skip-back-fill" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            <Icon
              icon={loading ? 'ri:loader-4-line' : playing ? 'ri:pause-fill' : 'ri:play-fill'}
              className={loading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'}
            />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full p-1.5 text-foreground transition-colors hover:bg-muted"
            aria-label="Next track"
          >
            <Icon icon="ri:skip-forward-fill" className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={onToggleMute}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          <Icon icon={muted ? 'ri:volume-mute-line' : 'ri:volume-up-line'} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
