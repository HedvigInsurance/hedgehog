import Routes from './index'

export const reactPageRoutes = [
  { path: '/login', Component: Routes.LoginPageRoute, exact: true },
  { path: '/login/**', Component: Routes.LoginPageRoute, exact: true },
  { path: '/members', Component: Routes.MembersPageRoute },
  { path: '/claims/**', Component: Routes.ClaimsPageRoute, exact: true },
  { path: '/questions/**', Component: Routes.QuestionsPageRoute, exact: true },
  { path: '/questions', Component: Routes.QuestionsPageRoute, exact: true },
  { path: '/dashborad', Component: Routes.DashboardPageRoute, exact: true },
  { path: '/tools', Component: Routes.ToolsPageRoute, exact: true },
]
