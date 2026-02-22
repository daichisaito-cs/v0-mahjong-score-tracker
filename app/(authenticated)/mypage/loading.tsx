import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MypageLoading() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-muted animate-pulse rounded-full" />
        <div>
          <div className="h-7 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-1" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-28 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
