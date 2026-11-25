import { atom } from 'nanostores';

export const scrollProgressEnabled = atom<boolean>(true);
export const bgmWidgetEnabled = atom<boolean>(true);

export function initSettings() {
  if (typeof window === 'undefined') return;
  try {
    const sp = localStorage.getItem('koharu-scroll-progress');
    if (sp !== null) scrollProgressEnabled.set(sp === 'true');
    const bgm = localStorage.getItem('koharu-bgm-widget');
    if (bgm !== null) bgmWidgetEnabled.set(bgm === 'true');
  } catch {}
}

export function setScrollProgressEnabled(value: boolean) {
  scrollProgressEnabled.set(value);
  try {
    localStorage.setItem('koharu-scroll-progress', String(value));
  } catch {}
}

export function setBgmWidgetEnabled(value: boolean) {
  bgmWidgetEnabled.set(value);
  try {
    localStorage.setItem('koharu-bgm-widget', String(value));
  } catch {}
}
