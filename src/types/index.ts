export type Journal = {
  id: number;
  labs: {
    num: number;
    deadline?: Date;
  }[];
  discription: string;
  students: number[]
}

export type Lab = {
  userId: number;
  journalId: number;
  num: number;
  status: number;
  score: number;
}

export type User = {
  id: number;
  photo: string | null;
  name: string;
  surname: string;
  contacts?: Contact[]
  email: string;
  phone: string;
}

export type Contact = {
  id: number;
  type: string;
  value: string;
}

// export type Student = {
//   id: number;
//   name: string;
//   surname: string;
//   photo: string | null;
//   course: String;
//   group: string;
//   done: DoneLab[];
//   email: string;
//   phone: string;
//   contacts?: Contact[]
// };

// export type Lab = {
//   id: number;
//   number: number;
//   subject: string;
//   name: string;
//   deadline: Date
// };

// export type DoneLab = {
//   id: number;
//   labId: number;
//   status: number;
//   score: number;
// };

export type HistoryType = {
  id: number;
  date: Date;
  studentName: string;
  labName: string;
  status: number;
};

export type Message = {
  id: number;
  from: number;
  to: number;
  theme: string;
  content: string;
}