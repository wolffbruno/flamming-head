import style from './Modal.module.css'

export default function Modal({show, title, message}: { show: boolean, title: string, message: string }) {
    return (
        
            show ? (
                <div className={style.backdrop}>
                    <div className="p-4 mb-2 max-w-sm ring-1 ring-yellow-700 rounded-md bg-white text-center grid place-items-center gap-y-2">
                        <h1 className="text-lg bg-yellow-500 rounded-lg p-2 text-yellow-50">{title}</h1>
                        <span>{message}</span>
                    </div>
                </div>
            ) : <></>
        
    )
}