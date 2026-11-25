import { atom } from 'nanostores';

export const $bgmPanelOpen = atom<boolean>(false);

export function openBgmPanel() {
  $bgmPanelOpen.set(true);
}

export function closeBgmPanel() {
  $bgmPanelOpen.set(false);
}

export function toggleBgmPanel() {
  $bgmPanelOpen.set(!$bgmPanelOpen.get());
}
