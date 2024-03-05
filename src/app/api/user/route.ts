import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDocs, query, where } from "@firebase/firestore";
import { usersCol } from "@/firebase/config";
import { IUser } from "@/types";
import { getUserByEmail } from "@/lib/api/db.utils";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const email = session.user.email;

    const user = await getUserByEmail(email);

    if (!user)
        return Response.json({ message: "Unauthorized" }, { status: 401 });

    return Response.json(user, { status: 200 });
}
