'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { login } from "@/actions/signin"
import { useRouter } from "next/navigation"
export default function SignInCard() {
    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async ()=>{
        // Prevent the default form submission behavior
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const response = await login(email, password);
        console.log("response in signip:", response)
        if(response?.status === 200){
            router.push("/admin/dashboard");
        }
    }


    return (
        <div className="flex items-center justify-between">
            <Card className="w-[310px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter your email" type="email" ref={emailRef}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    ref={passwordRef}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSubmit}>Login</Button>
                </CardFooter>
            </Card>
        </div>

    )
}