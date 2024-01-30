import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import juegosImage1 from "../assets/ARIMETICA.png";
import juegosImage2 from "../assets/TerminoSemejante.png";
import juegosImage3 from "../assets/expresionAlgebraica.png";
import juegosImage4 from "../assets/ecuacion1ergrado.png";
import juegosImage5 from "../assets/ecuacion2dogrado.png";

const MathExercise = () => {
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [seleccionada, setSeleccionada] = useState(null);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState(0);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [contadorCorrectas, setContadorCorrectas] = useState(0);
  const [contadorIncorrectas, setContadorIncorrectas] = useState(0);
  const [habilitarSelecciones, setHabilitarSelecciones] = useState(true);
  const [Opciones,setOpciones] = useState(true);

  const ejercicios = [
    {
      id: 1,
      nombre: "Arimetica",
      imagen: juegosImage1,
      respuestas: [8, 16, 24],
      respuestaCorrecta: 8,
    },
    {
      id: 2,
      nombre: "Terminos_Semejantes",
      imagen: juegosImage2,
      respuestas: ["2a", "4a", "Ninguna de las anteriores"],
      respuestaCorrecta: "2a",
    },
    {
      id: 3,
      nombre: "Expresiones_Algebraica",
      imagen: juegosImage3,
      respuestas: [16, 24, 1024],
      respuestaCorrecta: 16,
    },
    {
      id: 4,
      nombre: "Ecuacion_1er_Grado",
      imagen: juegosImage4,
      respuestas: ["1/3", "1/9", "Ninguna de las anteriores"],
      respuestaCorrecta: "1/3",
    },
    {
      id: 5,
      nombre: "Ecuacion_2do_Grado",
      imagen: juegosImage5,
      respuestas: ["x1:1/2, x2:3", "Ninguna de las anteriores", "x1:1/2, x2:3"],
      respuestaCorrecta: "Ninguna de las anteriores",
    },
  ];

  const [animacionRespuesta, setAnimacionRespuesta] = useSpring(() => ({
    opacity: 0,
    transform: "translate(-50%, -50%)",
  }));

  const [titleAnimation, setTitleAnimation] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(-50px)",
    border: "2px solid #ddd",
    padding: "10px",
  }));

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const iniciarNuevoEjercicio = () => {
    setRespuestaCorrecta(null);
    setSeleccionada(null);
    setHabilitarSelecciones(true);

    if (ejercicioActual < ejercicios.length) {
      const nuevoEjercicio = ejercicios[ejercicioActual];
      setEjercicioActual(ejercicioActual + 1);
      setRespuestaCorrecta(nuevoEjercicio.respuestaCorrecta);
      // Mezclar las respuestas antes de asignarlas
      const opcionesMezcladas = shuffleArray(
        nuevoEjercicio.respuestas.map((opcion, index) => ({ id: index, opcion }))
      );
      setOpciones(opcionesMezcladas);
    } else {
      setMostrarResumen(true);
    }
  };
  const handleButtonClick = (opcion) => {
    if (seleccionada !== null || !habilitarSelecciones) {
      return;
    }

    const respuestaEsCorrecta = opcion === respuestaCorrecta;

    setAnimacionRespuesta({
      opacity: 1,
      transform: "translate(-50%, -50%)",
      reset: true,
      onRest: () => {
        if (respuestaEsCorrecta) {
          setRespuestasCorrectas(respuestasCorrectas + 1);
          setContadorCorrectas(contadorCorrectas + 1);
        } else {
          setRespuestasIncorrectas(respuestasIncorrectas + 1);
          setContadorIncorrectas(contadorIncorrectas + 1);
        }

        setTimeout(() => {
          setAnimacionRespuesta({
            opacity: 0,
            transform: "translate(-50%, -50%)",
            reset: true,
          });

          iniciarNuevoEjercicio();
        }, 100);
      },
    });

    setHabilitarSelecciones(false);
  };

  const buttonAnimation = useSpring({
    backgroundColor: seleccionada === respuestaCorrecta ? "#45a049" : "#ff5252",
    config: { duration: 100 },
  });

  const obtenerCategoria = (porcentaje) => {
    if (porcentaje < 25) {
      return "Muy Mal";
    } else if (porcentaje < 50) {
      return "Mal";
    } else if (porcentaje < 75) {
      return "Bien";
    } else {
      return "Excelente";
    }
  };

  const obtenerPuntuacionCategoria = () => {
    const porcentaje = (respuestasCorrectas / ejercicios.length) * 100;
    return obtenerCategoria(porcentaje);
  };

  const reiniciarJuego = () => {
    setMostrarResumen(false);
    setRespuestaCorrecta(null);
    setSeleccionada(null);
    setEjercicioActual(0);
    setRespuestasCorrectas(0);
    setRespuestasIncorrectas(0);
    setContadorCorrectas(0);
    setContadorIncorrectas(0);
    setMostrarResumen(false);
    iniciarNuevoEjercicio();
  };

  const styles = {
    container: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#333",
      color: "white",
      padding: "20px",
      overflow: "auto",
    },
    title: {
      margin: "50px",
      fontSize: "2em",
      fontWeight: "bold",
      marginBottom: "20px",
      ...titleAnimation,
      textAlign: "center",
    },
    image: {
      maxWidth: "100%",
      border: "2px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    optionButton: {
      padding: "15px 30px",
      fontSize: "18px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      margin: "10px",
      color: "white",
      ...buttonAnimation,
      width: "40%",
      transition: "background-color 0.3s",
      pointerEvents: habilitarSelecciones ? "auto" : "none",
      "&:hover": {
        backgroundColor: "#555",
      },
    },
    skipButton: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      margin: "10px",
      backgroundColor: "#2196f3",
      color: "white",
    },
    animacionRespuesta: {
      position: "absolute",
      top: "50%",
      left: "50%",
      textAlign: "center",
      pointerEvents: "none",
      ...animacionRespuesta,
      fontSize: "1.5em",
    },
    resumenContainer: {
      marginTop: "20px",
      textAlign: "center",
    },
    resumenContent: {
      backgroundColor: "#444",
      padding: "20px",
      borderRadius: "8px",
    },
  };

  const iniciarNuevoJuego = () => {
    ejercicios.forEach((ejercicio) => {
      ejercicio.respuestas.sort(() => Math.random() - 0.5);
    });

    setRespuestaCorrecta(null);
    setSeleccionada(null);
    setHabilitarSelecciones(true);
    setEjercicioActual(1);
    setRespuestaCorrecta(ejercicios[0].respuestaCorrecta);
  };

  useEffect(() => {
    setTitleAnimation({ opacity: 1, transform: "translateY(0)" });
    iniciarNuevoJuego();
  }, [setTitleAnimation]);

  return (
    <div style={styles.container}>
      <animated.div style={styles.title}>Ejercicio Matemático</animated.div>

      {!mostrarResumen && (
        <div style={styles.resumenContainer}>
          <h2>Conteo de Respuestas</h2>
          <p>Correctas: {contadorCorrectas}</p>
          <p>Incorrectas: {contadorIncorrectas}</p>
        </div>
      )}

      {respuestaCorrecta !== null && (
        <>
          <h1> {ejercicios[ejercicioActual - 1].nombre}</h1>
          <animated.img
            src={ejercicios[ejercicioActual - 1].imagen}
            alt={`Ejercicio Matemático ${ejercicioActual}`}
            style={{ ...styles.image }}
          />

          <div style={styles.optionsContainer}>

        
            {ejercicios[ejercicioActual - 1].respuestas.map((opcion) => (
              <animated.button
                key={opcion}
                style={{
                  ...styles.optionButton,
                }}
                onClick={() => {
                  setSeleccionada(opcion);
                  handleButtonClick(opcion);
                }}
              >
                {opcion}
              </animated.button>
            ))}
          </div>
        </>
      )}

      {mostrarResumen && (
        <div style={styles.resumenContainer}>
          <Link to="/" onClick={() => reiniciarJuego()}>
            <button style={styles.skipButton}>Jugar de Nuevo</button>
          </Link>

          <div style={styles.resumenContent}>
            <h2>Resumen</h2>
            <p>Respuestas Correctas: {respuestasCorrectas}</p>
            <p>Respuestas Incorrectas: {respuestasIncorrectas}</p>
            <p>
              Promedio:{" "}
              {((respuestasCorrectas / ejercicios.length) * 100).toFixed(2)}%
            </p>
            <p>Categoría: {obtenerPuntuacionCategoria()}</p>
          </div>
        </div>
      )}

      <animated.div style={styles.animacionRespuesta}>
        {respuestaCorrecta !== null && (
          <p
            style={{
              color: respuestaCorrecta === seleccionada ? "green" : "red",
            }}
          >
            {respuestaCorrecta === seleccionada
              ? "¡Correcto!"
              : "Incorrecto. Inténtalo de nuevo."}
          </p>
        )}
      </animated.div>
    </div>
  );
};

export default MathExercise;
