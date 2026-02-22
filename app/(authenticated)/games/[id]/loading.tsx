import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function GameDetailLoading() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 bg-muted animate-pulse rounded" />
        <div>
          <div className="h-7 w-36 bg-muted animate-pulse rounded" />
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-1" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-20 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-muted animate-pulse rounded-full" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-5 w-20 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
