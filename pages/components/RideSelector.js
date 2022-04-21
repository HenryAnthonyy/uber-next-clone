import React, { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import { carList } from '../../carList'

const RideSelector = ({pickupCoordinates, dropoffCoordinates}) => {

    const [rideDuration, setrideduration] = useState(0)

        //get ride duration from mapbox api
    useEffect(() => {
        rideDuration = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoiaGVucnlrYXkiLCJhIjoiY2t2bWo5ZzdvM2ZvczJvcWkwNDFzNmdiaCJ9.1OAafyv0rVXq2d46umCZpg`
        
        )
        .then(res => res.json())
        .then(data => {
            setrideduration(data.routes[0].duration / 100) // routes[0] gets us only one route which we need
        })


    }, [pickupCoordinates, dropoffCoordinates])
    return (
        <Wrapper>
            <Header>Choose a ride or swipe up for more</Header>
            <CarOptions>
                { carList.map((car, index) => 
                    <Car key={index}>
                        <CarImage src={car.imgUrl}/>
                        <CarDetails>
                            <Cartype>{car.service}</Cartype>
                            <Time>5 min(s) away</Time>
                        </CarDetails>
                        <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                    
                
                )}
            </CarOptions>
        </Wrapper>
    )
}

export default RideSelector

const Wrapper = tw.div`
    flex-1 
    flex flex-col
    overflow-y-scroll //scroll within wrapper
`

const Header = tw.div`
    text-gray-500 text-center text-xs
    py-2 border-b
`
const CarOptions = tw.div`
    overflow-y-scroll
`

const Car = tw.div`
   flex p-4
   items-center
   
`

const CarImage = tw.img`
    h-14 mr-4
`
const CarDetails = tw.div`
    flex-1
`

const Time = tw.div`
    text-xs text-blue-500
`

const Cartype = tw.div`
    font-medium
`
const Price = tw.div`
    text-sm
`