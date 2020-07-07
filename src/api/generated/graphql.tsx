import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A String-representation of `java.time.YearMonth`, ex: `"2018-06"` */
  YearMonth: any
  /** An object-representation of `javax.money.MonetaryAmount`, ex: `{"amount": 100  "currency": "SEK"}` */
  MonetaryAmount: any
  /** A String-representation of `java.time.Instant`, ex: `"2018-06-11T20:08:30.123456"` */
  Instant: any
  /** A String-representation of `java.time.LocalDate`, ex:  `"2018-09-26"` */
  LocalDate: any
  /** A String-representation of `java.net.URL`, ex: "https://www.google.com/" */
  URL: any
  /** A String-representation of `java.time.LocalDateTIme`, ex: `"2018-06-11T20:08:30.123456"` */
  LocalDateTime: any
  /** A String-representation of `java.time.LocalTime` */
  LocalTime: any
  /** A String-representation of `java.time.ZonedDateTime`, ex: `"2018-09-21T14:17:46.536405+02:00[Europe/Stockholm]"` */
  ZonedDateTime: any
}

export type AccidentalDamageClaim = {
  __typename?: 'AccidentalDamageClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  currentBalance: MonetaryAmountV2
  totalBalance: MonetaryAmountV2
  chargeEstimation: AccountChargeEstimation
  entries: Array<AccountEntry>
}

export type AccountChargeEstimation = {
  __typename?: 'AccountChargeEstimation'
  subscription: MonetaryAmountV2
  discount: MonetaryAmountV2
  charge: MonetaryAmountV2
  discountCodes: Array<Scalars['String']>
}

export type AccountEntry = {
  __typename?: 'AccountEntry'
  id: Scalars['ID']
  type: AccountEntryType
  amount: MonetaryAmountV2
  fromDate: Scalars['LocalDate']
  reference: Scalars['String']
  source: Scalars['String']
  title?: Maybe<Scalars['String']>
  comment?: Maybe<Scalars['String']>
  failedAt?: Maybe<Scalars['Instant']>
  chargedAt?: Maybe<Scalars['Instant']>
}

export type AccountEntryInput = {
  type: AccountEntryType
  amount: Scalars['MonetaryAmount']
  fromDate: Scalars['LocalDate']
  reference: Scalars['String']
  source: Scalars['String']
  title?: Maybe<Scalars['String']>
  comment?: Maybe<Scalars['String']>
}

export enum AccountEntryType {
  Correction = 'CORRECTION',
  Subscription = 'SUBSCRIPTION',
  Campaign = 'CAMPAIGN',
  Payout = 'PAYOUT',
  Charge = 'CHARGE',
  ReferralDiscount = 'REFERRAL_DISCOUNT',
  FreeMonthDiscount = 'FREE_MONTH_DISCOUNT',
  PercentageMonthDiscount = 'PERCENTAGE_MONTH_DISCOUNT',
  BundleDiscountCostDeduction = 'BUNDLE_DISCOUNT_COST_DEDUCTION',
  BundleDiscountPercentageDeduction = 'BUNDLE_DISCOUNT_PERCENTAGE_DEDUCTION',
  Loss = 'LOSS',
}

export type ActivatePendingAgreementInput = {
  pendingAgreementId: Scalars['ID']
  fromDate: Scalars['LocalDate']
}

export type Address = {
  __typename?: 'Address'
  street: Scalars['String']
  postalCode: Scalars['String']
  city?: Maybe<Scalars['String']>
}

export type Agreement =
  | SwedishApartment
  | SwedishHouse
  | NorwegianHomeContent
  | NorwegianTravel

export type AgreementCore = {
  id: Scalars['ID']
  fromDate?: Maybe<Scalars['LocalDate']>
  toDate?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
}

export enum AgreementStatus {
  Pending = 'PENDING',
  ActiveInFuture = 'ACTIVE_IN_FUTURE',
  Active = 'ACTIVE',
  ActiveInPast = 'ACTIVE_IN_PAST',
  Terminated = 'TERMINATED',
}

export type ApartmentQuoteData = IQuoteData & {
  __typename?: 'ApartmentQuoteData'
  id: Scalars['ID']
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  subType?: Maybe<ApartmentSubType>
}

export type ApartmentQuoteDataInput = {
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  subType?: Maybe<ApartmentSubType>
}

export type ApartmentQuoteInput = {
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  subType?: Maybe<ApartmentSubType>
}

export enum ApartmentSubType {
  Brf = 'BRF',
  Rent = 'RENT',
  StudentBrf = 'STUDENT_BRF',
  StudentRent = 'STUDENT_RENT',
}

export type ApplianceClaim = {
  __typename?: 'ApplianceClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
}

export type AssaultClaim = {
  __typename?: 'AssaultClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  policeReport?: Maybe<Scalars['String']>
}

export type AssignVoucherPercentageDiscount = {
  partnerId: Scalars['String']
  numberOfMonths: Scalars['Int']
  percentageDiscount: Scalars['Float']
  code: Scalars['String']
  validFrom?: Maybe<Scalars['Instant']>
  validUntil?: Maybe<Scalars['Instant']>
}

export type BurglaryClaim = {
  __typename?: 'BurglaryClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export type CampaignFilter = {
  code?: Maybe<Scalars['String']>
  partnerId?: Maybe<Scalars['String']>
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
}

export type CampaignOwnerPartner = {
  __typename?: 'CampaignOwnerPartner'
  partnerId: Scalars['String']
}

export type CanValuateClaimItem = {
  __typename?: 'CanValuateClaimItem'
  canValuate: Scalars['Boolean']
  typeOfContract?: Maybe<TypeOfContract>
  itemFamily?: Maybe<Scalars['String']>
  itemTypeId?: Maybe<Scalars['ID']>
}

export type ChangeFromDateInput = {
  newFromDate: Scalars['LocalDate']
}

export type ChangeTerminationDateInput = {
  newTerminationDate: Scalars['LocalDate']
}

export type ChangeToDateInput = {
  newToDate: Scalars['LocalDate']
}

export enum ChargeStatus {
  Initiated = 'INITIATED',
  WaitingForSubscription = 'WAITING_FOR_SUBSCRIPTION',
  SchedulingSubscription = 'SCHEDULING_SUBSCRIPTION',
  ScheduleSubscriptionFailed = 'SCHEDULE_SUBSCRIPTION_FAILED',
  SubscriptionScheduledAndWaitingForApproval = 'SUBSCRIPTION_SCHEDULED_AND_WAITING_FOR_APPROVAL',
  ApprovedForCharge = 'APPROVED_FOR_CHARGE',
  SchedulingCharge = 'SCHEDULING_CHARGE',
  ChargeRequesting = 'CHARGE_REQUESTING',
  ChargeRequestFailed = 'CHARGE_REQUEST_FAILED',
  ChargeInitiated = 'CHARGE_INITIATED',
  ChargeFailed = 'CHARGE_FAILED',
  ChargeCompleted = 'CHARGE_COMPLETED',
}

export type ChatMessage = {
  __typename?: 'ChatMessage'
  globalId: Scalars['ID']
  author?: Maybe<Scalars['String']>
  fromId: Scalars['String']
  timestamp?: Maybe<Scalars['Instant']>
  messageBodyJsonString: Scalars['String']
}

export type Claim = {
  __typename?: 'Claim'
  id?: Maybe<Scalars['ID']>
  member?: Maybe<Member>
  recordingUrl?: Maybe<Scalars['String']>
  state?: Maybe<ClaimState>
  type?: Maybe<ClaimType>
  reserves?: Maybe<Scalars['MonetaryAmount']>
  registrationDate?: Maybe<Scalars['Instant']>
  notes?: Maybe<Array<Maybe<ClaimNote>>>
  transcriptions?: Maybe<Array<Maybe<ClaimTranscription>>>
  payments?: Maybe<Array<Maybe<ClaimPayment>>>
  events?: Maybe<Array<Maybe<ClaimEvent>>>
  coveringEmployee: Scalars['Boolean']
  claimFiles: Array<ClaimFileUpload>
  contract?: Maybe<Contract>
}

export type ClaimEvent = {
  __typename?: 'ClaimEvent'
  text?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Instant']>
}

export type ClaimFileUpload = {
  __typename?: 'ClaimFileUpload'
  claimFileId?: Maybe<Scalars['ID']>
  fileUploadUrl?: Maybe<Scalars['URL']>
  uploadedAt?: Maybe<Scalars['Instant']>
  claimId?: Maybe<Scalars['ID']>
  category?: Maybe<Scalars['String']>
  contentType?: Maybe<Scalars['String']>
}

export type ClaimInformationInput = {
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
  ticket?: Maybe<Scalars['String']>
}

export type ClaimItem = {
  __typename?: 'ClaimItem'
  id: Scalars['ID']
  itemFamily: ItemFamily
  itemType: ItemType
  itemBrand?: Maybe<ItemBrand>
  itemModel?: Maybe<ItemModel>
  itemCompany?: Maybe<ItemCompany>
  dateOfPurchase?: Maybe<Scalars['LocalDate']>
  purchasePrice?: Maybe<MonetaryAmountV2>
  valuation?: Maybe<MonetaryAmountV2>
  note?: Maybe<Scalars['String']>
}

export type ClaimItemValuation = {
  __typename?: 'ClaimItemValuation'
  depreciatedValue?: Maybe<MonetaryAmountV2>
  valuationRule?: Maybe<ValuationRule>
}

export type ClaimNote = {
  __typename?: 'ClaimNote'
  text?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDateTime']>
}

export type ClaimNoteInput = {
  text: Scalars['String']
}

export type ClaimPayment = {
  __typename?: 'ClaimPayment'
  id?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['MonetaryAmount']>
  deductible?: Maybe<Scalars['MonetaryAmount']>
  note?: Maybe<Scalars['String']>
  type?: Maybe<ClaimPaymentType>
  timestamp?: Maybe<Scalars['Instant']>
  exGratia?: Maybe<Scalars['Boolean']>
  transaction?: Maybe<Transaction>
  status?: Maybe<ClaimPaymentStatus>
}

export type ClaimPaymentInput = {
  amount: Scalars['MonetaryAmount']
  deductible: Scalars['MonetaryAmount']
  note: Scalars['String']
  type: ClaimPaymentType
  exGratia: Scalars['Boolean']
  sanctionListSkipped: Scalars['Boolean']
}

export enum ClaimPaymentStatus {
  Prepared = 'PREPARED',
  Initiated = 'INITIATED',
  SanctionListHit = 'SANCTION_LIST_HIT',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
}

export enum ClaimPaymentType {
  Manual = 'Manual',
  Automatic = 'Automatic',
}

export enum ClaimSource {
  App = 'APP',
  Email = 'EMAIL',
  Intercom = 'INTERCOM',
  Phone = 'PHONE',
  Chat = 'CHAT',
}

export enum ClaimState {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Reopened = 'REOPENED',
}

export type ClaimTranscription = {
  __typename?: 'ClaimTranscription'
  text: Scalars['String']
  confidenceScore: Scalars['Float']
  languageCode: Scalars['String']
}

export type ClaimType =
  | TheftClaim
  | AccidentalDamageClaim
  | AssaultClaim
  | WaterDamageClaim
  | TravelAccidentClaim
  | LuggageDelayClaim
  | NotCoveredClaim
  | FireDamageClaim
  | ConfirmedFraudClaim
  | LiabilityClaim
  | ApplianceClaim
  | LegalProtectionClaim
  | WaterDamageBathroomClaim
  | WaterDamageKitchenClaim
  | BurglaryClaim
  | FloodingClaim
  | EarthquakeClaim
  | InstallationsClaim
  | SnowPressureClaim
  | StormDamageClaim
  | VerminAndPestsClaim
  | TestClaim

export enum ClaimTypes {
  TheftClaim = 'TheftClaim',
  AccidentalDamageClaim = 'AccidentalDamageClaim',
  AssaultClaim = 'AssaultClaim',
  WaterDamageClaim = 'WaterDamageClaim',
  TravelAccidentClaim = 'TravelAccidentClaim',
  LuggageDelayClaim = 'LuggageDelayClaim',
  NotCoveredClaim = 'NotCoveredClaim',
  FireDamageClaim = 'FireDamageClaim',
  ApplianceClaim = 'ApplianceClaim',
  ConfirmedFraudClaim = 'ConfirmedFraudClaim',
  LiabilityClaim = 'LiabilityClaim',
  LegalProtectionClaim = 'LegalProtectionClaim',
  WaterDamageBathroomClaim = 'WaterDamageBathroomClaim',
  WaterDamageKitchenClaim = 'WaterDamageKitchenClaim',
  BurglaryClaim = 'BurglaryClaim',
  FloodingClaim = 'FloodingClaim',
  EarthquakeClaim = 'EarthquakeClaim',
  InstallationsClaim = 'InstallationsClaim',
  SnowPressureClaim = 'SnowPressureClaim',
  StormDamageClaim = 'StormDamageClaim',
  VerminAndPestsClaim = 'VerminAndPestsClaim',
  TestClaim = 'TestClaim',
}

export type ConfirmedFraudClaim = {
  __typename?: 'ConfirmedFraudClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type Contract = {
  __typename?: 'Contract'
  id: Scalars['ID']
  holderMemberId: Scalars['ID']
  holderFirstName?: Maybe<Scalars['String']>
  holderLastName?: Maybe<Scalars['String']>
  switchedFrom?: Maybe<Scalars['String']>
  masterInception?: Maybe<Scalars['LocalDate']>
  status: ContractStatus
  typeOfContract: TypeOfContract
  isTerminated: Scalars['Boolean']
  terminationDate?: Maybe<Scalars['LocalDate']>
  currentAgreementId: Scalars['ID']
  hasPendingAgreement: Scalars['Boolean']
  agreements: Array<Agreement>
  hasQueuedRenewal: Scalars['Boolean']
  renewal?: Maybe<Renewal>
  preferredCurrency: Scalars['String']
  market: Market
  signSource?: Maybe<SignSource>
  contractTypeName: Scalars['String']
  createdAt: Scalars['Instant']
}

export type ContractMarketInfo = {
  __typename?: 'ContractMarketInfo'
  market: Market
  preferredCurrency: Scalars['String']
}

export enum ContractStatus {
  Pending = 'PENDING',
  ActiveInFuture = 'ACTIVE_IN_FUTURE',
  ActiveInFutureAndTerminatedInFuture = 'ACTIVE_IN_FUTURE_AND_TERMINATED_IN_FUTURE',
  Active = 'ACTIVE',
  TerminatedToday = 'TERMINATED_TODAY',
  TerminatedInFuture = 'TERMINATED_IN_FUTURE',
  Terminated = 'TERMINATED',
}

export type CostDeduction = {
  __typename?: 'CostDeduction'
  amount?: Maybe<Scalars['MonetaryAmount']>
}

export type CreateNorwegianGripenInput = {
  baseFactorString?: Maybe<Scalars['String']>
  factors: Array<NorwegianGripenFactorInput>
}

export type DashboardNumbers = {
  __typename?: 'DashboardNumbers'
  numberOfClaims: Scalars['Int']
  numberOfQuestions: Scalars['Int']
}

export type Debt = {
  __typename?: 'Debt'
  paymentDefaults?: Maybe<Array<Maybe<PaymentDefault>>>
  debtDate?: Maybe<Scalars['LocalDate']>
  totalAmountPublicDebt?: Maybe<Scalars['MonetaryAmount']>
  numberPublicDebts?: Maybe<Scalars['Int']>
  totalAmountPrivateDebt?: Maybe<Scalars['MonetaryAmount']>
  numberPrivateDebts?: Maybe<Scalars['Int']>
  totalAmountDebt?: Maybe<Scalars['MonetaryAmount']>
  checkedAt?: Maybe<Scalars['Instant']>
  fromDateTime?: Maybe<Scalars['LocalDateTime']>
}

export type DirectDebitStatus = {
  __typename?: 'DirectDebitStatus'
  activated?: Maybe<Scalars['Boolean']>
}

export type EarthquakeClaim = {
  __typename?: 'EarthquakeClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type ExtraBuilding = {
  __typename?: 'ExtraBuilding'
  id?: Maybe<Scalars['ID']>
  type: ExtraBuildingType
  area: Scalars['Int']
  hasWaterConnected: Scalars['Boolean']
  displayName?: Maybe<Scalars['String']>
}

export type ExtraBuildingInput = {
  type: Scalars['String']
  area: Scalars['Int']
  hasWaterConnected: Scalars['Boolean']
  displayName?: Maybe<Scalars['String']>
}

export enum ExtraBuildingType {
  Garage = 'GARAGE',
  Carport = 'CARPORT',
  Shed = 'SHED',
  Storehouse = 'STOREHOUSE',
  Friggebod = 'FRIGGEBOD',
  Attefall = 'ATTEFALL',
  Outhouse = 'OUTHOUSE',
  Guesthouse = 'GUESTHOUSE',
  Gazebo = 'GAZEBO',
  Greenhouse = 'GREENHOUSE',
  Sauna = 'SAUNA',
  Barn = 'BARN',
  Boathouse = 'BOATHOUSE',
  Other = 'OTHER',
}

