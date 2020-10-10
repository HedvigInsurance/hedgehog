import { TableHeader } from 'containers/claims-page/components/TableHeader'
import { TableRow } from 'containers/claims-page/components/TableRow'
import { useClaimSearch } from 'graphql/use-claim-search'
import React from 'react'
import { Claim, ClaimSearchOptions } from 'src/api/generated/graphql'
import BackendPaginatorList from '../../shared/paginator-list/BackendPaginatorList'

const BackendServedClaimsList: React.FC = () => {
  const [claimSearch, { loading, data, error }] = useClaimSearch()
  const [searchFilter, setSearchFilter] = React.useState<ClaimSearchOptions>({
    page: 0,
    pageSize: 20,
    sortBy: 'DATE',
    sortDirection: 'DESC',
  })

  React.useEffect(() => {
    claimSearch(searchFilter)
  }, [searchFilter])

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>D*shborad, could not retrieve claims!</>
  }

  return (
    <BackendPaginatorList<Claim>
      pagedItems={(data?.claimSearch?.claims as Claim[]) ?? []}
      itemContent={(item) => <TableRow item={item} />}
      tableHeader={
        <TableHeader
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
      }
      currentPage={data?.claimSearch?.page ?? 0}
      totalPages={data?.claimSearch?.totalPages ?? 0}
      isSortable={true}
      keyName="id"
      changePage={(page) => claimSearch({ ...searchFilter, page })}
    />
  )
}

export default BackendServedClaimsList
