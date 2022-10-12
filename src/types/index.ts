export type Contact = {
  id: number;
  type: string;
  value: string;
}

export type Student = {
  id: number;
  name: string;
  surname: string;
  photo: string | null;
  course: String;
  group: string;
  done: DoneLab[];
  email: string;
  phone: string;
  contacts?: Contact[]
};

export type Lab = {
  id: number;
  number: number;
  subject: string;
  name: string;
  deadline: Date
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