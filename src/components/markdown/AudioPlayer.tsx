/**
 * AudioPlayer — Shoka-style inline audio player for articles.
 *
 * Resolves both Meting music links (NetEase / QQ Music songs & playlists)
 * and direct HTML5 audio URLs from `data-src`.
 */

import { useAudioPlayer } from '@hooks/useAudioPlayer';
import { useTranslation } from '@hooks/useTranslation';
import { type AudioPlaylistGroup, type MetingSong, resolveAudioPlaylist } from '@lib/meting';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PlayerPlaylist } from './audio-player/PlayerPlaylist';
import { PlayerPreview } from './audio-player/PlayerPreview';
import { MediaControls } from './shared/MediaControls';

interface AudioPlayerProps {
  element: HTMLElement;
}

export function AudioPlayer({ element }: AudioPlayerProps) {
  const { t } = useTranslation();
  const rawSrc = element.dataset.src;

  const [tracks, setTracks] = useState<MetingSong[]>([]);
  const [groups, setGroups] = useState<AudioPlaylistGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const loadTracks = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    resolveAudioPlaylist(rawSrc, { signal: controller.signal })
      .then((resolved) => {
        if (controller.signal.aborted) return;
        setTracks(resolved.songs);
        setGroups(resolved.groups);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, [rawSrc]);

  useEffect(() => {
    loadTracks();
    return () => abortRef.current?.abort();
  }, [loadTracks]);

  const player = useAudioPlayer(tracks);
  const currentTrack = tracks[player.state.currentIndex] ?? null;

  // Sync active tab when current track changes across groups
  useEffect(() => {
    const idx = groups.findIndex(
      (g) => player.state.currentIndex >= g.startIndex && player.state.currentIndex < g.startIndex + g.count,
    );
    if (idx >= 0) setActiveTab(idx);
  }, [player.state.currentIndex, groups]);

  if (loading) {
    return (
      <div className="audio-player not-prose">
        <div className="audio-player-loading">
          <span className="audio-player-spinner" aria-hidden="true" />
          <span>{t('audio.loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="audio-player not-prose">
        <div className="audio-player-error">
          <span>{t('audio.loadError', { error })}</span>
          <button type="button" className="audio-player-retry" onClick={loadTracks}>
            {t('audio.retry')}
          </button>
        </div>
      </div>
    );
  }

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
