export type AnnouncementType = 'info' | 'success' | 'warning' | 'error';

export interface AnnouncementLink {
  url: string;
  text: string;
  external?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  priority?: number;
  color?: string;
  publishDate: string;
  startDate?: string;
  endDate?: string;
  link?: AnnouncementLink;
}
