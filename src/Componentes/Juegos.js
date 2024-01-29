import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

// Importa las imágenes necesarias
import juegosImage1 from '../assets/juegos.jpg';
import juegosImage2 from '../assets/juegos1.jpg';
import juegosImage3 from '../assets/juegos2.png';
import juegosImage4 from '../assets/juegos3.jpg';
import juegosImage5 from '../assets/juegos4.png';

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

  const ejercicios = [
    {
      id: 1,
      imagen: juegosImage1,
      respuestas: [4, 7, 100],
      respuestaCorrecta: 7,
    },
    {
      id: 2,
      imagen: juegosImage2,
      respuestas: [15, 20, 252],
      respuestaCorrecta: 20,
    },
    {
      id: 3,
      imagen: juegosImage3,
      respuestas: [5, 8, 121 ],
      respuestaCorrecta: 12,
    },
    {
      id: 4,
      imagen: juegosImage4,
      respuestas: [6, 9, 15],
      respuestaCorrecta: 9,
    },
    {
      id: 5,
      imagen: juegosImage5,
      respuestas: [3, 6, 9],
      respuestaCorrecta: 6,
    },
  ];

  const [animacionRespuesta, setAnimacionRespuesta] = useSpring(() => ({
    opacity: 0,
    transform: 'translate(-50%, -50%)',
  }));

  const [titleAnimation, setTitleAnimation] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(-50px)',
    border: '2px solid #ddd', // Bordes al título
    padding: '10px', // Espaciado interno al título
  }));

  const iniciarNuevoEjercicio = () => {
    setRespuestaCorrecta(null);
    setSeleccionada(null);
    setHabilitarSelecciones(true);

    if (ejercicioActual < ejercicios.length) {
      const nuevoEjercicio = ejercicios[ejercicioActual];
      setEjercicioActual(ejercicioActual + 1);
      setRespuestaCorrecta(nuevoEjercicio.respuestaCorrecta);
    } else {
      // Todos los ejercicios han sido completados
      setMostrarResumen(true);
    }
  };

  const handleButtonClick = (opcion) => {
    if (seleccionada !== null || !habilitarSelecciones) {
      // Si ya se ha seleccionado una respuesta o las selecciones están deshabilitadas, no hacer nada.
      return;
    }

    const respuestaEsCorrecta = opcion === respuestaCorrecta;

    // Configurar animación de respuesta
    setAnimacionRespuesta({
      opacity: 1,
      transform: 'translate(-50%, -50%)',
      reset: true,
      onRest: () => {
        // Actualizar estadísticas después de la animación
        if (respuestaEsCorrecta) {
          setRespuestasCorrectas(respuestasCorrectas + 1);
          setContadorCorrectas(contadorCorrectas + 1);
        } else {
          setRespuestasIncorrectas(respuestasIncorrectas + 1);
          setContadorIncorrectas(contadorIncorrectas + 1);
        }

        // Mostrar animación de respuesta correcta o incorrecta
        setTimeout(() => {
          setAnimacionRespuesta({
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            reset: true,
          });

          // Iniciar nuevo ejercicio después de la animación
          iniciarNuevoEjercicio();
        }, 100); // Cambia el tiempo según tus preferencias
      },
    });

    // Deshabilitar selecciones después de hacer clic en una respuesta
    setHabilitarSelecciones(false);
  };

  const rotateAnimation = useSpring({
    transform: `rotate(${seleccionada ? '3deg' : '0deg'})`,
    config: { duration: 100 },
  });

  const buttonAnimation = useSpring({
    backgroundColor: seleccionada === respuestaCorrecta ? '#45a049' : '#ff5252',
    config: { duration: 100 },
  });

  const obtenerCategoria = (porcentaje) => {
    if (porcentaje < 25) {
      return 'Muy Mal';
    } else if (porcentaje < 50) {
      return 'Mal';
    } else if (porcentaje < 75) {
      return 'Bien';
    } else {
      return 'Excelente';
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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#333', // Fondo oscuro
      color: 'white', // Texto blanco
      padding: '20px',
      overflow: 'auto', // Añade un scroll si es necesario
    },
    title: {
      margin: "50px",
      fontSize: '2em',
      fontWeight: 'bold',
      marginBottom: '20px',
      ...titleAnimation,
      textAlign: 'center', // Alineación centrada al título
    },
    image: {
      maxWidth: '100%',
      border: '2px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      ...rotateAnimation,
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    optionButton: {
      padding: '15px 30px',
      fontSize: '18px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      margin: '10px',
      color: 'white',
      ...buttonAnimation,
      width: '40%',
      transition: 'background-color 0.3s',
      pointerEvents: habilitarSelecciones ? 'auto' : 'none',
      '&:hover': {
        backgroundColor: '#555',
      },
    },
    skipButton: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      margin: '10px',
      backgroundColor: '#2196f3',
      color: 'white',
    },
    animacionRespuesta: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      textAlign: 'center',
      pointerEvents: 'none',
      ...animacionRespuesta,
      fontSize: '1.5em', // Tamaño de fuente aumentado
    },
    resumenContainer: {
      marginTop: '20px',
      textAlign: 'center',
    },
    resumenContent: {
      backgroundColor: '#444',
      padding: '20px',
      borderRadius: '8px',
    },
  };

  useEffect(() => {
    setTitleAnimation({ opacity: 1, transform: 'translateY(0)' });
    iniciarNuevoEjercicio();
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
                Opción {opcion}
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
              Promedio: {((respuestasCorrectas / ejercicios.length) * 100).toFixed(2)}%
            </p>
            <p>Categoría: {obtenerPuntuacionCategoria()}</p>
          </div>
        </div>
      )}

      <animated.div style={styles.animacionRespuesta}>
        {respuestaCorrecta !== null && (
          <p
            style={{
              color: respuestaCorrecta === seleccionada ? 'green' : 'red',
            }}
          >
            {respuestaCorrecta === seleccionada
              ? '¡Correcto!'
              : 'Incorrecto. Inténtalo de nuevo.'}
          </p>
        )}
      </animated.div>
    </div>
  );
}

export default MathExercise;