export type FileUpload = {
  __typename?: 'FileUpload'
  fileUploadUrl?: Maybe<Scalars['URL']>
  timestamp?: Maybe<Scalars['Instant']>
  mimeType?: Maybe<Scalars['String']>
  memberId?: Maybe<Scalars['ID']>
}

export type FireDamageClaim = {
  __typename?: 'FireDamageClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
}

export enum Flag {
  Green = 'GREEN',
  Amber = 'AMBER',
  Red = 'RED',
}

export type FloodingClaim = {
  __typename?: 'FloodingClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type FreeMonths = {
  __typename?: 'FreeMonths'
  numberOfMonths?: Maybe<Scalars['Int']>
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export type GetValuationInput = {
  purchasePrice: Scalars['MonetaryAmount']
  itemFamilyId: Scalars['String']
  itemTypeId?: Maybe<Scalars['ID']>
  typeOfContract: TypeOfContract
  purchaseDate: Scalars['LocalDate']
  baseDate?: Maybe<Scalars['LocalDate']>
}

export type HouseQuoteData = IQuoteData & {
  __typename?: 'HouseQuoteData'
  id: Scalars['ID']
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillaryArea?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  extraBuildings: Array<ExtraBuilding>
  isSubleted?: Maybe<Scalars['Boolean']>
}

export type HouseQuoteDataInput = {
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillaryArea?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  extraBuildings: Array<ExtraBuildingInput>
  isSubleted?: Maybe<Scalars['Boolean']>
}

export type HouseQuoteInput = {
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillaryArea?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  extraBuildings?: Maybe<Array<ExtraBuildingInput>>
  isSubleted?: Maybe<Scalars['Boolean']>
}

export type Incentive =
  | MonthlyPercentageDiscountFixedPeriod
  | FreeMonths
  | CostDeduction
  | NoDiscount
  | IndefinitePercentageDiscount

export enum IncentiveType {
  CostDeduction = 'COST_DEDUCTION',
  FreeMonths = 'FREE_MONTHS',
  NoDiscount = 'NO_DISCOUNT',
  MonthlyPercentageDiscountFixedPeriod = 'MONTHLY_PERCENTAGE_DISCOUNT_FIXED_PERIOD',
  IndefinitePercentageDiscount = 'INDEFINITE_PERCENTAGE_DISCOUNT',
}

export type IndefinitePercentageDiscount = {
  __typename?: 'IndefinitePercentageDiscount'
  percentageDiscount?: Maybe<Scalars['Float']>
}

export type InsertItemCategoriesInput = {
  itemCategoriesString: Scalars['String']
}

export type InsertValuationRulesInput = {
  valuationRulesString: Scalars['String']
}

export type InstallationsClaim = {
  __typename?: 'InstallationsClaim'
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
}

export type IQuoteData = {
  id: Scalars['ID']
  householdSize?: Maybe<Scalars['Int']>
}

export type ItemBrand = ItemCategoryCore & {
  __typename?: 'ItemBrand'
  id: Scalars['ID']
  nextKind?: Maybe<ItemCategoryKind>
  displayName: Scalars['String']
  searchTerms: Scalars['String']
  companyName: Scalars['String']
}

export type ItemCategory =
  | ItemFamily
  | ItemType
  | ItemBrand
  | ItemModel
  | ItemCompany

export type ItemCategoryCore = {
  id: Scalars['ID']
  nextKind?: Maybe<ItemCategoryKind>
  displayName: Scalars['String']
  searchTerms: Scalars['String']
}

export enum ItemCategoryKind {
  Family = 'FAMILY',
  Type = 'TYPE',
  Brand = 'BRAND',
  Model = 'MODEL',
  Company = 'COMPANY',
}

export type ItemCompany = ItemCategoryCore & {
  __typename?: 'ItemCompany'
  id: Scalars['ID']
  nextKind?: Maybe<ItemCategoryKind>
  displayName: Scalars['String']
  searchTerms: Scalars['String']
}

export type ItemFamily = ItemCategoryCore & {
  __typename?: 'ItemFamily'
  id: Scalars['ID']
  nextKind?: Maybe<ItemCategoryKind>
  displayName: Scalars['String']
  searchTerms: Scalars['String']
}

export type ItemModel = ItemCategoryCore & {
  __typename?: 'ItemModel'
  id: Scalars['ID']
  nextKind?: Maybe<ItemCategoryKind>
  displayName: Scalars['String']
  searchTerms: Scalars['String']
}

export type ItemType = ItemCategoryCore & {
  __typename?: 'ItemType'
  id: Scalars['ID']
  nextKind?: Maybe<ItemCategoryKind>
  displayName: Scalars['String']
  searchTerms: Scalars['String']
}

export type LegalProtectionClaim = {
  __typename?: 'LegalProtectionClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type LiabilityClaim = {
  __typename?: 'LiabilityClaim'
  date?: Maybe<Scalars['LocalDate']>
  location?: Maybe<Scalars['String']>
}

export type LuggageDelayClaim = {
  __typename?: 'LuggageDelayClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  ticket?: Maybe<Scalars['String']>
}

export enum Market {
  Sweden = 'SWEDEN',
  Norway = 'NORWAY',
}

export type Member = {
  __typename?: 'Member'
  memberId: Scalars['ID']
  signedOn?: Maybe<Scalars['Instant']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  personalNumber?: Maybe<Scalars['String']>
  gender?: Maybe<Gender>
  address?: Maybe<Scalars['String']>
  postalNumber?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  transactions?: Maybe<Array<Maybe<Transaction>>>
  directDebitStatus?: Maybe<DirectDebitStatus>
  monthlySubscription?: Maybe<MonthlySubscription>
  fraudulentStatus?: Maybe<Scalars['String']>
  fraudulentStatusDescription?: Maybe<Scalars['String']>
  sanctionStatus?: Maybe<SanctionStatus>
  account?: Maybe<Account>
  fileUploads: Array<FileUpload>
  person?: Maybe<Person>
  numberFailedCharges?: Maybe<NumberFailedCharges>
  totalNumberOfClaims: Scalars['Int']
  quotes: Array<Quote>
  contracts: Array<Contract>
  contractMarketInfo?: Maybe<ContractMarketInfo>
}

export type MemberMonthlySubscriptionArgs = {
  month: Scalars['YearMonth']
}

export type MemberChargeApproval = {
  memberId: Scalars['ID']
  amount: Scalars['MonetaryAmount']
}

export type MonetaryAmountV2 = {
  __typename?: 'MonetaryAmountV2'
  amount: Scalars['String']
  currency: Scalars['String']
}

export type MonthlyPercentageDiscountFixedPeriod = {
  __typename?: 'MonthlyPercentageDiscountFixedPeriod'
  numberOfMonths?: Maybe<Scalars['Int']>
  percentage?: Maybe<Scalars['Float']>
}

export type MonthlySubscription = {
  __typename?: 'MonthlySubscription'
  amount?: Maybe<Scalars['MonetaryAmount']>
  member?: Maybe<Member>
}

export type MutationType = {
  __typename?: 'MutationType'
  chargeMember?: Maybe<Member>
  addAccountEntryToMember: Member
  approveMemberCharge?: Maybe<Scalars['Boolean']>
  createPaymentCompletionLink: PaymentCompletionResponse
  updateClaimState?: Maybe<Claim>
  createClaim?: Maybe<Scalars['ID']>
  addClaimNote?: Maybe<Claim>
  createClaimPayment?: Maybe<Claim>
  setClaimType?: Maybe<Claim>
  setClaimInformation?: Maybe<Claim>
  updateReserve?: Maybe<Claim>
  setCoveringEmployee?: Maybe<Claim>
  createTicket?: Maybe<Scalars['ID']>
  changeTicketDescription?: Maybe<Scalars['ID']>
  assignTicketToTeamMember?: Maybe<Scalars['ID']>
  changeTicketStatus?: Maybe<Scalars['ID']>
  changeTicketReminder?: Maybe<Scalars['ID']>
  changeTicketPriority?: Maybe<Scalars['ID']>
  whitelistMember?: Maybe<Scalars['Boolean']>
  markClaimFileAsDeleted?: Maybe<Scalars['Boolean']>
  backfillSubscriptions: Member
  setClaimFileCategory?: Maybe<Scalars['String']>
  activateQuote: Quote
  addAgreementFromQuote: Quote
  /** Creates a quote from a product and returns the quote id */
  createQuoteFromProduct: Quote
  createQuoteFromAgreement: Quote
  updateQuote: Quote
  markSwitchableSwitcherEmailAsReminded: Scalars['Boolean']
  terminateContract: Contract
  activatePendingAgreement: Contract
  changeTerminationDate: Contract
  revertTermination: Contract
  createNorwegianGripenPriceEngine: Scalars['Boolean']
  addNorwegianPostalCodes: Scalars['Boolean']
  changeToDate: Scalars['ID']
  changeFromDate: Scalars['ID']
  regenerateCertificate: Scalars['ID']
  sendMessage: SendMessageResponse
  markQuestionAsResolved: Scalars['Boolean']
  answerQuestion: Scalars['Boolean']
  createQuoteForNewContract: Quote
  signQuoteForNewContract: Quote
  upsertItemCompany: Scalars['ID']
  upsertItemType: Scalars['ID']
  upsertItemBrand: Scalars['ID']
  upsertItemModel: Scalars['ID']
  upsertClaimItem: Scalars['ID']
  deleteClaimItem?: Maybe<Scalars['ID']>
  insertItemCategories: Array<Scalars['Boolean']>
  insertValuationRules: Array<Scalars['Boolean']>
  upsertValuationRule: Scalars['ID']
  assignCampaignToPartnerPercentageDiscount: Scalars['Boolean']
  setContractForClaim: Scalars['Boolean']
}

export type MutationTypeChargeMemberArgs = {
  id: Scalars['ID']
  amount: Scalars['MonetaryAmount']
}

export type MutationTypeAddAccountEntryToMemberArgs = {
  memberId: Scalars['ID']
  accountEntry: AccountEntryInput
}

export type MutationTypeApproveMemberChargeArgs = {
  approvals: Array<MemberChargeApproval>
}

export type MutationTypeCreatePaymentCompletionLinkArgs = {
  memberId: Scalars['ID']
}

export type MutationTypeUpdateClaimStateArgs = {
  id: Scalars['ID']
  state: ClaimState
}

export type MutationTypeCreateClaimArgs = {
  memberId: Scalars['ID']
  date: Scalars['LocalDateTime']
  source: ClaimSource
}

export type MutationTypeAddClaimNoteArgs = {
  id: Scalars['ID']
  note: ClaimNoteInput
}

export type MutationTypeCreateClaimPaymentArgs = {
  id: Scalars['ID']
  payment: ClaimPaymentInput
}

export type MutationTypeSetClaimTypeArgs = {
  id: Scalars['ID']
  type: ClaimTypes
}

export type MutationTypeSetClaimInformationArgs = {
  id: Scalars['ID']
  information: ClaimInformationInput
}

export type MutationTypeUpdateReserveArgs = {
  id: Scalars['ID']
  amount: Scalars['MonetaryAmount']
}

export type MutationTypeSetCoveringEmployeeArgs = {
  id: Scalars['ID']
  coveringEmployee: Scalars['Boolean']
}

export type MutationTypeCreateTicketArgs = {
  ticket?: Maybe<TicketInput>
}

export type MutationTypeChangeTicketDescriptionArgs = {
  ticketId: Scalars['ID']
  newDescription?: Maybe<Scalars['String']>
}

export type MutationTypeAssignTicketToTeamMemberArgs = {
  ticketId: Scalars['ID']
  teamMemberId: Scalars['ID']
}

export type MutationTypeChangeTicketStatusArgs = {
  ticketId: Scalars['ID']
  newStatus?: Maybe<TicketStatus>
}

export type MutationTypeChangeTicketReminderArgs = {
  ticketId: Scalars['ID']
  newReminder?: Maybe<RemindNotification>
}

export type MutationTypeChangeTicketPriorityArgs = {
  ticketId: Scalars['ID']
  newPriority?: Maybe<Scalars['Float']>
}

export type MutationTypeWhitelistMemberArgs = {
  memberId: Scalars['ID']
}

export type MutationTypeMarkClaimFileAsDeletedArgs = {
  claimId: Scalars['ID']
  claimFileId: Scalars['ID']
}

export type MutationTypeBackfillSubscriptionsArgs = {
  memberId: Scalars['ID']
}

export type MutationTypeSetClaimFileCategoryArgs = {
  claimId: Scalars['ID']
  claimFileId: Scalars['ID']
  category?: Maybe<Scalars['String']>
}

export type MutationTypeActivateQuoteArgs = {
  id: Scalars['ID']
  activationDate: Scalars['LocalDate']
  terminationDate?: Maybe<Scalars['LocalDate']>
}

export type MutationTypeAddAgreementFromQuoteArgs = {
  id: Scalars['ID']
  contractId: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  previousAgreementActiveTo?: Maybe<Scalars['LocalDate']>
}

export type MutationTypeCreateQuoteFromProductArgs = {
  memberId: Scalars['ID']
  quoteData: QuoteFromProductInput
}

export type MutationTypeCreateQuoteFromAgreementArgs = {
  agreementId: Scalars['ID']
  memberId: Scalars['ID']
}

export type MutationTypeUpdateQuoteArgs = {
  quoteId: Scalars['ID']
  quoteData: QuoteInput
  bypassUnderwritingGuidelines?: Maybe<Scalars['Boolean']>
}

export type MutationTypeMarkSwitchableSwitcherEmailAsRemindedArgs = {
  id: Scalars['ID']
}

export type MutationTypeTerminateContractArgs = {
  contractId: Scalars['ID']
  request?: Maybe<TerminateContractInput>
}

export type MutationTypeActivatePendingAgreementArgs = {
  contractId: Scalars['ID']
  request?: Maybe<ActivatePendingAgreementInput>
}

export type MutationTypeChangeTerminationDateArgs = {
  contractId: Scalars['ID']
  request?: Maybe<ChangeTerminationDateInput>
}

export type MutationTypeRevertTerminationArgs = {
  contractId: Scalars['ID']
}

export type MutationTypeCreateNorwegianGripenPriceEngineArgs = {
  request?: Maybe<CreateNorwegianGripenInput>
}

export type MutationTypeAddNorwegianPostalCodesArgs = {
  postalCodesString?: Maybe<Scalars['String']>
}

export type MutationTypeChangeToDateArgs = {
  agreementId: Scalars['ID']
  request?: Maybe<ChangeToDateInput>
}

export type MutationTypeChangeFromDateArgs = {
  agreementId: Scalars['ID']
  request?: Maybe<ChangeFromDateInput>
}

export type MutationTypeRegenerateCertificateArgs = {
  agreementId: Scalars['ID']
}

export type MutationTypeSendMessageArgs = {
  input: SendMessageInput
}

export type MutationTypeMarkQuestionAsResolvedArgs = {
  memberId: Scalars['ID']
}

export type MutationTypeAnswerQuestionArgs = {
  memberId: Scalars['ID']
  answer: Scalars['String']
}

export type MutationTypeCreateQuoteForNewContractArgs = {
  memberId: Scalars['ID']
  quoteInput: QuoteInput
  bypassUnderwritingGuidelines: Scalars['Boolean']
}

export type MutationTypeSignQuoteForNewContractArgs = {
  quoteId: Scalars['ID']
  activationDate?: Maybe<Scalars['LocalDate']>
}

export type MutationTypeUpsertItemCompanyArgs = {
  request?: Maybe<UpsertItemCompanyInput>
}

export type MutationTypeUpsertItemTypeArgs = {
  request?: Maybe<UpsertItemTypeInput>
}

export type MutationTypeUpsertItemBrandArgs = {
  request?: Maybe<UpsertItemBrandInput>
}

export type MutationTypeUpsertItemModelArgs = {
  request?: Maybe<UpsertItemModelInput>
}

export type MutationTypeUpsertClaimItemArgs = {
  request?: Maybe<UpsertClaimItemInput>
}

export type MutationTypeDeleteClaimItemArgs = {
  claimItemId: Scalars['ID']
}

export type MutationTypeInsertItemCategoriesArgs = {
  request?: Maybe<InsertItemCategoriesInput>
}

export type MutationTypeInsertValuationRulesArgs = {
  request?: Maybe<InsertValuationRulesInput>
}

export type MutationTypeUpsertValuationRuleArgs = {
  request?: Maybe<UpsertValuationRuleInput>
}

export type MutationTypeAssignCampaignToPartnerPercentageDiscountArgs = {
  request?: Maybe<AssignVoucherPercentageDiscount>
}

export type MutationTypeSetContractForClaimArgs = {
  request: SetContractForClaim
}

export type NoDiscount = {
  __typename?: 'NoDiscount'
  _?: Maybe<Scalars['Boolean']>
}

export type NorwegianGripenFactorInput = {
  factorType: NorwegianGripenFactorType
  factorString: Scalars['String']
}

export enum NorwegianGripenFactorType {
  Age = 'AGE',
  CentralityGroup = 'CENTRALITY_GROUP',
  EconomyOfMunicipality = 'ECONOMY_OF_MUNICIPALITY',
  NumberOfPeople = 'NUMBER_OF_PEOPLE',
  SquareMeters = 'SQUARE_METERS',
  HouseholdType = 'HOUSEHOLD_TYPE',
  Deductible = 'DEDUCTIBLE',
}

export type NorwegianHomeContent = AgreementCore & {
  __typename?: 'NorwegianHomeContent'
  id: Scalars['ID']
  fromDate?: Maybe<Scalars['LocalDate']>
  toDate?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  lineOfBusiness: NorwegianHomeContentLineOfBusiness
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
}

export enum NorwegianHomeContentLineOfBusiness {
  Rent = 'RENT',
  Own = 'OWN',
  YouthRent = 'YOUTH_RENT',
  YouthOwn = 'YOUTH_OWN',
}

export type NorwegianHomeContentQuoteData = IQuoteData & {
  __typename?: 'NorwegianHomeContentQuoteData'
  id: Scalars['ID']
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  subType?: Maybe<NorwegianHomeContentLineOfBusiness>
}

export type NorwegianHomeContentQuoteDataInput = {
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  subType?: Maybe<NorwegianHomeContentLineOfBusiness>
}

export type NorwegianHomeContentQuoteInput = {
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  subType?: Maybe<NorwegianHomeContentLineOfBusiness>
}

export type NorwegianTravel = AgreementCore & {
  __typename?: 'NorwegianTravel'
  id: Scalars['ID']
  fromDate?: Maybe<Scalars['LocalDate']>
  toDate?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  lineOfBusiness: NorwegianTravelLineOfBusiness
  numberCoInsured: Scalars['Int']
}

export enum NorwegianTravelLineOfBusiness {
  Regular = 'REGULAR',
  Youth = 'YOUTH',
}

export type NorwegianTravelQuoteData = IQuoteData & {
  __typename?: 'NorwegianTravelQuoteData'
  id: Scalars['ID']
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  subType?: Maybe<NorwegianTravelLineOfBusiness>
}

export type NorwegianTravelQuoteDataInput = {
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  subType?: Maybe<NorwegianTravelLineOfBusiness>
}

export type NorwegianTravelQuoteInput = {
  householdSize?: Maybe<Scalars['Int']>
  subType?: Maybe<NorwegianTravelLineOfBusiness>
}

export type NotCoveredClaim = {
  __typename?: 'NotCoveredClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type NumberFailedCharges = {
  __typename?: 'NumberFailedCharges'
  numberFailedCharges: Scalars['Int']
  lastFailedChargeAt?: Maybe<Scalars['Instant']>
}

export type PaymentCompletionResponse = {
  __typename?: 'PaymentCompletionResponse'
  url: Scalars['String']
}

export type PaymentDefault = {
  __typename?: 'PaymentDefault'
  year?: Maybe<Scalars['Int']>
  week?: Maybe<Scalars['Int']>
  paymentDefaultType?: Maybe<Scalars['String']>
  paymentDefaultTypeText?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['MonetaryAmount']>
  caseId?: Maybe<Scalars['String']>
  claimant?: Maybe<Scalars['String']>
}

export type Person = {
  __typename?: 'Person'
  debtFlag?: Maybe<Flag>
  debt?: Maybe<Debt>
  whitelisted?: Maybe<Whitelisted>
  status?: Maybe<PersonStatus>
}

export type PersonStatus = {
  __typename?: 'PersonStatus'
  flag?: Maybe<Flag>
  whitelisted?: Maybe<Scalars['Boolean']>
}

export type QueryType = {
  __typename?: 'QueryType'
  monthlyPayments?: Maybe<Array<Maybe<MonthlySubscription>>>
  member?: Maybe<Member>
  claim?: Maybe<Claim>
  paymentSchedule?: Maybe<Array<Maybe<SchedulerState>>>
  ticket?: Maybe<Ticket>
  getFullTicketHistory?: Maybe<TicketHistory>
  tickets: Array<Ticket>
  me?: Maybe<Scalars['String']>
  switchableSwitcherEmails: Array<SwitchableSwitcherEmail>
  messageHistory: Array<ChatMessage>
  questionGroups: Array<QuestionGroup>
  itemCategories: Array<ItemCategory>
  claimItems: Array<ClaimItem>
  findPartnerCampaigns: Array<VoucherCampaign>
  getPartnerCampaignOwners: Array<CampaignOwnerPartner>
  dashboardNumbers?: Maybe<DashboardNumbers>
  getClaimItemValuation: ClaimItemValuation
  canValuateClaimItem?: Maybe<CanValuateClaimItem>
}

export type QueryTypeMonthlyPaymentsArgs = {
  month: Scalars['YearMonth']
}

export type QueryTypeMemberArgs = {
  id: Scalars['ID']
}

export type QueryTypeClaimArgs = {
  id: Scalars['ID']
}

export type QueryTypePaymentScheduleArgs = {
  status: ChargeStatus
}

export type QueryTypeTicketArgs = {
  id: Scalars['ID']
}

export type QueryTypeGetFullTicketHistoryArgs = {
  id: Scalars['ID']
}

export type QueryTypeTicketsArgs = {
  resolved?: Maybe<Scalars['Boolean']>
}

export type QueryTypeMessageHistoryArgs = {
  memberId: Scalars['ID']
}

export type QueryTypeItemCategoriesArgs = {
  kind: ItemCategoryKind
  parentId?: Maybe<Scalars['ID']>
}

export type QueryTypeClaimItemsArgs = {
  claimId: Scalars['ID']
}

export type QueryTypeFindPartnerCampaignsArgs = {
  input: CampaignFilter
}

export type QueryTypeGetClaimItemValuationArgs = {
  request?: Maybe<GetValuationInput>
}

export type QueryTypeCanValuateClaimItemArgs = {
  typeOfContract: TypeOfContract
  itemFamilyId: Scalars['String']
  itemTypeId?: Maybe<Scalars['ID']>
}

export type Question = {
  __typename?: 'Question'
  id: Scalars['ID']
  timestamp: Scalars['Instant']
  messageJsonString: Scalars['String']
}

export type QuestionGroup = {
  __typename?: 'QuestionGroup'
  id: Scalars['ID']
  memberId: Scalars['ID']
  questions: Array<Question>
  member?: Maybe<Member>
}

export type Quote = {
  __typename?: 'Quote'
  id: Scalars['ID']
  createdAt?: Maybe<Scalars['Instant']>
  price?: Maybe<Scalars['Float']>
  productType?: Maybe<QuoteProductType>
  state?: Maybe<QuoteState>
  initiatedFrom?: Maybe<Scalars['String']>
  attributedTo?: Maybe<Scalars['String']>
  currentInsurer?: Maybe<Scalars['String']>
  startDate?: Maybe<Scalars['String']>
  validity?: Maybe<Scalars['Int']>
  memberId?: Maybe<Scalars['ID']>
  breachedUnderwritingGuidelines?: Maybe<Array<Scalars['String']>>
  isComplete?: Maybe<Scalars['Boolean']>
  data?: Maybe<QuoteData>
  signedProductId?: Maybe<Scalars['ID']>
  originatingProductId?: Maybe<Scalars['ID']>
  isReadyToSign?: Maybe<Scalars['Boolean']>
}

export type QuoteData =
  | ApartmentQuoteData
  | HouseQuoteData
  | NorwegianHomeContentQuoteData
  | NorwegianTravelQuoteData

export type QuoteFromProductInput = {
  incompleteHouseQuoteData?: Maybe<HouseQuoteDataInput>
  incompleteApartmentQuoteData?: Maybe<ApartmentQuoteDataInput>
  norwegianHomeContentQuoteData?: Maybe<NorwegianHomeContentQuoteDataInput>
  norwegianTravelQuoteData?: Maybe<NorwegianTravelQuoteDataInput>
  originatingProductId?: Maybe<Scalars['ID']>
  currentInsurer?: Maybe<Scalars['String']>
}

export type QuoteInput = {
  productType?: Maybe<QuoteProductType>
  currentInsurer?: Maybe<Scalars['String']>
  apartmentData?: Maybe<ApartmentQuoteInput>
  houseData?: Maybe<HouseQuoteInput>
  norwegianHomeContentData?: Maybe<NorwegianHomeContentQuoteInput>
  norwegianTravelData?: Maybe<NorwegianTravelQuoteInput>
  originatingProductId?: Maybe<Scalars['ID']>
}

export enum QuoteProductType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
  Object = 'OBJECT',
  HomeContent = 'HOME_CONTENT',
  Travel = 'TRAVEL',
}

