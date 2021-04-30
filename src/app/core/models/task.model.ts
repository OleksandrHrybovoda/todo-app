export class Task {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  lastUpdatedDate: string;
}

export class TaskResponse {
  _v: string;
  _id: string;
  title: string;
  desc: string;
  created_date: string;
  last_update_date: string;
}
