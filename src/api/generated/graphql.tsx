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
  /** A String-representation of `java.time.YearMonth`. ex: `"2018-06"` */
  YearMonth: any
  /** An object-representation of `javax.money.MonetaryAmount`. ex: `{"amount": 100,  "currency": "SEK"}` */
  MonetaryAmount: any
  /** A String-representation of `java.time.Instant`. ex: `"2018-06-11T20:08:30.123456"` */
  Instant: any
  /** A String-representation of `java.time.LocalDate`, ex:  `"2018-09-26"` */
  LocalDate: any
  /** A String-representation of `java.net.URL`, ex: "https://www.google.com/" */
  URL: any
  /** A String-representation of `java.time.LocalDateTIme`. ex: `"2018-06-11T20:08:30.123456"` */
  LocalDateTime: any
  /** A String-representation of `java.time.LocalTime`, */
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
  currentBalance: Scalars['MonetaryAmount']
  totalBalance: Scalars['MonetaryAmount']
  chargeEstimation: AccountChargeEstimation
  entries: Array<AccountEntry>
}

export type AccountChargeEstimation = {
  __typename?: 'AccountChargeEstimation'
  subscription: Scalars['MonetaryAmount']
  discount: Scalars['MonetaryAmount']
  charge: Scalars['MonetaryAmount']
  discountCodes: Array<Scalars['String']>
}

export type AccountEntry = {
  __typename?: 'AccountEntry'
  id: Scalars['ID']
  type: AccountEntryType
  amount: Scalars['MonetaryAmount']
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
  Loss = 'LOSS',
}

export type AllRepliesEntry = {
  __typename?: 'AllRepliesEntry'
  intent: Scalars['String']
  reply: Scalars['String']
}

