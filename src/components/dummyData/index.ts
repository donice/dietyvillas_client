

export type FrequentIssuesType = {
  title: string;
  count: number;
}


export type Person = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
  progress: number;
  action: () => void;
  is_assignable?: number;
};

export type ReportsTableProps = {
  name: string;
  open: number;
  inProgress: number;
  closed: number;
  total: number;
};



