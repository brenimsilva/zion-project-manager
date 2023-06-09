import React, { useState } from 'react'

interface props {
    listStats: Array<{id: number, name: string, value: string}>
}


  

export default function InfoBox({listStats}: props) {

  return (
    <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {listStats.map((stat) => (
              <div key={stat.id} className="mx-auto rounded flex max-w-xs flex-col gap-y-4 shadow shadow-marsHL2 p-10">
                <dt className="text-base leading-7 text-marsDark">{stat.name}</dt>
                <dd className="order-first text-3xl text-marsHL1 font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
  )
}
