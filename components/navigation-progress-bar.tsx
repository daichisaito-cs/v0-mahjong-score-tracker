"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const MAX_PROGRESS_BEFORE_COMPLETE = 92
const START_PROGRESS = 8
const DEBUG = true // デバッグ用: 本番確認後にfalseにする

function debugLog(label: string, data?: Record<string, unknown>) {
  if (!DEBUG) return
  const ts = new Date().toISOString().slice(11, 23)
  console.log(`[NavBar ${ts}] ${label}`, data ?? "")
}

export function NavigationProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)
  const completeTimeoutRef = useRef<number | null>(null)
  const startKeyRef = useRef<string | null>(null)
  const pathnameRef = useRef(pathname)
  const searchParamsRef = useRef(searchParams?.toString() ?? "")
  const [debugInfo, setDebugInfo] = useState("")
  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  pathnameRef.current = pathname
  searchParamsRef.current = searchParams?.toString() ?? ""

  debugLog("render", {
    renderCount: renderCountRef.current,
    pathname,
    isVisible,
    progress: Math.round(progress),
    startKey: startKeyRef.current,
    hasTimer: timerRef.current !== null,
  })

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
    debugLog("finishProgress", { startKey: startKeyRef.current, pathname })
    startKeyRef.current = null
    clearTimers()
    setProgress(100)
    setDebugInfo(`DONE @ ${pathname}`)
    completeTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false)
      setProgress(0)
      completeTimeoutRef.current = null
    }, 220)
  }

  useEffect(() => {
    const start = (trigger: string) => {
      const key = `${pathnameRef.current}?${searchParamsRef.current}`
      debugLog("start", {
        trigger,
        startKey: key,
        windowPathname: window.location.pathname,
        reactPathname: pathnameRef.current,
      })
      startKeyRef.current = key
      clearTimers()
      setIsVisible(true)
      setProgress(START_PROGRESS)
      setDebugInfo(`START(${trigger}) from=${pathnameRef.current}`)

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
      start("click")
    }

    const onPopState = () => {
      debugLog("popstate fired", {
        windowPathname: window.location.pathname,
        reactPathname: pathnameRef.current,
      })
      start("popstate")
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener("popstate", onPopState)

    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("popstate", onPopState)
    }
  }, [])

  useEffect(() => {
    const currentKey = `${pathname}?${searchParams?.toString() ?? ""}`
    debugLog("pathname effect", {
      currentKey,
      startKey: startKeyRef.current,
      match: currentKey === startKeyRef.current,
      isVisible,
    })
    if (startKeyRef.current === null) return
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
    <>
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
      {DEBUG && (
        <div className="fixed bottom-16 left-2 z-[200] rounded bg-black/80 px-2 py-1 text-[10px] text-white font-mono pointer-events-none">
          <div>path: {pathname}</div>
          <div>vis: {String(isVisible)} | prog: {Math.round(progress)}%</div>
          <div>startKey: {startKeyRef.current ?? "null"}</div>
          <div>timer: {timerRef.current !== null ? "active" : "none"}</div>
          <div>{debugInfo}</div>
        </div>
      )}
    </>
  )
}
