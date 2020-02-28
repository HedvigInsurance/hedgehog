import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
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

export interface AccidentalDamageClaim {
  __typename?: 'AccidentalDamageClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export interface Account {
  __typename?: 'Account'
  id: Scalars['ID']
  currentBalance: Scalars['MonetaryAmount']
  totalBalance: Scalars['MonetaryAmount']
  chargeEstimation: AccountChargeEstimation
  entries: AccountEntry[]
}

export interface AccountChargeEstimation {
  __typename?: 'AccountChargeEstimation'
  subscription: Scalars['MonetaryAmount']
  discount: Scalars['MonetaryAmount']
  charge: Scalars['MonetaryAmount']
  discountCodes: Array<Scalars['String']>
}

export interface AccountEntry {
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

export interface AccountEntryInput {
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

export interface AllRepliesEntry {
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

export interface ApartmentQuoteDataInput {
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

export interface ApartmentQuoteInput {
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

export interface ApplianceClaim {
  __typename?: 'ApplianceClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
}

export interface AssaultClaim {
  __typename?: 'AssaultClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  policeReport?: Maybe<Scalars['String']>
}

export interface AutoLabel {
  __typename?: 'AutoLabel'
  message?: Maybe<Scalars['Boolean']>
}

export interface BurglaryClaim {
  __typename?: 'BurglaryClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export interface Category {
  __typename?: 'Category'
  id: Scalars['String']
  name: Scalars['String']
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

export interface Claim {
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
  claimFiles: ClaimFileUpload[]
}

export interface ClaimEvent {
  __typename?: 'ClaimEvent'
  text?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['Instant']>
}

export interface ClaimFileUpload {
  __typename?: 'ClaimFileUpload'
  claimFileId?: Maybe<Scalars['ID']>
  fileUploadUrl?: Maybe<Scalars['URL']>
  uploadedAt?: Maybe<Scalars['Instant']>
  claimId?: Maybe<Scalars['ID']>
  category?: Maybe<Scalars['String']>
  contentType?: Maybe<Scalars['String']>
}

export interface ClaimInformationInput {
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
  ticket?: Maybe<Scalars['String']>
}

export interface ClaimNote {
  __typename?: 'ClaimNote'
  text?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDateTime']>
}

export interface ClaimNoteInput {
  text: Scalars['String']
}

export interface ClaimPayment {
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

export interface ClaimPaymentInput {
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

export interface ConfirmedFraudClaim {
  __typename?: 'ConfirmedFraudClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface Debt {
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

export interface DirectDebitStatus {
  __typename?: 'DirectDebitStatus'
  activated?: Maybe<Scalars['Boolean']>
}

export interface EarthquakeClaim {
  __typename?: 'EarthquakeClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface ExtraBuilding {
  __typename?: 'ExtraBuilding'
  type: ExtraBuildingType
  area: Scalars['Int']
  hasWaterConnected: Scalars['Boolean']
}

export interface ExtraBuildingInput {
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

export interface FileUpload {
  __typename?: 'FileUpload'
  fileUploadUrl?: Maybe<Scalars['URL']>
  timestamp?: Maybe<Scalars['Instant']>
  mimeType?: Maybe<Scalars['String']>
  memberId?: Maybe<Scalars['ID']>
}

export interface Filter {
  name: Scalars['String']
  value: Scalars['String']
}

export interface FilterOutput {
  __typename?: 'FilterOutput'
  name: Scalars['String']
  value: Scalars['String']
}

export interface FilterPayload {
  filters: Filter[]
  inventoryItemId: Scalars['ID']
}

export interface FilterSuggestion {
  __typename?: 'FilterSuggestion'
  name: Scalars['String']
  items: Array<Scalars['String']>
  others: Array<Scalars['String']>
}

export interface FireDamageClaim {
  __typename?: 'FireDamageClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
}

export enum Flag {
  Green = 'GREEN',
  Amber = 'AMBER',
  Red = 'RED',
}

export interface FloodingClaim {
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
  extraBuildings: ExtraBuilding[]
  isSubleted?: Maybe<Scalars['Boolean']>
}

export interface HouseQuoteDataInput {
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
  extraBuildings: ExtraBuildingInput[]
  isSubleted?: Maybe<Scalars['Boolean']>
}

export interface HouseQuoteInput {
  street?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  zipCode?: Maybe<Scalars['String']>
  householdSize?: Maybe<Scalars['Int']>
  livingSpace?: Maybe<Scalars['Int']>
  ancillaryArea?: Maybe<Scalars['Int']>
  yearOfConstruction?: Maybe<Scalars['Int']>
  numberOfBathrooms?: Maybe<Scalars['Int']>
  extraBuildings?: Maybe<ExtraBuildingInput[]>
  isSubleted?: Maybe<Scalars['Boolean']>
}

export interface InstallationsClaim {
  __typename?: 'InstallationsClaim'
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
}

export interface InventoryItem {
  __typename?: 'InventoryItem'
  inventoryItemId: Scalars['ID']
  claimId: Scalars['String']
  itemName: Scalars['String']
  categoryName: Scalars['String']
  categoryId: Scalars['String']
  value: Scalars['Float']
  source: Scalars['String']
  upperRange?: Maybe<Scalars['Float']>
  lowerRange?: Maybe<Scalars['Float']>
  itemId?: Maybe<Scalars['String']>
  filters?: Maybe<Array<Maybe<FilterOutput>>>
}

export interface InventoryItemInput {
  inventoryItemId?: Maybe<Scalars['String']>
  claimId: Scalars['String']
  itemName: Scalars['String']
  categoryName: Scalars['String']
  categoryId: Scalars['String']
  value: Scalars['Float']
  source: Scalars['String']
  upperRange?: Maybe<Scalars['Float']>
  lowerRange?: Maybe<Scalars['Float']>
  itemId?: Maybe<Scalars['String']>
  filters?: Maybe<Array<Maybe<Filter>>>
}

export interface IQuoteData {
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

export interface Item {
  __typename?: 'Item'
  category: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
}

export interface ItemSearch {
  __typename?: 'ItemSearch'
  products: Item[]
  suggestions: FilterSuggestion[]
}

export interface LegalProtectionClaim {
  __typename?: 'LegalProtectionClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface LiabilityClaim {
  __typename?: 'LiabilityClaim'
  date?: Maybe<Scalars['LocalDate']>
  location?: Maybe<Scalars['String']>
}

export interface LuggageDelayClaim {
  __typename?: 'LuggageDelayClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  ticket?: Maybe<Scalars['String']>
}

export interface Member {
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
  fileUploads: FileUpload[]
  person?: Maybe<Person>
  numberFailedCharges?: Maybe<NumberFailedCharges>
  quotes: Quote[]
}

export interface MemberMonthlySubscriptionArgs {
  month: Scalars['YearMonth']
}

export interface MemberChargeApproval {
  memberId: Scalars['ID']
  amount: Scalars['MonetaryAmount']
}

export interface MonthlySubscription {
  __typename?: 'MonthlySubscription'
  amount?: Maybe<Scalars['MonetaryAmount']>
  member?: Maybe<Member>
}

export interface MutationType {
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

export interface MutationTypeChargeMemberArgs {
  id: Scalars['ID']
  amount: Scalars['MonetaryAmount']
}

export interface MutationTypeAddAccountEntryToMemberArgs {
  memberId: Scalars['ID']
  accountEntry: AccountEntryInput
}

export interface MutationTypeApproveMemberChargeArgs {
  approvals: MemberChargeApproval[]
}

export interface MutationTypeUpdateClaimStateArgs {
  id: Scalars['ID']
  state: ClaimState
}

export interface MutationTypeCreateClaimArgs {
  memberId: Scalars['ID']
  date: Scalars['LocalDateTime']
  source: ClaimSource
}

export interface MutationTypeAddClaimNoteArgs {
  id: Scalars['ID']
  note: ClaimNoteInput
}

export interface MutationTypeCreateClaimPaymentArgs {
  id: Scalars['ID']
  payment: ClaimPaymentInput
}

export interface MutationTypeSetClaimTypeArgs {
  id: Scalars['ID']
  type: ClaimTypes
}

export interface MutationTypeSetClaimInformationArgs {
  id: Scalars['ID']
  information: ClaimInformationInput
}

export interface MutationTypeUpdateReserveArgs {
  id: Scalars['ID']
  amount: Scalars['MonetaryAmount']
}

export interface MutationTypeSetCoveringEmployeeArgs {
  id: Scalars['ID']
  coveringEmployee: Scalars['Boolean']
}

export interface MutationTypeCreateTicketArgs {
  ticket?: Maybe<TicketInput>
}

export interface MutationTypeChangeTicketDescriptionArgs {
  ticketId: Scalars['ID']
  newDescription?: Maybe<Scalars['String']>
}

export interface MutationTypeAssignTicketToTeamMemberArgs {
  ticketId: Scalars['ID']
  teamMemberId: Scalars['ID']
}

export interface MutationTypeChangeTicketStatusArgs {
  ticketId: Scalars['ID']
  newStatus?: Maybe<TicketStatus>
}

export interface MutationTypeChangeTicketReminderArgs {
  ticketId: Scalars['ID']
  newReminder?: Maybe<RemindNotification>
}

export interface MutationTypeChangeTicketPriorityArgs {
  ticketId: Scalars['ID']
  newPriority?: Maybe<Scalars['Float']>
}

export interface MutationTypeAutoLabelQuestionArgs {
  question: Scalars['String']
  label: Scalars['String']
  memberId?: Maybe<Scalars['String']>
  messageIds?: Maybe<Array<Scalars['String']>>
}

export interface MutationTypeQuestionIsDoneArgs {
  memberId: Scalars['ID']
}

export interface MutationTypeWhitelistMemberArgs {
  memberId: Scalars['ID']
}

export interface MutationTypeMarkClaimFileAsDeletedArgs {
  claimId: Scalars['ID']
  claimFileId: Scalars['ID']
}

export interface MutationTypeBackfillSubscriptionsArgs {
  memberId: Scalars['ID']
}

export interface MutationTypeSetClaimFileCategoryArgs {
  claimId: Scalars['ID']
  claimFileId: Scalars['ID']
  category?: Maybe<Scalars['String']>
}

export interface MutationTypeAddInventoryItemArgs {
  item: InventoryItemInput
}

export interface MutationTypeRemoveInventoryItemArgs {
  inventoryItemId: Scalars['ID']
}

export interface MutationTypeActivateQuoteArgs {
  id: Scalars['ID']
  activationDate: Scalars['LocalDate']
  terminationDate?: Maybe<Scalars['LocalDate']>
}

export interface MutationTypeCreateQuoteFromProductArgs {
  memberId: Scalars['ID']
  quoteData: QuoteFromProductInput
}

export interface MutationTypeUpdateQuoteArgs {
  quoteId: Scalars['ID']
  quoteData: QuoteInput
  bypassUnderwritingGuidelines?: Maybe<Scalars['Boolean']>
}

export interface MutationTypeMarkSwitchableSwitcherEmailAsRemindedArgs {
  id: Scalars['ID']
}

export interface NotCoveredClaim {
  __typename?: 'NotCoveredClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface NumberFailedCharges {
  __typename?: 'NumberFailedCharges'
  numberFailedCharges: Scalars['Int']
  lastFailedChargeAt?: Maybe<Scalars['Instant']>
}

export interface Payload {
  category: Scalars['String']
  query: Scalars['String']
  filters: Filter[]
}

export interface PaymentDefault {
  __typename?: 'PaymentDefault'
  year?: Maybe<Scalars['Int']>
  week?: Maybe<Scalars['Int']>
  paymentDefaultType?: Maybe<Scalars['String']>
  paymentDefaultTypeText?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['MonetaryAmount']>
  caseId?: Maybe<Scalars['String']>
  claimant?: Maybe<Scalars['String']>
}

export interface Person {
  __typename?: 'Person'
  personFlags?: Maybe<Array<Maybe<Flag>>>
  debt?: Maybe<Debt>
  whitelisted?: Maybe<Whitelisted>
  status?: Maybe<PersonStatus>
}

export interface PersonStatus {
  __typename?: 'PersonStatus'
  flag?: Maybe<Flag>
  whitelisted?: Maybe<Scalars['Boolean']>
}

export interface PricePoint {
  __typename?: 'PricePoint'
  id: Scalars['String']
  itemId: Scalars['String']
  date: Scalars['String']
  lower: Scalars['Float']
  mean: Scalars['Float']
  upper: Scalars['Float']
}

export interface QueryType {
  __typename?: 'QueryType'
  monthlyPayments?: Maybe<Array<Maybe<MonthlySubscription>>>
  member?: Maybe<Member>
  claim?: Maybe<Claim>
  paymentSchedule?: Maybe<Array<Maybe<SchedulerState>>>
  categories?: Maybe<Category[]>
  items: ItemSearch
  prices: PricePoint[]
  ticket?: Maybe<Ticket>
  getFullTicketHistory?: Maybe<TicketHistory>
  tickets: Ticket[]
  getAnswerSuggestion: Suggestion[]
  me?: Maybe<Scalars['String']>
  inventory: Array<Maybe<InventoryItem>>
  filters: FilterSuggestion[]
  inventoryItemFilters?: Maybe<Array<Maybe<FilterOutput>>>
  switchableSwitcherEmails: SwitchableSwitcherEmail[]
}

export interface QueryTypeMonthlyPaymentsArgs {
  month: Scalars['YearMonth']
}

export interface QueryTypeMemberArgs {
  id: Scalars['ID']
}

export interface QueryTypeClaimArgs {
  id: Scalars['ID']
}

export interface QueryTypePaymentScheduleArgs {
  status: ChargeStatus
}

export interface QueryTypeItemsArgs {
  payload: Payload
}

export interface QueryTypePricesArgs {
  date: Scalars['String']
  ids: Array<Scalars['String']>
}

export interface QueryTypeTicketArgs {
  id: Scalars['ID']
}

export interface QueryTypeGetFullTicketHistoryArgs {
  id: Scalars['ID']
}

export interface QueryTypeTicketsArgs {
  resolved?: Maybe<Scalars['Boolean']>
}

export interface QueryTypeGetAnswerSuggestionArgs {
  question?: Maybe<Scalars['String']>
}

export interface QueryTypeInventoryArgs {
  claimId: Scalars['ID']
}

export interface QueryTypeFiltersArgs {
  categoryId: Scalars['String']
}

export interface QueryTypeInventoryItemFiltersArgs {
  inventoryItemId: Scalars['String']
}

export interface Quote {
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

export interface QuoteFromProductInput {
  incompleteHouseQuoteData?: Maybe<HouseQuoteDataInput>
  incompleteApartmentQuoteData?: Maybe<ApartmentQuoteDataInput>
  originatingProductId?: Maybe<Scalars['ID']>
  currentInsurer?: Maybe<Scalars['String']>
}

export interface QuoteInput {
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

export interface RemindNotification {
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

export interface SchedulerState {
  __typename?: 'SchedulerState'
  id: Scalars['ID']
  member?: Maybe<Member>
  status: ChargeStatus
  changedBy: Scalars['String']
  changedAt: Scalars['Instant']
  amount?: Maybe<Scalars['MonetaryAmount']>
  transactionId?: Maybe<Scalars['ID']>
}

export interface SnowPressureClaim {
  __typename?: 'SnowPressureClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface StormDamageClaim {
  __typename?: 'StormDamageClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface Suggestion {
  __typename?: 'Suggestion'
  intent: Scalars['String']
  reply: Scalars['String']
  text: Scalars['String']
  confidence: Scalars['Float']
  allReplies: AllRepliesEntry[]
}

export interface SwitchableSwitcherEmail {
  __typename?: 'SwitchableSwitcherEmail'
  id: Scalars['ID']
  member: Member
  switcherCompany: Scalars['String']
  queuedAt: Scalars['Instant']
  sentAt?: Maybe<Scalars['Instant']>
  remindedAt?: Maybe<Scalars['Instant']>
}

export interface TestClaim {
  __typename?: 'TestClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface TheftClaim {
  __typename?: 'TheftClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  item?: Maybe<Scalars['String']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export interface Ticket {
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

export interface TicketHistory {
  __typename?: 'TicketHistory'
  id?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['Instant']>
  createdBy?: Maybe<Scalars['String']>
  type?: Maybe<TicketType>
  revisions?: Maybe<Array<Maybe<TicketRevision>>>
}

export interface TicketInput {
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

export interface TicketRevision {
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

export interface Transaction {
  __typename?: 'Transaction'
  id?: Maybe<Scalars['ID']>
  amount?: Maybe<Scalars['MonetaryAmount']>
  timestamp?: Maybe<Scalars['Instant']>
  type?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
}

export interface TravelAccidentClaim {
  __typename?: 'TravelAccidentClaim'
  location?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['LocalDate']>
  policeReport?: Maybe<Scalars['String']>
  receipt?: Maybe<Scalars['String']>
}

export interface VerminAndPestsClaim {
  __typename?: 'VerminAndPestsClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface WaterDamageBathroomClaim {
  __typename?: 'WaterDamageBathroomClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface WaterDamageClaim {
  __typename?: 'WaterDamageClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface WaterDamageKitchenClaim {
  __typename?: 'WaterDamageKitchenClaim'
  date?: Maybe<Scalars['LocalDate']>
}

export interface Whitelisted {
  __typename?: 'Whitelisted'
  whitelistedAt?: Maybe<Scalars['Instant']>
  whitelistedBy?: Maybe<Scalars['String']>
}

export interface MemberNameQueryVariables {
  memberId: Scalars['ID']
}

export type MemberNameQuery = { __typename?: 'QueryType' } & {
  member: Maybe<
    { __typename?: 'Member' } & Pick<Member, 'firstName' | 'lastName'>
  >
}

export interface GetSwitcherEmailsQueryVariables {}

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

export interface MarkSwitcherEmailAsRemindedMutationVariables {
  id: Scalars['ID']
}

export type MarkSwitcherEmailAsRemindedMutation = {
  __typename?: 'MutationType'
} & Pick<MutationType, 'markSwitchableSwitcherEmailAsReminded'>

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
    types: Array<{
      kind: string
      name: string
      possibleTypes: Array<{
        name: string
      }>
    }>
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
