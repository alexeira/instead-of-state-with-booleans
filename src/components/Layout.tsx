export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-rows-[60px,1fr,60px] gap-4 bg-raisin">
      <header className="mx-auto w-full max-w-screen-lg p-4">
        <nav>esto es un nav</nav>
      </header>
      <main className="mx-auto h-full w-full max-w-screen-lg px-4">{children}</main>
      <footer className="mx-auto w-full max-w-screen-lg p-4">created to learn 🤓☝️</footer>
    </div>
  )
}
