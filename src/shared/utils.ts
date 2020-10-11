import { getToken, removeToken } from '../features/user/utils'

async function parse(response, withToken: boolean = false) {
  if (response.status === 204 || response.statusText === 'No Content') {
    return
  }

  if (withToken && response.status === 401) {
    await removeToken()
  }

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    console.error(e)

    throw { response, error: e } // eslint-disable-line
  }
  if (response.ok) {
    return data
  }
  throw { response, error: data } // eslint-disable-line
}

export async function fetchJSON(input: RequestInfo, init: RequestInit = {}) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
    },
  })
  return parse(response)
}

export async function fetchWithToken(
  input: RequestInfo,
  init: RequestInit = {},
) {
  const token = await getToken()

  if (!token) return

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  return parse(response, true)
}

export function ifElse(cond: boolean, ifComp: any, elseComp: any = null) {
  return cond ? ifComp : elseComp
}
