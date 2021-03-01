type RequestResponse = [res: any | null, err: FetchError | null]

type Cause = {
  message: string
}

export class FetchError extends Error {
  name: string
  causes: Cause[]
  constructor(message: string, causes: Cause[]) {
    super(message)
    Error.captureStackTrace(this, FetchError)
    this.name = 'FetchError'
    this.causes = causes
  }
}

function getResponseData(res: Response) {
  const contentType = res.headers.get('Content-Type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json()
  } else {
    res.text()
  }
}

export default async (url: RequestInfo, config: RequestInit = {}): Promise<RequestResponse> => {
  try {
    const res = await fetch(url, config)
    if (res.ok) {
      const data = await getResponseData(res)
      return [data, null]
    } else {
      const data = await getResponseData(res)
      const causes = data?.causes ?? []
      const causesCheck = causes.length > 0 ? 'Check' : 'No Check'
      const message = data?.message ?? `Error Fetch: ${data.message}. Causes: ${causesCheck}`
      return [null, new FetchError(message, causes)]
    }
  } catch (err) {
    return [null, err]
  }
}
