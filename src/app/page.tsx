'use client';
import Main from '../components/Main'
import Image from 'next/image'
import Logo from '../components/Logo'
//import TasAILogo from "/tasai.svg"


export default function Home() {
  return (
    <main>
      <header>
        <p>This is a header</p>
        <Logo />
      </header>
      <Main />
      <footer>This is a footer</footer>
    </main>
  )
}
