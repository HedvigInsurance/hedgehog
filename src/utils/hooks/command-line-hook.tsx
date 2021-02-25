import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { Input } from 'hedvig-ui/input'
import { FourthLevelHeadline, Paragraph } from 'hedvig-ui/typography'
import React from 'react'
import styled from 'react-emotion'
import { Icon } from 'semantic-ui-react'
import {
  KeyCode,
  useKeyIsPressed,
  usePressedKeys,
} from 'utils/hooks/key-press-hook'

const CommandLineWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: -1px -1px 42px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: -1px -1px 42px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: -1px -1px 42px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.3em;
`

const CharacterBadge: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.1)',
        padding: '0.35em 0.55em',
        borderRadius: '0.3em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '0.4em',
      }}
    >
      <Paragraph style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
        {content}
      </Paragraph>
    </div>
  )
}

const ResultItem: React.FC<{
  label: string
  characters: string[]
  selected?: boolean
}> = ({ label, characters, selected = false }) => {
  return (
    <div
      style={{
        padding: '1.0em 3.5em',
        paddingRight: '1.0em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: selected ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
      }}
    >
      <FourthLevelHeadline>{label}</FourthLevelHeadline>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {characters.map((character) => (
          <CharacterBadge key={character} content={character} />
        ))}
      </div>
    </div>
  )
}

export interface CommandLineAction {
  label: string
  keysHint: string[]
  keys: number[]
  onResolve: () => void
}

export const CommandLineComponent: React.FC<{
  hide: () => void
  actions: CommandLineAction[]
}> = ({ hide, actions }) => {
  const [value, setValue] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState(0)

  const isUpPressed = useKeyIsPressed(KeyCode.Up)
  const isDownPressed = useKeyIsPressed(KeyCode.Down)
  const isEnterPressed = useKeyIsPressed(KeyCode.Return)

  React.useEffect(() => {
    if (isUpPressed && selectedItem > 0) {
      setSelectedItem(selectedItem - 1)
    }

    if (isDownPressed && selectedItem < 2) {
      setSelectedItem(selectedItem + 1)
    }
  }, [isUpPressed, isDownPressed])

  const searchResult = (query: string) => {
    if (value === '') {
      return []
    }

    return actions
      .filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
      .slice(0, 3)
  }

  React.useEffect(() => {
    setSelectedItem(0)
  }, [])

  React.useEffect(() => {
    if (isEnterPressed) {
      hide()
      if (searchResult(value).length !== 0) {
        searchResult(value)[selectedItem].onResolve()
      }
    }
  }, [isEnterPressed])

  return (
    <CommandLineWindow>
      <div
        style={{
          width: '100%',
        }}
      >
        <Input
          autoFocus
          value={value}
          onChange={({ target }) => {
            // @ts-ignore
            if (target.value === ' ' || target.value === ' ') {
              return
            }

            // @ts-ignore
            setValue(target.value)
          }}
          icon={<Icon name="search" style={{ marginLeft: '1em' }} />}
          iconPosition="left"
          placeholder="What can I help you with?"
          transparent
          size={'large'}
          style={{ width: '60vh', padding: '1em 1em' }}
        />
      </div>
      <div>
        {searchResult(value).map(({ label, keysHint }, index) => (
          <FadeIn delay={`${index * 50}ms`} key={label + index.toString()}>
            <ResultItem
              label={label}
              characters={keysHint}
              selected={index === selectedItem}
            />
          </FadeIn>
        ))}
      </div>
    </CommandLineWindow>
  )
}

interface CommandLineContextProps {
  useAction: (newActions: CommandLineAction[]) => any
  setBlocked: (value: boolean) => void
  isHinting: boolean
}

const CommandLineContext = React.createContext<CommandLineContextProps>({
  useAction: (_: CommandLineAction[]) => void 0,
  setBlocked: (_: boolean) => void 0,
  isHinting: false,
})

export const useCommandLine = () => React.useContext(CommandLineContext)

export const CommandLineProvider: React.FC = ({ children }) => {
  const [showCommandLine, setShowCommandLine] = React.useState(false)
  const [actions, setActions] = React.useState<CommandLineAction[]>([])
  const [blocked, setBlocked] = React.useState(false)
  const actionsRef = React.useRef<CommandLineAction[]>()

  const isOptionPressed = useKeyIsPressed(KeyCode.Option)
  const isSpacePressed = useKeyIsPressed(KeyCode.Space)
  const isEscapePressed = useKeyIsPressed(KeyCode.Escape)

  const keys = usePressedKeys(blocked)

  React.useEffect(() => {
    actionsRef.current = actions
  }, [actions])

  const onMousePress = () => {
    setShowCommandLine(false)
  }

  React.useEffect(() => {
    if (blocked) {
      return
    }
    actions.some((action) => {
      const match =
        action.keys.filter((key) => !keys.includes(key)).length === 0

      if (match) {
        action.onResolve()
        return true
      }
    })
  }, [keys])

  React.useEffect(() => {
    window.addEventListener('mousedown', onMousePress)

    return () => {
      window.removeEventListener('mousedown', onMousePress)
    }
  }, [])

  React.useEffect(() => {
    if (blocked) {
      return
    }
    if (isOptionPressed && isSpacePressed) {
      setShowCommandLine(true)
    }
  }, [isOptionPressed, isSpacePressed])

  React.useEffect(() => {
    setShowCommandLine(false)
  }, [isEscapePressed])

  const addAction = (newActions: CommandLineAction[]) => {
    React.useEffect(() => {
      setActions([...(actionsRef.current ?? []), ...newActions])
      return () => {
        newActions.forEach((newAction) => {
          removeAction(newAction.label)
        })
      }
    }, [])
  }

  const removeAction = (label: string) => {
    actionsRef.current = (actionsRef.current ?? []).filter(
      (action) => action.label !== label,
    )
  }

  return (
    <CommandLineContext.Provider
      value={{
        useAction: addAction,
        setBlocked: (value: boolean) => setBlocked(value),
        isHinting: blocked ? false : isOptionPressed,
      }}
    >
      {children}
      {!blocked && showCommandLine && (
        <CommandLineComponent
          hide={() => setShowCommandLine(false)}
          actions={actions}
        />
      )}
    </CommandLineContext.Provider>
  )
}
