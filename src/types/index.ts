export type Journal = {
  _id: number;
  labs: {
    num: number;
    deadline?: string;
    name?: string
  }[];
  discription: string;
  students: string[]
}

export type Lab = {
  userId: string;
  journalId: string;
  num: number;
  status: string;
  score: number;
}

export type User = {
  _id: string;
  photo?: string;
  name: string;
  surname: string;
  contacts: Contact[]
  email: string;
  phone: string;
}

export type Contact = {
  type: string;
  value: string;
}

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

export type AllUsersState = {
  users: User[],
  loading: boolean,
  error: boolean
}

export type AllLabsState = {
  labs: Lab[],
  loading: boolean,
  error: boolean
}

export type JournalState = {
  journal: Journal | null,
  loading: boolean,
  error: boolean
}

export type shewartMapType = {
  [key: number]: {
      A2: number;
      D3: number;
      D4: number;
  };
};