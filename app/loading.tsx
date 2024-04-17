import { Loader } from 'lucide-react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <Loader className='w-8 h-8 animate-spin' />
        </div>
    )
}

export default Loading