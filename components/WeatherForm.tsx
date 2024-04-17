'use client'

import React, { ChangeEvent, useRef } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

type Props = {}

const WeatherForm = (props: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    const term = ref.current?.value;

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '') {
      const params = new URLSearchParams(searchParams);
      params.delete('q');
      replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full h-fit flex items-end gap-2 shadow border rounded-md p-4'>
      <div className='flex flex-col gap-2 w-full'>
        <label htmlFor='city-input' className='text-start'>City Name</label>
        <Input
          className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500'
          type='search'
          ref={ref}
          defaultValue={searchParams.get('q')?.toString()}
          placeholder='City name...'
          onChange={handleChange}
        />
      </div>

      <Button type='submit'>
        <Search className='w-4 h-4 mr-2' />
        Search
      </Button>
    </form>
  )
}

export default WeatherForm