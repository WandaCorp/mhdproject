import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PosterSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("poster-w shrink-0 aspect-[2/3] rounded-[4px]", className)} />
  );
}

export function PosterRowSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="feed-scroll">
      {Array.from({ length: count }).map((_, i) => (
        <PosterSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9] md:max-h-[78vh]">
      <Skeleton className="size-full rounded-none" />
    </div>
  );
}

export function GridSkeleton({ count = 18 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] w-full rounded-[4px]" />
      ))}
    </div>
  );
}

export function DetalleSkeleton() {
  return (
    <div>
      <Skeleton className="h-[42vh] w-full rounded-none md:h-[56vh]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row">
        <Skeleton className="mx-auto aspect-[2/3] w-44 shrink-0 rounded-[4px] md:mx-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
