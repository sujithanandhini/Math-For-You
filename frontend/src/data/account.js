const PARENT_KEY = 'math-for-you-parent-account'
const CHILD_KEY = 'math-for-you-child-account'
const SESSION_KEY = 'math-for-you-session'
const HASH_ROUNDS = 120000

function encodeBytes(bytes) {
  return btoa(String.fromCharCode(...bytes))
}

function decodeBytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0))
}

function createSalt() {
  return encodeBytes(crypto.getRandomValues(new Uint8Array(16)))
}

async function hashSecret(secret, salt) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: decodeBytes(salt),
      iterations: HASH_ROUNDS,
      hash: 'SHA-256',
    },
    key,
    256,
  )
  return encodeBytes(new Uint8Array(bits))
}

function secretsMatch(left, right) {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return difference === 0
}

function readStoredAccount(key) {
  const value = localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error)
    return null
  }
}

function saveSession(role) {
  sessionStorage.setItem(SESSION_KEY, role)
}

export function getParentAccount() {
  const account = readStoredAccount(PARENT_KEY)
  if (
    !account ||
    typeof account.name !== 'string' ||
    typeof account.email !== 'string' ||
    typeof account.passwordSalt !== 'string' ||
    typeof account.passwordHash !== 'string'
  ) {
    return null
  }
  return { name: account.name, email: account.email }
}

export async function createParentAccount({ name, email, password }) {
  if (readStoredAccount(PARENT_KEY)) {
    throw new Error('A parent account already exists in this browser.')
  }
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password
  ) {
    throw new Error('Enter your name, email address, and password.')
  }
  const passwordSalt = createSalt()
  const account = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordSalt,
    passwordHash: await hashSecret(password, passwordSalt),
  }
  localStorage.setItem(PARENT_KEY, JSON.stringify(account))
  saveSession('parent')
}

export async function authenticateParent(email, password) {
  const account = readStoredAccount(PARENT_KEY)
  if (
    !account ||
    typeof account.email !== 'string' ||
    typeof account.passwordSalt !== 'string' ||
    typeof account.passwordHash !== 'string' ||
    account.email !== email.trim().toLowerCase()
  ) {
    return false
  }
  const passwordHash = await hashSecret(password, account.passwordSalt)
  if (!secretsMatch(passwordHash, account.passwordHash)) return false
  saveSession('parent')
  return true
}

function createLearningCode() {
  const values = crypto.getRandomValues(new Uint16Array(1))
  return `STAR-${String(values[0] % 10000).padStart(4, '0')}`
}

function createPin() {
  const values = crypto.getRandomValues(new Uint16Array(1))
  return String(1000 + (values[0] % 9000))
}

export function getChildProfile() {
  const child = readStoredAccount(CHILD_KEY)
  if (
    !child ||
    typeof child.name !== 'string' ||
    typeof child.code !== 'string' ||
    typeof child.pinSalt !== 'string' ||
    typeof child.pinHash !== 'string'
  ) {
    return null
  }
  return { name: child.name, code: child.code }
}

export async function saveChildCredentials(name) {
  const parentAccount = readStoredAccount(PARENT_KEY)
  if (!parentAccount) {
    throw new Error('Create a parent account before setting up child access.')
  }
  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Enter your child’s name.')
  }

  const previousChild = readStoredAccount(CHILD_KEY)
  const pin = createPin()
  const pinSalt = createSalt()
  const child = {
    name: name.trim(),
    code: previousChild?.code || createLearningCode(),
    pinSalt,
    pinHash: await hashSecret(pin, pinSalt),
  }
  localStorage.setItem(CHILD_KEY, JSON.stringify(child))
  return { name: child.name, code: child.code, pin }
}

export async function authenticateChild(code, pin) {
  const child = readStoredAccount(CHILD_KEY)
  if (
    !child ||
    typeof child.code !== 'string' ||
    typeof child.pinSalt !== 'string' ||
    typeof child.pinHash !== 'string' ||
    child.code !== code.trim().toUpperCase()
  ) {
    return false
  }
  const pinHash = await hashSecret(pin, child.pinSalt)
  if (!secretsMatch(pinHash, child.pinHash)) return false
  saveSession('child')
  return true
}

export function clearAuthSession() {
  sessionStorage.removeItem(SESSION_KEY)
}
