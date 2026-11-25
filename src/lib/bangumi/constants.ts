export const ITEMS_PER_PAGE = 12;

export const SUBJECT_TYPE_KEYS = {
  anime: 'anime',
  game: 'game',
  book: 'book',
} as const;

export type SubjectTypeKey = keyof typeof SUBJECT_TYPE_KEYS;
