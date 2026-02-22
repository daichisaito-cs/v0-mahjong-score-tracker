"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const MAX_PROGRESS_BEFORE_COMPLETE = 92
const START_PROGRESS = 8

export function NavigationProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)
  const completeTimeoutRef = useRef<number | null>(null)
  // start()時点のReact pathnameをrefで記録。
  // pathname変化との比較で完了を判定（isVisible stateに依存しない）
  const startKeyRef = useRef<string | null>(null)
  const pathnameRef = useRef(pathname)
  const searchParamsRef = useRef(searchParams?.toString() ?? "")
  pathnameRef.current = pathname
  searchParamsRef.current = searchParams?.toString() ?? ""

  const clearTimers = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (completeTimeoutRef.current !== null) {
      window.clearTimeout(completeTimeoutRef.current)
      completeTimeoutRef.current = null
    }
  }

  const finishProgress = () => {
    startKeyRef.current = null
    clearTimers()
    setProgress(100)
    completeTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false)
      setProgress(0)
      completeTimeoutRef.current = null
    }, 220)
  }

  useEffect(() => {
    const start = () => {
      // start()時点のReact pathnameを記録（refなのでclosure問題なし）
      startKeyRef.current = `${pathnameRef.current}?${searchParamsRef.current}`
      clearTimers()
      setIsVisible(true)
      setProgress(START_PROGRESS)

      timerRef.current = window.setInterval(() => {
        setProgress((current) => {
          if (current >= MAX_PROGRESS_BEFORE_COMPLETE) return current
          const next = current + Math.max(1, (MAX_PROGRESS_BEFORE_COMPLETE - current) * 0.12)
          return Math.min(next, MAX_PROGRESS_BEFORE_COMPLETE)
        })
      }, 160)
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as HTMLElement | null
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return
      if (anchor.getAttribute("href")?.startsWith("#")) return

      const nextUrl = new URL(anchor.href, window.location.href)
      const currentUrl = new URL(window.location.href)
      if (nextUrl.origin !== currentUrl.origin) return
      if (nextUrl.href === currentUrl.href) return
      start()
    }

    const onPopState = () => {
      start()
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener("popstate", onPopState)

    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("popstate", onPopState)
    }
  }, [])

  // pathnameまたはsearchParamsが変化したら、ナビゲーション完了を判定
  useEffect(() => {
    if (startKeyRef.current === null) return
    const currentKey = `${pathname}?${searchParams?.toString() ?? ""}`
    if (currentKey !== startKeyRef.current) {
      finishProgress()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()])

  useEffect(() => {
    return () => {
      clearTimers()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-0.5"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 140ms ease" }}
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 180ms ease-out" : "width 160ms linear",
        }}
      />
    </div>
  )
}
