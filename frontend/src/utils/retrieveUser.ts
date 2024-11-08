import { decode } from 'jsonwebtoken'
import { User } from '@/types/user'
import { parseCredentials } from './cookies'

export function retrieveUser() {
  const { accessToken } = parseCredentials()

  const decoded = decode(accessToken) as {
    id: string
    firstName: string
    lastName: string
    email: string
    // role: Role
  }

  console.log(decoded)

  if (!decoded) {
    return null
  }

  const user: User = {
    id: decoded.id,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    email: decoded.email,
    // role: decoded.role,
  }

  return user
}
