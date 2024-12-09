'use client'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';


const fetcher = (url: string) => fetch(url).then((res) => res.json());


const DashTopBar = () => {
    const { data, error } = useSWR("/api/get-user", fetcher);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data]);

    return (
        <div className="hidden fixed left-0 top-0 z-40 w-full px-3  py-3 bg-primary md:flex items-center justify-end">

            <div className="flex items-center gap-3">
                <div className="text-white font-medium">
                    <h4>{data?.first_name + ' ' + data?.last_name}</h4>
                </div>
                <div>
                    <div className="avatar online" tabIndex={0}
                        role="button"
                    >
                        <div className="w-12 rounded-full">
                            <img src={data?.img} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashTopBar