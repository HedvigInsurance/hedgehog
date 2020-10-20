import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export type KeyDownHandler = (e: KeyboardEvent) => void

export const useKeyboardListener = (
  isActive: boolean,
  handler: KeyDownHandler,
) => {
  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (isActive) {
        handler(e)
      }
    }

    window.addEventListener('keydown', eventHandler)

    return () => {
      window.removeEventListener('keydown', eventHandler)
    }
  }, [isActive, handler])
}

export type PerformNavigationHandler = (index: number) => void
export type NavigationStepHandler = () => void
export interface UseVerticalKeyboardNavigationProps {
  maxStep: number
  onPerformNavigation?: PerformNavigationHandler
  onNavigationStep?: NavigationStepHandler
  onExit?: () => void
}

const handleStepChange = (
  setIndex: Dispatch<SetStateAction<number>>,
  isWithinBounds: (currentIndex: number) => boolean,
  delta: number,
) => {
  setIndex((currentIndex) => {
    if (isWithinBounds(currentIndex)) {
      return currentIndex + delta
    } else {
      return currentIndex
    }
  })
}

export const useVerticalKeyboardNavigation = ({
  maxStep,
  onNavigationStep,
  onPerformNavigation,
  onExit,
}: UseVerticalKeyboardNavigationProps): [number, () => void] => {
  const [navigationIndex, setNavigationIndex] = useState(-1)
  const reset = () => {
    setNavigationIndex(-1)
  }

  useKeyboardListener(true, (e) => {
    if (navigationIndex !== -1 && e.key === 'Enter' && onPerformNavigation) {
      e.preventDefault()
      onPerformNavigation(navigationIndex)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (navigationIndex === 0 && onExit) {
        onExit()
      }
      handleStepChange(setNavigationIndex, (i) => i > -1, -1)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleStepChange(setNavigationIndex, (i) => i < maxStep, 1)
      return
    }
  })

  useEffect(() => {
    if (onNavigationStep && navigationIndex !== -1) {
      onNavigationStep()
    }
  }, [navigationIndex])

  return [navigationIndex, reset]
}
