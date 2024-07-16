import React, { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom'
import NameModal from './NameModal';

const Home = () => {

    const socket = useMemo(() => io('https://alerts.socceryou.ch/'), []);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [modalOpen, setModalOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Handle midnight (0) case
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const time = `${formattedHours}:${formattedMinutes} ${period}`;

    const room = 'chatRoom';

    useEffect(() => {
        if (!modalOpen) {
            socket.emit('join room', room);

            socket.onAny((event, ...args) => {
                console.log('Received event:', event, args);

                if (event === 'chat-message') {
                    const [data] = args;
                    const { message, userid } = data;
                    const newMessage = { type: 'other', text: message, sender: userid };
                    setMessages(prevMessages => [...prevMessages, newMessage]);

                    setNotifications(prevNotifications => [
                        ...prevNotifications,
                        { type: 'message', text: `${userid} sent you a new message` }
                    ]);
                }

                else if (event === 'user-joined') {
                    const [data] = args;
                    const { userid } = data;
                    if (!users.find(user => user.userid === userid)) {
                        const newUser = { userid, message: `${userid} joined the ${room}` };
                        setUsers(prevUsers => [...prevUsers, newUser]);

                        setNotifications(prevNotifications => [
                            ...prevNotifications,
                            { type: 'join', text: `${userid} joined the ${room}` }
                        ]);
                    }
                }
            });

            return () => {
                socket.offAny();
            };
        }
    }, [modalOpen, users, socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            const newMessage = { type: 'user', text: message };
            setMessages(prevMessages => [...prevMessages, newMessage]);
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
            {modalOpen && <NameModal onSubmit={handleNameSubmit} />}
            {!modalOpen && (
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
                                                        {/* <div className="msg-search"> */}
                                                        <h2 style={{ textAlign: "center" }}>Notifcations</h2>
                                                        {/* <Link className="add" to='/'><img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/add.svg" alt="add" /></Link> */}
                                                        {/* </div> */}
                                                    </div>
                                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link active" id="Open-tab" data-bs-toggle="tab" data-bs-target="#Open" type="button" role="tab" aria-controls="Open" aria-selected="true">Open</button>
                                                        </li>
                                                    </ul>

                                                    <div className="modal-body">
                                                        <div className="chat-lists" style={{ padding: "10px 0" }}>
                                                            <div className="tab-content" id="myTabContent">
                                                                <div className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                                                    <div className="chat-list">
                                                                        {notifications.map((notif, index) => (
                                                                            <div key={index} className="notifications">

                                                                                <div className="flex-grow-1 ms-3">
                                                                                    <h3>New Notification</h3>
                                                                                    <p>{notif.text}</p>
                                                                                </div>

                                                                            </div>
                                                                        ))}

                                                                    </div>
                                                                </div>
                                                                <div className="tab-pane fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">

                                                                    <div className="chat-list">
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                                <span className="active"></span>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Mehedi Hasan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Ryhan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Malek Hasan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Sadik Hasan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Bulu </h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Maria SK</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Dipa Hasan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Jhon Hasan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Tumpa Moni</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Payel Akter</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Baby Akter</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Zuwel Rana</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Habib </h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Jalal Ahmed</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Hasan Ali</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>
                                                                        <Link to='/' className="d-flex align-items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h3>Mehedi Hasan</h3>
                                                                                <p>front end developer</p>
                                                                            </div>
                                                                        </Link>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
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
                                                                    {/* <span className="chat-icon"><img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="image_title" /></span> */}
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
                                                                        <Link className="nav-link dropdown-toggle" to='/' role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></Link>
                                                                        <ul className="dropdown-menu">
                                                                            <li><Link className="dropdown-item" to='/'>Action</Link></li>
                                                                            <li><Link className="dropdown-item" to='/'>Another action</Link></li>
                                                                            <li>
                                                                                <hr className="dropdown-divider" />
                                                                            </li>
                                                                            <li><Link className="dropdown-item" to='/'>Something else here</Link></li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="modal-body">
                                                        <div className="msg-body">
                                                            <ul>

                                                                {messages.map((msg, index) => (
                                                                    <li key={index} className={msg.type === 'user' ? 'repaly' : 'sender'}>
                                                                        <p>{msg.text}</p>
                                                                        <span className="time">{time}</span>
                                                                        <span className="user time">sent by: {msg.sender}</span>
                                                                    </li>
                                                                ))}

                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <div className="send-box">

                                                        <form onSubmit={handleSubmit}>
                                                            <input type="text" value={message} className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />

                                                            <button type="submit"><i className="fa fa-paper-plane"></i> Send</button>
                                                        </form>
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
            )}
        </div>

    )
}

export default Home