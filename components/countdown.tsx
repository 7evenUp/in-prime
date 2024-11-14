"use client"
import React, { useEffect, useState } from "react"
import clsx from "clsx"

interface CountdownProps {
  className: string
  date: number
  classNameNumber?: string
}

const Countdown: React.FC<CountdownProps> = ({
  className,
  date,
  classNameNumber,
}) => {
  const calculateTimeLeft = () => {
    const difference = date - new Date().getTime()
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <span className={className}>
      <div className={clsx("date", classNameNumber)} key={1}>
        {timeLeft.days / 10 >= 1 ? "" : "0"}
        {timeLeft.days}
      </div>
      <div className="sep">:</div>
      <div className={clsx("date", classNameNumber)} key={2}>
        {timeLeft.hours / 10 >= 1 ? "" : "0"}
        {timeLeft.hours}
      </div>
      <div className="sep">:</div>
      <div className={clsx("date", classNameNumber)} key={3}>
        {timeLeft.minutes / 10 >= 1 ? "" : "0"}
        {timeLeft.minutes}
      </div>
      {/* <div className="sep">:</div>
      <div className="date" key={4} suppressHydrationWarning>
        {timeLeft.seconds / 10 >= 1 ? "" : "0"}
        {timeLeft.seconds}
      </div> */}
    </span>
  )
}

export default Countdown
