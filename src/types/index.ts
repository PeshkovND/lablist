export type Journal = {
  _id: string;
  labs: JournalLab[];
  discription: string;
  students: string[];
  dateOfCreation: string;
}

export type Filter = {
  studentFilter: string | undefined;
  labFilter: number | undefined;
}

export type JournalLab = {
  num: number;
  deadline?: string;
  name?: string
}

export type Lab = {
  _id: string;
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
  _id: string
  date: string;
  status?: string;
  text: string;
  journalId: string;
  userId: string;
  num: number;
};

export type AllHistoryState = {
  messages: HistoryType[],
  loading: boolean,
  error: boolean,
  updating: boolean,
  count: number,
  cursor: string | null,
  paggingError: boolean,
}

export type AllUsersState = {
  users: User[],
  loading: boolean,
  error: boolean
}

export type AllLabsState = {
  labs: Lab[],
  loading: boolean,
  error: boolean,
}

export type AllJournalsState = {
  journals: Journal[] | null,
  loading: boolean,
  error: boolean,
}

export type JournalState = {
  journal: Journal | null,
  loading: boolean,
  error: boolean,
  lastDeadline: JournalLab | undefined
}

export type shewartMapType = {
  [key: number]: {
    A2: number;
    D3: number;
    D4: number;
  };
};

export type MessagesResponse = {
  data: HistoryType[],
  count: number,
  afterCursor: string | null
};

export type KafkaMessage = {
  num: number,
  userId: string,
  journalId: string,
  text: string,
  status: string,
  score: number
}

export type ShewartMapValues = {
  UCL: number,
  LCL: number,
  RLCL: number,
  RUCL: number,
  Labels: string[][],
  S: number[],
  R: number[],
  meanS: number,
  meanR: number,
}