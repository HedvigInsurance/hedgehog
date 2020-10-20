import { getFirstMasterInception, getLastTerminationDate } from 'utils/contract'

it('getFirstMasterInception returns first master inception if both are active', () => {
  const activeContracts = [
    {
      masterInception: new Date(2020, 1, 1),
    },
    {
      masterInception: new Date(2020, 3, 1),
    },
  ]
  const firstMasterInception = getFirstMasterInception(activeContracts as any)
  expect(firstMasterInception).toStrictEqual(new Date(2020, 1, 1))
})

it('getFirstMasterInception returns first master inception in time if first contract is active', () => {
  const oneActiveOnePending = [
    {
      masterInception: new Date(2020, 1, 1),
    },
    {
      masterInception: null,
    },
  ]
  const firstMasterInception = getFirstMasterInception(
    oneActiveOnePending as any,
  )
  expect(firstMasterInception).toStrictEqual(new Date(2020, 1, 1))
})

it('getFirstMasterInception returns first master inception in time if second contract is active', () => {
  const oneActiveOnePending = [
    {
      masterInception: null,
    },
    {
      masterInception: new Date(2020, 1, 1),
    },
  ]
  const firstMasterInception = getFirstMasterInception(
    oneActiveOnePending as any,
  )
  expect(firstMasterInception).toStrictEqual(new Date(2020, 1, 1))
})

it('getFirstMasterInception returns null if both contracts are inactive', () => {
  const bothInactive = [
    {
      masterInception: null,
    },
    {
      masterInception: null,
    },
  ]
  const firstMasterInception = getFirstMasterInception(bothInactive as any)
  expect(firstMasterInception).toBe(null)
})

it('getFirstMasterInception returns null if no contract exists', () => {
  const firstMasterInception = getFirstMasterInception([])
  expect(firstMasterInception).toBe(null)
})

it('getLastTerminationDate returns last termination date in time if second is terminated last', () => {
  const terminatedContracts = [
    {
      terminationDate: new Date(2020, 1, 1),
      isTerminated: true,
    },
    {
      terminationDate: new Date(2020, 3, 1),
      isTerminated: true,
    },
  ]
  const lastTerminationDate = getLastTerminationDate(terminatedContracts as any)
  expect(lastTerminationDate).toStrictEqual(new Date(2020, 3, 1))
})

it('getLastTerminationDate returns last termination date in time if first is terminated last', () => {
  const terminatedContracts = [
    {
      terminationDate: new Date(2020, 3, 1),
      isTerminated: true,
    },
    {
      terminationDate: new Date(2020, 1, 1),
      isTerminated: true,
    },
  ]
  const lastTerminationDate = getLastTerminationDate(terminatedContracts as any)
  expect(lastTerminationDate).toStrictEqual(new Date(2020, 3, 1))
})

it('getLastTerminationDate returns null first contract is active', () => {
  const oneActiveOneTerminated = [
    {
      isTerminated: false,
    },
    {
      terminationDate: new Date(2020, 3, 1),
      isTerminated: true,
    },
  ]
  const lastTerminationDate = getLastTerminationDate(
    oneActiveOneTerminated as any,
  )
  expect(lastTerminationDate).toBe(null)
})

it('getLastTerminationDate returns null if both contracts are active', () => {
  const bothInactive = [
    {
      isTerminated: false,
    },
    {
      isTerminated: false,
    },
  ]
  const lastTerminationDate = getLastTerminationDate(bothInactive as any)
  expect(lastTerminationDate).toBe(null)
})

it('getLastTerminationDate returns null if no contract exists', () => {
  const lastTerminationDate = getLastTerminationDate([])
  expect(lastTerminationDate).toBe(null)
})
