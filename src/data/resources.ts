import type { ResourceGroup } from '../types';

// Example resources with Google Drive PDF links and quarters
export const resources: ResourceGroup = {
  'primary/1ap': {
    'mathematics': [
      {
        id: 1,
        title: 'Mathematics First Quarter Exam 2023',
        type: 'Exam',
        downloadCount: 156,
        duration: '2 hours',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1vhQh-E-kg5zP94irAZDzVRt0tqOV-egs',
        quarter: 'q1'
      },
      {
        id: 2,
        title: 'Mathematics Second Quarter Exam 2023',
        type: 'Exam',
        downloadCount: 143,
        duration: '2 hours',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1vhQh-E-kg5zP94irAZDzVRt0tqOV-egs',
        quarter: 'q2'
      },
      {
        id: 3,
        title: 'Mathematics Third Quarter Exam 2023',
        type: 'Exam',
        downloadCount: 128,
        duration: '2 hours',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1vhQh-E-kg5zP94irAZDzVRt0tqOV-egs',
        quarter: 'q3'
      }
    ],
    'arabic': [
      {
        id: 4,
        title: 'Arabic Language First Quarter Exam 2023',
        type: 'Exam',
        downloadCount: 189,
        duration: '2 hours',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1vhQh-E-kg5zP94irAZDzVRt0tqOV-egs',
        quarter: 'q1'
      }
    ]
  }
};

export const addResource = (
  levelId: string,
  classId: string,
  subjectId: string,
  resource: {
    title: string;
    type: string;
    downloadUrl: string;
    quarter?: string;
  }
) => {
  const key = `${levelId}/${classId}`;
  
  if (!resources[key]) {
    resources[key] = {};
  }
  if (!resources[key][subjectId]) {
    resources[key][subjectId] = [];
  }

  const newResource = {
    id: Date.now(),
    downloadCount: 0,
    duration: '2 hours',
    ...resource
  };

  resources[key][subjectId].push(newResource);
  return newResource;
};

const downloadCounts: Record<number, number> = {};

export const incrementDownloadCount = (
  _levelId: string,
  _classId: string,
  _subjectId: string,
  resourceId: number
) => {
  downloadCounts[resourceId] = (downloadCounts[resourceId] || 0) + 1;
};