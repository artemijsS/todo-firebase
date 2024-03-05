import { AuthLayout, LoginForm } from "@/components/sys";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LinksEnum } from "@/enums";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (session) {
        redirect(LinksEnum.todos);
        return;
    }

    return (
        <AuthLayout
            title={"Log in"}
            description={"Enter your email and password below to login to your account"}
        >
            <LoginForm />
        </AuthLayout>
    )
}
