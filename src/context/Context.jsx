import {createContext, useState} from "react";
import runChat from "../config/chatgpt";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    // Nuevo estado para manejar las conversaciones
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () => {
        // Crear nueva conversación con ID único
        const newConversationId = Date.now().toString();
        setConversations(prev => [...prev, {
            id: newConversationId,
            messages: []
        }]);
        setCurrentConversationId(newConversationId);
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
        setPrevPrompts([]);
    }

    const addMessageToCurrentConversation = (message, isUser = true) => {
        if (!currentConversationId) {
            // Si no hay conversación activa, crear una nueva
            newChat();
        }
        
        setConversations(prev => prev.map(conv => {
            if (conv.id === currentConversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, {
                        content: message,
                        isUser,
                        timestamp: new Date().toISOString()
                    }]
                };
            }
            return conv;
        }));
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        const messageToSend = prompt !== undefined ? prompt : input;
        
        // Agregar mensaje del usuario a la conversación actual
        addMessageToCurrentConversation(messageToSend, true);
        
        if (prompt === undefined) {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
        } else {
            setRecentPrompt(prompt);
        }

        // Obtener respuesta
        response = await runChat(messageToSend);

        // Formatear respuesta
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        
        
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        // Agregar respuesta del bot a la conversación actual
        addMessageToCurrentConversation(newResponse2, false);
        
        setLoading(false);
        setInput("");
    }

    const loadConversation = (conversationId) => {
        setCurrentConversationId(conversationId);
        const conversation = conversations.find(conv => conv.id === conversationId);
        if (conversation) {
            // Cargar el último mensaje como recentPrompt
            const lastUserMessage = [...conversation.messages]
                .reverse()
                .find(msg => msg.isUser);
            if (lastUserMessage) {
                setRecentPrompt(lastUserMessage.content);
            }
            // Mostrar la última respuesta
            const lastBotMessage = [...conversation.messages]
                .reverse()
                .find(msg => !msg.isUser);
            if (lastBotMessage) {
                setResultData(lastBotMessage.content);
                setShowResult(true);
            }
        }
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        conversations,
        currentConversationId,
        loadConversation
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;