'use client';

import 'swagger-ui-react/swagger-ui.css'
import dynamic from "next/dynamic";
import Loading from '@/app/loading';

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <Loading />,
});

type Props = {
  specs: Record<string, any>,
  url: string | undefined
}

function ReactSwagger({ specs, url }: Props) {
  return <DynamicSwaggerUI spec={specs} />
}

export default ReactSwagger