export enum QuoteState {
  Incomplete = 'INCOMPLETE',
  Quoted = 'QUOTED',
  Signed = 'SIGNED',
  Expired = 'EXPIRED',
}

export type RemindNotification = {
  date?: Maybe<Scalars['LocalDate']>
  time?: Maybe<Scalars['LocalTime']>
  message?: Maybe<Scalars['String']>
}

export type Renewal = {
  __typename?: 'Renewal'
  renewalDate: Scalars['LocalDate']
  draftCertificateUrl?: Maybe<Scalars['String']>
  draftOfAgreementId?: Maybe<Scalars['ID']>
}

export enum SanctionStatus {
  Undetermined = 'Undetermined',
  NoHit = 'NoHit',
  PartialHit = 'PartialHit',
  FullHit = 'FullHit',
}

export type SchedulerState = {
  __typename?: 'SchedulerState'
  id: Scalars['ID']
  member?: Maybe<Member>
  status: ChargeStatus
  changedBy: Scalars['String']
  changedAt: Scalars['Instant']
  amount?: Maybe<Scalars['MonetaryAmount']>
  transactionId?: Maybe<Scalars['ID']>
}

export type SendMessageFailed = {
  __typename?: 'SendMessageFailed'
  memberId: Scalars['String']
  errorCode: Scalars['Int']
  errorMessage: Scalars['String']
}

export type SendMessageInput = {
  memberId: Scalars['ID']
  message: Scalars['String']
  forceSendMessage: Scalars['Boolean']
}

export type SendMessageResponse = SendMessageSuccessful | SendMessageFailed

export type SendMessageSuccessful = {
  __typename?: 'SendMessageSuccessful'
  memberId: Scalars['String']
}

export type SetContractForClaim = {
  claimId: Scalars['String']
  memberId: Scalars['String']
  contractId: Scalars['String']
}

export enum SignSource {
  Rapio = 'RAPIO',
  Webonboarding = 'WEBONBOARDING',
  Web = 'WEB',
  App = 'APP',
  Ios = 'IOS',
  Android = 'ANDROID',
  Hope = 'HOPE',
}

export type SnowPressureClaim = {
  __typename?: 'SnowPressureClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type StormDamageClaim = {
  __typename?: 'StormDamageClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type SwedishApartment = AgreementCore & {
  __typename?: 'SwedishApartment'
  id: Scalars['ID']
  fromDate?: Maybe<Scalars['LocalDate']>
  toDate?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  lineOfBusiness: SwedishApartmentLineOfBusiness
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
}

export enum SwedishApartmentLineOfBusiness {
  Rent = 'RENT',
  Brf = 'BRF',
  StudentRent = 'STUDENT_RENT',
  StudentBrf = 'STUDENT_BRF',
}

export type SwedishHouse = AgreementCore & {
  __typename?: 'SwedishHouse'
  id: Scalars['ID']
  fromDate?: Maybe<Scalars['LocalDate']>
  toDate?: Maybe<Scalars['LocalDate']>
  premium: MonetaryAmountV2
  certificateUrl?: Maybe<Scalars['String']>
  status: AgreementStatus
  address: Address
  numberCoInsured: Scalars['Int']
  squareMeters: Scalars['Int']
  ancillaryArea: Scalars['Int']
  yearOfConstruction: Scalars['Int']
  numberOfBathrooms: Scalars['Int']
  extraBuildings: Array<ExtraBuilding>
  isSubleted: Scalars['Boolean']
}

export type SwitchableSwitcherEmail = {
  __typename?: 'SwitchableSwitcherEmail'
  id: Scalars['ID']
  member: Member
  switcherCompany: Scalars['String']
  queuedAt: Scalars['Instant']
  sentAt?: Maybe<Scalars['Instant']>
  remindedAt?: Maybe<Scalars['Instant']>
}

export type TerminateContractInput = {
  terminationDate: Scalars['LocalDate']
  terminationReason: TerminationReason
  comment?: Maybe<Scalars['String']>
}

