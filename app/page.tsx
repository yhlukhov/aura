import stylex from '@stylexjs/stylex'

const styles = stylex.create({
  main: {},
})

export default function Home() {
  return (
    <div>
      <main {...stylex.props(styles.main)}>Main page</main>
    </div>
  )
}
