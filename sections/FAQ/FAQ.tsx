import { useInView } from "react-intersection-observer"

import Accordion from "@/components/accordion/accordion"

import useSendEvent from "@/hooks/useSendEvent"

const FAQ = () => {
  const { sendEvent } = useSendEvent()

  const { ref } = useInView({
    triggerOnce: true,
    rootMargin: "-500px 0px",
    onChange: (inView) => {
      if (inView) {
        sendEvent({ name: "landing_view.faq" })
      }
    },
  })

  return (
    <div className="app__container__faq" id="faq" ref={ref}>
      <div className="app__container__faq__title">Часто задаваемые вопросы</div>
      <Accordion mode={"faq"} />
    </div>
  )
}

export default FAQ
