"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../app/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, Chrome } from "lucide-react"

interface SignInModalProps {
  children: React.ReactNode
}

export const SignInModal = ({ children }: SignInModalProps) => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError("")
      await signInWithGoogle()
      setOpen(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignIn = async () => {
    try {
      setLoading(true)
      setError("")
      await signInWithEmail(email, password)
      setOpen(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignUp = async () => {
    try {
      setLoading(true)
      setError("")
      await signUpWithEmail(email, password)
      setOpen(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Eduhansa</DialogTitle>
          <DialogDescription>Sign in to your account or create a new one to get started.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button onClick={handleGoogleSignIn} disabled={loading} className="w-full" variant="outline">
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleEmailSignIn} disabled={loading} className="w-full">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleEmailSignUp} disabled={loading} className="w-full">
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </TabsContent>
          </Tabs>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
