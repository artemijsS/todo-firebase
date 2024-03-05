import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/lib/api/db.utils";
import { deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import { todosCol } from "@/firebase/config";
import { ITodo } from "@/types";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const email = session.user.email;

    const user = await getUserByEmail(email);
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 })

    const { id } = params;
    const docRef = doc(todosCol, id);

    try {
        const doc = await getDoc(docRef);
        if (!doc || !doc.data()) throw { code: "not-found" }
        const todo = { id: doc.id, ...doc.data() } as ITodo;
        if (todo.owner !== user.id) throw { code: "forbidden" }
        await deleteDoc(docRef)
        return Response.json({ message: "ok"}, { status: 200 })
    } catch (e: any) {
        if (e.code === "not-found")
            return Response.json({ message: "Todo not found"}, { status: 404 })
        if (e.code === "forbidden")
            return Response.json({ message: "Forbidden"}, { status: 403 })
        return Response.json({ message: "Error with deleting your todo"}, { status: 400 })
    }
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const email = session.user.email;

    const user = await getUserByEmail(email);
    if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 })

    const { title, isCompleted } = await req.json();
    if (!title || typeof title !== "string" || title.length > 10000) return Response.json({ message: "Invalid title" }, { status: 400 })

    const { id } = params;
    const docRef = doc(todosCol, id);

    try {
        const doc = await getDoc(docRef);
        if (!doc || !doc.data()) throw { code: "not-found" }
        const todo = { id: doc.id, ...doc.data() } as ITodo;
        if (todo.owner !== user.id) throw { code: "forbidden" }

        await updateDoc(docRef, {
            title,
            isCompleted: !!isCompleted,
            updatedAt: new Date().getTime()
        })

        return Response.json({ message: "ok"}, { status: 200 })
    } catch (e: any) {
        if (e.code === "not-found")
            return Response.json({ message: "Todo not found"}, { status: 404 })
        if (e.code === "forbidden")
            return Response.json({ message: "Forbidden"}, { status: 403 })
        return Response.json({ message: "Error with deleting your todo"}, { status: 400 })
    }
}
