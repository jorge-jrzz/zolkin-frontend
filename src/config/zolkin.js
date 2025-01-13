import axios from 'axios';
axios.defaults.withCredentials = true;


/**
 * Función asíncrona para realizar una solicitud GET a la API.
 * @param {string} prompt - El prompt del usuario.
 * @param {string} conversationId - El ID de la conversación.
 * @returns {Promise<string>} - La respuesta desde la API.
 */
const getChatResponse = async (prompt, thread_id) => {
    const backend_url = process.env.BACKEND_URL;
    try {
        // Realizar la solicitud GET con Axios
        const response = await axios.get(`${backend_url}/chat/`, {
            withCredentials: true,
            params: {
                prompt: prompt,
                thread_id: thread_id
            }
        });
        // Retornar solo la respuesta contenida en el JSON
        return response.data.response;
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error);
        throw new Error('No se pudo obtener una respuesta válida de la API.');
    }
};


export default getChatResponse;