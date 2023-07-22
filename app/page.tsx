import BuildDisplay from '@/components/build-display';
import { PartMenu } from '@/components/part-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-2 items-center justify-start p-2 md:p-12">
      <div className="flex items-center justify-between w-full">
        <div className="font-bold text-xl">
          AC <span className="font-light">{`// GARAGE`}</span>
        </div>
        <div className="flex items-center gap-6">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-full gap-2 grid grid-cols-2">
        <div className="bg-black">
          <PartMenu part="HEAD" options={['XRT-420_HEAD', '69420_!XR-HEAD']} />
          <PartMenu part="CORE" options={['XRT-420_CORE', '69420_!XR-CORE']} />
        </div>
        <div className="bg-black">
          <BuildDisplay />
        </div>
      </div>
    </main>
  );
}
