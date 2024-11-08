export type SignInData = {
  email: string
  password: string
}

export type SignUpData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type Credentials = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
}
