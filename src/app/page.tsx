"use client"

import smallHousewatt from "./hooks/smallHousewatt"

export default function Home() {

  const { smallhouseData } = smallHousewatt()

  return (
    <div>This is data from smallhouse {smallhouseData} Watt </div>
  )
}
