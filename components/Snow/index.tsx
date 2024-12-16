const Snowfall = ({ particles = 290 }: { particles?: number }) => {
  const snowSize = []
  for (let i = 0; i < particles; i++) {
    snowSize.push(i)
  }

  const snowRender = snowSize.map((item) => <div key={item} className="snow" />)

  return <div className="snowfall">{snowRender}</div>
  // return <div className="fixed inset-0 h-screen w-full">{snowRender}</div>
}

export default Snowfall
