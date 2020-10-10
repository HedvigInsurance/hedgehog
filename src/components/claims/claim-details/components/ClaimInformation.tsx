import {
  InputLabel as MuiInputLabel,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from '@material-ui/core'
import { ClaimState, Contract } from 'api/generated/graphql'
import { format, parseISO } from 'date-fns'
import * as React from 'react'
import styled from 'react-emotion'
import { sleep } from 'utils/sleep'

import { Paper } from 'components/shared/Paper'
import {
  setContractForClaimOptions,
  useSetContractForClaim,
} from 'graphql/use-add-contract-id-to-claim'
import { useContracts } from 'graphql/use-contracts'
import {
  setCoveringEmployeeOptions,
  useSetCoveringEmployee,
} from 'graphql/use-set-covering-employee'
import {
  updateClaimStateOptions,
  useUpdateClaimState,
} from 'graphql/use-update-claim-state'
import { currentAgreementForContract } from 'utils/contract'

interface Props {
  recordingUrl: string | null
  registrationDate: string
  state: ClaimState
  claimId: string
  coveringEmployee: boolean
  memberId: string
  refetchPage: () => Promise<any>
  selectedContract: Contract | null
}

const validateSelectOption = (
  event: React.ChangeEvent<HTMLSelectElement>,
): ClaimState => {
  const { value } = event.target
  if (!Object.values(ClaimState).includes(value as any)) {
    throw new Error(`invalid ClaimState: ${value}`)
  }
  return value as ClaimState
}

const validateSelectEmployeeClaimOption = (
  event: React.ChangeEvent<HTMLSelectElement>,
): boolean => {
  const { value } = event.target
  return value === 'True'
}

const getUrlWithoutParameters = (recordingUrl): string => {
  const regex = recordingUrl.split(/\?/)
  return regex[0]
}

const AudioWrapper = styled('div')({})

const Audio = styled('audio')({
  width: '100%',
})

const DownloadClaimFile = styled('a')({
  display: 'block',
  marginTop: '0.5rem',
})

const SelectWrapper = styled('div')({
  marginTop: '1rem',
})

const ClaimInformation: React.FC<Props> = ({
  recordingUrl,
  registrationDate,
  state,
  claimId,
  coveringEmployee,
  memberId,
  refetchPage,
  selectedContract,
}) => {
  const [contracts] = useContracts(memberId)
  const [setContractForClaim] = useSetContractForClaim()
  const [setCoveringEmployee] = useSetCoveringEmployee()
  const [updateClaimState] = useUpdateClaimState()

  return (
    <Paper>
      <h3>Claim Information</h3>
      {recordingUrl && (
        <AudioWrapper>
          <p>
            Registered at:{' '}
            {format(parseISO(registrationDate), 'yyyy-MM-dd hh:mm:ss')}
          </p>
          <Audio controls>
            <source src={recordingUrl} type="audio/aac" />
          </Audio>
          <Audio controls>
            <source
              src={getUrlWithoutParameters(recordingUrl)}
              type="audio/aac"
            />
          </Audio>
          <DownloadClaimFile
            href={recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download claim file
          </DownloadClaimFile>
          <DownloadClaimFile
            href={getUrlWithoutParameters(recordingUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download claim file
          </DownloadClaimFile>
        </AudioWrapper>
      )}
      <SelectWrapper>
        <MuiInputLabel shrink>Status</MuiInputLabel>
        <MuiSelect
          value={state}
          onChange={async (event) => {
            await updateClaimState(
              updateClaimStateOptions(claimId, validateSelectOption(event)),
            )
            await refetchPage()
          }}
        >
          {Object.values(ClaimState).map((s) => (
            <MuiMenuItem key={s} value={s}>
              {s}
            </MuiMenuItem>
          ))}
        </MuiSelect>
      </SelectWrapper>
      <SelectWrapper>
        <MuiInputLabel shrink>Employee Claim</MuiInputLabel>
        <MuiSelect
          value={coveringEmployee ? 'True' : 'False'}
          onChange={async (event) => {
            await setCoveringEmployee(
              setCoveringEmployeeOptions(
                claimId,
                validateSelectEmployeeClaimOption(event),
              ),
            )
            await sleep(1000)
            await refetchPage()
          }}
        >
          <MuiMenuItem key={'True'} value={'True'}>
            True
          </MuiMenuItem>
          <MuiMenuItem key={'False'} value={'False'}>
            False
          </MuiMenuItem>
        </MuiSelect>
      </SelectWrapper>
      {contracts && (
        <SelectWrapper>
          <MuiInputLabel shrink error={!selectedContract}>
            Select Contract for Claim
          </MuiInputLabel>

          <MuiSelect
            value={selectedContract?.id ? selectedContract.id : 'none'}
            onChange={async (event) => {
              if (event.target.value === 'none') {
                return
              }
              await setContractForClaim(
                setContractForClaimOptions({
                  claimId,
                  memberId,
                  contractId: event.target.value,
                }),
              )
              await sleep(1000)
              await refetchPage()
            }}
          >
            <MuiMenuItem disabled value={'none'} divider>
              None selected
            </MuiMenuItem>
            {contracts.map((contract) => {
              const address = currentAgreementForContract(contract)?.address
              return (
                <MuiMenuItem key={contract.id} value={contract.id}>
                  {contract.contractTypeName}
                  {address && <> ({address.street})</>}
                </MuiMenuItem>
              )
            })}
          </MuiSelect>
        </SelectWrapper>
      )}
    </Paper>
  )
}

export { ClaimInformation }
