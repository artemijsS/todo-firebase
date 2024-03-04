import { AuthLayout, LoginForm } from "@/components/sys";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LinksEnum } from "@/enums";

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
