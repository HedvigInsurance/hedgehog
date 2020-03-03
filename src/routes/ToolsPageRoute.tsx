import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Tools } from '../features/tools'
import { ChargePage } from '../features/tools/charges'
import { PerilsEditor } from '../features/tools/perils-editor'
import { SwitcherAutomation } from '../features/tools/switcher-automation'

export const ToolsPageRoute: React.FunctionComponent = () => (
  <Switch>
    <Route component={Tools} path="/tools" exact />
    <Route component={ChargePage} path="/tools/charges" />
    <Route component={SwitcherAutomation} path="/tools/switcher-automation" />
    <Route component={PerilsEditor} path="/tools/perils-editor" />
  </Switch>
)
