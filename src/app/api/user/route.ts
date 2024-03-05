import { getServerSession } from "next-auth";
import { getUserByEmail } from "@/lib/api/db.utils";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });
    const email = session.user.email;

    const user = await getUserByEmail(email);

    if (!user)
        return Response.json({ message: "Unauthorized" }, { status: 401 });

    return Response.json(user, { status: 200 });
}
