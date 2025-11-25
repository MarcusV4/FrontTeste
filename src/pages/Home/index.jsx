import { useEffect, useState } from 'react'
import './style.css'
import Img from '../../assets/obito.svg'
import api from '../../services/api.js'


function Home() {
const [users, setUsers] = useState([])

  async function getUsers() {

    const usersFromApi = await api.get('/aluno')
    setUsers(usersFromApi.data)
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className='container'>
      <form>
        <h1>Cadastro</h1>
        <input placeholder='Nome' name='nome' type='text' />
        <input placeholder='Email' email='email' type='email' />
        <button type='button'>Cadastrar</button>
      </form>

      {users.map(user => (
        <div className='card'>
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Img} width='200' height='200' />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
