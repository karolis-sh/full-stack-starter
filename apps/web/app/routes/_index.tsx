import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

// export default function Index() {
//   return (
//     <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
//       <h1>Welcome to Remix</h1>
//     </div>
//   );
// }

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iwg1ph70Mde
 */
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import {
  CardContent,
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';

export default function Index() {
  return (
    <div className="flex flex-col h-full justify-center">
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Do stuff</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox id="task-1" />
              <div className="flex-1">
                <Label className="font-medium text-lg" htmlFor="task-1">
                  Buy groceries
                </Label>
              </div>
              <Button size="icon" variant="destructive">
                <IconTrash className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="task-2" />
              <div className="flex-1">
                <Label className="font-medium text-lg" htmlFor="task-2">
                  Finish report
                </Label>
              </div>
              <Button size="icon" variant="destructive">
                <IconTrash className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="task-3" />
              <div className="flex-1">
                <Label className="font-medium text-lg" htmlFor="task-3">
                  Call plumber
                </Label>
              </div>
              <Button size="icon" variant="destructive">
                <IconTrash className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <form className="flex-1">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input id="new-task" placeholder="New stuff" required />
                </div>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function IconTrash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
