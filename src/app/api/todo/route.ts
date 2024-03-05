import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/api/db.utils";
import { addDoc, doc, getDoc, getDocs, orderBy, query, where } from "@firebase/firestore";
import { todosCol } from "@/firebase/config";
import { ITodo } from "@/types";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const email = session.user.email;

    const user = await getUserByEmail(email);
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 })

    const { title } = await req.json();
    if (!title || typeof title !== "string" || title.length > 10000) return Response.json({ message: "Invalid title" }, { status: 400 })

    try {
        const todoRef = await addDoc(todosCol, {
            owner: user.id,
            title: title,
            isCompleted: false,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });
        const todoDoc = await getDoc(doc(todosCol, todoRef.id));
        if (!todoDoc) throw 1;
        return Response.json({ id: todoDoc.id, ...todoDoc.data() }, { status: 200 });
    } catch {
        Response.json({ message: "Error with saving todo" }, { status: 400 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const email = session.user.email;

    const user = await getUserByEmail(email);
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 })

    const q = query(todosCol, where("owner", "==", user.id), orderBy("updatedAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data: ITodo[] = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as ITodo);
    });

    return Response.json({ data: data }, { status: 200 });
}
