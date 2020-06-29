import { MULTIPLE_SELECT } from 'lib/messageTypes'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import TextInput from './TextInput'

const SelectItem = styled('span')`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  margin: 10px 0 10px 10px;
  background-color: #c8c8c8;
  border-color: #c8c8c8;
  background-image: none;
  color: rgba(0, 0, 0, 0.95);
  border-radius: 3px;
`

const ListContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const OptionTextInput = styled(Input)`
  &&& {
    width: 200px;
    margin-right: 10px;
  }
`

const FormGroup = styled(Form.Group)`
  &&& {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
`

const SelectedOptionsList = ({ options, removeFromList }) => (
  <ListContainer>
    {options.map((item) => (
      <SelectItem key={item.id}>
        {item.text}
        <Icon name="close" onClick={removeFromList.bind(this, item.id)} />
      </SelectItem>
    ))}
  </ListContainer>
)

SelectedOptionsList.propTypes = {
  options: PropTypes.array.isRequired,
  removeFromList: PropTypes.func.isRequired,
}

export default class SelectCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choicesList: [],
      optionName: '',
    }
  }

  createChoicesList = () => {
    return this.state.choicesList.map((item) => {
      if (this.props.selectType === MULTIPLE_SELECT) {
        return {
          selected: false,
          text: item.text,
        }
      } else {
        return {
          type: 'selection',
          text: item.text,
          selected: false,
        }
      }
    })
  }

  changeHandler = () => {
    const optionsList = this.createChoicesList()
    this.props.changeHandler(this.props.selectType, null, {
      value: optionsList,
    })
  }

  setOptionName = (e, { value }) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ optionName: value })
  }

  createNewOption = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const { choicesList, optionName } = this.state
    if (optionName) {
      this.setState(
        {
          choicesList: [
            ...choicesList,
            {
              id: Math.floor(Math.random() * 1000),
              text: optionName,
            },
          ],
          optionName: '',
        },
        () => this.changeHandler(),
      )
    }
  }

  removeFromList = (id) => {
    const { choicesList } = this.state
    const newList = choicesList.filter((item) => item.id !== id)
    this.setState({
      choicesList: newList,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cleanupForm) {
      this.setState({ choicesList: [] })
    }
  }

  render() {
    const { changeHandler, cleanupForm } = this.props
    return (
      <React.Fragment>
        <TextInput
          changeHandler={changeHandler}
          cleanupForm={cleanupForm}
          label
        />
        <Form.Field>
          <FormGroup>
            <Form.Field>
              <label>Option </label>
              <OptionTextInput
                onChange={this.setOptionName}
                value={this.state.optionName}
              />
            </Form.Field>

            <Button onClick={this.createNewOption}>Create</Button>
          </FormGroup>

          <SelectedOptionsList
            options={this.state.choicesList}
            removeFromList={this.removeFromList}
          />
        </Form.Field>
      </React.Fragment>
    )
  }
}

SelectCreator.propTypes = {
  cleanupForm: PropTypes.bool,
  selectType: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
}
