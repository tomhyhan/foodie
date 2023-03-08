import type { AppProps } from 'next/app'
import Link from 'next/link'
import Client from './client'


export default function Sample({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <h1>Tesing Sample <Link href={"/"}>asdf</Link></h1>
    )
}
