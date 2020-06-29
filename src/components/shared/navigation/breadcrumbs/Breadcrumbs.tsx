import { getMemberInfo } from 'lib/helpers'
import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'semantic-ui-react'

const BreadcrumbsContainer = styled('div')`
  display: flex;
  margin: 20px 0;
  text-transform: capitalize;
  padding-bottom: 6rem;

  &,
  a {
    color: ${({ theme }) => theme.mutedText};
  }
`

const Breadcrumbs: React.FC<any> = ({ state, history }) => {
  const pathname = history.location.pathname
  if (pathname.startsWith('/login')) {
    return null
  }

  const paths = pathname.split('/').map((path, i, arr) => {
    if (i === 0) {
      return {
        key: i,
        content: <span>Dashborad</span>,
        active: true,
      }
    }

    if (i === arr.length - 1) {
      const content =
        pathname.indexOf('members/') >= 0
          ? getMemberInfo(state.members.list, path)
          : path.toLowerCase()
      return {
        key: i,
        content,
        active: false,
      }
    }

    return {
      key: i,
      content: (
        <Link to={`${arr.slice(0, i + 1).join('/')}`}>
          {path.toLowerCase()}
        </Link>
      ),
      active: true,
    }
  })
  return (
    <BreadcrumbsContainer>
      <Breadcrumb sections={paths} />
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
