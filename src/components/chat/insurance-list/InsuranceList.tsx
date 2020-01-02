import { CreateQuote } from 'components/chat/tabs/insurance-tab/create-quote'
import { LinkRow } from 'components/shared'
import { WideModal } from 'components/shared/modals/WideModal'
import PaginatorList from 'components/shared/paginator-list/PaginatorList'
import TableFields from 'components/shared/table-fields/TableFields'
import * as moment from 'moment'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import {
  Button,
  Form,
  Header,
  Icon,
  Loader,
  Modal,
  Table,
} from 'semantic-ui-react'

const DateTypeEnum = {
  terminationDate: 1,
  activationDate: 2,
}

export enum ExtraBuildingType {
  ATTEFALL = 'Attefallshus',
  SAUNA = 'Bastu',
  BOATHOUSE = 'Båthus',
  CARPORT = 'Carport',
  GUESTHOUSE = 'Gästhus',
  FRIGGEBOD = 'Friggebod',
  STOREHOUSE = 'Förråd',
  GARAGE = 'Garage',
  BARN = 'Lada',
  GAZEBO = 'Lusthus',
  SHED = 'Skjul',
  OUTHOUSE = 'Uthus',
  GREENHOUSE = 'Växthus',
  OTHER = 'Annat',
}

export interface ExtraBuilding {
  id: string
  type: ExtraBuildingType
  area: number
  hasWaterConnected: boolean
  displayName?: string
}

