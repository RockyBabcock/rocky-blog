import { christmasConfig } from '@constants/site-config';
import { atom } from 'nanostores';

export const christmasEnabled = atom<boolean>(false);
export const ornamentHidden = atom<boolean>(false);

export function initChristmasState() {
  if (!christmasConfig.enabled || typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem('koharu-christmas');
    const enabled = stored !== null ? stored === 'true' : true;
    christmasEnabled.set(enabled);
    document.documentElement.classList.toggle('christmas', enabled);
  } catch {
    christmasEnabled.set(false);
  }
}

export function enableChristmas() {
  christmasEnabled.set(true);
  ornamentHidden.set(false);
  if (typeof window !== 'undefined') {
    document.documentElement.classList.add('christmas');
    try {
      localStorage.setItem('koharu-christmas', 'true');
    } catch {}
  }
}

export function disableChristmas() {
  christmasEnabled.set(false);
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('christmas');
    try {
      localStorage.setItem('koharu-christmas', 'false');
    } catch {}
  }
}

export function disableChristmasCompletely() {
  disableChristmas();
  ornamentHidden.set(true);
}

export function toggleChristmas() {
  if (christmasEnabled.get()) disableChristmas();
  else enableChristmas();
}
