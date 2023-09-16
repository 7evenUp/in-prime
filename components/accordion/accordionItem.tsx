import ArrowUp from "@/public/images/jsx/icons/arrow-up"

export default function AccordionItem(props) {
  let isShowing = props.state
  
  return (
    <>
      <div
        className="accordion"
        onClick={props.toggle}
        key={props.item.question}
        aria-expanded={isShowing}
      >
        <div className="accordion__title">{props.item.question}</div>
        <ArrowUp
          className={`accordion__toggle ${props.mode}`}
          aria-expanded={isShowing}
        />
      </div>
      <div
        className={`accordion__content ${props.mode}`}
        aria-expanded={!isShowing}
      >
        {props.item.answer}
      </div>
    </>
  )
}
