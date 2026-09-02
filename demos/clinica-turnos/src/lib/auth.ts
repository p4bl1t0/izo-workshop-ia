import type { NextRequest } from 'next/server'

export class AuthError extends Error {
  constructor() {
    super('UNAUTHORIZED')
    this.name = 'AuthError'
  }
}

export function getUserId(request: NextRequest): string {
  const userId = request.headers.get('x-user-id')?.trim()
  if (!userId) {
    throw new AuthError()
  }
  return userId
}
