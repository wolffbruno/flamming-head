import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import styles from '../styles/Home.module.css'
import Modal from '../components/Modal';
import { GlobalContext, globalContext } from './_app'
/* fasd */
const Home: NextPage = () => {
  const ctx = useContext(globalContext);
  const router = useRouter();
  const handlePlay = () => {
    if (ctx.players && ctx.players.length === 2 && ctx.players.every(x => x.name)) {
      router.replace('play');
    }
  }
  return (
    <div className="w-full h-screen bg-black text-white">
        <div className="w-full h-screen grid place-items-center bg-gradient-to-tr from-black to-[#1f1109]">
          <div className="flex flex-col gap-y-4">
            {
              ctx.players?.map((player, i) => {
                return (
                  <>
                  <input type="text" value={player.name} onChange={({target}) => {
                    player.name = target.value;
                    ctx.update();
                  }} className={styles.input} placeholder={"Jogador " + (i + 1)} />
                  </>
                )
              })
            }

            <button onClick={() => handlePlay()} className="flex gap-x-4 justify-center items-center rounded-sm transition-all bg-gradient-to-tr from-yellow-600 text-black to-yellow-500 hover:bg-yellow-600 py-4 px-8 text-xl">
              Iniciar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Home
