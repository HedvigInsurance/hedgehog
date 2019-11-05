import api from 'api'
import config from 'api/config'
import { ACTIVATION_DATE, CANCELLATION_DATE } from 'lib/messageTypes'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  activateQuoteSuccess,
  changeCompanyStatusSuccess,
  createModifiedQuoteSuccess,
  insuranceError,
  insuranceGetError,
  insuranceGetSuccess,
  insurancesListGetSuccess,
  saveActivationDateSuccess,
  saveCancellationDateSuccess,
  sendCancelRequestSuccess,
  sendCertificateSuccess,
} from '../actions/insuranceActions'
import { showNotification } from '../actions/notificationsActions'
import {
  ACTIVATE_QUOTE,
  INSURANCE_REQUESTING,
  INSURANCES_LIST_REQUESTING,
  MEMBER_COMPANY_STATUS, MEMBER_CREATE_MODIFIED_QUOTE,
  SAVE_INSURANCE_DATE,
  SEND_CANCEL_REQUEST,
  SEND_CERTIFICATE,
} from '../constants/members'

const STUDENT_BRF = 'STUDENT_BRF'
const STUDENT_RENT = 'STUDENT_RENT'
const BRF = 'BRF'
const RENT = 'RENT'
const SUBLET_BRF = 'SUBLET_BRF'
const SUBLET_RENT = 'SUBLET_RENT'
const HOUSE = 'HOUSE'

function* requestFlow({ id }) {
  try {
    const { data } = yield call(api, config.insurance.get, null, id)
    yield put(insuranceGetSuccess(data))
  } catch (error) {
    yield [put(insuranceGetError(error.message))]
  }
}

function* requestListofInsurancesFlow({ id }) {
  try {
    const requestListPath = `${id}/insurances`

    const response = yield call(
      api,
      config.insurance.getInsurancesByMember,
      null,
      requestListPath,
    )

    yield put(insurancesListGetSuccess(response.data))
  } catch (error) {
    yield [put(insuranceGetError(error.message))]
  }
}

