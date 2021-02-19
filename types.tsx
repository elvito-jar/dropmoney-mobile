export type RootStackParamList = {
  Root: undefined
  Presentation: undefined
  NotFound: undefined
  Login: undefined
  SignUp: undefined
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
  TabOne: undefined
  TabTwo: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}

export type SignupState = {
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
