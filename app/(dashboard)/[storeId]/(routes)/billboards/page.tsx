import { BillBoardClient } from "./_components/client"

const BillBoards = ({params}: {params: {storeId: string }}) => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-x-4 p-8 pt-6">
                <BillBoardClient />
            </div>
        </div>
    )
}

export default BillBoards