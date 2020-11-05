import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import {
  ItemCategoryKind,
  useUpsertItemCompanyMutation,
} from 'api/generated/graphql'
import { useGetItemCategories } from 'graphql/use-get-item-categories'
import { useUpsertItemCompanyOptions } from 'graphql/use-upsert-item-category'
import React from 'react'
import { Bold, StyledCreatableSelect } from '../styles'
import { ItemCompanySelection } from './CategoryDialog'

export const CompanySelect: React.FC<{
  itemCompany: ItemCompanySelection | null
  setItemCompany: React.Dispatch<
    React.SetStateAction<ItemCompanySelection | null>
  >
}> = ({ itemCompany, setItemCompany }) => {
  const [itemCompanies] = useGetItemCategories(ItemCategoryKind.Company, null)
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
  const [proposedCompany, setProposedCompany] = React.useState<string | null>(
    null,
  )
  const [upsertItemCompany] = useUpsertItemCompanyMutation()

  return (
    <>
      <Typography align={'center'} style={{ marginTop: '30px' }}>
        Please select an associated <Bold>company</Bold>
      </Typography>
      <div
        style={{
          paddingTop: '10px',
          textAlign: 'center',
          width: '37%',
          margin: '0 auto',
        }}
      >
        <StyledCreatableSelect
          classNamePrefix="custom-select"
          closeMenuOnSelect={true}
          value={itemCompany}
          onChange={(option) => setItemCompany(option)}
          options={itemCompanies.map(({ id, displayName }) => {
            return { label: displayName, value: id }
          })}
          onCreateOption={(option) => {
            setProposedCompany(option)
            setShowDialog(true)
          }}
          menuPosition={'fixed'}
        />
      </div>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Create new company?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The company 
            <Bold>{proposedCompany}</Bold> does not exist, and will therefore be
            created and added <Bold>permanently</Bold>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() =>
              proposedCompany &&
              upsertItemCompany(
                useUpsertItemCompanyOptions(proposedCompany),
              ).then((result) => {
                if (result?.data) {
                  setItemCompany({
                    label: proposedCompany,
                    value: result.data.upsertItemCompany,
                  })
                }
                setShowDialog(false)
              })
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
