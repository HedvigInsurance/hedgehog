import { Grid, MenuItem, TextField } from '@material-ui/core'
import { format, isAfter, isValid, parseISO } from 'date-fns'
import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { CategorySelect, SelectedItemCategory } from './CategorySelect'

const isValidDate = (date: string) =>
  date === ''
    ? true
    : isValid(parseISO(date)) && !isAfter(parseISO(date), new Date())

const isValidNumber = (n: string) => /^[0-9]*$/g.test(n)
const isEmpty = (s: string | null) => s === '' || s === null

interface ItemFormData {
  purchasePriceAmount: string
  dateOfPurchase: string
  note: string
  purchasePriceCurrency: string
  automaticValuationAmount?: string
  customValuationAmount?: string
}

const initialFormData = {
  purchasePriceAmount: '',
  dateOfPurchase: '',
  note: '',
  purchasePriceCurrency: '',
}

export const ItemForm: React.FC<{
  resetSwitch: boolean
  onReset: () => void
  onChange: (request: UpsertClaimItemVariables) => void
  preferredCurrency: string
}> = ({ resetSwitch, onReset, onChange, preferredCurrency }) => {
  const [selectedItemCategories, setSelectedItemCategories] = React.useState<
    SelectedItemCategory[]
  >([])

  const [itemFormData, setItemFormData] = React.useState<ItemFormData>({
    ...initialFormData,
    purchasePriceCurrency: preferredCurrency,
  })

  React.useEffect(() => {
    onChange({
      itemFamilyId: selectedItemCategories[0]?.id,
      itemTypeId: selectedItemCategories[1]?.id,
      itemBrandId: selectedItemCategories[2]?.id,
      itemModelId: selectedItemCategories[3]?.id,
      ...itemFormData,
    })
  }, [itemFormData, selectedItemCategories])

  React.useEffect(() => {
    if (resetSwitch) {
      setItemFormData({
        ...initialFormData,
        purchasePriceCurrency: preferredCurrency,
      })
      setSelectedItemCategories([])
      onReset()
    }
  }, [resetSwitch])

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <CategorySelect
            selectedItemCategories={selectedItemCategories}
            setSelectedItemCategories={setSelectedItemCategories}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            placeholder="Price"
            error={!isValidNumber(itemFormData.purchasePriceAmount)}
            value={itemFormData.purchasePriceAmount}
            helperText={
              !isValidNumber(itemFormData.purchasePriceAmount) && 'Only numbers'
            }
            onChange={({ target: { value } }) =>
              setItemFormData({ ...itemFormData, purchasePriceAmount: value })
            }
            fullWidth
            inputProps={{
              style: {
                paddingLeft: '10px',
              },
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            select
            error={!isValidNumber(itemFormData.purchasePriceAmount)}
            value={itemFormData.purchasePriceCurrency}
            onChange={({ target: { value } }) =>
              setItemFormData({ ...itemFormData, purchasePriceCurrency: value })
            }
            fullWidth
          >
            <MenuItem value="SEK">SEK</MenuItem>
            <MenuItem value="NOK">NOK</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            value={itemFormData.dateOfPurchase}
            error={!isValidDate(itemFormData.dateOfPurchase)}
            helperText={
              !isValidDate(itemFormData.dateOfPurchase) && 'Invalid date'
            }
            onChange={({ target: { value } }) =>
              setItemFormData({ ...itemFormData, dateOfPurchase: value })
            }
            onBlur={() =>
              isEmpty(itemFormData.dateOfPurchase) ||
              !isValidDate(itemFormData.dateOfPurchase)
                ? setItemFormData({
                    ...itemFormData,
                    dateOfPurchase: '',
                  })
                : setItemFormData({
                    ...itemFormData,
                    dateOfPurchase: format(
                      parseISO(itemFormData.dateOfPurchase),
                      'yyyy-MM-dd',
                    ),
                  })
            }
            placeholder="Purchase date"
            inputProps={{
              style: {
                paddingLeft: '10px',
                paddingRight: '10px',
              },
            }}
          />
        </Grid>
        <Grid item xs={true}>
          <TextField
            value={itemFormData.note}
            onChange={({ target: { value } }) =>
              setItemFormData({ ...itemFormData, note: value })
            }
            placeholder="Note (optional)"
            fullWidth
            helperText=" "
            inputProps={{
              style: {
                paddingLeft: '10px',
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}
