import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorksoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutFrom from "../components/WorkoutsForm"

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user}= useAuthContext()


    useEffect(() =>{
        const fetchWorouts = async()=> {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if (user) {
            fetchWorouts()
        }
    }, [dispatch,user])

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