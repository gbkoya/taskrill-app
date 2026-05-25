import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}

export interface TaskProps {
  platform: "ig" | "yt" | "x";
  color: string;
  title: string;
  desc: string;
  tokens: number;
  users: number;
  completed: boolean;
}

export interface TopRankProps {
  name: string;
  tokens: string;
  rank: number;
  avatar: string;
  color: string;
}

export interface PrizeProps {
  name: string;
  icon: string;
}

export interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
}

export interface PlatformIconProps {
  platform: "ig" | "yt" | "x";
  color: string;
}

export interface NavigationProps {
  active: string;
  setActive: (id: string) => void;
}

export interface PlaceholderContentProps {
  label: string;
  icon: LucideIcon;
}

export interface TaskCardProps {
  task: TaskProps;
  onComplete: (title: string) => void;
}

export interface MilestoneBarProps {
  completed: number;
  total: number;
  nextMilestone: number;
  progress: number;
}