export enum TerminationReason {
  NoFeedback = 'NO_FEEDBACK',
  DissatisfiedWithService = 'DISSATISFIED_WITH_SERVICE',
  DissatisfiedWithApp = 'DISSATISFIED_WITH_APP',
  DissatisfiedWithHedvig = 'DISSATISFIED_WITH_HEDVIG',
  DissatisfiedWithOther = 'DISSATISFIED_WITH_OTHER',
  AlreadyHaveInsurance = 'ALREADY_HAVE_INSURANCE',
  CoveredByPartnersInsurance = 'COVERED_BY_PARTNERS_INSURANCE',
  PartnerAlreadyHasHedvigInsurance = 'PARTNER_ALREADY_HAS_HEDVIG_INSURANCE',
  GotOfferFromJobOrUnionOrSimilar = 'GOT_OFFER_FROM_JOB_OR_UNION_OR_SIMILAR',
  WantToKeepOldInsurance = 'WANT_TO_KEEP_OLD_INSURANCE',
  StuckWithOldInsurance = 'STUCK_WITH_OLD_INSURANCE',
  DontNeedInsurance = 'DONT_NEED_INSURANCE',
  WantedOtherTypeOfInsurance = 'WANTED_OTHER_TYPE_OF_INSURANCE',
  RegretByRightToWithraw = 'REGRET_BY_RIGHT_TO_WITHRAW',
  Moved = 'MOVED',
  MovedAbroad = 'MOVED_ABROAD',
  MovedInWithParents = 'MOVED_IN_WITH_PARENTS',
  Price = 'PRICE',
  MissedPayments = 'MISSED_PAYMENTS',
  MissedPaymentsBadRisk = 'MISSED_PAYMENTS_BAD_RISK',
  PaymentIssues = 'PAYMENT_ISSUES',
  DiscountPeriodOver = 'DISCOUNT_PERIOD_OVER',
  ConfirmedFraud = 'CONFIRMED_FRAUD',
  SuspectedFraud = 'SUSPECTED_FRAUD',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type TestClaim = {
  __typename?: 'TestClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type TheftClaim = {
  __typename?: 'TheftClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export type Ticket = {
  __typename?: 'Ticket'
  id?: Maybe<Scalars['ID']>
  assignedTo?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Instant']>
  createdBy?: Maybe<Scalars['String']>
  memberId?: Maybe<Scalars['String']>
  referenceId?: Maybe<Scalars['String']>
  priority?: Maybe<Scalars['Float']>
  type?: Maybe<TicketType>
  remindNotificationDate?: Maybe<Scalars['LocalDate']>
  remindNotificationTime?: Maybe<Scalars['LocalTime']>
  remindMessage?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<TicketStatus>
}

export enum TicketChangeType {
  TicketCreated = 'TICKET_CREATED',
  ChangedReminder = 'CHANGED_REMINDER',
  ChangedAssignedTo = 'CHANGED_ASSIGNED_TO',
  ChangedDescription = 'CHANGED_DESCRIPTION',
  ChangedStatus = 'CHANGED_STATUS',
  ChangedPriority = 'CHANGED_PRIORITY',
}

export type TicketHistory = {
  __typename?: 'TicketHistory'
  id?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['Instant']>
  createdBy?: Maybe<Scalars['String']>
  type?: Maybe<TicketType>
  revisions?: Maybe<Array<Maybe<TicketRevision>>>
}

export type TicketInput = {
  assignedTo?: Maybe<Scalars['String']>
  priority?: Maybe<Scalars['Float']>
  type?: Maybe<TicketType>
  remindNotificationDate?: Maybe<Scalars['LocalDate']>
  remindNotificationTime?: Maybe<Scalars['LocalTime']>
  remindMessage?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  status?: Maybe<TicketStatus>
  referenceId?: Maybe<Scalars['String']>
  memberId?: Maybe<Scalars['String']>
}

export type TicketRevision = {
  __typename?: 'TicketRevision'
  assignedTo?: Maybe<Scalars['String']>
  manualPriority?: Maybe<Scalars['Float']>
  remindDate?: Maybe<Scalars['LocalDate']>
  remindTime?: Maybe<Scalars['LocalTime']>
  remindMessage?: Maybe<Scalars['String']>
  status?: Maybe<TicketStatus>
  changedAt?: Maybe<Scalars['Instant']>
  changeType?: Maybe<TicketChangeType>
  changedBy?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export enum TicketStatus {
  Waiting = 'WAITING',
  WorkingOn = 'WORKING_ON',
  OnHold = 'ON_HOLD',
  Resolved = 'RESOLVED',
}

export enum TicketType {
  Remind = 'REMIND',
  Message = 'MESSAGE',
  Claim = 'CLAIM',
  CallMe = 'CALL_ME',
  Other = 'OTHER',
}

export type Transaction = {
  __typename?: 'Transaction'
  id?: Maybe<Scalars['ID']>
  amount?: Maybe<MonetaryAmountV2>
  timestamp?: Maybe<Scalars['Instant']>
  type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export type TravelAccidentClaim = {
  __typename?: 'TravelAccidentClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export enum TypeOfContract {
  SeHouse = 'SE_HOUSE',
  SeApartmentBrf = 'SE_APARTMENT_BRF',
  SeApartmentRent = 'SE_APARTMENT_RENT',
  SeApartmentStudentBrf = 'SE_APARTMENT_STUDENT_BRF',
  SeApartmentStudentRent = 'SE_APARTMENT_STUDENT_RENT',
  NoHomeContentOwn = 'NO_HOME_CONTENT_OWN',
  NoHomeContentRent = 'NO_HOME_CONTENT_RENT',
  NoHomeContentYouthOwn = 'NO_HOME_CONTENT_YOUTH_OWN',
  NoHomeContentYouthRent = 'NO_HOME_CONTENT_YOUTH_RENT',
  NoTravel = 'NO_TRAVEL',
  NoTravelYouth = 'NO_TRAVEL_YOUTH',
}

export type UpsertClaimItemInput = {
  id?: Maybe<Scalars['ID']>
  claimId: Scalars['ID']
  itemFamilyId: Scalars['ID']
  itemTypeId: Scalars['ID']
  itemBrandId?: Maybe<Scalars['ID']>
  itemModelId?: Maybe<Scalars['ID']>
  dateOfPurchase?: Maybe<Scalars['LocalDate']>
  purchasePrice?: Maybe<Scalars['MonetaryAmount']>
  automaticValuation?: Maybe<Scalars['MonetaryAmount']>
  customValuation?: Maybe<Scalars['MonetaryAmount']>
  note?: Maybe<Scalars['String']>
}

export type UpsertItemBrandInput = {
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
  itemTypeId: Scalars['ID']
  itemCompanyId: Scalars['ID']
}

export type UpsertItemCompanyInput = {
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
}

export type UpsertItemModelInput = {
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
  itemBrandId: Scalars['ID']
}

export type UpsertItemTypeInput = {
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
  itemFamilyId: Scalars['ID']
}

export type UpsertValuationRuleInput = {
  id?: Maybe<Scalars['ID']>
  name: Scalars['String']
  ageLimit: Scalars['Float']
  typeOfContract: TypeOfContract
  itemFamilyId: Scalars['String']
  itemTypeId?: Maybe<Scalars['String']>
  valuationType: Scalars['String']
  depreciation?: Maybe<Scalars['Float']>
}

export type ValuationRule = {
  __typename?: 'ValuationRule'
  valuationName: Scalars['String']
  itemFamily: Scalars['String']
  itemTypeId?: Maybe<Scalars['ID']>
  ageLimit: Scalars['Float']
  valuationTable: Scalars['String']
  valuationType: Scalars['String']
  depreciation?: Maybe<Scalars['Int']>
}

export type VerminAndPestsClaim = {
  __typename?: 'VerminAndPestsClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type VoucherCampaign = {
  __typename?: 'VoucherCampaign'
  id: Scalars['ID']
  campaignCode: Scalars['String']
  partnerId: Scalars['String']
  partnerName: Scalars['String']
  validFrom?: Maybe<Scalars['Instant']>
  validTo?: Maybe<Scalars['Instant']>
  incentive?: Maybe<Incentive>
}

export type WaterDamageBathroomClaim = {
  __typename?: 'WaterDamageBathroomClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type WaterDamageClaim = {
  __typename?: 'WaterDamageClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type WaterDamageKitchenClaim = {
  __typename?: 'WaterDamageKitchenClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type Whitelisted = {
  __typename?: 'Whitelisted'
  whitelistedAt?: Maybe<Scalars['Instant']>
  whitelistedBy?: Maybe<Scalars['String']>
}

export type MemberNameAndContractMarketInfoQueryVariables = {
  memberId: Scalars['ID']
}

export type MemberNameAndContractMarketInfoQuery = {
  __typename?: 'QueryType'
} & {
  member: Maybe<
    { __typename?: 'Member' } & Pick<
      Member,
      'memberId' | 'firstName' | 'lastName'
    > & {
        contractMarketInfo: Maybe<
          { __typename?: 'ContractMarketInfo' } & Pick<
            ContractMarketInfo,
            'market'
          >
        >
      }
  >
}

export type InsertItemCategoriesMutationVariables = {
  request?: Maybe<InsertItemCategoriesInput>
}

export type InsertItemCategoriesMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'insertItemCategories'>

export type AddNorwegainPostalCodesMutationVariables = {
  postalCodesString?: Maybe<Scalars['String']>
}

export type AddNorwegainPostalCodesMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'addNorwegianPostalCodes'>

export type CreateNorwegianGripenPriceEngineMutationVariables = {
  request?: Maybe<CreateNorwegianGripenInput>
}

export type CreateNorwegianGripenPriceEngineMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'createNorwegianGripenPriceEngine'>

export type GetSwitcherEmailsQueryVariables = {}

export type GetSwitcherEmailsQuery = { __typename?: 'QueryType' } & {
  switchableSwitcherEmails: Array<
    { __typename?: 'SwitchableSwitcherEmail' } & Pick<
      SwitchableSwitcherEmail,
      'id' | 'switcherCompany' | 'queuedAt' | 'sentAt' | 'remindedAt'
    > & {
        member: { __typename?: 'Member' } & Pick<
          Member,
          'memberId' | 'signedOn' | 'firstName' | 'lastName'
        >
      }
  >
}

export type MarkSwitcherEmailAsRemindedMutationVariables = {
  id: Scalars['ID']
}

export type MarkSwitcherEmailAsRemindedMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'markSwitchableSwitcherEmailAsReminded'>

export type ActivatePendingAgreementMutationVariables = {
  contractId: Scalars['ID']
  request?: Maybe<ActivatePendingAgreementInput>
}

export type ActivatePendingAgreementMutation = {
  __typename?: 'MutationType'
} & {
  activatePendingAgreement: { __typename?: 'Contract' } & Pick<
    Contract,
    'id' | 'holderMemberId'
  >
}

export type AddAgreementFromQuoteMutationVariables = {
  id: Scalars['ID']
  contractId: Scalars['ID']
  activeFrom?: Maybe<Scalars['LocalDate']>
  activeTo?: Maybe<Scalars['LocalDate']>
  previousAgreementActiveTo?: Maybe<Scalars['LocalDate']>
}

export type AddAgreementFromQuoteMutation = { __typename?: 'MutationType' } & {
  addAgreementFromQuote: { __typename?: 'Quote' } & Pick<Quote, 'id'>
}

export type AssignCampaignToPartnerPercentageDiscountMutationVariables = {
  request?: Maybe<AssignVoucherPercentageDiscount>
}

export type AssignCampaignToPartnerPercentageDiscountMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'assignCampaignToPartnerPercentageDiscount'>

export type AnswerQuestionMutationVariables = {
  memberId: Scalars['ID']
  answer: Scalars['String']
}

export type AnswerQuestionMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'answerQuestion'
>

export type CanValuateClaimItemQueryVariables = {
  typeOfContract: TypeOfContract
  itemFamilyId: Scalars['String']
  itemTypeId?: Maybe<Scalars['ID']>
}

export type CanValuateClaimItemQuery = { __typename?: 'QueryType' } & {
  canValuateClaimItem: Maybe<
    { __typename?: 'CanValuateClaimItem' } & Pick<
      CanValuateClaimItem,
      'canValuate' | 'typeOfContract' | 'itemFamily' | 'itemTypeId'
    >
  >
}

export type ChangeFromDateMutationVariables = {
  agreementId: Scalars['ID']
  request?: Maybe<ChangeFromDateInput>
}

export type ChangeFromDateMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'changeFromDate'
>

export type ChangeTerminationDateMutationVariables = {
  contractId: Scalars['ID']
  request?: Maybe<ChangeTerminationDateInput>
}

export type ChangeTerminationDateMutation = { __typename?: 'MutationType' } & {
  changeTerminationDate: { __typename?: 'Contract' } & Pick<
    Contract,
    'id' | 'holderMemberId'
  >
}

export type ChangeToDateMutationVariables = {
  agreementId: Scalars['ID']
  request?: Maybe<ChangeToDateInput>
}

export type ChangeToDateMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'changeToDate'
>

export type CreatePaymentCompletionLinkMutationVariables = {
  memberId: Scalars['ID']
}

export type CreatePaymentCompletionLinkMutation = {
  __typename?: 'MutationType'
} & {
  createPaymentCompletionLink: {
    __typename?: 'PaymentCompletionResponse'
  } & Pick<PaymentCompletionResponse, 'url'>
}

export type CreateQuoteForNewContractMutationVariables = {
  memberId: Scalars['ID']
  quoteInput: QuoteInput
  bypassUnderwritingGuidelines: Scalars['Boolean']
}

export type CreateQuoteForNewContractMutation = {
  __typename?: 'MutationType'
} & { createQuoteForNewContract: { __typename?: 'Quote' } & Pick<Quote, 'id'> }

export type CreateQuoteFromAgreementMutationVariables = {
  agreementId: Scalars['ID']
  memberId: Scalars['ID']
}

export type CreateQuoteFromAgreementMutation = {
  __typename?: 'MutationType'
} & { createQuoteFromAgreement: { __typename?: 'Quote' } & Pick<Quote, 'id'> }

export type GetAccountQueryVariables = {
  memberId: Scalars['ID']
}

export type GetAccountQuery = { __typename?: 'QueryType' } & {
  member: Maybe<
    { __typename?: 'Member' } & Pick<Member, 'memberId'> & {
        account: Maybe<
          { __typename?: 'Account' } & Pick<Account, 'id'> & {
              currentBalance: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
              totalBalance: { __typename?: 'MonetaryAmountV2' } & Pick<
                MonetaryAmountV2,
                'amount' | 'currency'
              >
              chargeEstimation: {
                __typename?: 'AccountChargeEstimation'
              } & Pick<AccountChargeEstimation, 'discountCodes'> & {
                  subscription: { __typename?: 'MonetaryAmountV2' } & Pick<
                    MonetaryAmountV2,
                    'amount' | 'currency'
                  >
                  charge: { __typename?: 'MonetaryAmountV2' } & Pick<
                    MonetaryAmountV2,
                    'amount' | 'currency'
                  >
                  discount: { __typename?: 'MonetaryAmountV2' } & Pick<
                    MonetaryAmountV2,
                    'amount' | 'currency'
                  >
                }
              entries: Array<
                { __typename?: 'AccountEntry' } & Pick<
                  AccountEntry,
                  | 'id'
                  | 'fromDate'
                  | 'title'
                  | 'source'
                  | 'reference'
                  | 'type'
                  | 'failedAt'
                  | 'chargedAt'
                > & {
                    amount: { __typename?: 'MonetaryAmountV2' } & Pick<
                      MonetaryAmountV2,
                      'amount' | 'currency'
                    >
                  }
              >
            }
        >
      }
  >
}

export type GetClaimItemValuationQueryVariables = {
  request?: Maybe<GetValuationInput>
}

export type GetClaimItemValuationQuery = { __typename?: 'QueryType' } & {
  getClaimItemValuation: { __typename?: 'ClaimItemValuation' } & {
    depreciatedValue: Maybe<
      { __typename?: 'MonetaryAmountV2' } & Pick<
        MonetaryAmountV2,
        'amount' | 'currency'
      >
    >
    valuationRule: Maybe<
      { __typename?: 'ValuationRule' } & Pick<
        ValuationRule,
        | 'valuationName'
        | 'itemFamily'
        | 'itemTypeId'
        | 'ageLimit'
        | 'valuationTable'
        | 'valuationType'
        | 'depreciation'
      >
    >
  }
}

export type GetClaimItemsQueryVariables = {
  claimId: Scalars['ID']
}

export type GetClaimItemsQuery = { __typename?: 'QueryType' } & {
  claimItems: Array<
    { __typename?: 'ClaimItem' } & Pick<
      ClaimItem,
      'id' | 'dateOfPurchase' | 'note'
    > & {
        itemFamily: { __typename?: 'ItemFamily' } & Pick<
          ItemFamily,
          'id' | 'displayName'
        >
        itemType: { __typename?: 'ItemType' } & Pick<
          ItemType,
          'id' | 'displayName'
        >
        itemBrand: Maybe<
          { __typename?: 'ItemBrand' } & Pick<ItemBrand, 'id' | 'displayName'>
        >
        itemModel: Maybe<
          { __typename?: 'ItemModel' } & Pick<ItemModel, 'id' | 'displayName'>
        >
        purchasePrice: Maybe<
          { __typename?: 'MonetaryAmountV2' } & Pick<
            MonetaryAmountV2,
            'amount' | 'currency'
          >
        >
        valuation: Maybe<
          { __typename?: 'MonetaryAmountV2' } & Pick<
            MonetaryAmountV2,
            'amount' | 'currency'
          >
        >
      }
  >
}

export type GetContractMarketInfoQueryVariables = {
  memberId: Scalars['ID']
}

export type GetContractMarketInfoQuery = { __typename?: 'QueryType' } & {
  member: Maybe<
    { __typename?: 'Member' } & Pick<Member, 'memberId'> & {
        contractMarketInfo: Maybe<
          { __typename?: 'ContractMarketInfo' } & Pick<
            ContractMarketInfo,
            'market' | 'preferredCurrency'
          >
        >
      }
  >
}

export type GetContractsQueryVariables = {
  memberId: Scalars['ID']
}

export type GetContractsQuery = { __typename?: 'QueryType' } & {
  member: Maybe<
    { __typename?: 'Member' } & Pick<Member, 'memberId'> & {
        contracts: Array<
          { __typename?: 'Contract' } & Pick<
            Contract,
            | 'id'
            | 'holderMemberId'
            | 'holderFirstName'
            | 'holderLastName'
            | 'switchedFrom'
            | 'masterInception'
            | 'status'
            | 'isTerminated'
            | 'terminationDate'
            | 'currentAgreementId'
            | 'hasPendingAgreement'
            | 'hasQueuedRenewal'
            | 'preferredCurrency'
            | 'market'
            | 'signSource'
            | 'contractTypeName'
            | 'createdAt'
          > & {
              agreements: Array<
                | ({ __typename?: 'SwedishApartment' } & Pick<
                    SwedishApartment,
                    | 'id'
                    | 'fromDate'
                    | 'toDate'
                    | 'certificateUrl'
                    | 'status'
                    | 'numberCoInsured'
                    | 'squareMeters'
                  > & {
                      swedishApartmentLineOfBusiness: SwedishApartment['lineOfBusiness']
                    } & {
                      premium: { __typename?: 'MonetaryAmountV2' } & Pick<
                        MonetaryAmountV2,
                        'amount' | 'currency'
                      >
                      address: { __typename?: 'Address' } & Pick<
                        Address,
                        'street' | 'postalCode' | 'city'
                      >
                    })
                | ({ __typename?: 'SwedishHouse' } & Pick<
                    SwedishHouse,
                    | 'id'
                    | 'fromDate'
                    | 'toDate'
                    | 'certificateUrl'
                    | 'status'
                    | 'numberCoInsured'
                    | 'squareMeters'
                    | 'ancillaryArea'
                    | 'yearOfConstruction'
                    | 'numberOfBathrooms'
                    | 'isSubleted'
                  > & {
                      premium: { __typename?: 'MonetaryAmountV2' } & Pick<
                        MonetaryAmountV2,
                        'amount' | 'currency'
                      >
                      address: { __typename?: 'Address' } & Pick<
                        Address,
                        'street' | 'postalCode' | 'city'
                      >
                      extraBuildings: Array<
                        { __typename?: 'ExtraBuilding' } & Pick<
                          ExtraBuilding,
                          | 'id'
                          | 'type'
                          | 'area'
                          | 'hasWaterConnected'
                          | 'displayName'
                        >
                      >
                    })
                | ({ __typename?: 'NorwegianHomeContent' } & Pick<
                    NorwegianHomeContent,
                    | 'id'
                    | 'fromDate'
                    | 'toDate'
                    | 'certificateUrl'
                    | 'status'
                    | 'numberCoInsured'
                    | 'squareMeters'
                  > & {
                      norwegianHomeContentLineOfBusiness: NorwegianHomeContent['lineOfBusiness']
                    } & {
                      premium: { __typename?: 'MonetaryAmountV2' } & Pick<
                        MonetaryAmountV2,
                        'amount' | 'currency'
                      >
                      address: { __typename?: 'Address' } & Pick<
                        Address,
                        'street' | 'postalCode' | 'city'
                      >
                    })
                | ({ __typename?: 'NorwegianTravel' } & Pick<
                    NorwegianTravel,
                    | 'id'
                    | 'fromDate'
                    | 'toDate'
                    | 'certificateUrl'
                    | 'status'
                    | 'numberCoInsured'
                  > & {
                      norwegianTravelLineOfBusiness: NorwegianTravel['lineOfBusiness']
                    } & {
                      premium: { __typename?: 'MonetaryAmountV2' } & Pick<
                        MonetaryAmountV2,
                        'amount' | 'currency'
                      >
                    })
              >
              renewal: Maybe<
                { __typename?: 'Renewal' } & Pick<
                  Renewal,
                  'renewalDate' | 'draftCertificateUrl' | 'draftOfAgreementId'
                >
              >
            }
        >
      }
  >
}

export type GetDashboardNumbersQueryVariables = {}

export type GetDashboardNumbersQuery = { __typename?: 'QueryType' } & {
  dashboardNumbers: Maybe<
    { __typename?: 'DashboardNumbers' } & Pick<
      DashboardNumbers,
      'numberOfClaims' | 'numberOfQuestions'
    >
  >
}

export type GetItemCategoriesQueryVariables = {
  kind: ItemCategoryKind
  parentId?: Maybe<Scalars['ID']>
}

export type GetItemCategoriesQuery = { __typename?: 'QueryType' } & {
  itemCategories: Array<
    | ({ __typename?: 'ItemFamily' } & Pick<
        ItemFamily,
        'id' | 'displayName' | 'searchTerms' | 'nextKind'
      >)
    | ({ __typename?: 'ItemType' } & Pick<
        ItemType,
        'id' | 'displayName' | 'searchTerms' | 'nextKind'
      >)
    | ({ __typename?: 'ItemBrand' } & Pick<
        ItemBrand,
        'id' | 'displayName' | 'searchTerms' | 'nextKind'
      >)
    | ({ __typename?: 'ItemModel' } & Pick<
        ItemModel,
        'id' | 'displayName' | 'searchTerms' | 'nextKind'
      >)
    | ({ __typename?: 'ItemCompany' } & Pick<
        ItemCompany,
        'id' | 'displayName' | 'searchTerms' | 'nextKind'
      >)
  >
}

export type GetMessageHistoryQueryVariables = {
  memberId: Scalars['ID']
}

export type GetMessageHistoryQuery = { __typename?: 'QueryType' } & {
  messageHistory: Array<
    { __typename?: 'ChatMessage' } & Pick<
      ChatMessage,
      'globalId' | 'author' | 'fromId' | 'timestamp' | 'messageBodyJsonString'
    >
  >
}

export type GetPartnerCampaignOwnersQueryVariables = {}

export type GetPartnerCampaignOwnersQuery = { __typename?: 'QueryType' } & {
  getPartnerCampaignOwners: Array<
    { __typename?: 'CampaignOwnerPartner' } & Pick<
      CampaignOwnerPartner,
      'partnerId'
    >
  >
}

export type FindPartnerCampaignsQueryVariables = {
  input: CampaignFilter
}

export type FindPartnerCampaignsQuery = { __typename?: 'QueryType' } & {
  findPartnerCampaigns: Array<
    { __typename?: 'VoucherCampaign' } & Pick<
      VoucherCampaign,
      | 'id'
      | 'campaignCode'
      | 'partnerId'
      | 'partnerName'
      | 'validFrom'
      | 'validTo'
    > & {
        incentive: Maybe<
          | ({ __typename?: 'MonthlyPercentageDiscountFixedPeriod' } & Pick<
              MonthlyPercentageDiscountFixedPeriod,
              'numberOfMonths' | 'percentage'
            >)
          | ({ __typename?: 'FreeMonths' } & Pick<FreeMonths, 'numberOfMonths'>)
          | ({ __typename?: 'CostDeduction' } & Pick<CostDeduction, 'amount'>)
          | { __typename: 'NoDiscount' }
          | ({ __typename?: 'IndefinitePercentageDiscount' } & Pick<
              IndefinitePercentageDiscount,
              'percentageDiscount'
            >)
        >
      }
  >
}

export type GetQuestionsGroupsQueryVariables = {}

export type GetQuestionsGroupsQuery = { __typename?: 'QueryType' } & {
  questionGroups: Array<
    { __typename?: 'QuestionGroup' } & Pick<
      QuestionGroup,
      'id' | 'memberId'
    > & {
        questions: Array<
          { __typename?: 'Question' } & Pick<
            Question,
            'id' | 'messageJsonString' | 'timestamp'
          >
        >
      }
  >
}

export type MarkQuestionAsResolvedMutationVariables = {
  memberId: Scalars['ID']
}

export type MarkQuestionAsResolvedMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'markQuestionAsResolved'>

export type RegenerateCertificateMutationVariables = {
  agreementId: Scalars['ID']
}

export type RegenerateCertificateMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'regenerateCertificate'>

export type RevertTerminationMutationVariables = {
  contractId: Scalars['ID']
}

export type RevertTerminationMutation = { __typename?: 'MutationType' } & {
  revertTermination: { __typename?: 'Contract' } & Pick<
    Contract,
    'id' | 'holderMemberId'
  >
}

export type SendMessageMutationVariables = {
  input: SendMessageInput
}

export type SendMessageMutation = { __typename?: 'MutationType' } & {
  sendMessage:
    | ({ __typename?: 'SendMessageSuccessful' } & Pick<
        SendMessageSuccessful,
        'memberId'
      >)
    | ({ __typename?: 'SendMessageFailed' } & Pick<
        SendMessageFailed,
        'memberId' | 'errorCode' | 'errorMessage'
      >)
}

export type SetContractForClaimMutationVariables = {
  request: SetContractForClaim
}

export type SetContractForClaimMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'setContractForClaim'>

export type SetCoveringEmployeeMutationVariables = {
  id: Scalars['ID']
  coveringEmployee: Scalars['Boolean']
}

export type SetCoveringEmployeeMutation = { __typename?: 'MutationType' } & {
  setCoveringEmployee: Maybe<
    { __typename?: 'Claim' } & Pick<Claim, 'coveringEmployee'> & {
        events: Maybe<
          Array<
            Maybe<
              { __typename?: 'ClaimEvent' } & Pick<ClaimEvent, 'text' | 'date'>
            >
          >
        >
      }
  >
}

export type SignQuoteForNewContractMutationVariables = {
  quoteId: Scalars['ID']
  activationDate?: Maybe<Scalars['LocalDate']>
}

export type SignQuoteForNewContractMutation = {
  __typename?: 'MutationType'
} & { signQuoteForNewContract: { __typename?: 'Quote' } & Pick<Quote, 'id'> }

export type TerminateContractMutationVariables = {
  contractId: Scalars['ID']
  request?: Maybe<TerminateContractInput>
}

export type TerminateContractMutation = { __typename?: 'MutationType' } & {
  terminateContract: { __typename?: 'Contract' } & Pick<
    Contract,
    'id' | 'holderMemberId'
  >
}

export type UpdateClaimStateMutationVariables = {
  id: Scalars['ID']
  state: ClaimState
}

export type UpdateClaimStateMutation = { __typename?: 'MutationType' } & {
  updateClaimState: Maybe<
    { __typename?: 'Claim' } & Pick<Claim, 'state'> & {
        events: Maybe<
          Array<
            Maybe<
              { __typename?: 'ClaimEvent' } & Pick<ClaimEvent, 'text' | 'date'>
            >
          >
        >
      }
  >
}

export type DeleteClaimItemMutationVariables = {
  claimItemId: Scalars['ID']
}

export type DeleteClaimItemMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'deleteClaimItem'
>

export type UpsertClaimItemMutationVariables = {
  request?: Maybe<UpsertClaimItemInput>
}

export type UpsertClaimItemMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'upsertClaimItem'
>

export type UpsertItemTypeMutationVariables = {
  request?: Maybe<UpsertItemTypeInput>
}

export type UpsertItemTypeMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'upsertItemType'
>

export type UpsertItemBrandMutationVariables = {
  request?: Maybe<UpsertItemBrandInput>
}

export type UpsertItemBrandMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'upsertItemBrand'
>

export type UpsertItemModelMutationVariables = {
  request?: Maybe<UpsertItemModelInput>
}

export type UpsertItemModelMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'upsertItemModel'
>

export type UpsertItemCompanyMutationVariables = {
  request?: Maybe<UpsertItemCompanyInput>
}

export type UpsertItemCompanyMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'upsertItemCompany'
>

export const MemberNameAndContractMarketInfoDocument = gql`
  query MemberNameAndContractMarketInfo($memberId: ID!) {
    member(id: $memberId) {
      memberId
      firstName
      lastName
      contractMarketInfo {
        market
      }
    }
  }
`

/**
 * __useMemberNameAndContractMarketInfoQuery__
 *
 * To run a query within a React component, call `useMemberNameAndContractMarketInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberNameAndContractMarketInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberNameAndContractMarketInfoQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useMemberNameAndContractMarketInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MemberNameAndContractMarketInfoQuery,
    MemberNameAndContractMarketInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    MemberNameAndContractMarketInfoQuery,
    MemberNameAndContractMarketInfoQueryVariables
  >(MemberNameAndContractMarketInfoDocument, baseOptions)
}
export function useMemberNameAndContractMarketInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MemberNameAndContractMarketInfoQuery,
    MemberNameAndContractMarketInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MemberNameAndContractMarketInfoQuery,
    MemberNameAndContractMarketInfoQueryVariables
  >(MemberNameAndContractMarketInfoDocument, baseOptions)
}
export type MemberNameAndContractMarketInfoQueryHookResult = ReturnType<
  typeof useMemberNameAndContractMarketInfoQuery
>
export type MemberNameAndContractMarketInfoLazyQueryHookResult = ReturnType<
  typeof useMemberNameAndContractMarketInfoLazyQuery
>
export type MemberNameAndContractMarketInfoQueryResult = ApolloReactCommon.QueryResult<
  MemberNameAndContractMarketInfoQuery,
  MemberNameAndContractMarketInfoQueryVariables
>
export const InsertItemCategoriesDocument = gql`
  mutation InsertItemCategories($request: InsertItemCategoriesInput) {
    insertItemCategories(request: $request)
  }
`
export type InsertItemCategoriesMutationFn = ApolloReactCommon.MutationFunction<
  InsertItemCategoriesMutation,
  InsertItemCategoriesMutationVariables
>

/**
 * __useInsertItemCategoriesMutation__
 *
 * To run a mutation, you first call `useInsertItemCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertItemCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertItemCategoriesMutation, { data, loading, error }] = useInsertItemCategoriesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useInsertItemCategoriesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertItemCategoriesMutation,
    InsertItemCategoriesMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InsertItemCategoriesMutation,
    InsertItemCategoriesMutationVariables
  >(InsertItemCategoriesDocument, baseOptions)
}
export type InsertItemCategoriesMutationHookResult = ReturnType<
  typeof useInsertItemCategoriesMutation
>
export type InsertItemCategoriesMutationResult = ApolloReactCommon.MutationResult<
  InsertItemCategoriesMutation
>
export type InsertItemCategoriesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertItemCategoriesMutation,
  InsertItemCategoriesMutationVariables
>
export const AddNorwegainPostalCodesDocument = gql`
  mutation AddNorwegainPostalCodes($postalCodesString: String) {
    addNorwegianPostalCodes(postalCodesString: $postalCodesString)
  }
`
export type AddNorwegainPostalCodesMutationFn = ApolloReactCommon.MutationFunction<
  AddNorwegainPostalCodesMutation,
  AddNorwegainPostalCodesMutationVariables
>

/**
 * __useAddNorwegainPostalCodesMutation__
 *
 * To run a mutation, you first call `useAddNorwegainPostalCodesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNorwegainPostalCodesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNorwegainPostalCodesMutation, { data, loading, error }] = useAddNorwegainPostalCodesMutation({
 *   variables: {
 *      postalCodesString: // value for 'postalCodesString'
 *   },
 * });
 */
export function useAddNorwegainPostalCodesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddNorwegainPostalCodesMutation,
    AddNorwegainPostalCodesMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddNorwegainPostalCodesMutation,
    AddNorwegainPostalCodesMutationVariables
  >(AddNorwegainPostalCodesDocument, baseOptions)
}
export type AddNorwegainPostalCodesMutationHookResult = ReturnType<
  typeof useAddNorwegainPostalCodesMutation
>
export type AddNorwegainPostalCodesMutationResult = ApolloReactCommon.MutationResult<
  AddNorwegainPostalCodesMutation
>
export type AddNorwegainPostalCodesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddNorwegainPostalCodesMutation,
  AddNorwegainPostalCodesMutationVariables
>
export const CreateNorwegianGripenPriceEngineDocument = gql`
  mutation CreateNorwegianGripenPriceEngine(
    $request: CreateNorwegianGripenInput
  ) {
    createNorwegianGripenPriceEngine(request: $request)
  }
`
export type CreateNorwegianGripenPriceEngineMutationFn = ApolloReactCommon.MutationFunction<
  CreateNorwegianGripenPriceEngineMutation,
  CreateNorwegianGripenPriceEngineMutationVariables
>

/**
 * __useCreateNorwegianGripenPriceEngineMutation__
 *
 * To run a mutation, you first call `useCreateNorwegianGripenPriceEngineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNorwegianGripenPriceEngineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNorwegianGripenPriceEngineMutation, { data, loading, error }] = useCreateNorwegianGripenPriceEngineMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateNorwegianGripenPriceEngineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateNorwegianGripenPriceEngineMutation,
    CreateNorwegianGripenPriceEngineMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateNorwegianGripenPriceEngineMutation,
    CreateNorwegianGripenPriceEngineMutationVariables
  >(CreateNorwegianGripenPriceEngineDocument, baseOptions)
}
export type CreateNorwegianGripenPriceEngineMutationHookResult = ReturnType<
  typeof useCreateNorwegianGripenPriceEngineMutation
>
export type CreateNorwegianGripenPriceEngineMutationResult = ApolloReactCommon.MutationResult<
  CreateNorwegianGripenPriceEngineMutation
>
export type CreateNorwegianGripenPriceEngineMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateNorwegianGripenPriceEngineMutation,
  CreateNorwegianGripenPriceEngineMutationVariables
>
export const GetSwitcherEmailsDocument = gql`
  query GetSwitcherEmails {
    switchableSwitcherEmails {
      id
      member {
        memberId
        signedOn
        firstName
        lastName
      }
      switcherCompany
      queuedAt
      sentAt
      remindedAt
    }
  }
`

/**
 * __useGetSwitcherEmailsQuery__
 *
 * To run a query within a React component, call `useGetSwitcherEmailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSwitcherEmailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSwitcherEmailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSwitcherEmailsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSwitcherEmailsQuery,
    GetSwitcherEmailsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetSwitcherEmailsQuery,
    GetSwitcherEmailsQueryVariables
  >(GetSwitcherEmailsDocument, baseOptions)
}
export function useGetSwitcherEmailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSwitcherEmailsQuery,
    GetSwitcherEmailsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetSwitcherEmailsQuery,
    GetSwitcherEmailsQueryVariables
  >(GetSwitcherEmailsDocument, baseOptions)
}
export type GetSwitcherEmailsQueryHookResult = ReturnType<
  typeof useGetSwitcherEmailsQuery
>
export type GetSwitcherEmailsLazyQueryHookResult = ReturnType<
  typeof useGetSwitcherEmailsLazyQuery
>
export type GetSwitcherEmailsQueryResult = ApolloReactCommon.QueryResult<
  GetSwitcherEmailsQuery,
  GetSwitcherEmailsQueryVariables
>
export const MarkSwitcherEmailAsRemindedDocument = gql`
  mutation MarkSwitcherEmailAsReminded($id: ID!) {
    markSwitchableSwitcherEmailAsReminded(id: $id)
  }
`
export type MarkSwitcherEmailAsRemindedMutationFn = ApolloReactCommon.MutationFunction<
  MarkSwitcherEmailAsRemindedMutation,
  MarkSwitcherEmailAsRemindedMutationVariables
>

/**
 * __useMarkSwitcherEmailAsRemindedMutation__
 *
 * To run a mutation, you first call `useMarkSwitcherEmailAsRemindedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSwitcherEmailAsRemindedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSwitcherEmailAsRemindedMutation, { data, loading, error }] = useMarkSwitcherEmailAsRemindedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkSwitcherEmailAsRemindedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MarkSwitcherEmailAsRemindedMutation,
    MarkSwitcherEmailAsRemindedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    MarkSwitcherEmailAsRemindedMutation,
    MarkSwitcherEmailAsRemindedMutationVariables
  >(MarkSwitcherEmailAsRemindedDocument, baseOptions)
}
export type MarkSwitcherEmailAsRemindedMutationHookResult = ReturnType<
  typeof useMarkSwitcherEmailAsRemindedMutation
>
export type MarkSwitcherEmailAsRemindedMutationResult = ApolloReactCommon.MutationResult<
  MarkSwitcherEmailAsRemindedMutation
>
export type MarkSwitcherEmailAsRemindedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkSwitcherEmailAsRemindedMutation,
  MarkSwitcherEmailAsRemindedMutationVariables
>
export const ActivatePendingAgreementDocument = gql`
  mutation ActivatePendingAgreement(
    $contractId: ID!
    $request: ActivatePendingAgreementInput
  ) {
    activatePendingAgreement(contractId: $contractId, request: $request) {
      id
      holderMemberId
    }
  }
`
export type ActivatePendingAgreementMutationFn = ApolloReactCommon.MutationFunction<
  ActivatePendingAgreementMutation,
  ActivatePendingAgreementMutationVariables
>

/**
 * __useActivatePendingAgreementMutation__
 *
 * To run a mutation, you first call `useActivatePendingAgreementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivatePendingAgreementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activatePendingAgreementMutation, { data, loading, error }] = useActivatePendingAgreementMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useActivatePendingAgreementMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ActivatePendingAgreementMutation,
    ActivatePendingAgreementMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ActivatePendingAgreementMutation,
    ActivatePendingAgreementMutationVariables
  >(ActivatePendingAgreementDocument, baseOptions)
}
export type ActivatePendingAgreementMutationHookResult = ReturnType<
  typeof useActivatePendingAgreementMutation
>
export type ActivatePendingAgreementMutationResult = ApolloReactCommon.MutationResult<
  ActivatePendingAgreementMutation
>
export type ActivatePendingAgreementMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ActivatePendingAgreementMutation,
  ActivatePendingAgreementMutationVariables
>
export const AddAgreementFromQuoteDocument = gql`
  mutation AddAgreementFromQuote(
    $id: ID!
    $contractId: ID!
    $activeFrom: LocalDate
    $activeTo: LocalDate
    $previousAgreementActiveTo: LocalDate
  ) {
    addAgreementFromQuote(
      id: $id
      contractId: $contractId
      activeFrom: $activeFrom
      activeTo: $activeTo
      previousAgreementActiveTo: $previousAgreementActiveTo
    ) {
      id
    }
  }
`
export type AddAgreementFromQuoteMutationFn = ApolloReactCommon.MutationFunction<
  AddAgreementFromQuoteMutation,
  AddAgreementFromQuoteMutationVariables
>

/**
 * __useAddAgreementFromQuoteMutation__
 *
 * To run a mutation, you first call `useAddAgreementFromQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAgreementFromQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAgreementFromQuoteMutation, { data, loading, error }] = useAddAgreementFromQuoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      contractId: // value for 'contractId'
 *      activeFrom: // value for 'activeFrom'
 *      activeTo: // value for 'activeTo'
 *      previousAgreementActiveTo: // value for 'previousAgreementActiveTo'
 *   },
 * });
 */
export function useAddAgreementFromQuoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddAgreementFromQuoteMutation,
    AddAgreementFromQuoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddAgreementFromQuoteMutation,
    AddAgreementFromQuoteMutationVariables
  >(AddAgreementFromQuoteDocument, baseOptions)
}
export type AddAgreementFromQuoteMutationHookResult = ReturnType<
  typeof useAddAgreementFromQuoteMutation
>
export type AddAgreementFromQuoteMutationResult = ApolloReactCommon.MutationResult<
  AddAgreementFromQuoteMutation
>
export type AddAgreementFromQuoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddAgreementFromQuoteMutation,
  AddAgreementFromQuoteMutationVariables
>
export const AssignCampaignToPartnerPercentageDiscountDocument = gql`
  mutation AssignCampaignToPartnerPercentageDiscount(
    $request: AssignVoucherPercentageDiscount
  ) {
    assignCampaignToPartnerPercentageDiscount(request: $request)
  }
`
export type AssignCampaignToPartnerPercentageDiscountMutationFn = ApolloReactCommon.MutationFunction<
  AssignCampaignToPartnerPercentageDiscountMutation,
  AssignCampaignToPartnerPercentageDiscountMutationVariables
>

/**
 * __useAssignCampaignToPartnerPercentageDiscountMutation__
 *
 * To run a mutation, you first call `useAssignCampaignToPartnerPercentageDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignCampaignToPartnerPercentageDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignCampaignToPartnerPercentageDiscountMutation, { data, loading, error }] = useAssignCampaignToPartnerPercentageDiscountMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAssignCampaignToPartnerPercentageDiscountMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AssignCampaignToPartnerPercentageDiscountMutation,
    AssignCampaignToPartnerPercentageDiscountMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AssignCampaignToPartnerPercentageDiscountMutation,
    AssignCampaignToPartnerPercentageDiscountMutationVariables
  >(AssignCampaignToPartnerPercentageDiscountDocument, baseOptions)
}
export type AssignCampaignToPartnerPercentageDiscountMutationHookResult = ReturnType<
  typeof useAssignCampaignToPartnerPercentageDiscountMutation
>
export type AssignCampaignToPartnerPercentageDiscountMutationResult = ApolloReactCommon.MutationResult<
  AssignCampaignToPartnerPercentageDiscountMutation
>
export type AssignCampaignToPartnerPercentageDiscountMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AssignCampaignToPartnerPercentageDiscountMutation,
  AssignCampaignToPartnerPercentageDiscountMutationVariables
>
export const AnswerQuestionDocument = gql`
  mutation AnswerQuestion($memberId: ID!, $answer: String!) {
    answerQuestion(memberId: $memberId, answer: $answer)
  }
`
export type AnswerQuestionMutationFn = ApolloReactCommon.MutationFunction<
  AnswerQuestionMutation,
  AnswerQuestionMutationVariables
>

/**
 * __useAnswerQuestionMutation__
 *
 * To run a mutation, you first call `useAnswerQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerQuestionMutation, { data, loading, error }] = useAnswerQuestionMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useAnswerQuestionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AnswerQuestionMutation,
    AnswerQuestionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AnswerQuestionMutation,
    AnswerQuestionMutationVariables
  >(AnswerQuestionDocument, baseOptions)
}
export type AnswerQuestionMutationHookResult = ReturnType<
  typeof useAnswerQuestionMutation
>
export type AnswerQuestionMutationResult = ApolloReactCommon.MutationResult<
  AnswerQuestionMutation
>
export type AnswerQuestionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AnswerQuestionMutation,
  AnswerQuestionMutationVariables
>
export const CanValuateClaimItemDocument = gql`
  query CanValuateClaimItem(
    $typeOfContract: TypeOfContract!
    $itemFamilyId: String!
    $itemTypeId: ID
  ) {
    canValuateClaimItem(
      typeOfContract: $typeOfContract
      itemFamilyId: $itemFamilyId
      itemTypeId: $itemTypeId
    ) {
      canValuate
      typeOfContract
      itemFamily
      itemTypeId
    }
  }
`

/**
 * __useCanValuateClaimItemQuery__
 *
 * To run a query within a React component, call `useCanValuateClaimItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanValuateClaimItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanValuateClaimItemQuery({
 *   variables: {
 *      typeOfContract: // value for 'typeOfContract'
 *      itemFamilyId: // value for 'itemFamilyId'
 *      itemTypeId: // value for 'itemTypeId'
 *   },
 * });
 */
export function useCanValuateClaimItemQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CanValuateClaimItemQuery,
    CanValuateClaimItemQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    CanValuateClaimItemQuery,
    CanValuateClaimItemQueryVariables
  >(CanValuateClaimItemDocument, baseOptions)
}
export function useCanValuateClaimItemLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CanValuateClaimItemQuery,
    CanValuateClaimItemQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    CanValuateClaimItemQuery,
    CanValuateClaimItemQueryVariables
  >(CanValuateClaimItemDocument, baseOptions)
}
export type CanValuateClaimItemQueryHookResult = ReturnType<
  typeof useCanValuateClaimItemQuery
