import { Skeleton } from "@/components/ui/skeleton"

export function LinkedinBadgeSkeleton() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col rounded-[10px] bg-card p-4">
      <div>
        <Skeleton className="h-7 w-24 rounded-md" />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="mt-3 flex min-w-0 flex-col">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="mt-2 h-3.5 w-full" />
          <Skeleton className="mt-3 h-3.5 w-full" />
        </div>
      </div>

      <div className="mt-3">
        <Skeleton className="h-8 w-[7.5rem] rounded-full" />
      </div>
    </div>
  )
}

