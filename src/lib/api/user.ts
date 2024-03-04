import { sendData } from "@/lib/api/index";

// POST
export const loginUser = (form: { email: string, password: string }) => {
    return sendData({ url: "/api/user/login", data: form })
}
export const registerUser = (form: { email: string, password: string }) => {
    return sendData({ url: "/api/user/register", data: form })
}