function* createModifiedQuoteFlow({ memberId, modifiedDetails }) {
  try {
    const path = `${memberId}/quotes`

    if (!modifiedDetails.livingSpace) {
      const error = { message: 'Livingspace is empty' }
      throw error
    }

    if (
      modifiedDetails.insuranceType !== BRF &&
      modifiedDetails.insuranceType !== RENT &&
      modifiedDetails.insuranceType !== STUDENT_BRF &&
      modifiedDetails.insuranceType !== STUDENT_RENT &&
      modifiedDetails.insuranceType !== SUBLET_BRF &&
      modifiedDetails.insuranceType !== SUBLET_RENT &&
      modifiedDetails.insuranceType !== HOUSE
    ) {
      const error = {
        message:
          'Insurance type should be BRF, RENT, STUDENT_BRF, STUDENT_RENT, SUBLET_BRF, SUBLET_RENT or HOUSE',
      }
      throw error
    }

    if (
      modifiedDetails.insuranceType === STUDENT_BRF ||
      modifiedDetails.insuranceType === STUDENT_RENT
    ) {
      let shouldThrow = false
      let error = {
        message: 'Cannot create modified student insurance',
      }
      if (+modifiedDetails.livingSpace > 50) {
        error = {
          message:
            error.message + ', livingspace should be equal or less than 50 m2 ',
        }
        shouldThrow = true
      }
      if (+modifiedDetails.personsInHouseHold > 2) {
        error = {
          message:
            error.message +
            ', the household size should be less than 3 people ',
        }
        shouldThrow = true
      }
      if (!modifiedDetails.isStudent) {
        error = {
          message:
            error.message +
            ', the "Is Student?" box should be selected for student insurance. ',
        }
        shouldThrow = true
      }
      if (shouldThrow) {
        throw error
      }
    }

    if (modifiedDetails.insuranceType === HOUSE) {
      let shouldThrow = false
      let error = {
        message: 'Cannot create modified house insurance ',
      }
      if (+modifiedDetails.livingSpace > 250) {
        error = {
          message:
            error.message +
            ', living space should be equal or less than 250 m2 ',
        }
        shouldThrow = true
      }
      if (+modifiedDetails.livingSpace + +modifiedDetails.ancillaryArea > 300) {
        error = {
          message:
            error.message +
            ', total area (living space + ancillary area) should be equal or less than 300 m2 ',
        }
        shouldThrow = true
      }
      if (+modifiedDetails.personsInHouseHold > 6) {
        error = {
          message:
            error.message +
            ', the number of persons in the household should be equal or less than 6 people ',
        }
        shouldThrow = true
      }
      if (+modifiedDetails.yearOfConstruction < 1925) {
        error = {
          message:
            error.message +
            ', house year of construction must at or before 1925 ',
        }
        shouldThrow = true
      }
      if (+modifiedDetails.numberOfBathrooms > 2) {
        error = {
          message:
            error.message +
            ', number of bathrooms must be equal or less than 2 ',
        }
        shouldThrow = true
      }
      if (
        modifiedDetails.extraBuildings.filter((building) => building.area > 6)
          .length > 4
      ) {
        error = {
          message:
            error.message +
            ', number of extra buildings with an area over 6 m2 should be equal to or less than 4 ',
        }
        shouldThrow = true
      }
      if (
        modifiedDetails.extraBuildings.filter((building) => building.area > 75)
          .length > 0
      ) {
        error = {
          message:
            error.message +
            ', area of an extra building must be equal or less than 75 m2 ',
        }
        shouldThrow = true
      }
      if (
        modifiedDetails.extraBuildings.filter((building) => building.area <= 0)
          .length > 0
      ) {
        error = {
          message:
            error.message + ', area of an extra building should be above 0 ',
        }
        shouldThrow = true
      }
      if (shouldThrow) {
        throw error
      }
    }

    const requestData = {
      originalProductId: modifiedDetails.productId,
      currentInsurer: modifiedDetails.currentInsurer,
    }
    const requestQuoteData = {
      street: modifiedDetails.street,
      city: modifiedDetails.city,
      zipCode: modifiedDetails.zipCode,
      floor: modifiedDetails.floor,
      livingSpace: modifiedDetails.livingSpace,
      householdSize: modifiedDetails.personsInHouseHold,
      safetyIncreasers: Array.isArray(modifiedDetails.safetyIncreasers)
        ? modifiedDetails.safetyIncreasers
        : modifiedDetails.safetyIncreasers.trim().split(','),

    }

    if (modifiedDetails.productType === "HOUSE") {
      requestData.incompleteHouseQuoteData = {
        ...requestQuoteData,
        isStudent: false,
        ancillaryArea: modifiedDetails.ancillaryArea,
        yearOfConstruction: modifiedDetails.yearOfConstruction,
        numberOfBathrooms: modifiedDetails.numberOfBathrooms,
        extraBuildings: modifiedDetails.extraBuildings,
        isSubleted: modifiedDetails.isSubleted,
      }
    } else {
      requestData.incompleteApartmentQuoteData = {
        ...requestQuoteData,
        subType: modifiedDetails.insuranceType,
        isStudent: modifiedDetails.isStudent,
      }
    }

    const response = yield call(
      api,
      config.insurance.createQuoteFromProduct,
      requestData,
      path,
    )

    yield put(createModifiedQuoteSuccess({ quoteId: response.data }))
  } catch (error) {
    yield [
      put(
        showNotification({
          message: error.message,
          header: 'Insurance',
        }),
      ),
      put(insuranceError()),
    ]
  }
}

