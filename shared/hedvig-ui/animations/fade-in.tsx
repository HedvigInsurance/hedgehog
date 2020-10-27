import styled, { keyframes } from 'react-emotion'

const fadeIn = (max) =>
  keyframes({
    from: { opacity: 0, transform: 'translateY(2%)' },
    to: { opacity: max, transform: 'translateY(0)' },
  })

export const FadeIn = styled('div')<{ delay?: string }>(
  ({ delay = '0ms' }) => ({
    opacity: 0,
    animation: `${fadeIn(1.0)} 1000ms forwards`,
    animationDelay: delay,
  }),
)
