import React, { useState } from "react";
import './FileUploader.css';

const FileUploader = () => {
  // Hook para manejar el estado del nombre del archivo
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Manejador de eventos para cuando se selecciona un archivo
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFileName(files[0].name); // Obtener el nombre del primer archivo seleccionado
    } else {
      setFileName(""); // Si no hay archivo seleccionado, limpiar el nombre
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
      // Además, se podría actualizar el input para que coincida con los archivos seleccionados
      const inputElement = document.getElementById("fileInput");
      inputElement.files = files;
    }
  };

  return (
    <div className="card-file-uploader">
      <span className="title">Carga archivos a Zolkin</span>
      <form className="form">
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
              ¿Sobre qué es el archivo <strong>{fileName}</strong>?
            </p>
            <div className="group">
              <input placeholder="" type="text" required />
              <label htmlFor="name">Descripción</label>
            </div>
            <button type="submit">Cargar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default FileUploader;
