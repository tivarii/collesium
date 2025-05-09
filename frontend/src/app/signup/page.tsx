"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { register } from "@/actions/signup"
import { useRef } from "react"
import { useRouter } from "next/navigation"
export default function SignUpCard() {
    const router = useRouter()
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit() {
        // Prevent the default form submission behavior
        const username = usernameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const response:any = await register(username, email, password);
        // console.log("response:",response)
        // console.log("response data:",response?.data)
        // console.log("status:",response?.status)
        if (Number(response?.status) === 201) {
          // console.log("Account created successfully!")
          alert("Account created successfully!")
          router.push("/signin")
        }
    }
    return (
      <Card className="w-[310px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="Enter your name" ref={usernameRef} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" ref={emailRef} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Choose a password"
                  type="password"
                  ref={passwordRef}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="terms" />
                <Label htmlFor="terms">I agree to the terms and conditions</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>Create Account</Button>
        </CardFooter>
      </Card>
    )
  }