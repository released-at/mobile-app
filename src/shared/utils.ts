type FetchResponse<R> = {
  response?: Response
  isError: boolean
  data?: R
  errorInfo?: unknown
}

async function parse<R>(response: Response): Promise<FetchResponse<R>> {
  if (response.status === 204 || response.statusText === 'No Content') {
    return {
      isError: false,
    }
  }

  const text = await response.text()
  let data

  try {
    data = JSON.parse(text) as R
  } catch (error) {
    console.error(error)

    return {
      response,
      isError: true,
      errorInfo: error,
    }
  }

  if (response.ok) {
    return {
      isError: false,
      data,
    }
  }

  return {
    response,
    isError: true,
    errorInfo: data,
  }
}

export async function fetchJSON<R>(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<FetchResponse<R>> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
    },
  })

  return parse<R>(response)
}

export async function fetchWithToken<R>(
  input: RequestInfo,
  init: RequestInit = {},
  token: string = '',
): Promise<FetchResponse<R>> {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  return parse<R>(response)
}

export function ifElse(cond: boolean, ifComp: any, elseComp: any = null) {
  return cond ? ifComp : elseComp
}
