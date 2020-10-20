import { mount } from 'enzyme'
import React, { useState } from 'react'
import { act } from 'react-dom/test-utils'
import {
  useKeyboardListener,
  useVerticalKeyboardNavigation,
} from 'utils/keyboard-actions'

describe('useKeyboardListener', () => {
  it('handles key press gracefully', () => {
    const KeyLogger: React.FC = () => {
      const [keysPressed, setKeysPressed] = useState<string[]>([])
      useKeyboardListener(true, (e) => {
        setKeysPressed((prevKeysPressed) => [...prevKeysPressed, e.key])
      })

      return <>{keysPressed.join(', ')}</>
    }

    const wrapper = mount(<KeyLogger />)
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    })
    wrapper.update()

    expect(wrapper.text()).toBe('ArrowUp')
  })
})

describe('useVerticalKeyboardNavigation', () => {
  it('handles arrow navigation gracefully', () => {
    const navStepListener = jest.fn()
    const performNavigationListener = jest.fn()
    const StepShower: React.FC = () => {
      const [currentStep] = useVerticalKeyboardNavigation({
        maxStep: 3,
        onNavigationStep: navStepListener,
        onPerformNavigation: performNavigationListener,
      })

      return <>{currentStep}</>
    }
    const wrapper = mount(<StepShower />)
    const simulateKeyPress = (key: string) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
      })
      wrapper.update()
    }

    expect(wrapper.text()).toBe('-1')

    simulateKeyPress('ArrowDown')
    expect(wrapper.text()).toBe('0')
    expect(navStepListener).toHaveBeenCalledTimes(1)

    simulateKeyPress('ArrowDown')
    simulateKeyPress('ArrowDown')
    simulateKeyPress('ArrowDown')
    simulateKeyPress('ArrowDown')
    wrapper.update()
    expect(wrapper.text()).toBe('3')
    expect(navStepListener).toHaveBeenCalledTimes(4)

    simulateKeyPress('ArrowUp')
    expect(wrapper.text()).toBe('2')
    expect(navStepListener).toHaveBeenCalledTimes(5)

    expect(performNavigationListener).not.toHaveBeenCalled()
  })

  it('handles enter key by performing navigation', () => {
    const performNavigationListener = jest.fn()
    const StepShower: React.FC = () => {
      const [currentStep] = useVerticalKeyboardNavigation({
        maxStep: 3,
        onPerformNavigation: performNavigationListener,
      })

      return <>{currentStep}</>
    }
    const wrapper = mount(<StepShower />)
    const simulateKeyPress = (key: string) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
      })
      wrapper.update()
    }

    simulateKeyPress('ArrowDown')
    simulateKeyPress('ArrowDown')
    expect(wrapper.text()).toBe('1')

    simulateKeyPress('Enter')
    expect(performNavigationListener).toHaveBeenCalledTimes(1)
    expect(performNavigationListener).toHaveBeenCalledWith(1)
  })
})
