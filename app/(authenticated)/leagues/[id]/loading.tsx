import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LeagueDetailLoading() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 bg-muted animate-pulse rounded" />
          <div>
            <div className="h-7 w-48 bg-muted animate-pulse rounded" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded mt-1" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-9 bg-muted animate-pulse rounded" />
          <div className="h-9 w-28 bg-muted animate-pulse rounded" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
                <div className="w-9 h-9 bg-muted animate-pulse rounded-full" />
                <div>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-16 bg-muted animate-pulse rounded mt-1" />
                </div>
              </div>
              <div className="h-6 w-16 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-28 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-3 rounded-lg border border-border">
              <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
                    <div className="h-3 w-12 bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
