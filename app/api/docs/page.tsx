import React from 'react'
import ReactSwagger from './ReactSwagger';
import { createSwaggerSpec } from 'next-swagger-doc';

const getApiDocs = async () => {
    const spec = createSwaggerSpec({
      apiFolder: 'app/api', 
      definition: {
        openapi: '3.1.0',
        info: {
          title: 'API Doc',
          version: '1.0',
        },
        security: [],
      },
    })
    return spec
  }

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