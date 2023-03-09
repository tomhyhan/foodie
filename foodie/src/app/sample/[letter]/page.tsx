import React from 'react'

type PageProps = {
    params : {letter: string}
}
export default function Page({params}: PageProps)  {
  return (
    <div> {params.letter } letter page</div>
  )
}

export async function generateStaticParams() {
    return [
        { letter: 'a' },
        { letter: 'b' },
        { letter: 'c' },
      ];
  }