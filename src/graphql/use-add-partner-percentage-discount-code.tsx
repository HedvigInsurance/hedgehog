import { MutationFunctionOptions } from '@apollo/react-common'
import {
  AssignCampaignToPartnerPercentageDiscountMutation,
  AssignCampaignToPartnerPercentageDiscountMutationHookResult,
  AssignCampaignToPartnerPercentageDiscountMutationVariables,
  AssignVoucherPercentageDiscount,
  useAssignCampaignToPartnerPercentageDiscountMutation,
} from 'api/generated/graphql'

export const useAddPartnerPercentageDiscountCode = (): AssignCampaignToPartnerPercentageDiscountMutationHookResult =>
  useAssignCampaignToPartnerPercentageDiscountMutation()

export const addPartnerPercentageDiscountCodeOptions = (
  request: AssignVoucherPercentageDiscount,
): MutationFunctionOptions<
  AssignCampaignToPartnerPercentageDiscountMutation,
  AssignCampaignToPartnerPercentageDiscountMutationVariables
> => {
  return {
    variables: {
      request,
    },
    refetchQueries: () => ['FindPartnerCampaigns'],
  }
}
