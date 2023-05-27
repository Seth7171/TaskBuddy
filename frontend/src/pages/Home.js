import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorksoutsContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutFrom from "../components/WorkoutsForm"

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() =>{
        const fetchWorouts = async()=> {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorouts()
    }, [dispatch])

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