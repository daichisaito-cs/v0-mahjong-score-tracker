import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UserProfileLoading() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 bg-muted animate-pulse rounded" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted animate-pulse rounded-full" />
          <div>
            <div className="h-7 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded mt-1" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-28 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 bg-muted animate-pulse rounded" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
