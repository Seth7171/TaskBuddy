import { useEffect, useState } from "react"
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutFrom from "../components/WorkoutsForm"
const Home = () => {
    const [workouts, setWorkouts]= useState(null)

    useEffect(() =>{
        const fetchWorouts = async()=> {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok){
                setWorkouts(json)
            }
        }

        fetchWorouts()
    }, [])

    return (
        <div className="home">
            <div className="worksouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key = {workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutFrom />
        </div>
    )
}

export default Home