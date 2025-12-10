// our-dimain.com/new-photo
import NewAlbumForm from '../../components/Albums/NewAlbumForm'
import { useRouter } from 'next/router';
import GlobalContext from "../../pages/store/globalContext"
import { useContext } from 'react'

function NewAlbumPage() {
    const router = useRouter()
    const globalCtx = useContext(GlobalContext)

    async function addAlbumHandler(enteredAlbumData)  {
        await globalCtx.updateGlobals({cmd: 'addPhoto', newVal: enteredAlbumData})
        router.push('/');
    }

    return <NewAlbumForm onAddAlbum={addAlbumHandler} />
}

export default NewAlbumPage