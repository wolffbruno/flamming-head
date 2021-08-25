import { useCallback, useContext, useEffect, useState } from "react"
import { globalContext, Player, Question } from "../_app";
import { useRouter } from 'next/dist/client/router'

import style from './Play.module.css';
import Modal from '../../components/Modal'

export default function Play() {
    const ctx = useContext(globalContext);
    const [waiting, setWaiting] = useState(false);
    const [answering, setAnswering] = useState<number | null>();
    const [question, setQuestion] = useState<Question>();
    const [g, setG] = useState<{active: Boolean, player: (Player | boolean | undefined)}>({ active: false, player: undefined });
    const [dropping, setDropping] = useState(false);
    const [currentVolum, setCurrentVolum] = useState(0);
    const [endVolum, setEndVolum] = useState(30);
    const [answered, setAnswered] = useState(false);
    const [modal, setModal] = useState<{ show: boolean, title: string, message: string }>({ show: false, title: '', message: ''});
    const [time, setTime] = useState<NodeJS.Timeout | null>();
    const [purple, setPurple] = useState(false);
    const router = useRouter();
    const init = () => {
        if (ctx.questions.every(x => x.used)) {
            ctx.questions.forEach(q => q.used = false);
        }

        setWaiting(false);
        setWaiting(true);

        const q = ctx.questions && ctx.questions.filter(x => !x.used)
        console.log(q);

        const r = Math.floor(Math.random() * q.length);

        setQuestion(q[r])

        q[r].use();

        ctx.update();

        clearTimeout(time as NodeJS.Timeout);
        setTime(setTimeout(() => {
            init();
        }, 10000));
    }

    useEffect(() => {

        if (!(ctx.players && ctx.players.length === 2 && ctx.players.every(x => x.name))) {
            console.log('123');
            router.replace('/');
        }

        setWaiting(true);

        if (ctx.questions?.length > 0) {
            init();
        }

        setEndVolum(1 + (10 * Math.floor(Math.random() * 3)))

        return () => {
            clearTimeout(time as NodeJS.Timeout);

            setTime(null);
        }

    }, []);

    const handleAnwser = (alternative, player: number) => {
        if (!waiting && !answered) {
            setAnswered(true);

            setTimeout(() => {
                setG({
                    active: true,
                    player: alternative !== question?.answer ? (ctx && ctx.players && ctx.players.length > 0 && ctx.players[player]) || undefined : (ctx && ctx.players && ctx.players.length > 0 && ctx.players.some((p, ii) => ii !== player) && ctx.players.find((p, ii) => ii !== player)),
                });
                console.log(alternative, question?.answer);
            }, 2000)
        }
    };

    const handleGoToAnswer = (p: number) => {
        if (!answering) {
            setAnswering(p);
            setWaiting(false);
            
            clearTimeout(time as NodeJS.Timeout);
            setTime(null);
        }
    }

    function drop() {
        setDropping(true);
        setTimeout(() => {
            setCurrentVolum(currentVolum + 10);
            setDropping(false)

            console.log(g.player);


            if (currentVolum >= endVolum) {
                setPurple(true);

                setTimeout(() => {
                    const winner = ctx.players && ctx.players.find((_, i) => i !== (ctx.players && ctx.players.indexOf(g.player as Player)))
                    setModal({show: true, title: 'Jogo finalizado', message: `O jogador ${winner?.name} ganhou`});
                }, 700)
            } else {
                setTimeout(() => {
                    setG({ active: false, player: undefined });
                setAnswering(null);
                setAnswered(false);
                setWaiting(true);
                clearTimeout(time as NodeJS.Timeout);
                init();
                }, 500)
            }
        }, 600);
    }

    return (
        <div className="relative w-full min-h-screen p-0 grid place-items-center bg-black">
            <Modal show={modal.show} title={modal.title} message={modal.message} />
            {
                !g.active ? (
                    <div className="absolute min-h-screen flex flex-col justify-center items-center">

                        {
                            ctx.players?.map((player, i) => (
                                <div key={i} className={`${style.playerBox} transition-opacity ${(answering && answering !== (i + 1)) && 'opacity-10'}`}>
                                    <div className="min-w-full p-4 mb-2 max-w-sm ring-1 ring-yellow-700 rounded-md bg-white">
                                        <p className="text-gray-500 text-justify">{question?.question}</p>
                                        <div className="mt-2 flex flex-col gap-y-2">
                                            {
                                                question?.alternatives.map((alternative, ii) => {
                                                    return <div key={ii + 1} onClick={() => handleAnwser(ii + 1, i)} className={`w-full bg-gray-100 p-2 rounded-sm border-2 ${(answering && answering === i + 1) && 'hover:bg-gray-200 cursor-pointer'} ${answered && (ii + 1 === question.answer ? 'border-green-500' : 'border-red-500')}`}>{alternative}</div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <span className="label">{player.name}</span>
                                    <button onClick={() => handleGoToAnswer(i + 1)} className={`${style.button} flex gap-x-4 justify-center items-center`}><span className="relative flex gap-x-4 justify-center items-center">Responder
                                    <svg xmlns="http://www.w3.org/2000/svg" className="relative h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clipRule="evenodd" />
</svg></span>
                        
                                        {waiting && <div className={style.buttonAnimatedCircle}></div>}
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className={'h-screen flex items-center flex-col justify-between pb-10 ' + (ctx.players && ctx.players.indexOf(g.player as Player) < 1 ? 'transform rotate-180' : '')}>
                        <div className={style.pipet}>
                        </div>
                        <div className={`${style.drop} ${dropping && style.dropp}`}></div>
                        <div className={`${style.erlenmeyer} ${purple && '!bg-purple-400'}`}>
                            <div className={style.liquid} style={{ height: 50 + currentVolum }}></div>
                        </div>
                        <button onClick={() => drop()} className="overflow-hidden grid place-items-center transition-colors px-8 bottom-20 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 rounded-lg"><span class="relative flex gap-x-4 justify-center items-center">Despejar
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
</svg></span></button>
                    </div>
                )
            }
        </div>
    )
}