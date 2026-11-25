/**
 * AudioPlayer — Shoka-style inline audio player for articles.
 *
 * Uses direct HTML5 audio URLs parsed from `data-src` without any
 * third-party playlist API (Meting / NetEase / QQ Music) dependency.
 */

import { useAudioPlayer } from '@hooks/useAudioPlayer';
import { useTranslation } from '@hooks/useTranslation';
import { parseAudioTracksFromJson } from '@lib/audio-tracks';
import { useEffect, useMemo, useState } from 'react';
import { PlayerPlaylist } from './audio-player/PlayerPlaylist';
import { PlayerPreview } from './audio-player/PlayerPreview';
import { MediaControls } from './shared/MediaControls';

interface AudioPlayerProps {
  element: HTMLElement;
}

export function AudioPlayer({ element }: AudioPlayerProps) {
  const { t } = useTranslation();
  const { tracks, groups } = useMemo(() => parseAudioTracksFromJson(element.dataset.src), [element]);
  const [activeTab, setActiveTab] = useState(0);

  const player = useAudioPlayer(tracks);
  const currentTrack = tracks[player.state.currentIndex] ?? null;

  // Sync active tab when current track changes across groups
  useEffect(() => {
    const idx = groups.findIndex(
      (g) => player.state.currentIndex >= g.startIndex && player.state.currentIndex < g.startIndex + g.count,
    );
    if (idx >= 0) setActiveTab(idx);
  }, [player.state.currentIndex, groups]);

  if (tracks.length === 0) {
    return (
      <div className="audio-player not-prose">
        <div className="audio-player-empty">{t('audio.empty')}</div>
      </div>
    );
  }

  return (
    <div className="audio-player not-prose">
      <PlayerPreview track={currentTrack} playing={player.state.playing} timeStore={player.timeStore} />

      <MediaControls
        playing={player.state.playing}
        loading={player.state.loading}
        mode={player.state.mode}
        volume={player.state.volume}
        muted={player.state.muted}
        timeStore={player.timeStore}
        showTrackButtons={tracks.length > 1}
        onTogglePlay={player.togglePlay}
        onPrev={player.prevTrack}
        onNext={player.nextTrack}
        onSeek={player.seek}
        onSetMode={player.setMode}
        onSetVolume={player.setVolume}
        onToggleMute={player.toggleMute}
      />

      <PlayerPlaylist
        tracks={tracks}
        groups={groups}
        currentIndex={player.state.currentIndex}
        timeStore={player.timeStore}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onTrackSelect={player.play}
        onSeek={player.seek}
      />
    </div>
  );
}
