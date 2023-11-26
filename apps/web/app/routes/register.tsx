import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function SignUpPage() {
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">
            Register a New Account
          </h2>
        </div>
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input placeholder="Username" required type="text" />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Email" required type="email" />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input placeholder="******************" required type="password" />
        </div>
        <div className="mb-6">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input placeholder="******************" required type="password" />
        </div>
        <div className="flex items-center justify-between">
          <Button className="w-full" type="submit">
            Register
          </Button>
        </div>
        <div className="mt-4 text-center">
          Already have an account?{' '}
          <Link
            className="font-bold text-blue-600 hover:text-blue-800"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