export type ApartmentQuoteData = IQuoteData & {
  __typename?: 'ApartmentQuoteData'
  id: Scalars['ID']
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
  SubletRental = 'SUBLET_RENTAL',
  SubletBrf = 'SUBLET_BRF',
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

export type AutoLabel = {
  __typename?: 'AutoLabel'
  message?: Maybe<Scalars['Boolean']>
}

export type BurglaryClaim = {
  __typename?: 'BurglaryClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
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
  payments?: Maybe<Array<Maybe<ClaimPayment>>>
  events?: Maybe<Array<Maybe<ClaimEvent>>>
  coveringEmployee: Scalars['Boolean']
  claimFiles: Array<ClaimFileUpload>
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
  type: ExtraBuildingType
  area: Scalars['Int']
  hasWaterConnected: Scalars['Boolean']
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

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
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

export type InstallationsClaim = {
  __typename?: 'InstallationsClaim'
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
}

export type InventoryItem = {
  __typename?: 'InventoryItem'
  inventoryItemId: Scalars['ID']
  claimId: Scalars['String']
  itemName: Scalars['String']
  categoryName: Scalars['String']
  value: Scalars['Float']
  purchaseDate?: Maybe<Scalars['LocalDate']>
}

export type InventoryItemInput = {
  inventoryItemId?: Maybe<Scalars['String']>
  claimId: Scalars['String']
  itemName: Scalars['String']
  categoryName: Scalars['String']
  value: Scalars['Float']
  purchaseDate?: Maybe<Scalars['LocalDate']>
}

export type IQuoteData = {
  id: Scalars['ID']
  ssn?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
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
  quotes: Array<Quote>
}

export type MemberMonthlySubscriptionArgs = {
  month: Scalars['YearMonth']
}

export type MemberChargeApproval = {
  memberId: Scalars['ID']
  amount: Scalars['MonetaryAmount']
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
  autoLabelQuestion?: Maybe<AutoLabel>
  questionIsDone?: Maybe<Scalars['Boolean']>
  whitelistMember?: Maybe<Scalars['Boolean']>
  markClaimFileAsDeleted?: Maybe<Scalars['Boolean']>
  backfillSubscriptions: Member
  setClaimFileCategory?: Maybe<Scalars['String']>
  addInventoryItem?: Maybe<Scalars['Boolean']>
  removeInventoryItem?: Maybe<Scalars['Boolean']>
  activateQuote: Quote
  /** Creates a quote from a product and returns the quote id */
  createQuoteFromProduct: Quote
  updateQuote: Quote
  markSwitchableSwitcherEmailAsReminded?: Maybe<Scalars['Boolean']>
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

export type MutationTypeAutoLabelQuestionArgs = {
  question: Scalars['String']
  label: Scalars['String']
  memberId?: Maybe<Scalars['String']>
  messageIds?: Maybe<Array<Scalars['String']>>
}

export type MutationTypeQuestionIsDoneArgs = {
  memberId: Scalars['ID']
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

export type MutationTypeAddInventoryItemArgs = {
  item: InventoryItemInput
}

export type MutationTypeRemoveInventoryItemArgs = {
  inventoryItemId: Scalars['ID']
}

export type MutationTypeActivateQuoteArgs = {
  id: Scalars['ID']
  activationDate: Scalars['LocalDate']
  terminationDate?: Maybe<Scalars['LocalDate']>
}

export type MutationTypeCreateQuoteFromProductArgs = {
  memberId: Scalars['ID']
  quoteData: QuoteFromProductInput
}

export type MutationTypeUpdateQuoteArgs = {
  quoteId: Scalars['ID']
  quoteData: QuoteInput
  bypassUnderwritingGuidelines?: Maybe<Scalars['Boolean']>
}

export type MutationTypeMarkSwitchableSwitcherEmailAsRemindedArgs = {
  id: Scalars['ID']
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
  personFlags?: Maybe<Array<Maybe<Flag>>>
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
  getAnswerSuggestion: Array<Suggestion>
  me?: Maybe<Scalars['String']>
  inventory: Array<Maybe<InventoryItem>>
  categories?: Maybe<Array<Scalars['String']>>
  itemSuggestions: Array<SearchItem>
  itemDetails: SearchItem
  switchableSwitcherEmails: Array<SwitchableSwitcherEmail>
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

export type QueryTypeGetAnswerSuggestionArgs = {
  question?: Maybe<Scalars['String']>
}

export type QueryTypeInventoryArgs = {
  claimId: Scalars['ID']
}

export type QueryTypeItemSuggestionsArgs = {
  query: Scalars['String']
}

export type QueryTypeItemDetailsArgs = {
  ids?: Maybe<Array<Scalars['String']>>
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
}

export type QuoteData = ApartmentQuoteData | HouseQuoteData

export type QuoteFromProductInput = {
  incompleteHouseQuoteData?: Maybe<HouseQuoteDataInput>
  incompleteApartmentQuoteData?: Maybe<ApartmentQuoteDataInput>
  originatingProductId?: Maybe<Scalars['ID']>
  currentInsurer?: Maybe<Scalars['String']>
}

export type QuoteInput = {
  productType?: Maybe<QuoteProductType>
  currentInsurer?: Maybe<Scalars['String']>
  apartmentData?: Maybe<ApartmentQuoteInput>
  houseData?: Maybe<HouseQuoteInput>
  originatingProductId?: Maybe<Scalars['ID']>
}

export enum QuoteProductType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
  Object = 'OBJECT',
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

export type SearchItem = {
  __typename?: 'SearchItem'
  name?: Maybe<Scalars['String']>
  category?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  pricerunnerId?: Maybe<Array<Maybe<Scalars['String']>>>
  price?: Maybe<Scalars['Float']>
}

export type SnowPressureClaim = {
  __typename?: 'SnowPressureClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type StormDamageClaim = {
  __typename?: 'StormDamageClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export type Suggestion = {
  __typename?: 'Suggestion'
  intent: Scalars['String']
  reply: Scalars['String']
  text: Scalars['String']
  confidence: Scalars['Float']
  allReplies: Array<AllRepliesEntry>
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
  amount?: Maybe<Scalars['MonetaryAmount']>
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

export type VerminAndPestsClaim = {
  __typename?: 'VerminAndPestsClaim'
  date?: Maybe<Scalars['LocalDate']>
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

export type AddIventoryItemMutationVariables = {
  item: InventoryItemInput
}

export type AddIventoryItemMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'addInventoryItem'
>

export type RemoveIventoryItemMutationVariables = {
  inventoryItemId: Scalars['ID']
}

export type RemoveIventoryItemMutation = { __typename?: 'MutationType' } & Pick<
  MutationType,
  'removeInventoryItem'
>

export type GetInventoryQueryVariables = {
  claimId: Scalars['ID']
}

export type GetInventoryQuery = { __typename?: 'QueryType' } & {
  inventory: Array<
    Maybe<
      { __typename?: 'InventoryItem' } & Pick<
        InventoryItem,
        | 'inventoryItemId'
        | 'claimId'
        | 'itemName'
        | 'categoryName'
        | 'value'
        | 'purchaseDate'
      >
    >
  >
}

export type GetCategoriesQueryVariables = {}

export type GetCategoriesQuery = { __typename?: 'QueryType' } & Pick<
  QueryType,
  'categories'
>

export type GetSuggestionsQueryVariables = {
  query: Scalars['String']
}

export type GetSuggestionsQuery = { __typename?: 'QueryType' } & {
  itemSuggestions: Array<
    { __typename?: 'SearchItem' } & Pick<
      SearchItem,
      'name' | 'pricerunnerId' | 'url'
    >
  >
}

export type GetDetailsQueryVariables = {
  ids: Array<Scalars['String']>
}

export type GetDetailsQuery = { __typename?: 'QueryType' } & {
  itemDetails: { __typename?: 'SearchItem' } & Pick<
    SearchItem,
    'category' | 'price'
  >
}

export type MemberNameQueryVariables = {
  memberId: Scalars['ID']
}

export type MemberNameQuery = { __typename?: 'QueryType' } & {
  member: Maybe<
    { __typename?: 'Member' } & Pick<Member, 'firstName' | 'lastName'>
  >
}

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

export const AddIventoryItemDocument = gql`
  mutation AddIventoryItem($item: InventoryItemInput!) {
    addInventoryItem(item: $item)
  }
`
export type AddIventoryItemMutationFn = ApolloReactCommon.MutationFunction<
  AddIventoryItemMutation,
  AddIventoryItemMutationVariables
>

/**
 * __useAddIventoryItemMutation__
 *
 * To run a mutation, you first call `useAddIventoryItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIventoryItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIventoryItemMutation, { data, loading, error }] = useAddIventoryItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useAddIventoryItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddIventoryItemMutation,
    AddIventoryItemMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddIventoryItemMutation,
    AddIventoryItemMutationVariables
  >(AddIventoryItemDocument, baseOptions)
}
export type AddIventoryItemMutationHookResult = ReturnType<
  typeof useAddIventoryItemMutation
>
export type AddIventoryItemMutationResult = ApolloReactCommon.MutationResult<
  AddIventoryItemMutation
>
export type AddIventoryItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddIventoryItemMutation,
  AddIventoryItemMutationVariables
>
export const RemoveIventoryItemDocument = gql`
  mutation RemoveIventoryItem($inventoryItemId: ID!) {
    removeInventoryItem(inventoryItemId: $inventoryItemId)
  }
`
export type RemoveIventoryItemMutationFn = ApolloReactCommon.MutationFunction<
  RemoveIventoryItemMutation,
  RemoveIventoryItemMutationVariables
>

/**
 * __useRemoveIventoryItemMutation__
 *
 * To run a mutation, you first call `useRemoveIventoryItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveIventoryItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeIventoryItemMutation, { data, loading, error }] = useRemoveIventoryItemMutation({
 *   variables: {
 *      inventoryItemId: // value for 'inventoryItemId'
 *   },
 * });
 */
export function useRemoveIventoryItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveIventoryItemMutation,
    RemoveIventoryItemMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveIventoryItemMutation,
    RemoveIventoryItemMutationVariables
  >(RemoveIventoryItemDocument, baseOptions)
}
export type RemoveIventoryItemMutationHookResult = ReturnType<
  typeof useRemoveIventoryItemMutation
>
export type RemoveIventoryItemMutationResult = ApolloReactCommon.MutationResult<
  RemoveIventoryItemMutation
>
export type RemoveIventoryItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveIventoryItemMutation,
  RemoveIventoryItemMutationVariables
>
export const GetInventoryDocument = gql`
  query GetInventory($claimId: ID!) {
    inventory(claimId: $claimId) {
      inventoryItemId
      claimId
      itemName
      categoryName
      value
      purchaseDate
    }
  }
`

/**
 * __useGetInventoryQuery__
 *
 * To run a query within a React component, call `useGetInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInventoryQuery({
 *   variables: {
 *      claimId: // value for 'claimId'
 *   },
 * });
 */
export function useGetInventoryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetInventoryQuery,
    GetInventoryQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetInventoryQuery,
    GetInventoryQueryVariables
  >(GetInventoryDocument, baseOptions)
}
export function useGetInventoryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInventoryQuery,
    GetInventoryQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetInventoryQuery,
    GetInventoryQueryVariables
  >(GetInventoryDocument, baseOptions)
}
export type GetInventoryQueryHookResult = ReturnType<
  typeof useGetInventoryQuery
>
export type GetInventoryLazyQueryHookResult = ReturnType<
  typeof useGetInventoryLazyQuery
>
export type GetInventoryQueryResult = ApolloReactCommon.QueryResult<
  GetInventoryQuery,
  GetInventoryQueryVariables
>
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories
  }
`

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, baseOptions)
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, baseOptions)
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>
export const GetSuggestionsDocument = gql`
  query GetSuggestions($query: String!) {
    itemSuggestions(query: $query) {
      name
      pricerunnerId
      url
    }
  }
`

/**
 * __useGetSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestionsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetSuggestionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSuggestionsQuery,
    GetSuggestionsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetSuggestionsQuery,
    GetSuggestionsQueryVariables
  >(GetSuggestionsDocument, baseOptions)
}
export function useGetSuggestionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSuggestionsQuery,
    GetSuggestionsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetSuggestionsQuery,
    GetSuggestionsQueryVariables
  >(GetSuggestionsDocument, baseOptions)
}
export type GetSuggestionsQueryHookResult = ReturnType<
  typeof useGetSuggestionsQuery
>
export type GetSuggestionsLazyQueryHookResult = ReturnType<
  typeof useGetSuggestionsLazyQuery
>
export type GetSuggestionsQueryResult = ApolloReactCommon.QueryResult<
  GetSuggestionsQuery,
  GetSuggestionsQueryVariables
>
export const GetDetailsDocument = gql`
  query GetDetails($ids: [String!]!) {
    itemDetails(ids: $ids) {
      category
      price
    }
  }
`

/**
 * __useGetDetailsQuery__
 *
 * To run a query within a React component, call `useGetDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetDetailsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetDetailsQuery,
    GetDetailsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetDetailsQuery, GetDetailsQueryVariables>(
    GetDetailsDocument,
    baseOptions,
  )
}
export function useGetDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDetailsQuery,
    GetDetailsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetDetailsQuery,
    GetDetailsQueryVariables
  >(GetDetailsDocument, baseOptions)
}
export type GetDetailsQueryHookResult = ReturnType<typeof useGetDetailsQuery>
export type GetDetailsLazyQueryHookResult = ReturnType<
  typeof useGetDetailsLazyQuery
>
export type GetDetailsQueryResult = ApolloReactCommon.QueryResult<
  GetDetailsQuery,
  GetDetailsQueryVariables
>
export const MemberNameDocument = gql`
  query MemberName($memberId: ID!) {
    member(id: $memberId) {
      firstName
      lastName
    }
  }
`

/**
 * __useMemberNameQuery__
 *
 * To run a query within a React component, call `useMemberNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberNameQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useMemberNameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MemberNameQuery,
    MemberNameQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MemberNameQuery, MemberNameQueryVariables>(
    MemberNameDocument,
    baseOptions,
  )
}
export function useMemberNameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MemberNameQuery,
    MemberNameQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    MemberNameQuery,
    MemberNameQueryVariables
  >(MemberNameDocument, baseOptions)
}
export type MemberNameQueryHookResult = ReturnType<typeof useMemberNameQuery>
export type MemberNameLazyQueryHookResult = ReturnType<
  typeof useMemberNameLazyQuery
>
export type MemberNameQueryResult = ApolloReactCommon.QueryResult<
  MemberNameQuery,
  MemberNameQueryVariables
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
    ],
  },
}
export default result
