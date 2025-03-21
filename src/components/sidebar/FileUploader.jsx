import React, { useState } from "react";
import axios from "axios";
import './FileUploader.css';
axios.defaults.withCredentials = true;

const FileUploader = ({onUploadSuccess}) => {
  // Hook para manejar el estado del nombre del archivo
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [newFilename, setNewFilename] = useState("");

  const backend_url = process.env.BACKEND_URL;

  // Manejador de eventos para cuando se selecciona un archivo
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFileName(files[0].name); // Obtener el nombre del primer archivo seleccionado
      setFile(files[0]); // Guardar el archivo en el estado
    } else {
      setFileName(""); // Si no hay archivo seleccionado, limpiar el nombre
      setFile(null);
    }
  };

  // Manejador de eventos para el "drag over"
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  // Manejador de eventos para el "drag leave"
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  // Manejador de eventos para el "drop"
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].name);
      setFile(files[0]); // Guardar el archivo en el estado
      // Además, se podría actualizar el input para que coincida con los archivos seleccionados
      const inputElement = document.getElementById("fileInput");
      inputElement.files = files;
    }
  };

  // Manejador de eventos para enviar el archivo al backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !newFilename) {
      alert("Por favor, selecciona un archivo y proporciona una descripción.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Agregar el archivo
    formData.append("filename", newFilename); // Agregar la descripción

    try {
      const response = await axios.post(`${backend_url}/upload_file/`, 
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

      console.log("Archivo subido exitosamente:", response.data);
      onUploadSuccess();
      alert("Archivo subido exitosamente");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Hubo un error al subir el archivo.");
    }
  };

  return (
    <div className="card-file-uploader">
      <span className="title">Carga archivos a Zolkin</span>
      <form className="form" onSubmit={handleSubmit}>
        <div
          className={`file-upload-container ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver} // Evento para cuando se arrastra un archivo sobre el contenedor
          onDragLeave={handleDragLeave} // Evento para cuando se sale del contenedor sin soltar
          onDrop={handleDrop} // Evento para cuando se suelta un archivo en el contenedor
        >
          <div className="file-upload">
            <input
              multiple
              className="file-input"
              id="fileInput"
              type="file"
              onChange={handleFileChange} // Añadimos el evento onChange
            />
            <label className="file-label" htmlFor="fileInput">
              <p id="upload-icon">📄</p>
              <p>
                {isDragging
                  ? "Suelta el archivo aquí"
                  : "Arrastre y suelte sus archivos aquí o haga clic para cargarlos"}
              </p>
            </label>
          </div>
        </div>

        {/* Mostrar el texto de ayuda, el input y el botón de enviar solo si hay un archivo seleccionado */}
        {fileName && (
          <>
            <p id="help-text">
              Ingresa un nuevo nombre descriptivo al archivo <strong>{fileName}</strong>
            </p>
            <div className="group">
              <input 
                type="text" 
                value={newFilename}
                onChange={(e) => setNewFilename(e.target.value)}
                placeholder="Nuevo nombre" 
                required 
              />
            </div>
            <button type="submit">Cargar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default FileUploader;