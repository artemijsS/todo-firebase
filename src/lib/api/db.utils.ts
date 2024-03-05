import { getDocs, query, where } from "@firebase/firestore";
import { usersCol } from "@/firebase/config";
import { IUser } from "@/types";

export const getUserByEmail = async (email: string) => {
    const q = query(usersCol, where("email", "==", email))
    const querySnapshot = await getDocs(q);
    const data: IUser[] = []
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as IUser);
    });
    return data[0];
}