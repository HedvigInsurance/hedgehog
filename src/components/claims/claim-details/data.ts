import gql from 'graphql-tag'
import { TYPE_FRAGMENT } from './components/ClaimType'

export const CLAIM_PAGE_QUERY = gql`
  query ClaimPage($id: ID!) {
    claim(id: $id) {
      id
      member {
        memberId
        signedOn
        firstName
        lastName
        person {
          debtFlag
        }
        personalNumber
        directDebitStatus {
          activated
        }
        fraudulentStatus
        sanctionStatus
        numberFailedCharges {
          numberFailedCharges
          lastFailedChargeAt
        }
        totalNumberOfClaims
        account {
          totalBalance {
            amount
            currency
          }
        }
        identity {
          nationalIdentification {
            identification
            nationality
          }
          firstName
          lastName
        }
        contractMarketInfo {
          market
        }
      }
      registrationDate
      recordingUrl
      state
      type {
        ${TYPE_FRAGMENT}
      }
      notes {
        text
        date
      }
      transcriptions {
        text
        confidenceScore
        languageCode
      }
      reserves
      payments {
        id
        amount
        deductible
        note
        timestamp
        exGratia
        type
        status
      }
      events {
        text
        date
      }
      claimFiles {
        claimFileId
        fileUploadUrl
        uploadedAt
        category
        contentType
      }
      contract {
        id
        currentAgreementId
        genericAgreements {
          id
          address {
            street
            postalCode
            city
          }
        }
        contractTypeName
        typeOfContract
      }
      coveringEmployee
      inventory {
        totalValuation {
          amount
          currency
        }
        deductible {
          amount
          currency
        }
        items {
          id
          itemFamily {
            displayName
          }
          itemType {
            displayName
          }
          itemBrand {
            displayName
          }
          itemCompany {
            displayName
          }
          itemModel {
            displayName
          }
          dateOfPurchase
          purchasePrice {
            amount
            currency
          }
          valuation {
            depreciatedValue {
              amount
              currency
            }
            explanation
          }
          note
        }
      }
      __typename
    }
  }
`
