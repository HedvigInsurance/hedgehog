import { GenericAgreement } from 'api/generated/graphql'
import {
  InfoContainer,
  InfoRow,
  InfoText,
} from 'components/member/tabs/shared/card-components'
import { Paragraph } from 'hedvig-ui/typography'
import React from 'react'
import styled from 'react-emotion'
import { formatMoney } from 'utils/money'
import { formatPostalCode, convertEnumToTitle } from 'utils/text'

const AddressInfoRow = styled(Paragraph)`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: inline-block;
`

export const AgreementInfo: React.FC<{ agreement: GenericAgreement }> = ({
  agreement,
}) => {
  return (
    <InfoContainer>
      {agreement.address && (
        <AddressInfoRow>
          {agreement.address.street}
          <br />
          {formatPostalCode(agreement.address.postalCode)}{' '}
          {agreement.address.city}
        </AddressInfoRow>
      )}
      <br />
      {agreement.squareMeters && (
        <InfoRow>
          Living Space{' '}
          <InfoText>
            {agreement.squareMeters} m<sup>2</sup>
          </InfoText>
        </InfoRow>
      )}
      {agreement.ancillaryArea && (
        <InfoRow>
          Ancillary Area <InfoText>{agreement.ancillaryArea}</InfoText>
        </InfoRow>
      )}
      {agreement.yearOfConstruction && (
        <InfoRow>
          Year Of Construction{' '}
          <InfoText>{agreement.yearOfConstruction}</InfoText>
        </InfoRow>
      )}
      {agreement.numberOfBathrooms && (
        <InfoRow>
          Number of bathrooms <InfoText>{agreement.numberOfBathrooms}</InfoText>
        </InfoRow>
      )}
      {agreement.isSubleted && (
        <InfoRow>
          Is subleted <InfoText>{agreement.isSubleted ? 'Yes' : 'No'}</InfoText>
        </InfoRow>
      )}
      {agreement.extraBuildings &&
        agreement.extraBuildings.map((extraBuilding, index) => {
          return (
            <InfoRow key={extraBuilding.id!}>
              Extra building {index + 1}{' '}
              <InfoText>
                {extraBuilding.displayName}, {extraBuilding.area} m<sup>2</sup>{' '}
                {extraBuilding.hasWaterConnected ? '(Water connected)' : ''}
              </InfoText>
            </InfoRow>
          )
        })}
      {agreement.numberCoInsured !== undefined && (
        <InfoRow>
          Number Co-insured <InfoText>{agreement.numberCoInsured}</InfoText>
        </InfoRow>
      )}
      <InfoRow>
        Line of Business{' '}
        <InfoText>{convertEnumToTitle(agreement.lineOfBusinessName)}</InfoText>
      </InfoRow>
      <InfoRow>
        Premium{' '}
        <InfoText>
          {formatMoney(agreement.premium, { minimumFractionDigits: 0 })}
        </InfoText>
      </InfoRow>
      <InfoRow>
        Status <InfoText>{convertEnumToTitle(agreement.status)}</InfoText>
      </InfoRow>
    </InfoContainer>
  )
}
