import * as types from 'lib/messageTypes'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'
import { Form } from 'semantic-ui-react'

const FileButton = styled('label')`
  box-sizing: border-box;
  display: inline-block;
  width: 75px;
  cursor: pointer;
  background-color: rgb(202, 203, 205);
  color: #fff !important;
  text-align: center;
  border-radius: 0.28571429rem;
`

export default class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { acceptType: '', fileName: '' }
  }

  changeHandler = (e) => {
    // eslint-disable-next-line
    const reader = new FileReader()
    const file = e.target.files[0]
    this.setState({ fileName: file.name })
    reader.onloadend = () => {
      this.props.changeHandler(this.props.type, null, {
        value: {
          name: file.name,
          type: file.type,
          content: reader.result,
        },
      })
    }

    reader.readAsDataURL(file)
  }

  componentDidMount() {
    const { type } = this.props
    let acceptType = ''
    switch (type) {
      case types.PHOTO:
        acceptType = 'image/*'
        break
      case types.AUDIO:
        acceptType = 'audio/*'
        break
      case types.VIDEO:
        acceptType = 'video/*'
        break
      default:
        break
    }
    this.setState({ acceptType })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cleanupForm) {
      this.setState({ fileName: '' })
      this.fileInput.value = ''
    }
  }

  componentWillUnmount() {
    this.setState({ acceptType: '' })
  }

  render() {
    const { fileName, acceptType } = this.state
    return (
      <React.Fragment>
        <Form.Field>
          <input
            type="file"
            name="file"
            multiple={false}
            accept={acceptType}
            id="file"
            onChange={this.changeHandler}
            style={{ display: 'none' }}
            ref={(input) => {
              this.fileInput = input
            }}
          />
          <FileButton htmlFor="file">Choose file</FileButton>
          {fileName && <span>{fileName}</span>}
        </Form.Field>
      </React.Fragment>
    )
  }
}

FileInput.propTypes = {
  cleanupForm: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
}