>
export type CanValuateClaimItemLazyQueryHookResult = ReturnType<
  typeof useCanValuateClaimItemLazyQuery
>
export type CanValuateClaimItemQueryResult = ApolloReactCommon.QueryResult<
  CanValuateClaimItemQuery,
  CanValuateClaimItemQueryVariables
>
export const ChangeFromDateDocument = gql`
  mutation ChangeFromDate($agreementId: ID!, $request: ChangeFromDateInput) {
    changeFromDate(agreementId: $agreementId, request: $request)
  }
`
export type ChangeFromDateMutationFn = ApolloReactCommon.MutationFunction<
  ChangeFromDateMutation,
  ChangeFromDateMutationVariables
>

/**
 * __useChangeFromDateMutation__
 *
 * To run a mutation, you first call `useChangeFromDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFromDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFromDateMutation, { data, loading, error }] = useChangeFromDateMutation({
 *   variables: {
 *      agreementId: // value for 'agreementId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChangeFromDateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeFromDateMutation,
    ChangeFromDateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ChangeFromDateMutation,
    ChangeFromDateMutationVariables
  >(ChangeFromDateDocument, baseOptions)
}
export type ChangeFromDateMutationHookResult = ReturnType<
  typeof useChangeFromDateMutation
>
export type ChangeFromDateMutationResult = ApolloReactCommon.MutationResult<
  ChangeFromDateMutation
>
export type ChangeFromDateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeFromDateMutation,
  ChangeFromDateMutationVariables
>
export const ChangeTerminationDateDocument = gql`
  mutation ChangeTerminationDate(
    $contractId: ID!
    $request: ChangeTerminationDateInput
  ) {
    changeTerminationDate(contractId: $contractId, request: $request) {
      id
      holderMemberId
    }
  }
`
export type ChangeTerminationDateMutationFn = ApolloReactCommon.MutationFunction<
  ChangeTerminationDateMutation,
  ChangeTerminationDateMutationVariables
>

/**
 * __useChangeTerminationDateMutation__
 *
 * To run a mutation, you first call `useChangeTerminationDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTerminationDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTerminationDateMutation, { data, loading, error }] = useChangeTerminationDateMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChangeTerminationDateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeTerminationDateMutation,
    ChangeTerminationDateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ChangeTerminationDateMutation,
    ChangeTerminationDateMutationVariables
  >(ChangeTerminationDateDocument, baseOptions)
}
export type ChangeTerminationDateMutationHookResult = ReturnType<
  typeof useChangeTerminationDateMutation
>
export type ChangeTerminationDateMutationResult = ApolloReactCommon.MutationResult<
  ChangeTerminationDateMutation
>
export type ChangeTerminationDateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeTerminationDateMutation,
  ChangeTerminationDateMutationVariables
>
export const ChangeToDateDocument = gql`
  mutation ChangeToDate($agreementId: ID!, $request: ChangeToDateInput) {
    changeToDate(agreementId: $agreementId, request: $request)
  }
`
export type ChangeToDateMutationFn = ApolloReactCommon.MutationFunction<
  ChangeToDateMutation,
  ChangeToDateMutationVariables
>

/**
 * __useChangeToDateMutation__
 *
 * To run a mutation, you first call `useChangeToDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeToDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeToDateMutation, { data, loading, error }] = useChangeToDateMutation({
 *   variables: {
 *      agreementId: // value for 'agreementId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChangeToDateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeToDateMutation,
    ChangeToDateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ChangeToDateMutation,
    ChangeToDateMutationVariables
  >(ChangeToDateDocument, baseOptions)
}
export type ChangeToDateMutationHookResult = ReturnType<
  typeof useChangeToDateMutation
>
export type ChangeToDateMutationResult = ApolloReactCommon.MutationResult<
  ChangeToDateMutation
>
export type ChangeToDateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeToDateMutation,
  ChangeToDateMutationVariables
>
export const CreatePaymentCompletionLinkDocument = gql`
  mutation CreatePaymentCompletionLink($memberId: ID!) {
    createPaymentCompletionLink(memberId: $memberId) {
      url
    }
  }
`
export type CreatePaymentCompletionLinkMutationFn = ApolloReactCommon.MutationFunction<
  CreatePaymentCompletionLinkMutation,
  CreatePaymentCompletionLinkMutationVariables
>

/**
 * __useCreatePaymentCompletionLinkMutation__
 *
 * To run a mutation, you first call `useCreatePaymentCompletionLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentCompletionLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentCompletionLinkMutation, { data, loading, error }] = useCreatePaymentCompletionLinkMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useCreatePaymentCompletionLinkMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePaymentCompletionLinkMutation,
    CreatePaymentCompletionLinkMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePaymentCompletionLinkMutation,
    CreatePaymentCompletionLinkMutationVariables
  >(CreatePaymentCompletionLinkDocument, baseOptions)
}
export type CreatePaymentCompletionLinkMutationHookResult = ReturnType<
  typeof useCreatePaymentCompletionLinkMutation
>
export type CreatePaymentCompletionLinkMutationResult = ApolloReactCommon.MutationResult<
  CreatePaymentCompletionLinkMutation
>
export type CreatePaymentCompletionLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePaymentCompletionLinkMutation,
  CreatePaymentCompletionLinkMutationVariables
>
export const CreateQuoteForNewContractDocument = gql`
  mutation CreateQuoteForNewContract(
    $memberId: ID!
    $quoteInput: QuoteInput!
    $bypassUnderwritingGuidelines: Boolean!
  ) {
    createQuoteForNewContract(
      memberId: $memberId
      quoteInput: $quoteInput
      bypassUnderwritingGuidelines: $bypassUnderwritingGuidelines
    ) {
      id
    }
  }
`
export type CreateQuoteForNewContractMutationFn = ApolloReactCommon.MutationFunction<
  CreateQuoteForNewContractMutation,
  CreateQuoteForNewContractMutationVariables
>

/**
 * __useCreateQuoteForNewContractMutation__
 *
 * To run a mutation, you first call `useCreateQuoteForNewContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuoteForNewContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuoteForNewContractMutation, { data, loading, error }] = useCreateQuoteForNewContractMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      quoteInput: // value for 'quoteInput'
 *      bypassUnderwritingGuidelines: // value for 'bypassUnderwritingGuidelines'
 *   },
 * });
 */
export function useCreateQuoteForNewContractMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateQuoteForNewContractMutation,
    CreateQuoteForNewContractMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateQuoteForNewContractMutation,
    CreateQuoteForNewContractMutationVariables
  >(CreateQuoteForNewContractDocument, baseOptions)
}
export type CreateQuoteForNewContractMutationHookResult = ReturnType<
  typeof useCreateQuoteForNewContractMutation
>
export type CreateQuoteForNewContractMutationResult = ApolloReactCommon.MutationResult<
  CreateQuoteForNewContractMutation
>
export type CreateQuoteForNewContractMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateQuoteForNewContractMutation,
  CreateQuoteForNewContractMutationVariables
>
export const CreateQuoteFromAgreementDocument = gql`
  mutation CreateQuoteFromAgreement($agreementId: ID!, $memberId: ID!) {
    createQuoteFromAgreement(agreementId: $agreementId, memberId: $memberId) {
      id
    }
  }
`
export type CreateQuoteFromAgreementMutationFn = ApolloReactCommon.MutationFunction<
  CreateQuoteFromAgreementMutation,
  CreateQuoteFromAgreementMutationVariables
>

/**
 * __useCreateQuoteFromAgreementMutation__
 *
 * To run a mutation, you first call `useCreateQuoteFromAgreementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuoteFromAgreementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuoteFromAgreementMutation, { data, loading, error }] = useCreateQuoteFromAgreementMutation({
 *   variables: {
 *      agreementId: // value for 'agreementId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useCreateQuoteFromAgreementMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateQuoteFromAgreementMutation,
    CreateQuoteFromAgreementMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateQuoteFromAgreementMutation,
    CreateQuoteFromAgreementMutationVariables
  >(CreateQuoteFromAgreementDocument, baseOptions)
}
export type CreateQuoteFromAgreementMutationHookResult = ReturnType<
  typeof useCreateQuoteFromAgreementMutation
>
export type CreateQuoteFromAgreementMutationResult = ApolloReactCommon.MutationResult<
  CreateQuoteFromAgreementMutation
>
export type CreateQuoteFromAgreementMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateQuoteFromAgreementMutation,
  CreateQuoteFromAgreementMutationVariables
>
export const GetAccountDocument = gql`
  query GetAccount($memberId: ID!) {
    member(id: $memberId) {
      memberId
      account {
        id
        currentBalance {
          amount
          currency
        }
        totalBalance {
          amount
          currency
        }
        chargeEstimation {
          subscription {
            amount
            currency
          }
          discountCodes
          charge {
            amount
            currency
          }
          discount {
            amount
            currency
          }
        }
        entries {
          id
          amount {
            amount
            currency
          }
          fromDate
          title
          source
          reference
          type
          failedAt
          chargedAt
        }
      }
    }
  }
`

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetAccountQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAccountQuery,
    GetAccountQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    baseOptions,
  )
}
export function useGetAccountLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAccountQuery,
    GetAccountQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetAccountQuery,
    GetAccountQueryVariables
  >(GetAccountDocument, baseOptions)
}
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>
export type GetAccountLazyQueryHookResult = ReturnType<
  typeof useGetAccountLazyQuery
>
export type GetAccountQueryResult = ApolloReactCommon.QueryResult<
  GetAccountQuery,
  GetAccountQueryVariables
>
export const GetClaimItemValuationDocument = gql`
  query GetClaimItemValuation($request: GetValuationInput) {
    getClaimItemValuation(request: $request) {
      depreciatedValue {
        amount
        currency
      }
      valuationRule {
        valuationName
        itemFamily
        itemTypeId
        ageLimit
        valuationTable
        valuationType
        depreciation
      }
    }
  }
`

/**
 * __useGetClaimItemValuationQuery__
 *
 * To run a query within a React component, call `useGetClaimItemValuationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClaimItemValuationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClaimItemValuationQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetClaimItemValuationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetClaimItemValuationQuery,
    GetClaimItemValuationQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetClaimItemValuationQuery,
    GetClaimItemValuationQueryVariables
  >(GetClaimItemValuationDocument, baseOptions)
}
export function useGetClaimItemValuationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetClaimItemValuationQuery,
    GetClaimItemValuationQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetClaimItemValuationQuery,
    GetClaimItemValuationQueryVariables
  >(GetClaimItemValuationDocument, baseOptions)
}
export type GetClaimItemValuationQueryHookResult = ReturnType<
  typeof useGetClaimItemValuationQuery
>
export type GetClaimItemValuationLazyQueryHookResult = ReturnType<
  typeof useGetClaimItemValuationLazyQuery
>
export type GetClaimItemValuationQueryResult = ApolloReactCommon.QueryResult<
  GetClaimItemValuationQuery,
  GetClaimItemValuationQueryVariables
>
export const GetClaimItemsDocument = gql`
  query GetClaimItems($claimId: ID!) {
    claimItems(claimId: $claimId) {
      id
      itemFamily {
        id
        displayName
      }
      itemType {
        id
        displayName
      }
      itemBrand {
        id
        displayName
      }
      itemModel {
        id
        displayName
      }
      dateOfPurchase
      purchasePrice {
        amount
        currency
      }
      valuation {
        amount
        currency
      }
      note
    }
  }
`

/**
 * __useGetClaimItemsQuery__
 *
 * To run a query within a React component, call `useGetClaimItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClaimItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClaimItemsQuery({
 *   variables: {
 *      claimId: // value for 'claimId'
 *   },
 * });
 */
