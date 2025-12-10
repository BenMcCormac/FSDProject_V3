import classes from './MainNavigation.module.css'
import Link from 'next/link'
import HamMenu from "../generic/HamMenu"
import HamMenuFAB from "../generic/HamMenuFAB"
import { useContext } from 'react'
import GlobalContext from "../../pages/store/globalContext"
import HamMenuContent from "./HamMenuContent"
import { useRouter } from 'next/router'

function MainNavigation() {
  const globalCtx = useContext(GlobalContext)
  const router = useRouter()

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: false })
  }

  const contents = []
  globalCtx.theGlobalObject.Photos.forEach(element => {
    contents.push({title: element.title, webAddress: '/' + element.PhotoId })
  });

  return (
    <header className={classes.header}>
      <HamMenuContent contents={contents} />
      <HamMenu toggleMenuHide={() => toggleMenuHide()} />
      <HamMenuFAB toggleMenuHide={() => toggleMenuHide()} />
      <nav>
        <ul>
          <li>
            <Link href='/'>All Photos</Link>
          </li>
          <li>
            <Link href='/new-photo'>Add New Photos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation
