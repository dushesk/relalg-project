import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Navbar4 from '../components/navbar4'
import Task from '../components/task'
import Footer1 from '../components/footer1'
import './exercises.css'
import { getAllTasks } from '../services/taskService'

const Exercises = (props) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000');
        if (!response.ok) {
          throw new Error('An error occurred while fetching tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTasks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="exercises-container">
      <Helmet>
        <title>Exercises - RelAlgoPractice</title>
        <meta property="og:title" content="Exercises - RelAlgoPractice" />
      </Helmet>
      <Navbar4
        action1="Регистрация"
        action2="Вход"
        logoAlt="Здесь вы найдете логотип для нашего сайта"
        rootClassName="navbar4-root-class-name5"
      ></Navbar4>
      <Link to="/exercise" className="exercises-navlink">
        <Task
          rootClassName="task-root-class-name"
          className="exercises-component1"
        ></Task>
      </Link>
      <Task rootClassName="task-root-class-name4" heading="Задача 2"></Task>
      <Task rootClassName="task-root-class-name1" heading="Задача 3"></Task>
      <Footer1></Footer1>
    </div>
  )
}

export default Exercises
