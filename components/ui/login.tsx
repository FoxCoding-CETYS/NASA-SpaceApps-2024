"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useState } from "react"

const signInSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})


const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
    cel: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." })
      .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["confirmPassword"],
      })
    }
  })

export default function Login() {
  const [signInError, setSignInError] = useState<string | null>(null)

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      cel: "",
    },
  })


  async function handleSignIn(values: z.infer<typeof signInSchema>) {
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    })

    if (result?.error) {
      setSignInError(result.error)
    } else {
      console.log("Sign In successful")
      window.location.href = "/"
    }
  }

  function handleSignUp(values: z.infer<typeof signUpSchema>) {
    console.log("Sign Up", values)
  }

  return (
    <div>
      <Tabs
        defaultValue="signin"
        className="w-[400px] rounded-2xl bg-opacity-5 backdrop-blur-lg bg-slate-500 p-6"
      >
        <TabsList>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <div className="text-XL text-gray-500 mb-3 font-bold">
            WELCOME AGAIN
          </div>
          {signInError && (
            <div className="text-red-500 mb-2">
              {signInError}
            </div>
          )}
          <Form {...signInForm}>
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-2">
              <FormField
                control={signInForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="User Example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-transparent border-gray-400 text-background gap-2 hover:bg-blue-500 hover:text-black text-black text-sm sm:text-sm h-10 w-24 sm:h-10 px-4 sm:px-5 mb-5"
                type="submit"
              >
                SEND
              </Button>
            </form>
          </Form>
        </TabsContent>

        {/* Formulario de registro */}
        <TabsContent value="signup">
          <div className="text-XL text-gray-500 mb-3 font-bold">
            WELCOME TO DATAFARM
          </div>
          <Form {...signUpForm}>
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-2">
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="cel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="User Example" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="rounded-2xl border border-solid border-transparent transition-colors flex items-center justify-center bg-transparent border-gray-400 text-background gap-2 hover:bg-blue-500 hover:text-black text-black text-sm sm:text-sm h-10 w-24 sm:h-10 px-4 sm:px-5 mb-5"
                type="submit"
              >
                SIGN UP
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
