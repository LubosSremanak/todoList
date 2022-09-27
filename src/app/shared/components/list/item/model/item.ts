export interface Item {
  id?: string;
  listId: string;
  title: string;
  content: string;
  endDate: Date;
  isDone: boolean;
}
