import {
  GetSchemaForContractTypeQueryHookResult,
  useGetSchemaForContractTypeQuery,
} from 'api/generated/graphql'
import { JSONSchema7 } from 'json-schema'
import { ContractType } from 'types/enums'

type GetSchemaForContractTypeReturnTuple = [
  JSONSchema7,
  GetSchemaForContractTypeQueryHookResult,
]

export const useSchemaForContractType = (
  contractType: ContractType,
): GetSchemaForContractTypeReturnTuple => {
  const queryResult = useGetSchemaForContractTypeQuery({
    variables: {
      contractType,
    },
  })
  const schema = queryResult.data?.quoteSchemaForContractType as object
  return [schema, queryResult]
}
