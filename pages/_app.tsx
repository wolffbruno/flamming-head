import '../styles/globals.css'
import { createContext, useEffect, useState } from 'react';
import type { AppProps } from 'next/app'

export class Player {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  changeNameToKarter() {
    console.log(this.name);
    this.name = 'Karter';
  }
}

export class Question {
  answer: 1 | 2 | 3 | 4;
  question: string;
  alternatives: string[];
  used = false;

  constructor(question: string, alternatives: string[], answer: 1 | 2 | 3 | 4,) {
    this.question = question;
    this.alternatives = alternatives;
    this.answer = answer;
  }

  use() {
    this.used = true;
  }
}

export type GlobalContext = {
  players?: Player[],
  addPlayer?: (name: string) => void,
  update: () => void,
  questions: Question[],
}

export const globalContext = createContext<GlobalContext>({ update: () => {}, questions: [] });

function MyApp({ Component, pageProps }: AppProps) {
  const [context, setContext] = useState<GlobalContext>({
    players: [new Player(''), new Player('')],
    update: () => {
      setContext({...context});
    },
    questions: [
      new Question('Qual é a fórmula do ácido carbônico?', ['H2CO3', 'H2O', 'HCl'], 1),
      new Question('Quais íons são formados a partir da decomposição da água?', ['H+ e OH-', 'H+ e O-', 'H2+ e O-'], 1),
      new Question('Nos compêndios do ensino médio são classificados os compostos como funções da química inorgânica os seguintes grupos:', ['aminas, amidas, álcoois e cetonas.', 'ácidos , bases, óxidos e sais.', 'aminoácidos, aldeídos, proteínas e sais'], 2),
      new Question('Um ácido é caracterizado pela presença majoritária de qual íon?', ['Cl-', 'H2', 'H+'], 3),
      new Question('Qual é o nome do fenômeno que caracteriza o fim de uma reação ácido-base?', ['Acidificação', 'Neutralização', 'Corrosão', 'Monopolização'], 2),
      new Question('Dadas as espécies químicas a seguir, qual delas pode ser classificada como um ácido de Arrhenius?', ['LiH', 'Na2O', 'HCl'], 3),
      new Question('HBr, H2Se e CaOH são, respectivamente:', ['Ácido, base e ácido', 'Ácido, base e base', 'Ácido, ácido e base'], 3),
    ],
  });

  return (
    <globalContext.Provider value={context}>
      <Component {...pageProps} />
    </globalContext.Provider>
  )
}
export default MyApp
