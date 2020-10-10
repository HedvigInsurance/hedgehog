import { MutationFunctionOptions } from '@apollo/react-common'
import {
  CreateQuoteForMemberBySchemaMutation,
  CreateQuoteForMemberBySchemaMutationVariables,
  GetQuotesDocument,
  useCreateQuoteForMemberBySchemaMutation,
} from 'api/generated/graphql'
import { JSONSchema7 } from 'json-schema'

export const useCreateQuoteForMemberBySchema = () =>
  useCreateQuoteForMemberBySchemaMutation()

interface GetCreateQuoteForMemberBySchemaOptionsParams {
  memberId: string
  schema: JSONSchema7
  formData: Record<string, unknown>
  bypassUnderwritingGuidelines: boolean
}

export const getCreateQuoteForMemberBySchemaOptions = ({
  memberId,
  schema,
  formData,
  bypassUnderwritingGuidelines,
}: GetCreateQuoteForMemberBySchemaOptionsParams): MutationFunctionOptions<
  CreateQuoteForMemberBySchemaMutation,
  CreateQuoteForMemberBySchemaMutationVariables
> => {
  return {
    variables: {
      memberId,
      schemaData: {
        ...formData,
        id: schema.$id,
      },
      bypassUnderwritingGuidelines,
    },
    refetchQueries: () => [
      {
        query: GetQuotesDocument,
        variables: { memberId },
      },
    ],
  }
}
