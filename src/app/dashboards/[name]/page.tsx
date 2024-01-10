export default function DashbardView(props: { params: { name: string } }) {
  const { params: { name } } = props
  console.log(name)
  return (
    <section>
      <h1>Showing {name} dashboard</h1>
    </section>
  )
}
