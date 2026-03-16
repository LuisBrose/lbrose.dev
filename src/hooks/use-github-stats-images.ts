"use client"

import { useEffect, useState } from "react"

export function useGithubStatsImages(themeCounter: number) {
  const [streakLoaded, setStreakLoaded] = useState(false)
  const [langsLoaded, setLangsLoaded] = useState(false)

  useEffect(() => {
    setStreakLoaded(false)
    setLangsLoaded(false)
  }, [themeCounter])

  return {
    streakLoaded,
    langsLoaded,
    onStreakLoad: () => setStreakLoaded(true),
    onLangsLoad: () => setLangsLoaded(true),
  }
}
