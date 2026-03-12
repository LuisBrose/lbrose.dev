import { Skeleton } from "@/components/ui/skeleton"

export function LinkedinBadgeSkeleton() {
  return (
    <div className="z-10 flex flex-col" style={{ width: 330 }}>
      {/* Header banner: 45px tall */}
      <Skeleton style={{ width: 330, height: 45 }} />

      {/* Content: padding 0 16px */}
      <div style={{ padding: "0 16px" }}>
        {/* Profile image: 56x56 circle, margin 12px 0 8px */}
        <Skeleton className="rounded-full" style={{ width: 56, height: 56, marginTop: 12, marginBottom: 8 }} />

        {/* Name: 16px font, line-height 1.5 = 24px per line, 1 line, padding-bottom 4px */}
        <div style={{ height: 24, paddingBottom: 4 }}>
          <Skeleton className="rounded-sm" style={{ width: 100, height: 16 }} />
        </div>

        {/* Headline: 14px font, line-height 1.42857 = 20px per line, 2 lines, padding-bottom 4px */}
        <div className="flex flex-col justify-between" style={{ height: 40, paddingBottom: 4 }}>
          <Skeleton className="rounded-sm" style={{ width: 280, height: 14 }} />
          <Skeleton className="rounded-sm" style={{ width: 55, height: 14 }} />
        </div>

        {/* Company | School: 12px font, line-height 1.33333 = 16px per line, 2 lines, padding-bottom 4px */}
        <div className="flex flex-col justify-between" style={{ height: 32, paddingBottom: 4 }}>
          <Skeleton className="rounded-sm" style={{ width: 270, height: 12 }} />
          <Skeleton className="rounded-sm" style={{ width: 130, height: 12 }} />
        </div>
      </div>

      {/* CTA button: height 32px, margin 4px 16px 12px */}
      <div style={{ margin: "4px 16px 12px" }}>
        <Skeleton className="rounded-full" style={{ width: 120, height: 32 }} />
      </div>
    </div>
  )
}
