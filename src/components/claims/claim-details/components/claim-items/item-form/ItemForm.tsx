import { useInventoryContext } from 'components/claims/claim-details/components/claim-items/context'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { Input } from 'hedvig-ui/input'
import React from 'react'
import { CategorySelect, SelectedItemCategory } from './CategorySelect'

export const ItemForm: React.FC = () => {
  const [selectedItemCategories, setSelectedItemCategories] = React.useState<
    SelectedItemCategory[]
  >([])

  const { setState } = useInventoryContext()

  React.useEffect(() => {
    setState({ selectedItemCategories })
  }, [selectedItemCategories])

  React.useEffect(() => {
    return () => {
      setState({ selectedItemCategories: [] })
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <div style={{ width: '100%', zIndex: 2 }}>
        <FadeIn delay={'0ms'}>
          <CategorySelect
            selectedItemCategories={selectedItemCategories}
            setSelectedItemCategories={setSelectedItemCategories}
          />
        </FadeIn>
      </div>
      <div
        style={{
          paddingTop: '10px',
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          marginRight: '-10px',
          zIndex: 1,
        }}
      >
        <div style={{ flex: 2, marginRight: '10px' }}>
          <FadeIn delay={'200ms'}>
            <Input placeholder={'Purchase price'} />
          </FadeIn>
        </div>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <FadeIn delay={'200ms'}>
            <Input placeholder={'Currency'} />
          </FadeIn>
        </div>
        <div style={{ flex: 2, marginRight: '10px' }}>
          <FadeIn delay={'200ms'}>
            <Input placeholder={'Purchase date'} />
          </FadeIn>
        </div>
        <div style={{ flex: 2, marginRight: '10px' }}>
          <FadeIn delay={'200ms'}>
            <Input placeholder={'Note (optional)'} />
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
