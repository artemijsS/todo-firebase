import { auth, usersCol } from "@/firebase/config";
import { addDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password || password.length < 6) return Response.json({ message: `Invalid data` }, {
        status: 400,
    })

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const _ref = await addDoc(usersCol, {
            email,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        });
    } catch (e: any) {
        const error = e.code === "auth/email-already-in-use" ? "User with this email already exists" : "Error with creating user"
        return Response.json({ message: error }, {
            status: 400
        })
    }

    return Response.json({ message: "ok" }, { status: 200 });
}
