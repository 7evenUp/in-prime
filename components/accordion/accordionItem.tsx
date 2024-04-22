import clsx from "clsx"

import ArrowUp from "@/public/images/jsx/icons/arrow-up"

const AccordionItem = ({
  isShowing,
  item,
  onClick,
  mode,
}: {
  isShowing: boolean
  item: { question: string; answer: React.JSX.Element }
  onClick: () => void
  mode: string
}) => {
  return (
    <div>
      <div
        className="accordion"
        onClick={onClick}
        key={item.question}
        aria-expanded={isShowing}
      >
        <h3 className="accordion__title">{item.question}</h3>
        <ArrowUp
          className={clsx("accordion__toggle", mode)}
          aria-expanded={isShowing}
        />
      </div>
      <div
        className={clsx("accordion__content", mode)}
        aria-expanded={!isShowing}
      >
        {item.answer}
      </div>
      <div className="accordion__divider" />
    </div>
  )
}

export default AccordionItem
