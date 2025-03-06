import React from 'react'


const UserList = () => {
    const users = ["New Channel", "Direct Message"];
    return (
      <div className="user-list">
        <h2 className="title">Users</h2>
        <div className='user-btn'>
          {users.map((user, index) => (
            <div key={index} className="user-item">{user}</div>
          ))}
        </div>
      </div>
    );
  };

  export default UserList;