import { AuthLayout, RegistrationForm } from "@/components/sys";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LinksEnum } from "@/enums";
import { authOptions } from "@/lib/authOptions";

export default async function Registration() {

    const session = await getServerSession(authOptions);

    if (session) {
        redirect(LinksEnum.todos);
        return;
    }

    return (
        <AuthLayout
            title={"Sign up"}
            description={"Welcome to TODO app"}
        >
            <RegistrationForm />
        </AuthLayout>
    )
}
