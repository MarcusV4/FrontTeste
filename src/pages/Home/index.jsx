import { useEffect, useState, useRef } from 'react'
import './style.css'
import Img from '../../assets/obito.svg'
import api from '../../services/api.js'


function Home() {
  const [users, setUsers] = useState([])


  const inputNome = useRef()
  const inputEmail = useRef()



  async function getUsers() {

    const usersFromApi = await api.get('/aluno')
    setUsers(usersFromApi.data)
  }

  async function postUsers() {
    await api.post('/aluno', {
      nome: inputNome.current.value,
      email: inputEmail.current.value
    })

    getUsers()

  }

  async function deleteUsers(id) {
    await api.delete(`/aluno/${id}`);


    getUsers();
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className='container'>
      <form>
        <h1>Cadastro</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputNome} />
        <input placeholder='Email' email='email' type='email' ref={inputEmail} />
        <button type='button' onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        console.log("estrutura do user",user),
        <div key={user.alunoId} className='card'>
          <div>
            <p>ID DO USER NO MAP: {user.alunoId}</p>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.alunoId)}>
            <img src={Img} width='200' height='200' />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
