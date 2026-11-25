export type BangumiCollectionType = 1 | 2 | 3 | 4 | 5;

export interface BangumiSubject {
  id: number;
  name: string;
  name_cn: string;
  short_summary?: string;
  date?: string;
  score?: number;
  eps?: number;
  volumes?: number;
  images?: {
    small?: string;
    grid?: string;
    large?: string;
    medium?: string;
    common?: string;
  };
  tags?: Array<{ name: string; count: number }>;
}

export interface BangumiUserCollection {
  subject_id: number;
  subject_type: number;
  rate: number;
  type: BangumiCollectionType;
  comment?: string;
  tags?: string[];
  ep_status: number;
  vol_status: number;
  updated_at: string;
  private: boolean;
  subject: BangumiSubject;
}
