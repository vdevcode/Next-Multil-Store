import { Timestamp } from "firebase/firestore"

export interface Store{
    id: string
    name: string
    userId: string
    createAt: Timestamp
    updateAt: Timestamp
}