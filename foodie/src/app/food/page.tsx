import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

export default function FoodPage() {
    return (
        <h1>food page works</h1>
    // return (
    //     <PageComponent {...pageComponentProps}>
    //         <pagePageComponent
    //         />
    //     </PageComponent>
    )
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//     return {
//         props: {
//             pageComponentProps
//         }
//     }
// }