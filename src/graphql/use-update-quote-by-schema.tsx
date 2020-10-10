import { MutationFunctionOptions } from '@apollo/react-common'
import {
  GetQuotesDocument,
  UpdateQuoteBySchemaMutation,
  UpdateQuoteBySchemaMutationVariables,
  useUpdateQuoteBySchemaMutation,
} from 'api/generated/graphql'
import { JSONSchema7 } from 'json-schema'

export const useUpdateQuoteBySchema = () => useUpdateQuoteBySchemaMutation()

interface GetUpdateQuoteSchemaOptionsParams {
  memberId: string
  quoteId: string
  schema: JSONSchema7
  formData: Record<string, unknown>
  bypassUnderwritingGuidelines: boolean
}

export const getUpdateQuoteSchemaOptions = ({
  memberId,
  quoteId,
  schema,
  formData,
  bypassUnderwritingGuidelines,
}: GetUpdateQuoteSchemaOptionsParams): MutationFunctionOptions<
  UpdateQuoteBySchemaMutation,
  UpdateQuoteBySchemaMutationVariables
> => {
  return {
    variables: {
      quoteId,
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
