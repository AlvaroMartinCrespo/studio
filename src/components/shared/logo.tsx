import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground rounded-md p-2 w-8 h-8 flex items-center justify-center">
        <span className="font-bold text-lg">D</span>
      </div>
      <span className="font-headline text-lg font-bold hidden sm:inline-block">
        DevFolio
      </span>
    </Link>
  );
}
