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
  name: string;
  subject: string;
};

export type DoneLab = {
  id: number;
  labId: number;
  status: number;
  score: number;
};
