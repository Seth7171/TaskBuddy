import { useEffect } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"
import '../style/MyTasks.css';

//components
import TaskDetails from '../components/TaskDetails'
import TaskFrom from "../components/TasksForm"
import NoTasksImage from "../assets/no-tasks-image.png"; // Import the image

const MyTasks = () => {
    const {tasks, dispatch} = useTasksContext()
    const {user}= useAuthContext()


    useEffect(() =>{
        const fetchTasks = async()=> {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }
        if (user) {
            fetchTasks()
        }
    }, [dispatch,user])

    return (
        <div className="mytasks">
          <div className="tasks">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskDetails key={task._id} task={task} />
              ))
            ) : (
              <div className="no-tasks">
                <img src={NoTasksImage} alt="No tasks" />
              </div>
            )}
          </div>
          <TaskFrom />
        </div>
      );
    };

export default MyTasks