import React, { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import NameModal from './NameModal';

const Home = () => {

    const socket = useMemo(() => io('http://localhost:5000/'), []);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const room = 'chatRoom';

  useEffect(() => {
    if (!modalOpen) {

      socket.emit('join room', room);

      socket.on('chat-message', ({ message, userid }) => {
        const newMessage = { type: 'other', text: message, sender: userid };
        setMessages([...messages, newMessage]);
      });

      return () => {
        socket.off('chat-message');
      };
    }
  }, [modalOpen, messages, socket]);

  useEffect(() => {


    

    return () => {
      socket.off('user-joined');
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== '') {
      const newMessage = { type: 'user', text: message };
      setMessages([...messages, newMessage]);
      console.log(message, messages);
      setMessage('');
      socket.emit('chat-message', { room, message });
    }
  };

  const handleNameSubmit = (name) => {
    socket.emit('set-name', name);
    socket.on('user-joined', ({ room, userid }) => {
      console.log(`${userid} joined the ${room}`);
    })
    setModalOpen(false);
  };

    return (

        <div>

            <section className="message-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="chat-area">
                                <div className="chatlist">
                                    <div className="modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="chat-header">
                                                <div className="msg-search">
                                                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" aria-label="search" />
                                                    <a className="add" href="#"><img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/add.svg" alt="add" /></a>
                                                </div>
                                            </div>

                                            {/* <div className="modal-body">
                                                <div className="chat-lists">
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                                            <div className="chat-list">
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Mehedi Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Ryhan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Malek Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Sadik Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Bulu </h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Maria SK</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Dipa Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Jhon Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Tumpa Moni</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Payel Akter</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Baby Akter</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Zuwel Rana</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Habib </h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Jalal Ahmed</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Hasan Ali</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Mehedi Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>

                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">

                                                            <div className="chat-list">
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Mehedi Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Ryhan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Malek Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Sadik Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Bulu </h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Maria SK</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Dipa Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Jhon Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Tumpa Moni</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Payel Akter</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Baby Akter</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Zuwel Rana</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Habib </h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Jalal Ahmed</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Hasan Ali</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Mehedi Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="chatbox">
                                    <div className="modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="msg-head">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <div className="d-flex align-items-center">
                                                            <span className="chat-icon"><img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="image title" /></span>
                                                            <div className="flex-shrink-0">
                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                            </div>
                                                            <div className="flex-grow-1 ms-3">
                                                                <h3>Group Chat</h3>
                                                                <p>demo chat</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <ul className="moreoption">
                                                            <li className="navbar nav-item dropdown">
                                                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                                                                <ul className="dropdown-menu">
                                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                                    <li>
                                                                        <hr className="dropdown-divider" />
                                                                    </li>
                                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-body">
                                                {messages.map((msg, index) => (
                                                    <div key={index} className={msg.type === 'user' ? 'message' : 'message2'} style={{ wordBreak: "break-all" }}>
                                                        {msg.sender && msg.sender + " :"} {msg.text}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="send-box">
                                            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>

                                                <div className="send-btns">
                                                    <div className="attach">
                                                        <div className="button-wrapper">
                                                            <span className="label">
                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/upload.svg" alt="image title" /> attached file
                                                            </span><input type="file" name="upload" id="upload" className="upload-box" placeholder="Upload File" aria-label="Upload File" />
                                                        </div>

                                                        <select className="form-control" id="exampleFormControlSelect1">
                                                            <option>Select template</option>
                                                            <option>Template 1</option>
                                                            <option>Template 2</option>
                                                        </select>

                                                        <div className="add-apoint">
                                                            <a href="#" data-toggle="modal" data-target="#exampleModal4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" fill="none">
                                                                <path d="M8 16C3.58862 16 0 12.4114 0 8C0 3.58862 3.58862 0 8 0C12.4114 0 16 3.58862 16 8C16 12.4114 12.4114 16 8 16ZM8 1C4.14001 1 1 4.14001 1 8C1 11.86 4.14001 15 8 15C11.86 15 15 11.86 15 8C15 4.14001 11.86 1 8 1Z" fill="#7D7D7D" />
                                                                <path d="M11.5 8.5H4.5C4.224 8.5 4 8.276 4 8C4 7.724 4.224 7.5 4.5 7.5H11.5C11.776 7.5 12 7.724 12 8C12 8.276 11.776 8.5 11.5 8.5Z" fill="#7D7D7D" />
                                                                <path d="M8 12C7.724 12 7.5 11.776 7.5 11.5V4.5C7.5 4.224 7.724 4 8 4C8.276 4 8.5 4.224 8.5 4.5V11.5C8.5 11.776 8.276 12 8 12Z" fill="#7D7D7D" />
                                                            </svg> Appoinment</a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Home