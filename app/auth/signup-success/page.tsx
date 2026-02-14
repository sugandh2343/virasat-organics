import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function SignupSuccess() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="w-full max-w-md">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Account Created!</CardTitle>
            <CardDescription>Welcome to Virasat Organics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-700">
                Your account has been successfully created. You can now login and start shopping!
              </p>
            </div>

            <Link href="/auth/login" className="block">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Continue to Login
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Want to browse products first?{' '}
                <Link href="/products" className="text-green-600 hover:text-green-700 underline underline-offset-4">
                  Shop now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
