import { getBaseUrl } from "../utils/getBaseUrl"
// const networkClient = new NetworkClient(baseurl)
// export default networkClient


export async function clientPost(url: string, request?: RequestInit): Promise<any> {
    const baseurl = getBaseUrl()
    const res = await fetch(`${baseurl}${url}`, request)
    const data = await res.json()

    if (res.status < 199 || res.status > 299) {
        throw data.error
    }

    return data
} 