export default class InsuranceList extends React.Component {
  public insuranceFieldFormatters = {
    extraBuildings: (buildings: ExtraBuilding[]) =>
      (buildings ?? []).map((building) => (
        <p key={building.id}>
          {building.type} {building.area} m<sup>2</sup> (
          {building.hasWaterConnected
            ? 'has water connected'
            : 'no water connected'}
          )
        </p>
      )),
  }
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      direction: null,
      item: null,
      terminationDate: null,
      activationDate: null,
      modalOpen: false,
    }
  }

  public handleOpen = () => this.setState({ modalOpen: true })

  public getFormattedDate = (date) => {
    return date.isValid() ? date.format('DD MMMM YYYY') : '-'
  }

  public linkClickHandler = (i, d) => {
    if (d.productId === i.productId) {
      this.setState({ item: null })
    } else {
      this.setState({ item: i })
    }
  }

  public handleClose = () => {
    this.setState({ item: null })
    this.setState({ terminationDate: null })
    this.setState({ activationDate: null })
    this.setState({ modalOpen: false })
  }

  public handleChange = (type) => (e) => {
    switch (type) {
      case DateTypeEnum.terminationDate:
        this.setState({ terminationDate: e.target.value })
        break

      case DateTypeEnum.activationDate:
        this.setState({ activationDate: e.target.value })
        break

      default:
        console.warn('InsuranceList , handleChange') // tslint:disable-line
    }
  }

  public handleSubmissionButton = () => {
    const {
      modifyInsurance,
      insurance: { data },
    } = this.props

    const request = {
      insuranceIdToBeReplaced: data.productId,
      terminationDate: this.state.terminationDate
        ? this.state.terminationDate
        : moment().format('YYYY-MM-DD'),
      insuranceIdToReplace: this.state.item.productId,
      activationDate: this.state.activationDate
        ? this.state.activationDate
        : moment().format('YYYY-MM-DD'),
      memberId: data.memberId,
    }

    modifyInsurance(data.memberId, request)
  }

  public isTheActiveInsurance = (item, data) => {
    if (item.productId === data.productId) {
      return true
    }
    return false
  }

  public getTableRow = (item, data) => {
    // FIXME : we need to remove Z after insuranceActiveFrom and insuranceActiveTo when we will change the type of datetime from backend.
    const activationDate = moment(item.insuranceActiveFrom + 'Z').local()
    const cancellationDate = moment(item.insuranceActiveTo + 'Z').local()

    return (
      <LinkRow
        positive={this.isTheActiveInsurance(item, data)}
        onClick={this.linkClickHandler.bind(this, item, data)}
      >
        <Table.Cell>{item.insuranceType}</Table.Cell>
        <Table.Cell>
          {item.street + ' ' + item.city + ' ' + item.zipCode}
        </Table.Cell>
        <Table.Cell>{item.livingSpace}</Table.Cell>
        <Table.Cell>{item.personsInHouseHold}</Table.Cell>
        <Table.Cell>{this.getFormattedDate(activationDate)}</Table.Cell>
        <Table.Cell>{this.getFormattedDate(cancellationDate)}</Table.Cell>
        <Table.Cell>{item.currentTotalPrice}</Table.Cell>
        <Table.Cell>{item.insuranceStatus}</Table.Cell>
      </LinkRow>
    )
  }

  public getTableHeader = () => {
    const { column, direction } = this.state
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            width={1}
            sorted={column === 'insuranceType' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceType")}
          >
            Type
          </Table.HeaderCell>
          <Table.HeaderCell
            width={3}
            sorted={column === 'address' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceType")}
          >
            Address
          </Table.HeaderCell>
          <Table.HeaderCell
            width={1}
            sorted={column === 'space' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceType")}
          >
            ㎡
          </Table.HeaderCell>
          <Table.HeaderCell
            width={1}
            sorted={column === 'space' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceType")}
          >
            Household Size
          </Table.HeaderCell>
          <Table.HeaderCell
            width={3}
            sorted={column === 'insuranceActiveFrom' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceActiveFrom")}
          >
            Active from
          </Table.HeaderCell>
          <Table.HeaderCell
            width={3}
            sorted={column === 'insuranceActiveTo' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceActiveTo")}
          >
            Active to
          </Table.HeaderCell>
          <Table.HeaderCell
            width={1}
            sorted={column === 'currentTotalPrice' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceStatus")}
          >
            Price
          </Table.HeaderCell>
          <Table.HeaderCell
            width={1}
            sorted={column === 'insuranceStatus' ? direction : null}
            // onClick={this.sortTable.bind(this, "insuranceStatus")}
          >
            Status
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  public render() {
    const {
      insurance: { data, list },
    } = this.props

    return list ? (
      <React.Fragment>
        {this.state.item && (
          <>
            <Header> Selected Insurance </Header>
            <Table>
              <Table.Body>
                <TableFields
                  fields={this.state.item}
                  fieldFormatters={this.insuranceFieldFormatters}
                />
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell>
                    Do you want to replace the current insurance with price{' '}
                    {data.currentTotalPrice}
                    <br /> with the updated insurance with price{' '}
                    {this.state.item.currentTotalPrice} ?
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <WideModal
                      className="scrolling"
                      trigger={
                        <Button
                          floated="right"
                          icon
                          labelposition="left"
                          primary
                          size="medium"
                          onClick={this.handleOpen}
                        >
                          <Icon name="edit" /> Choose dates
                        </Button>
                      }
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic
                      size="small"
                      dimmer="blurring"
                    >
                      <Header
                        icon="question circle"
                        content="Are you sure you want to replace the insurance?"
                      />
                      <Modal.Content>
                        <Form inverted size="small">
                          <Form.Input
                            label="Current insurance's termination date"
                            onChange={this.handleChange(
                              DateTypeEnum.terminationDate,
                            )}
                            defaultValue={moment().format('YYYY-MM-DD')}
                          />
                          <Form.Input
                            label="New insurance's activation date"
                            onChange={this.handleChange(
                              DateTypeEnum.activationDate,
                            )}
                            defaultValue={moment().format('YYYY-MM-DD')}
                          />
                          <Button.Group floated="right" labelposition="left">
                            <Button type="button" onClick={this.handleClose}>
                              Cancel
                            </Button>
                            <Button.Or />
                            <Button
                              type="button"
                              onClick={this.handleSubmissionButton}
                              positive
                            >
                              {this.props.insurance.requesting ? (
                                <>
                                  <Loader /> Loading
                                </>
                              ) : (
                                'Submit'
                              )}
                            </Button>
                          </Button.Group>
                        </Form>
                      </Modal.Content>
                    </WideModal>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Quote</Table.Cell>
                  <Table.Cell style={{ textAlign: 'right' }}>
                    <CreateQuote
                      memberId={this.props.insurance.data.memberId}
                      insurance={this.state.item}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </>
        )}
        <PaginatorList
          list={list}
          itemContent={(item) => this.getTableRow(item, data)}
          tableHeader={this.getTableHeader()}
          pageSize={10}
          isSortable={false}
          keyName="productId"
        />
      </React.Fragment>
    ) : (
      <Header>No insurances found</Header>
    )
  }
}

InsuranceList.propTypes = {
  insurance: PropTypes.object.isRequired,
  modifyInsurance: PropTypes.func.isRequired,
}
