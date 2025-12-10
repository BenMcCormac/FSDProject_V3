import AlbumList from '../components/Albums/AlbumList'
import { useContext } from "react";
import GlobalContext from "./store/globalContext"

function HomePage() {
    const globalCtx = useContext(GlobalContext)

    if (globalCtx.theGlobalObject.dataLoaded == true) {
        return <AlbumList Albums={globalCtx.theGlobalObject.Photos} />
    }
    return <div>Loading data from database, please wait . . . </div>
}

export default HomePage;