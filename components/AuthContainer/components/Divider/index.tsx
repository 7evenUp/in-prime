import { useTranslate } from "../../useTranslate"

const Divider = () => {
  const t = useTranslate()

  return <p className="id_crypton_divider">{t("или")}</p>
}

export default Divider
