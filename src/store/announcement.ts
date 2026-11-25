import { announcementsConfig } from '@constants/site-config';
import { atom, computed } from 'nanostores';
import type { Announcement } from '@/types/announcement';

const READ_STORAGE_KEY = 'koharu-read-announcements';

function isWithinDateWindow(item: Announcement): boolean {
  const now = Date.now();
  if (item.startDate && now < new Date(item.startDate).getTime()) return false;
  if (item.endDate && now > new Date(item.endDate).getTime()) return false;
  return true;
}

export const announcementListOpen = atom(false);
export const announcementInitialized = atom(false);
export const readAnnouncementIds = atom<string[]>([]);

export const activeAnnouncements = atom<Announcement[]>(
  announcementsConfig.filter((a) => isWithinDateWindow(a)),
);

export const unreadAnnouncements = computed(
  [activeAnnouncements, readAnnouncementIds],
  (list, readIds) => {
    const readSet = new Set(readIds);
    return list.filter((item) => !readSet.has(item.id));
  },
);

export const unreadCount = computed(unreadAnnouncements, (list) => list.length);

function persistReadIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function initAnnouncementState(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(READ_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        readAnnouncementIds.set(parsed.filter((v): v is string => typeof v === 'string'));
      }
    }
  } catch {
    // ignore
  }
  announcementInitialized.set(true);
}

export function openAnnouncementList(): void {
  announcementListOpen.set(true);
}

export function closeAnnouncementList(): void {
  announcementListOpen.set(false);
}

export function markAsRead(id: string): void {
  const prev = readAnnouncementIds.get();
  if (prev.includes(id)) return;
  const next = [...prev, id];
  readAnnouncementIds.set(next);
  persistReadIds(next);
}

export function markAllAsRead(): void {
  const allIds = activeAnnouncements.get().map((a) => a.id);
  readAnnouncementIds.set(allIds);
  persistReadIds(allIds);
}
