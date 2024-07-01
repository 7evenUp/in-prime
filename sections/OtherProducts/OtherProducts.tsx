import React from "react"

import styles from "./OtherProducts.module.scss"

const OtherProducts = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.info_title}>Другие продукты Crypton</h2>
          <p>
            Попробуй наши бесплатные сервисы для обучения и работы с
            криптовалютой.
          </p>
          <p>
            Экономь своё время - наша команда собирает все важные проекты и
            ресурсы в удобном формате.
          </p>
        </div>
        <div className={styles.products}>
          <a
            href="https://calendar.crypton.xyz/events"
            target={"_blank"}
            className={styles.product}
          >
            <CalendarIcon />
            <div className={styles.product_info}>
              <h3 className={styles.product_info_title}>
                Календарь
                <ArrowIcon />
              </h3>
              <p>Все криптоактивности в одном месте</p>
            </div>
          </a>
          <a
            href="https://tools.crypton.xyz/"
            target={"_blank"}
            className={styles.product}
          >
            <ToolsIcon />
            <div className={styles.product_info}>
              <h3 className={styles.product_info_title}>
                Tools <ArrowIcon />
              </h3>
              <p>
                Большая библиотека всех лучших и проверенных криптосайтов,
                сервисов и приложений
              </p>
            </div>
          </a>
          <a
            href="https://research.crypton.xyz/"
            target={"_blank"}
            className={styles.product}
          >
            <ResearchIcon />
            <div className={styles.product_info}>
              <h3 className={styles.product_info_title}>
                Research <ArrowIcon />
              </h3>
              <p>
                Следи за выжимками только важных новостей от любимых проектов
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default OtherProducts

const CalendarIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.5703 59.7912L46.6525 59.999C53.5026 60.0933 59.1319 54.5879 59.2257 47.7027L59.4324 32.543C55.7509 45.9848 45.0392 56.4603 31.5703 59.7912Z"
      fill="url(#paint0_linear_1982_1135)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.041 0.487516C6.19021 0.465019 0.618487 6.02895 0.59622 12.9149L0.485396 47.2021C0.463131 54.0881 5.99877 59.6886 12.8496 59.7111L22.1529 59.7415C42.7053 59.809 59.4206 43.1173 59.4873 22.4595L59.5175 13.1084C59.5397 6.22244 54.0042 0.622031 47.1535 0.599534L13.041 0.487516ZM15.2916 42.61C17.0039 43.7062 18.9575 44.258 21.1528 44.2653C23.3478 44.2723 25.3051 43.7336 27.0244 42.6488C28.7437 41.5637 30.0859 39.9959 31.0513 37.9447C32.0421 35.8684 32.5422 33.3973 32.5514 30.5315C32.5606 27.6657 32.0768 25.204 31.0992 23.1465C30.1472 21.0638 28.8151 19.4744 27.1028 18.3782C25.3905 17.282 23.4368 16.7304 21.2418 16.7231C19.0466 16.7159 17.0894 17.2548 15.3701 18.3397C13.6508 19.4246 12.2958 21.0052 11.3051 23.0816C10.3396 25.1325 9.85225 27.591 9.84299 30.4568C9.83373 33.3226 10.3051 35.797 11.2572 37.8798C12.2346 39.9372 13.5794 41.5141 15.2916 42.61ZM24.9611 36.9736C24.0482 38.3655 22.7844 39.0587 21.1696 39.0536C19.58 39.0483 18.3206 38.3467 17.3916 36.9487C16.4878 35.5511 16.0405 33.3937 16.05 30.4771C16.0594 27.5608 16.5205 25.4065 17.4334 24.0146C18.3715 22.6229 19.6353 21.9296 21.2248 21.9348C22.8396 21.9401 24.0991 22.6417 25.0029 24.0396C25.9319 25.4374 26.3918 27.5946 26.3824 30.5112C26.3729 33.4278 25.8991 35.5818 24.9611 36.9736ZM47.5453 43.8954L47.6314 17.2663L36.2013 17.2288L36.1854 22.1742L41.4841 22.1916L41.414 43.8752L47.5453 43.8954Z"
      fill="url(#paint1_linear_1982_1135)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1982_1135"
        x1="41.6167"
        y1="26.8513"
        x2="51.7565"
        y2="63.4867"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0218436" stopColor="#EB2629" />
        <stop offset="0.515625" stopColor="#F11F5F" />
        <stop offset="1" stopColor="#EB2629" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1982_1135"
        x1="21.245"
        y1="-11.1591"
        x2="43.8007"
        y2="67.1355"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0218436" stopColor="#EB2629" />
        <stop offset="0.515625" stopColor="#F7306C" />
        <stop offset="1" stopColor="#EB2629" />
      </linearGradient>
    </defs>
  </svg>
)

const ToolsIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1982_1151)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8518 0C5.30625 0 0 5.30625 0 11.8518V48.1483C0 54.6938 5.30625 60 11.8518 60H48.1483C54.6938 60 60 54.6938 60 48.1483V11.8518C60 5.30625 54.6938 0 48.1483 0H11.8518ZM19.9997 11.1109C15.0905 11.1109 11.1109 15.0905 11.1109 19.9997V39.9997C11.1109 44.909 15.0905 48.8885 19.9997 48.8885H39.9997C44.909 48.8885 48.8885 44.909 48.8885 39.9997V19.9997C48.8885 15.0905 44.909 11.1109 39.9997 11.1109H19.9997Z"
        fill="#626161"
      />
      <path
        d="M21.4814 24.4454C21.4814 22.809 22.808 21.4824 24.4444 21.4824H35.5555C37.192 21.4824 38.5185 22.809 38.5185 24.4454V35.5564C38.5185 37.1929 37.192 38.5194 35.5555 38.5194H24.4444C22.808 38.5194 21.4814 37.1929 21.4814 35.5564V24.4454Z"
        fill="#626161"
      />
      <path
        d="M0 11.8518C0 5.30625 5.30625 0 11.8518 0H48.1483C54.6938 0 60 5.30625 60 11.8518V48.1483C60 54.6938 54.6938 60 48.1483 60H11.8518C5.30625 60 0 54.6938 0 48.1483V11.8518Z"
        fill="#40F3BD"
      />
      <path
        d="M11.1113 20.0002C11.1113 15.091 15.091 11.1113 20.0002 11.1113H40.0002C44.9095 11.1113 48.889 15.091 48.889 20.0002V40.0002C48.889 44.9095 44.9095 48.8892 40.0002 48.8892H20.0002C15.091 48.8892 11.1113 44.9095 11.1113 40.0002V20.0002Z"
        fill="url(#paint0_linear_1982_1151)"
      />
      <path
        d="M21.4814 24.4454C21.4814 22.809 22.808 21.4824 24.4444 21.4824H35.5555C37.192 21.4824 38.5185 22.809 38.5185 24.4454V35.5564C38.5185 37.1929 37.192 38.5194 35.5555 38.5194H24.4444C22.808 38.5194 21.4814 37.1929 21.4814 35.5564V24.4454Z"
        fill="#40F3BD"
      />
      <path
        d="M0 11.8518C0 5.30625 5.30625 0 11.8518 0H48.1483C54.6938 0 60 5.30625 60 11.8518V48.1483C60 54.6938 54.6938 60 48.1483 60H11.8518C5.30625 60 0 54.6938 0 48.1483V11.8518Z"
        fill="url(#paint1_linear_1982_1151)"
        fillOpacity="0.3"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1982_1151"
        x1="30.0002"
        y1="11.1113"
        x2="30.0002"
        y2="48.8892"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#24CB99" />
        <stop offset="1" stopColor="#1BAD81" stopOpacity="0.69" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1982_1151"
        x1="46.25"
        y1="2.00778e-06"
        x2="3.75"
        y2="66.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DDFF7B" />
        <stop offset="1" stopColor="#C5F340" stopOpacity="0" />
      </linearGradient>
      <clipPath id="clip0_1982_1151">
        <rect width="60" height="60" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const ResearchIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1982_1144)">
      <path
        d="M56.7676 24.4108C56.7676 36.3188 47.1113 45.9721 35.1997 45.9721C23.2881 45.9721 13.6318 36.3188 13.6318 24.4108C13.6318 12.5029 23.2881 2.84961 35.1997 2.84961C47.1113 2.84961 56.7676 12.5029 56.7676 24.4108Z"
        fill="#1B5CF6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.04609 0C5.62 -6.87761e-08 6.8959 1.27551 6.8959 2.84894V45.9713C6.8959 47.5447 5.62 48.8204 4.04611 48.8204C2.47219 48.8204 1.19629 47.5447 1.19629 45.9713L1.19629 2.84894C1.19629 1.27551 2.47219 6.87764e-08 4.04609 0Z"
        fill="#1B5CF6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.6166 57.1518C59.6166 58.7252 58.3407 60.0007 56.7669 60.0007H13.6311C12.0572 60.0007 10.7812 58.7252 10.7812 57.1518C10.7812 55.5782 12.0572 54.3027 13.6311 54.3027H56.7669C58.3407 54.3027 59.6166 55.5782 59.6166 57.1518Z"
        fill="#1B5CF6"
      />
    </g>
    <defs>
      <clipPath id="clip0_1982_1144">
        <rect width="60" height="60" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const ArrowIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.arrow}
  >
    <path
      d="M1 9L9 1M9 1H1.9927M9 1V7.59854"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)
