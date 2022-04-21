import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import Link from 'next/link'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from '@firebase/auth'
import { useRouter } from 'next/router'



export default function Home() {

  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, user =>{
      if(user){
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        })
      }
      else
      {
        setUser(null)
        router.push('/Login')
      }
    })
  }, [])

  return (
    
    // <div className={styles.container}>
    //   <div className={styles.map}>Map</div>
    //   <div className={styles.start}>Start</div>
    // </div>

    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <UberLogo src='https://i.ibb.co/n6LWQM4/Post.png'/>
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage 
            src={user && user.photoUrl} onClick={() => signOut(auth)}/>
          </Profile>
        </Header>

        <ActionButtons>
          <Link href="/search">
          <ActionBtn>
            <ActionBtnImage src='https://i.ibb.co/cyvcpfF/uberx.png' />
            Ride</ActionBtn>
          </Link>
          <Link href="/search">
          <ActionBtn>
          <ActionBtnImage src='https://i.ibb.co/n776JLm/bike.png' />
            Wheels</ActionBtn>
          </Link>
          <Link href="/search">
          <ActionBtn>
            <ActionBtnImage src=' https://i.ibb.co/5RjchBg/uberschedule.png' />
            Reserve</ActionBtn>
          </Link>
        </ActionButtons>

        <InputBtn>
          Where to?
        </InputBtn>

      </ActionItems>
    </Wrapper>
  )
}

const Wrapper = tw.div`
  flex flex-col h-screen
`


const ActionItems = tw.div`
  flex-1 p-4
`
const Header = tw.div`
  flex justify-between items-center
`
const UberLogo = tw.img`
  h-28
`
const Profile = tw.div`
  flex items-center
`
const Name = tw.div`
  mr-4 w-20
`
const UserImage = tw.img`
  h-12 w-12 rounded-full 
  border border-green-300 p-px
  cursor-pointer
`

const ActionButtons = tw.div`
  flex mt-3
`
const ActionBtn = tw.div`
  flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col
  justify-center rounded-lg 
  transform hover:scale-105 transition 
  text-xl

`

const ActionBtnImage = tw.img`
h-3/5
`

const InputBtn = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
  rounded-lg
`