export function useGetClaimItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetClaimItemsQuery,
    GetClaimItemsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetClaimItemsQuery,
    GetClaimItemsQueryVariables
  >(GetClaimItemsDocument, baseOptions)
}
export function useGetClaimItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetClaimItemsQuery,
    GetClaimItemsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetClaimItemsQuery,
    GetClaimItemsQueryVariables
  >(GetClaimItemsDocument, baseOptions)
}
export type GetClaimItemsQueryHookResult = ReturnType<
  typeof useGetClaimItemsQuery
>
export type GetClaimItemsLazyQueryHookResult = ReturnType<
  typeof useGetClaimItemsLazyQuery
>
export type GetClaimItemsQueryResult = ApolloReactCommon.QueryResult<
  GetClaimItemsQuery,
  GetClaimItemsQueryVariables
>
export const GetContractMarketInfoDocument = gql`
  query GetContractMarketInfo($memberId: ID!) {
    member(id: $memberId) {
      memberId
      contractMarketInfo {
        market
        preferredCurrency
      }
    }
  }
`

/**
 * __useGetContractMarketInfoQuery__
 *
 * To run a query within a React component, call `useGetContractMarketInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractMarketInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractMarketInfoQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetContractMarketInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetContractMarketInfoQuery,
    GetContractMarketInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetContractMarketInfoQuery,
    GetContractMarketInfoQueryVariables
  >(GetContractMarketInfoDocument, baseOptions)
}
export function useGetContractMarketInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetContractMarketInfoQuery,
    GetContractMarketInfoQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetContractMarketInfoQuery,
    GetContractMarketInfoQueryVariables
  >(GetContractMarketInfoDocument, baseOptions)
}
export type GetContractMarketInfoQueryHookResult = ReturnType<
  typeof useGetContractMarketInfoQuery
>
export type GetContractMarketInfoLazyQueryHookResult = ReturnType<
  typeof useGetContractMarketInfoLazyQuery
>
export type GetContractMarketInfoQueryResult = ApolloReactCommon.QueryResult<
  GetContractMarketInfoQuery,
  GetContractMarketInfoQueryVariables
>
export const GetContractsDocument = gql`
  query GetContracts($memberId: ID!) {
    member(id: $memberId) {
      memberId
      contracts {
        id
        holderMemberId
        holderFirstName
        holderLastName
        switchedFrom
        masterInception
        status
        isTerminated
        terminationDate
        currentAgreementId
        hasPendingAgreement
        agreements {
          ... on SwedishApartment {
            id
            fromDate
            toDate
            certificateUrl
            status
            premium {
              amount
              currency
            }
            swedishApartmentLineOfBusiness: lineOfBusiness
            address {
              street
              postalCode
              city
            }
            numberCoInsured
            squareMeters
          }
          ... on SwedishHouse {
            id
            fromDate
            toDate
            certificateUrl
            status
            premium {
              amount
              currency
            }
            address {
              street
              postalCode
              city
            }
            numberCoInsured
            squareMeters
            ancillaryArea
            yearOfConstruction
            numberOfBathrooms
            extraBuildings {
              id
              type
              area
              hasWaterConnected
              displayName
            }
            isSubleted
          }
          ... on NorwegianHomeContent {
            id
            fromDate
            toDate
            certificateUrl
            status
            premium {
              amount
              currency
            }
            norwegianHomeContentLineOfBusiness: lineOfBusiness
            address {
              street
              postalCode
              city
            }
            numberCoInsured
            squareMeters
          }
          ... on NorwegianTravel {
            id
            fromDate
            toDate
            certificateUrl
            status
            premium {
              amount
              currency
            }
            norwegianTravelLineOfBusiness: lineOfBusiness
            numberCoInsured
          }
        }
        hasQueuedRenewal
        renewal {
          renewalDate
          draftCertificateUrl
          draftOfAgreementId
        }
        preferredCurrency
        market
        signSource
        contractTypeName
        createdAt
      }
    }
  }
`

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetContractsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetContractsQuery,
    GetContractsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetContractsQuery,
    GetContractsQueryVariables
  >(GetContractsDocument, baseOptions)
}
export function useGetContractsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetContractsQuery,
    GetContractsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetContractsQuery,
    GetContractsQueryVariables
  >(GetContractsDocument, baseOptions)
}
export type GetContractsQueryHookResult = ReturnType<
  typeof useGetContractsQuery
>
export type GetContractsLazyQueryHookResult = ReturnType<
  typeof useGetContractsLazyQuery
>
export type GetContractsQueryResult = ApolloReactCommon.QueryResult<
  GetContractsQuery,
  GetContractsQueryVariables
>
export const GetDashboardNumbersDocument = gql`
  query GetDashboardNumbers {
    dashboardNumbers {
      numberOfClaims
      numberOfQuestions
    }
  }
`

/**
 * __useGetDashboardNumbersQuery__
 *
 * To run a query within a React component, call `useGetDashboardNumbersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardNumbersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardNumbersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardNumbersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetDashboardNumbersQuery,
    GetDashboardNumbersQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetDashboardNumbersQuery,
    GetDashboardNumbersQueryVariables
  >(GetDashboardNumbersDocument, baseOptions)
}
export function useGetDashboardNumbersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDashboardNumbersQuery,
    GetDashboardNumbersQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetDashboardNumbersQuery,
    GetDashboardNumbersQueryVariables
  >(GetDashboardNumbersDocument, baseOptions)
}
export type GetDashboardNumbersQueryHookResult = ReturnType<
  typeof useGetDashboardNumbersQuery
>
export type GetDashboardNumbersLazyQueryHookResult = ReturnType<
  typeof useGetDashboardNumbersLazyQuery
>
export type GetDashboardNumbersQueryResult = ApolloReactCommon.QueryResult<
  GetDashboardNumbersQuery,
  GetDashboardNumbersQueryVariables
>
export const GetItemCategoriesDocument = gql`
  query GetItemCategories($kind: ItemCategoryKind!, $parentId: ID) {
    itemCategories(kind: $kind, parentId: $parentId) {
      ... on ItemFamily {
        id
        displayName
        searchTerms
        nextKind
      }
      ... on ItemType {
        id
        displayName
        searchTerms
        nextKind
      }
      ... on ItemBrand {
        id
        displayName
        searchTerms
        nextKind
      }
      ... on ItemModel {
        id
        displayName
        searchTerms
        nextKind
      }
      ... on ItemCompany {
        id
        displayName
        searchTerms
        nextKind
      }
    }
  }
`

/**
 * __useGetItemCategoriesQuery__
 *
 * To run a query within a React component, call `useGetItemCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemCategoriesQuery({
 *   variables: {
 *      kind: // value for 'kind'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useGetItemCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetItemCategoriesQuery,
    GetItemCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetItemCategoriesQuery,
    GetItemCategoriesQueryVariables
  >(GetItemCategoriesDocument, baseOptions)
}
export function useGetItemCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetItemCategoriesQuery,
    GetItemCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetItemCategoriesQuery,
    GetItemCategoriesQueryVariables
  >(GetItemCategoriesDocument, baseOptions)
}
export type GetItemCategoriesQueryHookResult = ReturnType<
  typeof useGetItemCategoriesQuery
>
export type GetItemCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetItemCategoriesLazyQuery
>
export type GetItemCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetItemCategoriesQuery,
  GetItemCategoriesQueryVariables
>
export const GetMessageHistoryDocument = gql`
  query GetMessageHistory($memberId: ID!) {
    messageHistory(memberId: $memberId) {
      globalId
      author
      fromId
      timestamp
      messageBodyJsonString
    }
  }
`

/**
 * __useGetMessageHistoryQuery__
 *
 * To run a query within a React component, call `useGetMessageHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageHistoryQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetMessageHistoryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMessageHistoryQuery,
    GetMessageHistoryQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetMessageHistoryQuery,
    GetMessageHistoryQueryVariables
  >(GetMessageHistoryDocument, baseOptions)
}
export function useGetMessageHistoryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMessageHistoryQuery,
    GetMessageHistoryQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetMessageHistoryQuery,
    GetMessageHistoryQueryVariables
  >(GetMessageHistoryDocument, baseOptions)
}
export type GetMessageHistoryQueryHookResult = ReturnType<
  typeof useGetMessageHistoryQuery
>
export type GetMessageHistoryLazyQueryHookResult = ReturnType<
  typeof useGetMessageHistoryLazyQuery
>
export type GetMessageHistoryQueryResult = ApolloReactCommon.QueryResult<
  GetMessageHistoryQuery,
  GetMessageHistoryQueryVariables
>
export const GetPartnerCampaignOwnersDocument = gql`
  query GetPartnerCampaignOwners {
    getPartnerCampaignOwners {
      partnerId
    }
  }
`

/**
 * __useGetPartnerCampaignOwnersQuery__
 *
 * To run a query within a React component, call `useGetPartnerCampaignOwnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerCampaignOwnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerCampaignOwnersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartnerCampaignOwnersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPartnerCampaignOwnersQuery,
    GetPartnerCampaignOwnersQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetPartnerCampaignOwnersQuery,
    GetPartnerCampaignOwnersQueryVariables
  >(GetPartnerCampaignOwnersDocument, baseOptions)
}
export function useGetPartnerCampaignOwnersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPartnerCampaignOwnersQuery,
    GetPartnerCampaignOwnersQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetPartnerCampaignOwnersQuery,
    GetPartnerCampaignOwnersQueryVariables
  >(GetPartnerCampaignOwnersDocument, baseOptions)
}
export type GetPartnerCampaignOwnersQueryHookResult = ReturnType<
  typeof useGetPartnerCampaignOwnersQuery
>
export type GetPartnerCampaignOwnersLazyQueryHookResult = ReturnType<
  typeof useGetPartnerCampaignOwnersLazyQuery
>
export type GetPartnerCampaignOwnersQueryResult = ApolloReactCommon.QueryResult<
  GetPartnerCampaignOwnersQuery,
  GetPartnerCampaignOwnersQueryVariables
>
export const FindPartnerCampaignsDocument = gql`
  query FindPartnerCampaigns($input: CampaignFilter!) {
    findPartnerCampaigns(input: $input) {
      id
      campaignCode
      partnerId
      partnerName
      validFrom
      validTo
      incentive {
        ... on MonthlyPercentageDiscountFixedPeriod {
          numberOfMonths
          percentage
        }
        ... on FreeMonths {
          numberOfMonths
        }
        ... on CostDeduction {
          amount
        }
        ... on NoDiscount {
          __typename
        }
        ... on IndefinitePercentageDiscount {
          percentageDiscount
        }
      }
    }
  }
`

/**
 * __useFindPartnerCampaignsQuery__
 *
 * To run a query within a React component, call `useFindPartnerCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPartnerCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPartnerCampaignsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindPartnerCampaignsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindPartnerCampaignsQuery,
    FindPartnerCampaignsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    FindPartnerCampaignsQuery,
    FindPartnerCampaignsQueryVariables
  >(FindPartnerCampaignsDocument, baseOptions)
}
export function useFindPartnerCampaignsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindPartnerCampaignsQuery,
    FindPartnerCampaignsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    FindPartnerCampaignsQuery,
    FindPartnerCampaignsQueryVariables
  >(FindPartnerCampaignsDocument, baseOptions)
}
export type FindPartnerCampaignsQueryHookResult = ReturnType<
  typeof useFindPartnerCampaignsQuery
>
export type FindPartnerCampaignsLazyQueryHookResult = ReturnType<
  typeof useFindPartnerCampaignsLazyQuery
>
export type FindPartnerCampaignsQueryResult = ApolloReactCommon.QueryResult<
  FindPartnerCampaignsQuery,
  FindPartnerCampaignsQueryVariables
>
export const GetQuestionsGroupsDocument = gql`
  query GetQuestionsGroups {
    questionGroups {
      id
      memberId
      questions {
        id
        messageJsonString
        timestamp
      }
    }
  }
`

/**
 * __useGetQuestionsGroupsQuery__
 *
 * To run a query within a React component, call `useGetQuestionsGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQuestionsGroupsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetQuestionsGroupsQuery,
    GetQuestionsGroupsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetQuestionsGroupsQuery,
    GetQuestionsGroupsQueryVariables
  >(GetQuestionsGroupsDocument, baseOptions)
}
export function useGetQuestionsGroupsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetQuestionsGroupsQuery,
    GetQuestionsGroupsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetQuestionsGroupsQuery,
    GetQuestionsGroupsQueryVariables
  >(GetQuestionsGroupsDocument, baseOptions)
}
export type GetQuestionsGroupsQueryHookResult = ReturnType<
  typeof useGetQuestionsGroupsQuery
>
export type GetQuestionsGroupsLazyQueryHookResult = ReturnType<
  typeof useGetQuestionsGroupsLazyQuery
>
export type GetQuestionsGroupsQueryResult = ApolloReactCommon.QueryResult<
  GetQuestionsGroupsQuery,
  GetQuestionsGroupsQueryVariables
>
export const MarkQuestionAsResolvedDocument = gql`
  mutation MarkQuestionAsResolved($memberId: ID!) {
    markQuestionAsResolved(memberId: $memberId)
  }
`
export type MarkQuestionAsResolvedMutationFn = ApolloReactCommon.MutationFunction<
  MarkQuestionAsResolvedMutation,
  MarkQuestionAsResolvedMutationVariables
>

/**
 * __useMarkQuestionAsResolvedMutation__
 *
 * To run a mutation, you first call `useMarkQuestionAsResolvedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkQuestionAsResolvedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markQuestionAsResolvedMutation, { data, loading, error }] = useMarkQuestionAsResolvedMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useMarkQuestionAsResolvedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MarkQuestionAsResolvedMutation,
    MarkQuestionAsResolvedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    MarkQuestionAsResolvedMutation,
    MarkQuestionAsResolvedMutationVariables
  >(MarkQuestionAsResolvedDocument, baseOptions)
}
export type MarkQuestionAsResolvedMutationHookResult = ReturnType<
  typeof useMarkQuestionAsResolvedMutation
>
export type MarkQuestionAsResolvedMutationResult = ApolloReactCommon.MutationResult<
  MarkQuestionAsResolvedMutation
>
export type MarkQuestionAsResolvedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkQuestionAsResolvedMutation,
  MarkQuestionAsResolvedMutationVariables
>
export const RegenerateCertificateDocument = gql`
  mutation RegenerateCertificate($agreementId: ID!) {
    regenerateCertificate(agreementId: $agreementId)
  }
`
export type RegenerateCertificateMutationFn = ApolloReactCommon.MutationFunction<
  RegenerateCertificateMutation,
  RegenerateCertificateMutationVariables
>

/**
 * __useRegenerateCertificateMutation__
 *
 * To run a mutation, you first call `useRegenerateCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegenerateCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regenerateCertificateMutation, { data, loading, error }] = useRegenerateCertificateMutation({
 *   variables: {
 *      agreementId: // value for 'agreementId'
 *   },
 * });
 */
export function useRegenerateCertificateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegenerateCertificateMutation,
    RegenerateCertificateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegenerateCertificateMutation,
    RegenerateCertificateMutationVariables
  >(RegenerateCertificateDocument, baseOptions)
}
export type RegenerateCertificateMutationHookResult = ReturnType<
  typeof useRegenerateCertificateMutation
>
export type RegenerateCertificateMutationResult = ApolloReactCommon.MutationResult<
  RegenerateCertificateMutation
>
export type RegenerateCertificateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegenerateCertificateMutation,
  RegenerateCertificateMutationVariables
>
export const RevertTerminationDocument = gql`
  mutation RevertTermination($contractId: ID!) {
    revertTermination(contractId: $contractId) {
      id
      holderMemberId
    }
  }
`
export type RevertTerminationMutationFn = ApolloReactCommon.MutationFunction<
  RevertTerminationMutation,
  RevertTerminationMutationVariables
>

