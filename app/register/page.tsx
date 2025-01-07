'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register, verifyOTP } = useAuth()

  // Function to generate a random 6-digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      if (!isOtpSent) {
        // Generate OTP and log it
        const otpGenerated = generateOtp()
        console.log("Generated OTP:", otpGenerated)
        
        await register(username, email, password)
        setIsOtpSent(true)
      } else {
        await verifyOTP(otp)
        router.push('/')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="w-full max-w-md bg-black text-white">
        <CardHeader>
          <CardTitle>{isOtpSent ? 'Verify OTP' : 'Register'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isOtpSent && (
                <>
                <Input
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </>
              )}
              {isOtpSent && (
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600"
                />
              )}
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isOtpSent ? 'Verifying...' : 'Registering...'}
                  </>
                ) : (
                  isOtpSent ? 'Verify OTP' : 'Register'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-400">
            Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

