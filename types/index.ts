export type Student = {
  id: number;
  name: string;
  surname: string;
  group: string;
  done: DoneLab[];
  email: string;
};

export type Lab = {
  id: number;
  number: string;
  subject: string;
};

export type DoneLab = {
  id: number;
  labId: number;
  status: number;
  score: number;
};

export type HistoryType = {
  id: number;
  date: Date;
  studentName: string;
  labName: string;
  status: number;
};
