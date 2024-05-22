import { Timestamp } from "firebase/firestore";

export interface Store {
  id: string;
  name: string;
  userId: string;
  createAt: Timestamp;
  updateAt: Timestamp;
}

export interface BillBoards {
  id: string;
  label: string;
  imageUrl: string;
  createAt: Timestamp;
  updateAt: Timestamp;
}

export interface Categories {
  id: string;
  name: string;
  billboardId: string;
  billboardLabel: string;
  createAt: Timestamp;
  updateAt: Timestamp;
}
