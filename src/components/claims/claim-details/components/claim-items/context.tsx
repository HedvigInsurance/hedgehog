import { SelectedItemCategory } from 'components/claims/claim-details/components/claim-items/item-form/CategorySelect'
import React from 'react'

interface InventoryState {
  claimId: string
  typeOfContract: string
  preferredCurrency?: string
  form: {
    selectedItemCategories: SelectedItemCategory[]
  }
  setState: (state: object) => void
}

const inventoryInitialState: InventoryState = {
  claimId: '',
  typeOfContract: '',
  preferredCurrency: undefined,
  form: {
    selectedItemCategories: [],
  },
  setState: (_state: object) => void 0,
}

const InventoryContext = React.createContext<InventoryState>(
  inventoryInitialState,
)

export const useInventoryContext = () => React.useContext(InventoryContext)

export const InventoryProvider: React.FC<{
  state: any
  children: React.ReactNode
}> = ({ state, children }) => {
  const [inventoryState, setInventoryState] = React.useState<InventoryState>({
    ...inventoryInitialState,
    ...state,
  })

  return (
    <InventoryContext.Provider
      value={{
        ...inventoryInitialState,
        ...inventoryState,
        setState: (newState) =>
          setInventoryState({ ...inventoryState, ...newState }),
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}
