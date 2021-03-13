export type RootStackParamList = {
  Root: undefined
  Presentation: undefined
  NotFound: undefined
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
  PasswordRecovery: undefined
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
  Menu: undefined
  Transfers: undefined
}

export type AccountsParamList = {
  Accounts: undefined
  AddressdetailsScreen: undefined
}

export type TransfersParamList = {
  Transfers: undefined
}

export type MenuParamList = {
  Menu: undefined
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
    text?: string
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
