import { ExternalLinkIcon } from "../icons/icons"

interface MyProps {
    fromToken : {
        symbol : string,
        logo : React.ReactNode
    },
    toToken : {
        symbol : string,
        logo : React.ReactNode
    },
    date : string,
    status : string
}

const TxHistoryItem = ({ fromToken, toToken, date, status } : MyProps) => {
    return (
        <div className="flex items-center justify-between w-full p-3 hover:bg-slate-800/30 rounded-lg transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-4">
                    {fromToken.logo}
                    {toToken.logo}
                </div>
                <div>
                    <p className="font-semibold text-white">Swap {fromToken.symbol} to {toToken.symbol}</p>
                    <p className="text-sm text-gray-400">{date}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{status}</span>
                <ExternalLinkIcon />
            </div>
        </div>
    )
}

export default TxHistoryItem;