function* activateQuoteFlow({ memberId, quoteId, request }) {
  try {
    const path = `${memberId}/quotes/${quoteId}/activate`

    yield call(
      api,
      config.insurance.activateQuote,
      request,
      path,
    )

    yield put(activateQuoteSuccess())
    window.location.reload() // Sorry
  } catch (error) {
    yield [
      put(
        showNotification({
          message: error.message,
          header: 'Insurance',
        }),
      ),
      put(insuranceError()),
    ]
  }
}

function* saveDateFlow({ memberId, insuranceId, date, changeType }) {
  try {
    switch (changeType) {
      case ACTIVATION_DATE: {
        const activationPath = `${memberId}/activate`
        yield call(
          api,
          config.insurance.setDate,
          { insuranceId, activationDate: date },
          activationPath,
        )
        yield put(saveActivationDateSuccess(date))
        break
      }
      case CANCELLATION_DATE: {
        const cancellationPath = `${memberId}/cancel`
        yield call(
          api,
          config.insurance.setDate,
          {
            memberId,
            insuranceId,
            cancellationDate: date,
          },
          cancellationPath,
        )
        yield put(saveCancellationDateSuccess(date))
        break
      }
      default:
        throw new Error(
          'Function: saveDateFlow ErrorMessage: Not valid changeType',
        )
    }
  } catch (error) {
    yield [
      put(
        showNotification({
          message: error.message,
          header: 'Insurance',
        }),
      ),
      put(insuranceError()),
    ]
  }
}

function* cancelRequestFlow({ id }) {
  try {
    const path = `${id}/sendCancellationEmail`
    yield call(api, config.insurance.cancel, null, path)
    yield [
      put(sendCancelRequestSuccess()),
      put(
        showNotification({
          message: 'Success',
          header: 'Send cancellation email to existing insurer',
          type: 'olive',
        }),
      ),
    ]
  } catch (error) {
    yield [
      put(
        showNotification({
          message: error.message,
          header: 'Insurance',
        }),
      ),
      put(insuranceError()),
    ]
  }
}

function* sendCertificateFlow({ data, memberId }) {
  try {
    const path = `${memberId}/certificate`
    yield call(api, config.insurance.cert, data, path)
    yield [
      put(sendCertificateSuccess()),
      put(
        showNotification({
          message: 'Success',
          header: 'Upload insurance certificate',
          type: 'olive',
        }),
      ),
    ]
  } catch (error) {
    yield [
      put(
        showNotification({
          message: error.message,
          header: 'Insurance',
        }),
      ),
      put(insuranceError()),
    ]
  }
}

function* changeCompanyStatusFlow({ value, memberId }) {
  try {
    const path = `${memberId}/insuredAtOtherCompany`
    yield call(
      api,
      config.insurance.companyStatus,
      { insuredAtOtherCompany: value },
      path,
    )
    yield [
      put(changeCompanyStatusSuccess(value)),
      put(
        showNotification({
          message: 'Success',
          header: '"Insured at other company" field changed',
          type: 'olive',
        }),
      ),
    ]
  } catch (error) {
    yield [
      put(
        showNotification({
          message: error.message,
          header: 'Insurance',
        }),
      ),
      put(insuranceError()),
    ]
  }
}

function* insuranceWatcher() {
  yield [
    takeLatest(INSURANCE_REQUESTING, requestFlow),
    takeLatest(SAVE_INSURANCE_DATE, saveDateFlow),
    takeLatest(SEND_CANCEL_REQUEST, cancelRequestFlow),
    takeLatest(SEND_CERTIFICATE, sendCertificateFlow),
    takeLatest(MEMBER_COMPANY_STATUS, changeCompanyStatusFlow),
    takeLatest(INSURANCES_LIST_REQUESTING, requestListofInsurancesFlow),
    takeLatest(MEMBER_CREATE_MODIFIED_QUOTE, createModifiedQuoteFlow),
    takeLatest(ACTIVATE_QUOTE, activateQuoteFlow),
  ]
}

export default insuranceWatcher
