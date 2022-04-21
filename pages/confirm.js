import { useEffect, useState } from "react"
import tw from "tailwind-styled-components"
import Link from 'next/link'
import Map from './components/Map'
import { useRouter } from 'next/router'
import RideSelector from "./components/RideSelector"

const confirm = () => {

    const router = useRouter()
    const { pickup, dropoff } = router.query

            //getfunction       //set function
    const [pickupCoordinates, setPickupCoordinates] = useState([0, 0])
    const [dropoffCoordinates, setdropoffCoordinates] = useState([0, 0])

    const getPickupCoordinates = (pickup) => {
        //const pickup = "Santa Monica";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + 
            new URLSearchParams({
                access_token:"pk.eyJ1IjoiaGVucnlrYXkiLCJhIjoiY2t2bWo5ZzdvM2ZvczJvcWkwNDFzNmdiaCJ9.1OAafyv0rVXq2d46umCZpg",
                limit: 1
            })
        )
        .then(response => response.json())
        .then(data => {
            setPickupCoordinates(data.features[0].center) 
        })
    }

    const getDropoffCoordinates = (dropoff) => {
        //const dropoff= "Los Angeles";
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + 
            new URLSearchParams({
                access_token:"pk.eyJ1IjoiaGVucnlrYXkiLCJhIjoiY2t2bWo5ZzdvM2ZvczJvcWkwNDFzNmdiaCJ9.1OAafyv0rVXq2d46umCZpg",
                limit: 1
            })
        )
        .then(response => response.json())
        .then(data => {
            setdropoffCoordinates(data.features[0].center)
        })
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup , dropoff])

    return (
        <Wrapper>
            
            <Link href="/search">
            <ButtonContainer>
                <BackBtn src= 'https://img.icons8.com/ios-filled/50/000000/left.png' />
            </ButtonContainer>
            </Link>

            <Map 
                pickupCoordinates={pickupCoordinates}
                dropoffCoordinates={dropoffCoordinates}
            />
            <RideContainer> 
               <RideSelector 
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates}
               />

               <ConfirmBtnContainer>
                    <ConfirmBtn>
                        Confirm UberX
                    </ConfirmBtn>
               </ConfirmBtnContainer>
            </RideContainer>
            
        </Wrapper>
    )
}

export default confirm


const Wrapper = tw.div`
    flex h-screen
    flex-col
`
const RideContainer = tw.div`
    flex-1 
    flex flex-col
    h-1/2
`

const ConfirmBtn = tw.div`
    bg-black text-white text-center text-xl
    m-3 py-4 
`

const ConfirmBtnContainer = tw.div`
    border-t-2
    cursor-pointer
`
const ButtonContainer = tw.div`
    absolute z-10 bg-white rounded-full
    top-4 left-4 shadow-md cursor-pointer
`
const BackBtn = tw.img`
    
`
