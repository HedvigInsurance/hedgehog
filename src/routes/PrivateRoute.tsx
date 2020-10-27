import { LoadingMessage } from 'hedvig-ui/animations/standalone-message'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { authCheck as authCheckAction, AuthState } from 'store/actions/auth'
import { BackofficeStore } from 'store/storeTypes'

const PrivateRouteComponent = ({
  component: Component,
  authState,
  authCheck,
  ...rest
}) => {
  React.useEffect(() => {
    if (authState === AuthState.UNKNOWN) {
      authCheck()
    }
  }, [authState])

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authState === AuthState.UNKNOWN) {
          return (
            <LoadingMessage paddingTop={'25vh'}>Authenticating</LoadingMessage>
          )
        }

        if (authState === AuthState.UNAUTHENTICATED) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }

        return <Component {...props} />
      }}
    />
  )
}

const mapState = (state: BackofficeStore) => ({
  authState: state.auth.state,
})

const mapActions = { authCheck: authCheckAction }

const PrivateRoute = connect(mapState, mapActions, null, { pure: false })(
  PrivateRouteComponent,
)

export default PrivateRoute
