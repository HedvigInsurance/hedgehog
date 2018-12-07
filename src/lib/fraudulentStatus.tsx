import * as React from 'react'
import { Button, Dropdown, Icon, Input, Table } from 'semantic-ui-react'
import styled from 'styled-components'

const ButtonsBlock = styled('div')(() => ({
  floar: 'right',
  marginTop: '10px',
}))

const StatusBallBlock = ({ stateInfo, children }) => (
  <span
    title={
      stateInfo && stateInfo.description
        ? stateInfo.description
        : 'Fraudulent Status is not defined'
    }
  >
    {children}
  </span>
)

const IconStyled = styled(Icon)(() => ({
  verticalAlign: 'middle',
}))

const InputStyled = styled(Input)(() => ({
  marginTop: '5px',
}))

const fraudulentStatuses = {
  NOT_FRAUD: 'green',
  SUSPECTED_FRAUD: 'yellow',
  CONFIRMED_FRAUD: 'red',
}

const FraudulentStatus = (props) => (
  <StatusBallBlock stateInfo={props.stateInfo}>
    <IconStyled
      name="circle"
      color={
        props.stateInfo && fraudulentStatuses[props.stateInfo.state]
          ? fraudulentStatuses[props.stateInfo.state]
          : 'green'
      }
      size={'tiny'}
    />
  </StatusBallBlock>
)

const FraudulentStatusEdit = (props) => {
  let descriptionValue: string = props.getFraudStatusInfo().description
  let fraudulentStatusValue: string = props.getFraudStatusInfo().status
  return (
    <Table.Row>
      <Table.Cell>Fraudulent Status</Table.Cell>
      <Table.Cell>
        {!props.getState() ? (
          <>
            Status: {props.getFraudStatusInfo().status} <br />
            {props.getFraudStatusInfo().description}
          </>
        ) : (
          <>
            <Dropdown
              fluid
              selection
              options={Object.keys(fraudulentStatuses).map((item) => {
                return {
                  key: item,
                  text: item,
                  value: item,
                  selected: item === fraudulentStatusValue,
                  active: item === fraudulentStatusValue,
                }
              })}
              onChange={(e, d) => (fraudulentStatusValue = d.value)}
              placeholder={fraudulentStatusValue}
            />
            <InputStyled
              fluid
              onChange={(e, d) => (descriptionValue = d.value)}
              defaultValue={descriptionValue}
            />
          </>
        )}
        <ButtonsBlock>
          {!props.getState() ? (
            <Button
              onClick={(e) =>
                props.setState(true, fraudulentStatusValue, descriptionValue)
              }
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  props.action(fraudulentStatusValue, descriptionValue)
                  props.setState(false, fraudulentStatusValue, descriptionValue)
                }}
                primary
              >
                Save
              </Button>
              <Button onClick={(e) => props.setState(false)}>Cancel</Button>
            </>
          )}
        </ButtonsBlock>
      </Table.Cell>
    </Table.Row>
  )
}

export { FraudulentStatus, FraudulentStatusEdit }
