'use client'
import React from 'react'
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Image = () => {
    const { data, error } = useSWR("/api/get-user", fetcher);

    return (

        <div className="w-10 rounded-full">
            <img src={data?.img} />
        </div>
    )
}

export default Image