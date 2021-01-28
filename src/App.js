import { colorsV3, fonts, getCdnFontFaces } from '@hedviginsurance/brand'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { injectGlobal } from 'emotion'
import { Navigation } from 'components/shared/navigation'
import Breadcrumbs from 'components/shared/navigation/breadcrumbs/Breadcrumbs'
import Notifications from 'containers/NotificationService'
import React from 'react'
import styled from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router'
import Routes from 'routes'
import Store, { history } from 'store'
import { DarkmodeContext, getDefaultIsDarkmode } from 'utils/darkmode-context'
import {
  darkTheme,
  darkUiTheme,
  lightTheme,
  lightUiTheme,
  SemanticOverrides,
} from 'hedvig-ui/themes'
import { MemberHistoryProvider } from 'utils/member-history'

const store = Store.configureStore()

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined') {
    window.__store = store
  }
}

const Layout = styled(SemanticOverrides)({
  display: 'flex',
  minHeight: '100vh',
})
const Main = styled('div')(({ dark, theme }) => ({
  backgroundColor: dark ? colorsV3.gray900 : theme.background,
  color: theme.foreground,
  flex: 1,
  padding: '3rem 4rem',
}))

injectGlobal`
  ${getCdnFontFaces()}

  * {
    box-sizing: border-box;
    font-family: ${fonts.FAVORIT}, sans-serif;
    transition: background 1000ms, color 1000ms;
  }

  body {
    font-family: ${fonts.FAVORIT}, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
   .ui.header{
    font-family: ${fonts.FAVORIT}, sans-serif;
    font-kerning: none;
    font-weight: 400;
  }
`

class App extends React.Component {
  state = { isDarkmode: getDefaultIsDarkmode() }

  render() {
    return (
      <DarkmodeContext.Provider
        value={{
          isDarkmode: this.state.isDarkmode,
          setIsDarkmode: (isDarkmode) => {
            this.setState({ isDarkmode })
            localStorage.setItem(
              'hedvig:theming:darkmode',
              JSON.stringify(isDarkmode),
            )
          },
        }}
      >
        <MuiThemeProvider
          theme={this.state.isDarkmode ? darkUiTheme : lightUiTheme}
        >
          <CssBaseline />
          <ThemeProvider theme={this.state.isDarkmode ? darkTheme : lightTheme}>
            <Provider store={store}>
              <MemberHistoryProvider>
                <Router history={history}>
                  <Layout>
                    <Navigation history={history} store={store} />
                    <Main dark={history.location.pathname.startsWith('/login')}>
                      <Breadcrumbs />
                      <Switch>
                        <Route
                          path="/login"
                          exact
                          component={Routes.LoginPageRoute}
                        />
                        <Routes.PrivateRoute
                          path="/dashborad"
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
                            <Routes.ClaimsPageRoute
                              {...routeProps}
                              store={store}
                            />
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
                        <Redirect from="*" to="/dashborad" />
                      </Switch>
                      <Notifications />
                    </Main>
                  </Layout>
                </Router>
              </MemberHistoryProvider>
            </Provider>
          </ThemeProvider>
        </MuiThemeProvider>
      </DarkmodeContext.Provider>
    )
  }
}

export default App
export const HotApp = hot(module)(App)
