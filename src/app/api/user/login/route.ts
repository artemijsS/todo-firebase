import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase/config";

export async function POST(req: Request) {
    const { email, password } = await req.json()

    if (!email || !password || password.length < 6) return Response.json({ message: `Invalid data` }, {
        status: 400,
    })

    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        if (!user.user) throw 1;
    } catch (e: any) {
        return Response.json({ message: "Invalid data" }, {
            status: 400
        })
    }

    return Response.json({ message: "ok" }, { status: 200 });
}
