import { getApiDocs } from '@/lib/utils'
import React from 'react'
import ReactSwagger from './ReactSwagger';

const Docs = async () => {
    const specs = await getApiDocs();

    return (
        <div className='pt-6'>
            <section className='container'>
                <ReactSwagger specs={specs} url='/swagger.json' />
            </section>
        </div>
    )
}

export default Docs