/**
 * __useRevertTerminationMutation__
 *
 * To run a mutation, you first call `useRevertTerminationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevertTerminationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revertTerminationMutation, { data, loading, error }] = useRevertTerminationMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useRevertTerminationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RevertTerminationMutation,
    RevertTerminationMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RevertTerminationMutation,
    RevertTerminationMutationVariables
  >(RevertTerminationDocument, baseOptions)
}
export type RevertTerminationMutationHookResult = ReturnType<
  typeof useRevertTerminationMutation
>
export type RevertTerminationMutationResult = ApolloReactCommon.MutationResult<
  RevertTerminationMutation
>
export type RevertTerminationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RevertTerminationMutation,
  RevertTerminationMutationVariables
>
export const SendMessageDocument = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ... on SendMessageFailed {
        memberId
        errorCode
        errorMessage
      }
      ... on SendMessageSuccessful {
        memberId
      }
    }
  }
`
export type SendMessageMutationFn = ApolloReactCommon.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SendMessageDocument, baseOptions)
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>
export type SendMessageMutationResult = ApolloReactCommon.MutationResult<
  SendMessageMutation
>
export type SendMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>
export const SetContractForClaimDocument = gql`
  mutation SetContractForClaim($request: SetContractForClaim!) {
    setContractForClaim(request: $request)
  }
`
export type SetContractForClaimMutationFn = ApolloReactCommon.MutationFunction<
  SetContractForClaimMutation,
  SetContractForClaimMutationVariables
>

/**
 * __useSetContractForClaimMutation__
 *
 * To run a mutation, you first call `useSetContractForClaimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetContractForClaimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setContractForClaimMutation, { data, loading, error }] = useSetContractForClaimMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetContractForClaimMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetContractForClaimMutation,
    SetContractForClaimMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SetContractForClaimMutation,
    SetContractForClaimMutationVariables
  >(SetContractForClaimDocument, baseOptions)
}
export type SetContractForClaimMutationHookResult = ReturnType<
  typeof useSetContractForClaimMutation
>
export type SetContractForClaimMutationResult = ApolloReactCommon.MutationResult<
  SetContractForClaimMutation
>
export type SetContractForClaimMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetContractForClaimMutation,
  SetContractForClaimMutationVariables
>
export const SetCoveringEmployeeDocument = gql`
  mutation SetCoveringEmployee($id: ID!, $coveringEmployee: Boolean!) {
    setCoveringEmployee(id: $id, coveringEmployee: $coveringEmployee) {
      coveringEmployee
      events {
        text
        date
      }
    }
  }
`
export type SetCoveringEmployeeMutationFn = ApolloReactCommon.MutationFunction<
  SetCoveringEmployeeMutation,
  SetCoveringEmployeeMutationVariables
>

/**
 * __useSetCoveringEmployeeMutation__
 *
 * To run a mutation, you first call `useSetCoveringEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCoveringEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCoveringEmployeeMutation, { data, loading, error }] = useSetCoveringEmployeeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      coveringEmployee: // value for 'coveringEmployee'
 *   },
 * });
 */
export function useSetCoveringEmployeeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetCoveringEmployeeMutation,
    SetCoveringEmployeeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SetCoveringEmployeeMutation,
    SetCoveringEmployeeMutationVariables
  >(SetCoveringEmployeeDocument, baseOptions)
}
export type SetCoveringEmployeeMutationHookResult = ReturnType<
  typeof useSetCoveringEmployeeMutation
>
export type SetCoveringEmployeeMutationResult = ApolloReactCommon.MutationResult<
  SetCoveringEmployeeMutation
>
export type SetCoveringEmployeeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetCoveringEmployeeMutation,
  SetCoveringEmployeeMutationVariables
>
export const SignQuoteForNewContractDocument = gql`
  mutation SignQuoteForNewContract($quoteId: ID!, $activationDate: LocalDate) {
    signQuoteForNewContract(
      quoteId: $quoteId
      activationDate: $activationDate
    ) {
      id
    }
  }
`
export type SignQuoteForNewContractMutationFn = ApolloReactCommon.MutationFunction<
  SignQuoteForNewContractMutation,
  SignQuoteForNewContractMutationVariables
>

/**
 * __useSignQuoteForNewContractMutation__
 *
 * To run a mutation, you first call `useSignQuoteForNewContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignQuoteForNewContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signQuoteForNewContractMutation, { data, loading, error }] = useSignQuoteForNewContractMutation({
 *   variables: {
 *      quoteId: // value for 'quoteId'
 *      activationDate: // value for 'activationDate'
 *   },
 * });
 */
export function useSignQuoteForNewContractMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignQuoteForNewContractMutation,
    SignQuoteForNewContractMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    SignQuoteForNewContractMutation,
    SignQuoteForNewContractMutationVariables
  >(SignQuoteForNewContractDocument, baseOptions)
}
export type SignQuoteForNewContractMutationHookResult = ReturnType<
  typeof useSignQuoteForNewContractMutation
>
export type SignQuoteForNewContractMutationResult = ApolloReactCommon.MutationResult<
  SignQuoteForNewContractMutation
>
export type SignQuoteForNewContractMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignQuoteForNewContractMutation,
  SignQuoteForNewContractMutationVariables
>
export const TerminateContractDocument = gql`
  mutation TerminateContract(
    $contractId: ID!
    $request: TerminateContractInput
  ) {
    terminateContract(contractId: $contractId, request: $request) {
      id
      holderMemberId
    }
  }
`
export type TerminateContractMutationFn = ApolloReactCommon.MutationFunction<
  TerminateContractMutation,
  TerminateContractMutationVariables
>

/**
 * __useTerminateContractMutation__
 *
 * To run a mutation, you first call `useTerminateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTerminateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [terminateContractMutation, { data, loading, error }] = useTerminateContractMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useTerminateContractMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    TerminateContractMutation,
    TerminateContractMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    TerminateContractMutation,
    TerminateContractMutationVariables
  >(TerminateContractDocument, baseOptions)
}
export type TerminateContractMutationHookResult = ReturnType<
  typeof useTerminateContractMutation
>
export type TerminateContractMutationResult = ApolloReactCommon.MutationResult<
  TerminateContractMutation
>
export type TerminateContractMutationOptions = ApolloReactCommon.BaseMutationOptions<
  TerminateContractMutation,
  TerminateContractMutationVariables
>
export const UpdateClaimStateDocument = gql`
  mutation UpdateClaimState($id: ID!, $state: ClaimState!) {
    updateClaimState(id: $id, state: $state) {
      state
      events {
        text
        date
      }
    }
  }
`
export type UpdateClaimStateMutationFn = ApolloReactCommon.MutationFunction<
  UpdateClaimStateMutation,
  UpdateClaimStateMutationVariables
>

/**
 * __useUpdateClaimStateMutation__
 *
 * To run a mutation, you first call `useUpdateClaimStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClaimStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClaimStateMutation, { data, loading, error }] = useUpdateClaimStateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useUpdateClaimStateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateClaimStateMutation,
    UpdateClaimStateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateClaimStateMutation,
    UpdateClaimStateMutationVariables
  >(UpdateClaimStateDocument, baseOptions)
}
export type UpdateClaimStateMutationHookResult = ReturnType<
  typeof useUpdateClaimStateMutation
>
export type UpdateClaimStateMutationResult = ApolloReactCommon.MutationResult<
  UpdateClaimStateMutation
>
export type UpdateClaimStateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateClaimStateMutation,
  UpdateClaimStateMutationVariables
>
export const DeleteClaimItemDocument = gql`
  mutation DeleteClaimItem($claimItemId: ID!) {
    deleteClaimItem(claimItemId: $claimItemId)
  }
`
export type DeleteClaimItemMutationFn = ApolloReactCommon.MutationFunction<
  DeleteClaimItemMutation,
  DeleteClaimItemMutationVariables
>

/**
 * __useDeleteClaimItemMutation__
 *
 * To run a mutation, you first call `useDeleteClaimItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClaimItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClaimItemMutation, { data, loading, error }] = useDeleteClaimItemMutation({
 *   variables: {
 *      claimItemId: // value for 'claimItemId'
 *   },
 * });
 */
export function useDeleteClaimItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteClaimItemMutation,
    DeleteClaimItemMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteClaimItemMutation,
    DeleteClaimItemMutationVariables
  >(DeleteClaimItemDocument, baseOptions)
}
export type DeleteClaimItemMutationHookResult = ReturnType<
  typeof useDeleteClaimItemMutation
>
export type DeleteClaimItemMutationResult = ApolloReactCommon.MutationResult<
  DeleteClaimItemMutation
>
export type DeleteClaimItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteClaimItemMutation,
  DeleteClaimItemMutationVariables
>
export const UpsertClaimItemDocument = gql`
  mutation UpsertClaimItem($request: UpsertClaimItemInput) {
    upsertClaimItem(request: $request)
  }
`
export type UpsertClaimItemMutationFn = ApolloReactCommon.MutationFunction<
  UpsertClaimItemMutation,
  UpsertClaimItemMutationVariables
>

/**
 * __useUpsertClaimItemMutation__
 *
 * To run a mutation, you first call `useUpsertClaimItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertClaimItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertClaimItemMutation, { data, loading, error }] = useUpsertClaimItemMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpsertClaimItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertClaimItemMutation,
    UpsertClaimItemMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertClaimItemMutation,
    UpsertClaimItemMutationVariables
  >(UpsertClaimItemDocument, baseOptions)
}
export type UpsertClaimItemMutationHookResult = ReturnType<
  typeof useUpsertClaimItemMutation
>
export type UpsertClaimItemMutationResult = ApolloReactCommon.MutationResult<
  UpsertClaimItemMutation
>
export type UpsertClaimItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertClaimItemMutation,
  UpsertClaimItemMutationVariables
>
export const UpsertItemTypeDocument = gql`
  mutation UpsertItemType($request: UpsertItemTypeInput) {
    upsertItemType(request: $request)
  }
`
export type UpsertItemTypeMutationFn = ApolloReactCommon.MutationFunction<
  UpsertItemTypeMutation,
  UpsertItemTypeMutationVariables
>

/**
 * __useUpsertItemTypeMutation__
 *
 * To run a mutation, you first call `useUpsertItemTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertItemTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertItemTypeMutation, { data, loading, error }] = useUpsertItemTypeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpsertItemTypeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertItemTypeMutation,
    UpsertItemTypeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertItemTypeMutation,
    UpsertItemTypeMutationVariables
  >(UpsertItemTypeDocument, baseOptions)
}
export type UpsertItemTypeMutationHookResult = ReturnType<
  typeof useUpsertItemTypeMutation
>
export type UpsertItemTypeMutationResult = ApolloReactCommon.MutationResult<
  UpsertItemTypeMutation
>
export type UpsertItemTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertItemTypeMutation,
  UpsertItemTypeMutationVariables
>
export const UpsertItemBrandDocument = gql`
  mutation UpsertItemBrand($request: UpsertItemBrandInput) {
    upsertItemBrand(request: $request)
  }
`
export type UpsertItemBrandMutationFn = ApolloReactCommon.MutationFunction<
  UpsertItemBrandMutation,
  UpsertItemBrandMutationVariables
>

/**
 * __useUpsertItemBrandMutation__
 *
 * To run a mutation, you first call `useUpsertItemBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertItemBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertItemBrandMutation, { data, loading, error }] = useUpsertItemBrandMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpsertItemBrandMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertItemBrandMutation,
    UpsertItemBrandMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertItemBrandMutation,
    UpsertItemBrandMutationVariables
  >(UpsertItemBrandDocument, baseOptions)
}
export type UpsertItemBrandMutationHookResult = ReturnType<
  typeof useUpsertItemBrandMutation
>
export type UpsertItemBrandMutationResult = ApolloReactCommon.MutationResult<
  UpsertItemBrandMutation
>
export type UpsertItemBrandMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertItemBrandMutation,
  UpsertItemBrandMutationVariables
>
export const UpsertItemModelDocument = gql`
  mutation UpsertItemModel($request: UpsertItemModelInput) {
    upsertItemModel(request: $request)
  }
`
export type UpsertItemModelMutationFn = ApolloReactCommon.MutationFunction<
  UpsertItemModelMutation,
  UpsertItemModelMutationVariables
>

/**
 * __useUpsertItemModelMutation__
 *
 * To run a mutation, you first call `useUpsertItemModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertItemModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertItemModelMutation, { data, loading, error }] = useUpsertItemModelMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpsertItemModelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertItemModelMutation,
    UpsertItemModelMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertItemModelMutation,
    UpsertItemModelMutationVariables
  >(UpsertItemModelDocument, baseOptions)
}
export type UpsertItemModelMutationHookResult = ReturnType<
  typeof useUpsertItemModelMutation
>
export type UpsertItemModelMutationResult = ApolloReactCommon.MutationResult<
  UpsertItemModelMutation
>
export type UpsertItemModelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertItemModelMutation,
  UpsertItemModelMutationVariables
>
export const UpsertItemCompanyDocument = gql`
  mutation UpsertItemCompany($request: UpsertItemCompanyInput) {
    upsertItemCompany(request: $request)
  }
`
export type UpsertItemCompanyMutationFn = ApolloReactCommon.MutationFunction<
  UpsertItemCompanyMutation,
  UpsertItemCompanyMutationVariables
>

/**
 * __useUpsertItemCompanyMutation__
 *
 * To run a mutation, you first call `useUpsertItemCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertItemCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertItemCompanyMutation, { data, loading, error }] = useUpsertItemCompanyMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpsertItemCompanyMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertItemCompanyMutation,
    UpsertItemCompanyMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertItemCompanyMutation,
    UpsertItemCompanyMutationVariables
  >(UpsertItemCompanyDocument, baseOptions)
}
export type UpsertItemCompanyMutationHookResult = ReturnType<
  typeof useUpsertItemCompanyMutation
>
export type UpsertItemCompanyMutationResult = ApolloReactCommon.MutationResult<
  UpsertItemCompanyMutation
>
export type UpsertItemCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertItemCompanyMutation,
  UpsertItemCompanyMutationVariables
>

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'QuoteData',
        possibleTypes: [
          {
            name: 'ApartmentQuoteData',
          },
          {
            name: 'HouseQuoteData',
          },
          {
            name: 'NorwegianHomeContentQuoteData',
          },
          {
            name: 'NorwegianTravelQuoteData',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'IQuoteData',
        possibleTypes: [
          {
            name: 'ApartmentQuoteData',
          },
          {
            name: 'HouseQuoteData',
          },
          {
            name: 'NorwegianHomeContentQuoteData',
          },
          {
            name: 'NorwegianTravelQuoteData',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'Agreement',
        possibleTypes: [
          {
            name: 'SwedishApartment',
          },
          {
            name: 'SwedishHouse',
          },
          {
            name: 'NorwegianHomeContent',
          },
          {
            name: 'NorwegianTravel',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'AgreementCore',
        possibleTypes: [
          {
            name: 'SwedishApartment',
          },
          {
            name: 'SwedishHouse',
          },
          {
            name: 'NorwegianHomeContent',
          },
          {
            name: 'NorwegianTravel',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'ClaimType',
        possibleTypes: [
          {
            name: 'TheftClaim',
          },
          {
            name: 'AccidentalDamageClaim',
          },
          {
            name: 'AssaultClaim',
          },
          {
            name: 'WaterDamageClaim',
          },
          {
            name: 'TravelAccidentClaim',
          },
          {
            name: 'LuggageDelayClaim',
          },
          {
            name: 'NotCoveredClaim',
          },
          {
            name: 'FireDamageClaim',
          },
          {
            name: 'ConfirmedFraudClaim',
          },
          {
            name: 'LiabilityClaim',
          },
          {
            name: 'ApplianceClaim',
          },
          {
            name: 'LegalProtectionClaim',
          },
          {
            name: 'WaterDamageBathroomClaim',
          },
          {
            name: 'WaterDamageKitchenClaim',
          },
          {
            name: 'BurglaryClaim',
          },
          {
            name: 'FloodingClaim',
          },
          {
            name: 'EarthquakeClaim',
          },
          {
            name: 'InstallationsClaim',
          },
          {
            name: 'SnowPressureClaim',
          },
          {
            name: 'StormDamageClaim',
          },
          {
            name: 'VerminAndPestsClaim',
          },
          {
            name: 'TestClaim',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'ItemCategory',
        possibleTypes: [
          {
            name: 'ItemFamily',
          },
          {
            name: 'ItemType',
          },
          {
            name: 'ItemBrand',
          },
          {
            name: 'ItemModel',
          },
          {
            name: 'ItemCompany',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'ItemCategoryCore',
        possibleTypes: [
          {
            name: 'ItemFamily',
          },
          {
            name: 'ItemType',
          },
          {
            name: 'ItemBrand',
          },
          {
            name: 'ItemModel',
          },
          {
            name: 'ItemCompany',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'Incentive',
        possibleTypes: [
          {
            name: 'MonthlyPercentageDiscountFixedPeriod',
          },
          {
            name: 'FreeMonths',
          },
          {
            name: 'CostDeduction',
          },
          {
            name: 'NoDiscount',
          },
          {
            name: 'IndefinitePercentageDiscount',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'SendMessageResponse',
        possibleTypes: [
          {
            name: 'SendMessageSuccessful',
          },
          {
            name: 'SendMessageFailed',
          },
        ],
      },
    ],
  },
}
export default result
