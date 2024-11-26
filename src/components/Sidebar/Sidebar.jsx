import React, {useContext, useState} from 'react';
import './sidebar.css';
import {assets} from '../../assets/assets';
import {Context} from '../../context/Context';

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

        // Si es hoy, mostrar la hora
        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        }
        // Si es ayer, mostrar "Ayer"
        else if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer';
        }
        // Si es este año, mostrar día y mes
        else if (date.getFullYear() === today.getFullYear()) {
            return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
        }
        // Si es otro año, mostrar fecha completa
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getConversationTitle = (messages) => {
        if (messages.length === 0) return "Nueva conversación";
        // Obtener el primer mensaje del usuario
        const firstUserMessage = messages.find(msg => msg.isUser);
        if (!firstUserMessage) return "Nueva conversación";
        // Limitar el título a ~30 caracteres
        return firstUserMessage.content.length > 30 
            ? firstUserMessage.content.substring(0, 30) + "..."
            : firstUserMessage.content;
    };

    return (
        <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
            <div className={`top ${extended ? '' : 'centered'}`}>
                <div className="menu" onClick={() => setExtended(prev => !prev)}>
                    <img src={assets.menu_icon} alt="Menu Icon"/>
                </div>
                <div className="side-option" id='upload-file'>
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
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon"/>
                    <p className={`fade ${extended ? 'block' : 'none'}`}>Sobre Zolkin</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;