import { LucideIcon } from 'lucide-react';

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  icon: LucideIcon;
  color: string;
  count: number;
}

export interface Resource {
  id: number;
  title: string;
  type: string;
  downloadCount: number;
  duration: string;
  downloadUrl: string;
  quarter?: string;
}

export interface SubjectGroup {
  [key: string]: Subject[];
}

export interface ResourceGroup {
  [key: string]: {
    [key: string]: Resource[];
  };
}

export interface RouteParams {
  levelId: string;
  classId: string;
  subjectId?: string;
}