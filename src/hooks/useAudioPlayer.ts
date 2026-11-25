import type { MetingSong } from '@lib/meting';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type PlayMode = 'list' | 'single' | 'random';

export interface AudioTimeSnapshot {
  currentTime: number;
  duration: number;
}

export interface AudioTimeStore {
  getSnapshot: () => AudioTimeSnapshot;
  subscribe: (listener: () => void) => () => void;
}

export interface AudioPlayerState {
  currentIndex: number;
  playing: boolean;
  loading: boolean;
  mode: PlayMode;
  volume: number;
  muted: boolean;
}

export function useAudioPlayer(tracks: MetingSong[] = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<PlayMode>('list');
  const [volume, setVolumeState] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeRef = useRef<AudioTimeSnapshot>({ currentTime: 0, duration: 0 });
  const listenersRef = useRef<Set<() => void>>(new Set());

  const emitTime = useCallback(() => {
    for (const listener of listenersRef.current) listener();
  }, []);

  const timeStore = useMemo<AudioTimeStore>(
    () => ({
      getSnapshot: () => timeRef.current,
      subscribe: (listener: () => void) => {
        listenersRef.current.add(listener);
        return () => {
          listenersRef.current.delete(listener);
        };
      },
    }),
    [],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audio.muted = muted;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      timeRef.current = {
        currentTime: audio.currentTime || 0,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      };
      emitTime();
    };
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onTimeUpdate);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onTimeUpdate);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audioRef.current = null;
    };
  }, [emitTime]);

  const loadTrack = useCallback(
    (index: number, autoPlay: boolean) => {
      const track = tracks[index];
      const audio = audioRef.current;
      if (!track || !audio) return;
      if (track.url && audio.src !== track.url) {
        audio.src = track.url;
      }
      timeRef.current = { currentTime: 0, duration: 0 };
      emitTime();
      if (autoPlay && track.url) {
        audio.play().catch(() => setPlaying(false));
      }
    },
    [tracks, emitTime],
  );

  const play = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      loadTrack(index, true);
    },
    [loadTrack],
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      const track = tracks[currentIndex];
      if (track?.url && audio.src !== track.url) {
        audio.src = track.url;
      }
      if (track?.url) {
        audio.play().catch(() => setPlaying(false));
      }
    }
  }, [playing, tracks, currentIndex]);

  const nextTrack = useCallback(() => {
    if (tracks.length === 0) return;
    const nextIdx =
      mode === 'random'
        ? Math.floor(Math.random() * tracks.length)
        : (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIdx);
    loadTrack(nextIdx, playing);
  }, [tracks.length, mode, currentIndex, loadTrack, playing]);

  const prevTrack = useCallback(() => {
    if (tracks.length === 0) return;
    const prevIdx = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentIndex(prevIdx);
    loadTrack(prevIdx, playing);
  }, [tracks.length, currentIndex, loadTrack, playing]);

  const seek = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = seconds;
      timeRef.current = { ...timeRef.current, currentTime: seconds };
      emitTime();
    },
    [emitTime],
  );

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const state: AudioPlayerState = {
    currentIndex,
    playing,
    loading,
    mode,
    volume,
    muted,
  };

  return {
    state,
    timeStore,
    play,
    togglePlay,
    prevTrack,
    nextTrack,
    seek,
    setMode,
    setVolume,
    toggleMute,
  };
}
