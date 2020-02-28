import DateFnsUtils from '@date-io/date-fns'
import { colors } from '@hedviginsurance/brand'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Navigation } from 'components/shared/navigation'
import Breadcrumbs from 'components/shared/navigation/breadcrumbs/Breadcrumbs'
import Notifications from 'containers/notification-service/NotificationService'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import React from 'react'
import styled from 'react-emotion'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router'
import Routes from 'routes'
import Store, { history } from 'store'
import { lightUiTheme } from './uiThemes'

const store = Store.configureStore()

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined') {
    window.__store = store
  }
}

const Layout = styled('div')({
  display: 'flex',
  minHeight: '100vh',
})
const Main = styled('div')(({ dark }) => ({
  backgroundColor: dark ? colors.OFF_BLACK_DARK : undefined,
  flex: 1,
  padding: 16,
}))

class App extends React.Component {
  componentDidMount() {
    history.listen(() => {
      this.forceUpdate()
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={lightUiTheme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Provider store={store}>
            <Router history={history}>
              <Layout>
                <Navigation history={history} store={store} />
                <Main dark={history.location.pathname.startsWith('/login')}>
                  <Breadcrumbs history={history} state={store.getState()} />
                  <Switch>
                    <Route
                      path="/login"
                      exact
                      component={Routes.LoginPageRoute}
                    />
                    <Routes.PrivateRoute
                      path="/dashboard"
                      store={store}
                      component={Routes.DashboardPageRoute}
                    />
                    <Routes.PrivateRoute
                      path="/questions"
                      store={store}
                      component={Routes.QuestionsPageRoute}
                    />
                    <Route
                      path="/claims"
                      render={(routeProps) => (
                        <Routes.ClaimsPageRoute {...routeProps} store={store} />
                      )}
                    />
                    <Route
                      path="/members"
                      render={(routeProps) => (
                        <Routes.MembersPageRoute
                          {...routeProps}
                          store={store}
                        />
                      )}
                    />
                    <Routes.PrivateRoute
                      path="/tools"
                      store={store}
                      component={Routes.ToolsPageRoute}
                    />
                    <Routes.PrivateRoute
                      path="/taskmanager"
                      store={store}
                      component={Routes.TaskManagerPageRoute}
                    />
                    <Route
                      path="/ticket_history/:id"
                      render={(routeProps) => (
                        <Routes.TicketHistoryPageRoute
                          {...routeProps}
                          store={store}
                        />
                      )}
                    />
                    <Redirect from="*" to="/dashboard" />
                  </Switch>
                  <Notifications />
                </Main>
              </Layout>
            </Router>
          </Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    )
  }
}

export default App
export const HotApp = hot(module)(App)
