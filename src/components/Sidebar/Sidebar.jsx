import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import FileUploader from './FileUploader';
import './Sidebar.css';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {
        conversations,
        currentConversationId,
        loadConversation,
        newChat
    } = useContext(Context);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer';
        } else if (date.getFullYear() === today.getFullYear()) {
            return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
        }
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getConversationTitle = (messages) => {
        if (messages.length === 0) return "Nueva conversación";
        const firstUserMessage = messages.find(msg => msg.isUser);
        if (!firstUserMessage) return "Nueva conversación";
        return firstUserMessage.content.length > 30 
            ? firstUserMessage.content.substring(0, 30) + "..."
            : firstUserMessage.content;
    };

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Prevenir el scroll de fondo cuando el modal está abierto
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showForm]);

    return (
        <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
            <div className={`top ${extended ? '' : 'centered'}`}>
                <div className="menu" onClick={() => setExtended(prev => !prev)}>
                    <img src={assets.menu_icon} alt="Menu Icon"/>
                </div>
                <div onClick={toggleForm} className="side-option" id='upload-file'>
                    <img src={assets.upload_file_icon} alt="Upload Files Icon"/>
                    <p className={`${extended ? 'block' : 'none'}`}>Subir documentos</p>
                </div>
                <div onClick={newChat} className="side-option">
                    <img src={assets.plus_icon} alt="Plus Icon"/>
                    <p className={`${extended ? 'block' : 'none'}`}>Nueva conversación</p>
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Conversaciones</p>
                        <div className="conversations-list">
                            {conversations.slice().reverse().map((conversation) => (
                                <div 
                                    key={conversation.id}
                                    onClick={() => loadConversation(conversation.id)}
                                    className={`conversation-entry ${
                                        conversation.id === currentConversationId ? 'active' : ''
                                    }`}
                                >
                                    <div className="conversation-icon">
                                        <img src={assets.conversation_icon} alt=""/>
                                    </div>
                                    <div className="conversation-info">
                                        <p className="conversation-title">
                                            {getConversationTitle(conversation.messages)}
                                        </p>
                                        {conversation.messages.length > 0 && (
                                            <p className="conversation-date">
                                                {formatDate(conversation.messages[conversation.messages.length - 1].timestamp)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className={`bottom ${extended ? '' : 'centered'}`}>
                <div onClick={() => (window.location.href = './about.html')} 
                className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon"/>
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Sobre Zolkin</p>
                </div>
            </div>
            {showForm && (
                <div className="modal" onClick={toggleForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <FileUploader onUploadSuccess={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
