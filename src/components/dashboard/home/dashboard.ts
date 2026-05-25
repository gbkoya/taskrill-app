export interface Stat {
  icon: string;
  label: string;
  value?: string;
  sub?: string;
  accent: string;
}

export interface Task {
  platform: 'ig' | 'yt' | 'x';
  color: string;
  title: string;
  desc: string;
  tokens: number;
  users: number;
  completed: boolean;
}

export interface TopRank {
  name: string;
  tokens: string;
  rank: number;
  avatar: string;
  color: string;
}

export interface Prize {
  name: string;
  icon: string;
}