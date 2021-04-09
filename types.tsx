export type RootStackParamList = {
  Root: undefined
  Presentation: undefined
  NotFound: undefined
  Login: undefined
  SignUp: undefined
  Transaction: undefined
  ForgotPassword: undefined
  PasswordRecovery: { token: string; username: string }
  AddressDetailsScreen: { asset: string; short: string }
  AssetTotalMovements: { asset: string; short: string }
}

export type SignUpStackParamList = {
  StepOne: undefined
  StepTwo: undefined
  StepThree: undefined
  StepFour: undefined
  UsernamePass: undefined
  StepFive: undefined
  Presentation: undefined
  SuccessSignup: undefined
}

export type BottomTabParamList = {
  Accounts: undefined
  Configuración: undefined
  Banca: undefined
  Frequent: undefined
}

export type AccountsParamList = {
  Accounts: undefined
  AddressDetailsScreen: { asset: string; short: string }
  Transaction: undefined
}

export type TransfersParamList = {
  Transfers: undefined
}

export type MenuParamList = {
  Menu: undefined
  Email: { email: string }
  Username: { username: string }
  PhoneNumber: { phone: string }
  Birthday: { birthday: string }
  ShippingAddress: undefined
  Password: undefined
  About: undefined
}

export type SignupState = {
  [key: string]: string | Date
  username: string
  password: string
  name: string
  lastName: string
  cedula: string
  birthday: Date
  address: string
  state: string
  city: string
  zipCode: string
  email: string
  phoneNumber: string
}

export type ColorPallete = {
  dark: boolean
  colors: {
    primary?: string
    secondary?: string
    terciary?: string
    tint?: string
    text?: string
    textTint?: string
    background?: string
    grey0?: string
    grey1?: string
    grey2?: string
    grey3?: string
    grey4?: string
    grey5?: string
    grayOutline?: string
    success?: string
    error?: string
    divider?: string
    card?: string
  }
}

export type VenezuelaState =
  | 'Amazonas'
  | 'Anzoátegui'
  | 'Apure'
  | 'Barinas'
  | 'Aragua'
  | 'Carabobo'
  | 'Bolívar'
  | 'Cojedes'
  | 'Delta Amacura'
  | 'Falcón'
  | 'Distrito Capital'
  | 'Guárico'
  | 'Mérida'
  | 'Lara'
  | 'Miranda'
  | 'Monagas'
  | 'Nueva Esparta'
  | 'Portuguesa'
  | 'Sucre'
  | 'Táchira'
  | 'Trujillo'
  | 'Yaracuy'
  | 'La Guaira'
  | 'Zulia'

export type CoinShortName = '$' | 'BsS' | 'ETH' | 'BTC' | 'BNB' | 'BCH' | 'BSV'
export type FiatName = 'Dolares' | 'Bolivares Soberanos'
export type BalanceCoinName = 'Ethereum' | 'Bitcoin' | 'Binance Coin' | 'Bitcoin Cash' | 'Bitcoin SV'

export type CoinItem = {
  name: FiatName | BalanceCoinName
  shortName: CoinShortName
}
