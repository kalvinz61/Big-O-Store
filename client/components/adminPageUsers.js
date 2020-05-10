import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const AdminPageUsers = () => {
  const [users, setUsers] = useState([])

  async function fetchUsers() {
    const usersData = (await axios.get('/api/users')).data
    setUsers(usersData)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <ul>
        {users &&
          users.map(user => {
            if (user.email) {
              return (
                <li key={user.id}>
                  <h3>{user.email}</h3>
                </li>
              )
            } else return null
          })}
      </ul>
    </div>
  )
}
