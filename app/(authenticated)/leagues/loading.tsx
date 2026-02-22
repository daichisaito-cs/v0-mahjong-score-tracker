import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LeaguesLoading() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-40 bg-muted animate-pulse rounded mt-2" />
        </div>
        <div className="h-9 w-24 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="py-4 gap-0 border-border/70">
            <CardHeader className="pt-1 pb-0">
              <div className="h-7 w-48 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-20 bg-muted animate-pulse rounded-full" />
                <div className="h-7 w-16 bg-muted animate-pulse rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
