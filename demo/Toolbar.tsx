import { useRouter } from "next/router"
import { versions, SiteVersion } from "./versions"
import styles from "./styles.module.scss"
export default function DemoToolbar({ version }: { version: SiteVersion }) {
  const router = useRouter()
  return <>
    <div className={styles.toolbar}>
      <div className={styles.brand}><span className={styles.dot} />CRYPTON PRIME <span className={styles.demoTag}>PORTFOLIO</span></div>
      <label className={styles.version}>Версия сайта
        <select aria-label="Версия сайта" value={version} onChange={event => {
          router.push({ pathname: "/", query: { version: event.target.value } }, undefined, { shallow: true, scroll: true })
        }}>{versions.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
      </label>
    </div>
    <div className={styles.caption}>{versions.find(item => item.id === version)?.description}</div>
  </>
}
