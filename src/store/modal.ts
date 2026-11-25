import { atom, computed } from 'nanostores';

export const $isDrawerOpen = atom<boolean>(false);
export const $isSettingsOpen = atom<boolean>(false);
export const $isSearchOpen = atom<boolean>(false);

export const $isAnyModalOpen = computed(
  [$isDrawerOpen, $isSettingsOpen, $isSearchOpen],
  (drawer, settings, search) => drawer || settings || search,
);

export function openDrawer() {
  $isDrawerOpen.set(true);
}

export function closeDrawer() {
  $isDrawerOpen.set(false);
}

export function toggleDrawer() {
  $isDrawerOpen.set(!$isDrawerOpen.get());
}

export function toggleSettings() {
  $isSettingsOpen.set(!$isSettingsOpen.get());
}

export function closeSettings() {
  $isSettingsOpen.set(false);
}

export function openSearch() {
  $isSearchOpen.set(true);
}

export function closeSearch() {
  $isSearchOpen.set(false);
}

export function toggleSearch() {
  $isSearchOpen.set(!$isSearchOpen.get());
}
