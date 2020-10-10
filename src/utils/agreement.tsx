import { match } from 'matchly'
import styled from 'react-emotion'

export const InsuranceStatusBadge = styled('div')<{ status: string }>(
  ({ theme, status }) => ({
    display: 'inline-block',
    fontSize: '0.8rem',
    padding: '0.25rem 0.8rem',
    backgroundColor: match([
      ['ACTIVE', theme.activeInsuranceBackground],
      ['PENDING', theme.pendingInsuranceBackground],
      ['TERMINATED', theme.terminatedInsuranceBackground],
      [match.any(), theme.mutedBackground],
    ])(status),
    color: match([
      ['ACTIVE', theme.activeInsuranceForeground],
      ['PENDING', theme.pendingInsuranceForeground],
      ['TERMINATED', theme.terminatedInsuranceForeground],
      [match.any(), theme.mutedText],
    ])(status),
    textTransform: 'capitalize',
    borderRadius: '1000px',
  }),
)
