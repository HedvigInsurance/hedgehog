import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import * as React from 'react'
import { ItemCategoryChain } from './ItemCategoryChain'
import { SelectedItemCategory } from './SelectItemCategories'

export const AddItemCategoryDialog: React.FC<{
  setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  suggestion: string
  selectedItemCategories: SelectedItemCategory[]
}> = ({ setDialogIsOpen, suggestion, selectedItemCategories }) => {
  const proposedKind = selectedItemCategories
    .slice(-1)[0]
    ?.nextKind.toLowerCase()

  const [hasVerified, setHasVerified] = React.useState<boolean>(false)
  const [itemCompanyId, setItemCompanyId] = React.useState<string>('')
  const typeIsBrandButNoCompanyChosen =
    proposedKind === 'brand' && itemCompanyId === ''

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>New {proposedKind}</DialogTitle>
      <DialogContent>
        <ItemCategoryChain
          suggestion={suggestion}
          selectedItemCategories={selectedItemCategories}
        />
        {console.log(itemCompanyId)}
        <Typography align={'center'} style={{ marginTop: '30px' }}>
          Please select a <span style={{ fontWeight: 500 }}>company</span>{' '}
          associated with <span style={{ fontWeight: 500 }}>{suggestion}</span>
        </Typography>
        {proposedKind === 'brand' && (
          <div style={{ paddingTop: '10px', textAlign: 'center' }}>
            <TextField
              select
              style={{ width: '40%', textAlign: 'left' }}
              onChange={(option) => setItemCompanyId(option.target.value)}
              value={itemCompanyId as string}
            >
              <MenuItem key={'test'} value="test">
                {'Stålhästen AB'}
              </MenuItem>
            </TextField>
          </div>
        )}

        <div style={{ paddingTop: '20px', textAlign: 'center' }}>
          <FormControlLabel
            control={<Checkbox name="checkedD" color="primary" />}
            label="This makes sense and I want to add it permanently"
            checked={hasVerified}
            onChange={() => setHasVerified((verified) => !verified)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogIsOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          disabled={typeIsBrandButNoCompanyChosen || !hasVerified}
          onClick={() => setDialogIsOpen(false)}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
