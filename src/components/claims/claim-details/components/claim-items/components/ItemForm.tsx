import { Button, Grid, MenuItem, TextField } from '@material-ui/core'
import {
  UpsertClaimItemInput,
  useUpsertClaimItemMutation,
} from 'api/generated/graphql'
import { format, isAfter, isValid, parseISO } from 'date-fns'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import React from 'react'
import { CategorySelect, SelectedItemCategory } from './CategorySelect'
import { ValuationInfo } from './ValuationInfo'

const isValidDate = (date: string) =>
  date === ''
    ? true
    : isValid(parseISO(date)) && !isAfter(parseISO(date), new Date())

const isValidNumber = (n: string) => /^[0-9]*$/g.test(n)
const isEmpty = (s: string | null) => s === '' || s === null

export const ItemForm: React.FC<{
  claimId: string
  memberId: string | null
}> = ({ claimId, memberId }) => {
  const [selectedItemCategories, setSelectedItemCategories] = React.useState<
    SelectedItemCategory[]
  >([])

  const [purchasePriceAmount, setPurchasePriceAmount] = React.useState('')
  const [dateOfPurchase, setDateOfPurchase] = React.useState('')
  const [note, setNote] = React.useState('')
  const [purchasePriceCurrency, setPurchasePriceCurrency] = React.useState('')
  const [valuationAmount, setValuationAmount] = React.useState<string | null>(
    '',
  )
  const [customValuationAmount, setCustomValuationAmount] = React.useState('')
  const [contractMarketInfo] = useContractMarketInfo(memberId ?? '')
  const defaultCurrency = contractMarketInfo?.preferredCurrency ?? 'SEK'

  const [
    upsertClaimItem,
    { loading: loadingUpsertClaimItem },
  ] = useUpsertClaimItemMutation()

  const request: UpsertClaimItemInput = {
    claimId,
    itemFamilyId: selectedItemCategories[0]?.id ?? null,
    itemTypeId: selectedItemCategories[1]?.id ?? null,
    itemBrandId: selectedItemCategories[2]?.id ?? null,
    itemModelId: selectedItemCategories[3]?.id ?? null,
    dateOfPurchase: dateOfPurchase !== '' ? dateOfPurchase : null,
    purchasePrice: !isEmpty(purchasePriceAmount)
      ? {
          amount: Number(purchasePriceAmount),
          currency: purchasePriceCurrency,
        }
      : null,
    valuation: !isEmpty(valuationAmount)
      ? {
          amount: Number(valuationAmount),
          currency: purchasePriceCurrency,
        }
      : null,
    customValuation: !isEmpty(customValuationAmount)
      ? {
          amount: Number(customValuationAmount),
          currency: purchasePriceCurrency,
        }
      : null,
    note: note === '' ? null : note,
  }

  const formLooksGood =
    request.itemFamilyId &&
    request.itemTypeId &&
    isValidNumber(purchasePriceAmount) &&
    isValidDate(dateOfPurchase) &&
    isValidNumber(customValuationAmount)

  const resetForm = () => {
    setPurchasePriceAmount('')
    setPurchasePriceCurrency(defaultCurrency)
    setDateOfPurchase('')
    setSelectedItemCategories([])
    setNote('')
    setCustomValuationAmount('')
    setValuationAmount(null)
  }

  React.useEffect(() => {
    setPurchasePriceCurrency(defaultCurrency)
  }, [contractMarketInfo?.preferredCurrency])

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
            error={!isValidNumber(purchasePriceAmount)}
            value={purchasePriceAmount}
            helperText={!isValidNumber(purchasePriceAmount) && 'Only numbers'}
            onChange={({ target: { value } }) => setPurchasePriceAmount(value)}
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
            error={!isValidNumber(purchasePriceAmount)}
            value={purchasePriceCurrency}
            onChange={({ target: { value } }) =>
              setPurchasePriceCurrency(value)
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
            value={dateOfPurchase}
            error={!isValidDate(dateOfPurchase)}
            helperText={!isValidDate(dateOfPurchase) && 'Invalid date'}
            onChange={({ target: { value } }) => setDateOfPurchase(value)}
            onBlur={() =>
              isEmpty(dateOfPurchase) || !isValidDate(dateOfPurchase)
                ? setDateOfPurchase('')
                : setDateOfPurchase(
                    format(parseISO(dateOfPurchase), 'yyyy-MM-dd'),
                  )
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
            value={note}
            onChange={({ target: { value } }) => setNote(value)}
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
      <Grid container spacing={16}>
        <Grid item xs={10}>
          <ValuationInfo
            request={request}
            setValuationAmount={setValuationAmount}
            customValuationAmount={customValuationAmount}
            setCustomValuationAmount={setCustomValuationAmount}
            defaultCurrency={defaultCurrency}
          />
        </Grid>

        <Grid item xs={true}>
          <Button
            disabled={!formLooksGood || loadingUpsertClaimItem}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() =>
              upsertClaimItem({
                variables: { request },
                refetchQueries: ['GetClaimItems'],
              }).then(() => resetForm())
            }
          >
            Add item
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
