import { useWindowSize } from '@react-hookz/web'
import { useMemo } from 'react'
import styles from './snow.module.css'

export const Snowfall = () => {
  const windowSize = useWindowSize(undefined, true)

  const snowSize = useMemo(()=>{
    const snows = []
    for (let i = 0; i < windowSize.width / 15; i++) snows.push(i)
    return snows
  }, [windowSize.width])
  
  return <div className={styles.snowfall}>
    {snowSize.map((item) => <div key={item} className={styles.snow} />)}
  </div>
}

