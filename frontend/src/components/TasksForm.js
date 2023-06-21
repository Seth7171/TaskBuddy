import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TaskForm = () => {
    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [deadline, setDeadline] = useState('')
    const [type, setType] = useState('');
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const task = { title, note, deadline, type }

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setNote('')
            setDeadline('')
            setType('')
            setError(null)
            setEmptyFields([])
            console.log('new task added', json)
            dispatch({ type: 'CREATE_TASK', payload: json })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Task Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Note (Optional):</label>
            <input
                type="text"
                onChange={(e) => setNote(e.target.value)}
                value={note}
                className={emptyFields.includes('note') ? 'error' : ''}
            />

            <label>Deadline:</label>
            <input
                type="date"
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                className={emptyFields.includes('deadline') ? 'error' : ''}
            />
            
            <label>Type:</label>
            <select
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={emptyFields.includes("type") ? "error" : ''}
            >
                <option value="">Select a type</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="home">Home</option>
                <option value="educational">Educational</option>
            </select>

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm;
