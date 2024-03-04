"use client"

import usesmallHousewatt from "./hooks/usesmallHousewatt"

export default function Home() {

  const { smallhouseData } = usesmallHousewatt()

  return (
    <div>This is data from smallhouse {smallhouseData} Watt </div>
  )
}
