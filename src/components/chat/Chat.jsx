import React, {useContext, useEffect, useRef, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/Context.jsx";
import './Chat.css';

const Chat = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        conversations,
        currentConversationId
    } = useContext(Context);
    
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5002/user_info/')
        .then(response => {
            setUserData(response.data); // Guardar los datos en el estado
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }, []);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);

    // Obtener la conversación actual
    const currentConversation = conversations.find(conv => conv.id === currentConversationId);

    // Renderizar un mensaje individual
    const renderMessage = (message, index) => {
        return (
            <div key={index} className={`${message.isUser ? 'user-message' : 'bot-message'}`} ref={resultRef}>
                <div className="message-header">
                    <img 
                        // src={message.isUser ? assets.user_icon : assets.zolkin_icon} 
                        src={
                            message.isUser ?
                                userData ? userData.picture : assets.user_icon
                                : assets.zolkin_icon
                        }
                        alt={message.isUser ? "User" : "Bot"}
                    />
                    {message.isUser ? (
                        <p>{message.content}</p>
                    ) : (
                        <ReactMarkdown className={'bot-content'} rehypePlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    )}
                </div>
            </div>
        );
    };

    return (
        <main className="main">
            <nav className="nav">
                <p>Zolkin</p>
                <img src={userData ? userData.picture: assets.user_icon} alt=""/>
            </nav>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hola, {userData ? userData.name : 'Human'}</span></p>
                            <p>¿Cómo puedo ayudarte hoy?</p>
                        </div>
                        <div className="cards">
                            <div className="card"
                                 onClick={() => setInput("¿Cuál es el mejor método para aprender un nuevo idioma?")}>
                                <p>¿Cuál es el mejor método para aprender un nuevo idioma?</p>
                                <img src={assets.compass_icon} alt=""/>
                            </div>
                            <div className="card"
                                 onClick={() => setInput("Resume el artículo sobre el cambio climático.")}>
                                <p>Resume el artículo sobre el cambio climático.</p>
                                <img src={assets.rag_icon} alt=""/>
                            </div>
                            <div className="card"
                                 onClick={() => setInput("Redacta un borrador en Gmail para informarle a mi asesor que la reunión programada para hoy no será posible.")}>
                                <p>Redacta un borrador en Gmail para informarle a mi asesor que la reunión programada para hoy no será posible.</p>
                                <img src={assets.mail_icon} alt=""/>
                            </div>
                            <div className="card" 
                                 onClick={() => setInput("¿Cuáles son los próximos eventos en mi calendario? ")}>
                                <p>¿Cuáles son los próximos eventos en mi calendario? </p>
                                <img src={assets.calendar_icon} alt=""/>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='message' ref={resultRef}>
                        {currentConversation && currentConversation.messages.map((message, index) => 
                            renderMessage(message, index)
                        )}
                        {loading && (
                            <div className="message bot-message">
                                <div className="message-header">
                                    <img className='message-content-icon' src={assets.zolkin_icon} alt="Bot"/>
                                    <div className='loader'>
                                        <hr/>
                                        <hr/>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <textarea 
                            rows={rows} 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={(e) => {
                                if (input.trim() !== "" && e.key === 'Enter') {
                                    e.preventDefault();
                                    onSent();
                                }
                            }}
                            value={input}
                            placeholder="Introduzca el prompt aquí"
                        />
                        <div className="icon-container">
                            <button 
                                type="submit" 
                                onClick={() => {
                                    if (input.trim() !== "") {
                                        onSent()
                                    }
                                }}>
                                <img src={assets.send_icon} alt=""/>
                            </button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Zolkin puede cometer errores. Comprueba la información importante.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Chat;