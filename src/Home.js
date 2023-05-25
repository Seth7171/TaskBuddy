import { useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {

    const title = 'Welcome to the new blog';
    const likes = 50;
    const link = "https://steamcommunity.com/sharedfiles/filedetails/?id=2755960032"
    
    //const person = { name: 'yoshi', age: 30 };
   // npx json-server --watch data/db.json --port 8000
   // npm install react-router-dom@5
  /*  const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
      ]); */
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');


   /* const handleDelete =(id) =>{
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    } */

    // let name = 'mario';
    const [name, setName] = useState('mario');
    const [age, setAge] = useState(25);

    const handleClick = (e) => {
        console.log('hello, ninjas', e);
        // name = 'luigi';
        setName('luigi');
        setAge(30);
    }

    const handleClickAgian = (name, e) => {
        console.log('hello ' + name, e.target);
    }


    return (
        <div className="home">
            <h1>{title}</h1>

            <p>Liked {likes} times</p>
            <p>{10}</p>
            <p>{"Hello ninjas"}</p>
            <p>{[1,2,3,4,5]}</p>
            <p>{Math.random()*10}</p>
            <a href={link}>My guide</a>
            
            <br></br>
            <br></br>
            <br></br>
            <h2>Homepage</h2>

            <p>{ name } is { age }</p>
            <button onClick={handleClick}>Click me</button>
            <button onClick={(e) => handleClickAgian('mario', e)}>Click me again</button>
            <br></br>
            <br></br>
            <button onClick={() => setName('luigi')}>change name</button>
            <p>{ name }</p>

            <br></br>
            <br></br>
            <br></br>

            { error && <div>{ error }</div>}
            { isPending && <div>Loading....</div> }
            {blogs && <BlogList blogs={blogs} title="All Blogs!"/>} 

        </div>
      );
}
 //  handleDelete={handleDelete}
 // <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Marios blogs"/>
export default Home;