import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground rounded-md p-2 flex items-center justify-center w-auto h-8">
        <span className="font-bold text-sm">AMC</span>
      </div>
    </Link>
  );
}
