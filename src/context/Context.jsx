import {createContext, useState} from "react";
import getChatResponse from "../config/zolkin";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    // Estado para manejar las conversaciones
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);

    const addMessageToCurrentConversation = (message, isUser = true, conversationId = null) => {
        let convId = conversationId || currentConversationId;
        if (!convId) {
            // Si no hay conversación activa, crear una nueva
            const newConversationId = Date.now().toString();
            setConversations(prev => [...prev, {
                id: newConversationId,
                messages: []
            }]);
            setCurrentConversationId(newConversationId);
            convId = newConversationId;  // Usar el nuevo ID de conversación
        }
        
        setConversations(prev => prev.map(conv => {
            if (conv.id === convId) {
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
        return convId;
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setInput("");
        let response;
    
        const messageToSend = prompt !== undefined ? prompt : input;
    
        // Agregar mensaje del usuario a la conversación actual
        const conversationId = addMessageToCurrentConversation(messageToSend, true);

        console.log("Prompt:", messageToSend);
        console.log("ID de conversación:", conversationId);
    
        if (prompt === undefined) {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
        } else {
            setRecentPrompt(prompt);
        }
    
        // Obtener respuesta
        response = await getChatResponse(messageToSend, conversationId);
    
        // Evitar formatear la respuesta como HTML y manejarla directamente como Markdown
        const responseMarkdown = response;

        setLoading(false);
    
        // Mostrar la respuesta gradualmente
        const responseArray = responseMarkdown.split(" ");
        addMessageToCurrentConversation("", false, conversationId);
    
        const displayResponse = async (wordsArray) => {
            for (let i = 0; i < wordsArray.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 75));
                const nextWord = wordsArray[i] + " ";
    
                setResultData(prev => prev + nextWord);
    
                // Actualizar el último mensaje en la conversación
                setConversations(prevConversations => prevConversations.map(conv => {
                    if (conv.id === conversationId) {
                        const updatedMessages = [...conv.messages];
                        const lastIndex = updatedMessages.length - 1;
                        updatedMessages[lastIndex] = {
                            ...updatedMessages[lastIndex],
                            content: (updatedMessages[lastIndex].content || "") + nextWord
                        };
                        return {
                            ...conv,
                            messages: updatedMessages
                        };
                    }
                    return conv;
                }));
            }
        };
    
        await displayResponse(responseArray);
    };

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