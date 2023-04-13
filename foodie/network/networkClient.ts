import { getBaseUrl } from "../src/lib/utils/getBaseUrl"

class NetworkClient {
    constructor(private baseUrl: string, ) {
    }

    async fetch(url: string, request?: RequestInit): Promise<any> {
        const res = await fetch(`${this.baseUrl}${url}`, request)
        const data = await res.json()

        if (res.status < 199 || res.status > 299) {
            throw data.error
        }

        return data
    } 
}
// const networkClient = new NetworkClient(baseurl)
// export default networkClient

const baseurl = getBaseUrl()

const globalNetworkClient = global as unknown as { 
    networkClient: NetworkClient | undefined 
  }
  
export const networkClient =
globalNetworkClient.networkClient ??
new NetworkClient(baseurl)

if (process.env.NODE_ENV !== 'production') globalNetworkClient.networkClient = networkClient