from pathlib import Path
import textwrap
import re


ROOT = Path(r"C:\Users\Medion PC\Desktop\almeria-web-matematicas")
LATEX_ROOT = ROOT / "fichas-latex"
PDF_ROOT = ROOT / "fichas-pdf"
LEVEL_ORDER = ["recordar", "comprender", "aplicar", "analizar", "evaluar", "crear"]


SESSIONS = [
    {
        "id": "01",
        "block": "Bloque 1 · Mapa y coordenadas",
        "title": "¿Que es una guia turistica matematica?",
        "objective": "Comprender el reto del proyecto y descubrir que una ciudad tambien puede describirse con datos, medidas y preguntas matematicas.",
        "materials": ["Cuaderno o ficha impresa", "Lapiz y goma", "Lapis de colores", "Plano o imagen de Almeria si el profesorado la facilita"],
        "steps": [
            "Lee el titulo y el objetivo en voz baja.",
            "Subraya las palabras clave: guia, ciudad, dato, medida.",
            "Resuelve primero los ejercicios de recordar y comprender.",
            "Deja para el final los ejercicios de analizar."
        ],
        "reminders": [
            "Una guia turistica informa y orienta.",
            "Las matematicas permiten medir, comparar y representar.",
            "Un buen dato lleva numero y, si hace falta, unidad."
        ],
        "supports": [
            "Si una consigna te parece larga, divide la lectura en dos partes.",
            "Puedes hacer un esquema antes de escribir una respuesta completa.",
            "Si usas un dato numerico, explica tambien que significa."
        ],
        "evidence": [
            "Nombrar al menos 3 lugares de Almeria sobre los que se podria hacer una pregunta matematica.",
            "Distinguir entre informacion descriptiva y cuantitativa.",
            "Explicar con tus palabras para que serviria una guia turistica matematica."
        ],
        "blooms": [
            ("recordar", [
                ("Elementos de una guia", "Escribe \\textbf{cuatro elementos} que sueles encontrar en una guia turistica. Por ejemplo: mapa, horario o precio.", 5),
                ("Datos de la ciudad", "Anota \\textbf{tres lugares} de Almeria y escribe al lado \\textbf{un dato matematizable} de cada uno. Ejemplo: altura, distancia, numero de visitantes.", 6),
            ]),
            ("comprender", [
                ("Descriptivo o cuantitativo", "Lee estos datos y clasificalos: \\emph{La Alcazaba es antigua}; \\emph{La playa mide 900 m}; \\emph{La catedral tiene una torre alta}; \\emph{El paseo dura 15 minutos}. Explica por que.", 6),
                ("Para que sirve el numero", "Escribe dos frases: una con un dato \\textbf{solo descriptivo} y otra con un dato \\textbf{numerico}. Despues explica cual ayuda mas a planificar una visita y por que.", 6),
            ]),
            ("analizar", [
                ("Preguntas matematicas", "Elige \\textbf{dos lugares} de Almeria. Para cada uno, redacta \\textbf{dos preguntas matematicas} que podrian aparecer en una guia. No hace falta resolverlas.", 7),
                ("Seleccion de informacion", "Un equipo quiere poner en la guia estos datos: color de una puerta, numero de escalones, distancia al puerto y temperatura media. \\textbf{Analiza} cuales ayudan a un turista y cuales habria que justificar mejor.", 7),
            ]),
        ],
    },
    {
        "id": "02",
        "block": "Bloque 1 · Mapa y coordenadas",
        "title": "¿Que se puede medir y representar en una ciudad?",
        "objective": "Distinguir entre ubicacion, medida y dato para organizar correctamente la informacion de Almeria.",
        "materials": ["Ficha impresa", "Lapiz", "Regla pequena", "Lapis de tres colores"],
        "steps": [
            "Lee cada ejemplo de ciudad con calma.",
            "Rodea en azul las ubicaciones, en verde las medidas y en naranja los datos.",
            "Comprueba con un companero una respuesta antes de pasar al siguiente ejercicio.",
            "Escribe siempre la unidad cuando aparezca una medida."
        ],
        "reminders": [
            "Ubicar es decir donde esta algo.",
            "Medir es expresar una magnitud con numero y unidad.",
            "Representar es mostrar la informacion en tabla, plano o grafica."
        ],
        "supports": [
            "Usa una tabla de tres columnas si necesitas ordenar ideas.",
            "Si dudas, pregúntate: ¿hay numero? ¿hay unidad? ¿hay lugar?",
            "Haz una marca al lado de cada dato ya clasificado."
        ],
        "evidence": [
            "Clasificar informacion urbana en ubicacion, medida y dato.",
            "Redactar ejemplos correctos con unidad cuando sea necesario.",
            "Elegir una forma simple de representar la informacion."
        ],
        "blooms": [
            ("recordar", [
                ("Clasificacion rapida", "Clasifica estas expresiones en \\textbf{ubicacion}, \\textbf{medida} o \\textbf{dato}: \\emph{Plaza Vieja}, \\emph{250 m}, \\emph{18 ºC}, \\emph{Rambla}, \\emph{3 km}.", 5),
                ("Vocabulario clave", "Define con una frase sencilla estas palabras: \\textbf{ubicacion}, \\textbf{medida}, \\textbf{dato}.", 5),
            ]),
            ("comprender", [
                ("Explica la diferencia", "Explica la diferencia entre estas dos frases: \\emph{La Catedral esta en el centro} y \\emph{La torre de la Catedral mide 55 m}.", 6),
                ("Representacion adecuada", "Relaciona cada informacion con una forma de representarla mejor: \\emph{lista}, \\emph{tabla}, \\emph{plano}. Justifica una de tus decisiones.", 6),
            ]),
            ("aplicar", [
                ("Tabla de ciudad", "Completa una tabla de tres columnas con \\textbf{dos ejemplos} de ubicacion, \\textbf{dos} de medida y \\textbf{dos} de dato sobre Almeria.", 7),
                ("Corrige frases", "Corrige estas frases para que sean matematicamente mas utiles: \\emph{La playa es larga}; \\emph{La Alcazaba esta lejos}; \\emph{Hace calor en verano}.", 7),
            ]),
        ],
    },
    {
        "id": "03",
        "block": "Bloque 1 · Mapa y coordenadas",
        "title": "Plano por cuadrantes",
        "objective": "Interpretar un plano cuadriculado usando ejes y cuadrantes matematicos.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Lapis de colores"],
        "steps": [
            "Señala primero el eje horizontal y el vertical.",
            "Numera con cuidado antes de localizar puntos.",
            "Haz una pequena cruz en el origen.",
            "Revisa al final si has escrito primero x y despues y."
        ],
        "reminders": [
            "El origen es el punto (0,0).",
            "El eje x es horizontal y el eje y es vertical.",
            "Cada cuadrante tiene una posicion distinta respecto al origen."
        ],
        "supports": [
            "Marca el recorrido con el dedo: primero horizontal, despues vertical.",
            "Si te pierdes, vuelve al origen y empieza otra vez.",
            "Usa colores diferentes para ejes y cuadrantes."
        ],
        "evidence": [
            "Reconocer el origen, los ejes y los cuadrantes.",
            "Localizar puntos sencillos en un plano cuadriculado.",
            "Explicar como se lee un punto paso a paso."
        ],
        "blooms": [
            ("recordar", [
                ("Nombres basicos", "Escribe el nombre de estas partes del plano: \\textbf{origen}, \\textbf{eje x}, \\textbf{eje y}, \\textbf{cuadrante}.", 5),
                ("Orden correcto", "Completa: en un punto cartesiano se escribe primero la coordenada \\underline{\\hspace{2cm}} y despues la coordenada \\underline{\\hspace{2cm}}.", 4),
            ]),
            ("aplicar", [
                ("Localiza puntos", "Dibuja un plano sencillo y coloca los puntos $A(2,1)$, $B(4,3)$, $C(1,4)$ y $D(3,0)$.", 7),
                ("Lectura de puntos", "Escribe las coordenadas de cuatro puntos que inventes en un plano de una sola zona positiva. Despues intercambia la ficha con un companero para que los sitúe.", 7),
            ]),
            ("analizar", [
                ("Errores frecuentes", "Un alumno escribe $P(3,5)$ pero en el plano ha contado primero 5 hacia arriba y despues 3 a la derecha. \\textbf{Analiza} el error y explica como corregirlo.", 7),
                ("Mismo eje o mismo cuadrante", "Observa estos pares de puntos: $A(1,2)$ y $B(1,5)$; $C(2,3)$ y $D(4,3)$. Explica que tienen en comun y que cambia en cada caso.", 7),
            ]),
        ],
    },
    {
        "id": "04",
        "block": "Bloque 1 · Mapa y coordenadas",
        "title": "Coordenadas y localizacion",
        "objective": "Leer, escribir y localizar lugares exactos en el mapa usando pares de coordenadas matematicas.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Plano cuadriculado del aula o de Almeria"],
        "steps": [
            "Empieza siempre en el origen.",
            "Cuenta primero los pasos horizontales y luego los verticales.",
            "Escribe las coordenadas con parentesis y coma.",
            "Comprueba una segunda vez antes de pasar a la siguiente actividad."
        ],
        "reminders": [
            "La forma correcta es $(x,y)$.",
            "Cambiar el orden cambia el lugar.",
            "Dos lugares distintos no pueden tener el mismo par de coordenadas si el mapa esta bien hecho."
        ],
        "supports": [
            "Rodea la x y la y en cada consigna.",
            "Puedes trazar lineas suaves hasta el punto para no perderte.",
            "Si dudas entre dos valores, cuenta otra vez desde el origen."
        ],
        "evidence": [
            "Escribir y leer coordenadas sin invertir el orden.",
            "Relacionar puntos del mapa con lugares concretos.",
            "Justificar si una localizacion es correcta o no."
        ],
        "blooms": [
            ("comprender", [
                ("Explica el orden", "Explica con tus palabras por que $(4,2)$ y $(2,4)$ no representan el mismo lugar.", 6),
                ("Lugar exacto", "Escribe una frase para explicar a un compañero como localizar $M(3,5)$ en un plano.", 6),
            ]),
            ("aplicar", [
                ("Busca y escribe", "En un plano inventado, coloca un museo en $(2,4)$, un parque en $(5,1)$, una plaza en $(3,3)$ y una estacion en $(1,2)$.", 7),
                ("Ruta de puntos", "Escribe las coordenadas de \\textbf{cinco lugares} de una ruta corta por el mapa. Despues numeralos del 1 al 5.", 7),
            ]),
            ("evaluar", [
                ("Revision de localizaciones", "Un equipo ha puesto: playa $(4,2)$, puerto $(4,2)$, museo $(6,1)$. \\textbf{Evalua} si su mapa es claro y explica que deberian revisar.", 7),
                ("Eleccion del mejor mapa", "Dos mapas muestran los mismos lugares. Uno tiene coordenadas bien escritas y otro mezcla $(x,y)$ con $(y,x)$. \\textbf{Evalua} cual es mas fiable y justifica.", 7),
            ]),
        ],
    },
    {
        "id": "05",
        "block": "Bloque 2 · Geometria urbana",
        "title": "Rectas, segmentos y angulos",
        "objective": "Identificar rectas, segmentos, paralelas, perpendiculares y angulos en un plano urbano.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Lapis azul, rojo y verde"],
        "steps": [
            "Lee primero los dibujos o ejemplos.",
            "Marca con color antes de escribir la explicacion.",
            "Si aparece un angulo, indica tambien su tipo.",
            "No olvides nombrar los extremos de un segmento."
        ],
        "reminders": [
            "Una recta no tiene extremos. Un segmento si.",
            "Las rectas paralelas no se cortan.",
            "Las rectas perpendiculares forman 90º."
        ],
        "supports": [
            "Usa azul para paralelas, rojo para perpendiculares y verde para segmentos.",
            "Si ves una calle real, piensa si tiene inicio y final: entonces es un segmento.",
            "Puedes hacer un pequeño dibujo al lado de la respuesta."
        ],
        "evidence": [
            "Distinguir recta, semirrecta y segmento.",
            "Reconocer angulos agudos, rectos y obtusos en la ciudad.",
            "Justificar si dos calles son paralelas o perpendiculares."
        ],
        "blooms": [
            ("recordar", [
                ("Conceptos basicos", "Define brevemente: \\textbf{recta}, \\textbf{segmento}, \\textbf{angulo recto}.", 5),
                ("Clasifica", "Indica si estos ejemplos representan recta o segmento: borde de una mesa, tramo de calle, linea matematica, lado de un folio.", 5),
            ]),
            ("comprender", [
                ("Paralelas o perpendiculares", "Explica la diferencia entre \\textbf{paralelas} y \\textbf{perpendiculares} usando una frase y un ejemplo de ciudad.", 6),
                ("Tipo de angulo", "Explica por que un angulo de 120º es \\textbf{obtuso} y uno de 55º es \\textbf{agudo}.", 6),
            ]),
            ("aplicar", [
                ("Plano anotado", "Dibuja un pequeno plano con \\textbf{dos calles paralelas}, \\textbf{una interseccion perpendicular} y \\textbf{un segmento} con extremos $A$ y $B$.", 8),
                ("Marca elementos", "En una esquina de barrio inventada, señala \\textbf{dos angulos} distintos y escribe su tipo: agudo, recto u obtuso.", 7),
            ]),
        ],
    },
    {
        "id": "06",
        "block": "Bloque 2 · Geometria urbana",
        "title": "Figuras planas en la ciudad",
        "objective": "Clasificar triangulos, cuadrilateros y circunferencias presentes en modelos urbanos.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Lapis de colores"],
        "steps": [
            "Observa la forma general antes de nombrarla.",
            "Cuenta lados y vertices si lo necesitas.",
            "Escribe siempre una propiedad para justificar.",
            "Haz un dibujo sencillo cuando tengas dudas."
        ],
        "reminders": [
            "Los triangulos tienen 3 lados.",
            "Los cuadrilateros tienen 4 lados.",
            "Una circunferencia es la linea; el circulo es la superficie interior."
        ],
        "supports": [
            "Subraya la palabra que te da la pista: lados, angulos o lados iguales.",
            "Puedes clasificar primero y justificar despues.",
            "Si dos figuras se parecen, compara el numero de lados."
        ],
        "evidence": [
            "Reconocer figuras planas en contextos urbanos.",
            "Distinguir triangulos y cuadrilateros por propiedades.",
            "Explicar por que una figura pertenece a una categoria."
        ],
        "blooms": [
            ("recordar", [
                ("Nombres de figuras", "Escribe el nombre de cinco figuras planas que conozcas.", 5),
                ("Propiedades basicas", "Completa: un triangulo tiene \\underline{\\hspace{2cm}} lados y un cuadrilatero tiene \\underline{\\hspace{2cm}} lados.", 4),
            ]),
            ("comprender", [
                ("Justifica la clasificacion", "Explica por que un cuadrado es tambien un cuadrilatero y por que un triangulo nunca puede tener cuatro vertices.", 6),
                ("Circulo o circunferencia", "Escribe una frase para distinguir \\textbf{circulo} y \\textbf{circunferencia}.", 5),
            ]),
            ("aplicar", [
                ("Galeria urbana", "Dibuja o nombra \\textbf{dos ejemplos} de triangulos, \\textbf{dos} de cuadrilateros y \\textbf{uno} de forma circular en la ciudad.", 8),
                ("Clasificacion guiada", "Clasifica estas figuras: cartel triangular, plaza cuadrada, rotonda circular, ventana rectangular, tejado triangular.", 7),
            ]),
            ("analizar", [
                ("Comparacion de cuadrilateros", "Analiza en que se parecen y en que se diferencian un rectangulo y un rombo.", 7),
                ("Eleccion de forma", "Una plaza necesita una zona central visible desde todos sus bordes. ¿Seria mejor una forma circular o rectangular? Analiza ventajas y limites.", 7),
            ]),
        ],
    },
    {
        "id": "07",
        "block": "Bloque 2 · Geometria urbana",
        "title": "Perimetro de zonas urbanas",
        "objective": "Calcular el perimetro de barrios, plazas o parques modelizados como poligonos simples.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora sencilla si se necesita"],
        "steps": [
            "Rodea el contorno completo antes de sumar.",
            "Anota cada lado una sola vez.",
            "Escribe la operacion antes del resultado final.",
            "Comprueba la unidad al terminar."
        ],
        "reminders": [
            "El perimetro es la longitud del borde.",
            "Se suma lado con lado.",
            "La unidad del perimetro suele ser m o km."
        ],
        "supports": [
            "Puedes numerar los lados para no olvidarte de ninguno.",
            "Si una figura es regular, piensa si puedes multiplicar.",
            "No pongas m²: el perimetro no mide superficie."
        ],
        "evidence": [
            "Calcular perimetros con suma y con multiplicacion cuando conviene.",
            "Interpretar el perimetro como borde exterior.",
            "Explicar una estrategia de calculo clara."
        ],
        "blooms": [
            ("recordar", [
                ("Idea principal", "Escribe con tus palabras que es el perimetro.", 4),
                ("Unidad correcta", "Indica que unidad elegirias para el perimetro de una plaza, una calle larga y un parque pequeno.", 5),
            ]),
            ("comprender", [
                ("Perimetro o no", "Explica por que para hallar el perimetro de un rectangulo se suman sus lados y no su interior.", 6),
                ("Atajo matematico", "Explica cuando es util hacer $2\\,(l+a)$ en lugar de sumar los cuatro lados uno a uno.", 5),
            ]),
            ("aplicar", [
                ("Calculo directo", "Calcula el perimetro de un rectangulo de $18\\,m$ y $12\\,m$.", 5),
                ("Parque poligonal", "Un parque tiene lados de $9\\,m$, $14\\,m$, $11\\,m$ y $14\\,m$. Calcula su perimetro y escribe la operacion completa.", 6),
            ]),
        ],
    },
    {
        "id": "08",
        "block": "Bloque 2 · Geometria urbana",
        "title": "Area de zonas urbanas",
        "objective": "Calcular el area de figuras simples y compuestas para estimar el espacio interior que ocupan.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora sencilla si se necesita"],
        "steps": [
            "Lee bien si te piden perimetro o area.",
            "Escribe primero la formula adecuada.",
            "Sustituye despues los datos.",
            "Comprueba siempre la unidad final."
        ],
        "reminders": [
            "Rectangulo: $A=b\\cdot h$.",
            "Triangulo: $A=\\dfrac{b\\cdot h}{2}$.",
            "El area se expresa en unidades cuadradas, por ejemplo $m^2$."
        ],
        "supports": [
            "Dibuja la base y la altura si no aparecen claras.",
            "Si la figura es compuesta, separala en partes mas simples.",
            "Rodea la unidad $m^2$ al final."
        ],
        "evidence": [
            "Aplicar formulas de area con sentido.",
            "Distinguir la superficie interior del borde.",
            "Resolver ejemplos sencillos de figuras compuestas."
        ],
        "blooms": [
            ("recordar", [
                ("Formulas utiles", "Escribe las formulas del area del rectangulo y del triangulo.", 4),
                ("Unidad del area", "Explica por que el area se expresa en $m^2$ y no en m.", 5),
            ]),
            ("comprender", [
                ("Base y altura", "Explica que representan la base y la altura en un rectangulo y en un triangulo.", 6),
                ("Area interior", "Escribe una frase para explicar por que el area mide la parte de dentro de una figura.", 5),
            ]),
            ("aplicar", [
                ("Rectangulo", "Calcula el area de un rectangulo de base $24\\,m$ y altura $15\\,m$.", 5),
                ("Triangulo", "Calcula el area de un triangulo de base $10\\,m$ y altura $6\\,m$.", 5),
            ]),
        ],
    },
    {
        "id": "09",
        "block": "Bloque 2 · Geometria urbana",
        "title": "Perimetro y area: no son lo mismo",
        "objective": "Comparar perimetro y area para no confundir ambas medidas al analizar zonas urbanas.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora sencilla si se necesita"],
        "steps": [
            "Lee la pregunta y decide primero si habla de borde o de interior.",
            "Anota la palabra clave: perimetro o area.",
            "Haz el calculo solo despues de elegir la magnitud correcta.",
            "Revisa la unidad final."
        ],
        "reminders": [
            "Perimetro = borde exterior.",
            "Area = superficie interior.",
            "Perimetro usa m; area usa $m^2$."
        ],
        "supports": [
            "Puedes dibujar una flecha al borde o sombrear el interior.",
            "Haz una tabla de dos columnas si te ayuda a separar ideas.",
            "Comprueba si el resultado deberia ser lineal o cuadrado."
        ],
        "evidence": [
            "Elegir la magnitud correcta antes de calcular.",
            "Comparar figuras con mismo perimetro o misma area.",
            "Justificar por que dos medidas distintas responden a preguntas distintas."
        ],
        "blooms": [
            ("recordar", [
                ("Completa", "Completa: el perimetro mide el \\underline{\\hspace{2cm}} y el area mide la \\underline{\\hspace{2cm}}.", 4),
                ("Unidad adecuada", "Escribe una unidad adecuada para cada caso: rodear una plaza, cubrir un jardin, medir una calle.", 5),
            ]),
            ("comprender", [
                ("No son lo mismo", "Explica por que dos figuras pueden tener el mismo perimetro y distinta area.", 6),
                ("Pregunta correcta", "Indica si responderias con area o con perimetro: \\emph{poner valla}, \\emph{poner cesped}, \\emph{pintar el suelo}, \\emph{rodear un solar}.", 6),
            ]),
            ("aplicar", [
                ("Comparacion de rectangulos", "Un rectangulo A mide $8\\,m\\times 4\\,m$ y otro B mide $6\\,m\\times 6\\,m$. Calcula area y perimetro de ambos.", 7),
                ("Decision urbana", "Para vallar un huerto y cubrirlo con cesped, calcula primero el perimetro y despues el area de una parcela de $12\\,m\\times 7\\,m$.", 7),
            ]),
        ],
    },
    {
        "id": "10",
        "block": "Bloque 2 · Geometria urbana",
        "title": "Rutas y distancias por Almeria",
        "objective": "Medir distancias en el plano y comparar rutas para elegir recorridos turisticos eficientes.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora"],
        "steps": [
            "Localiza bien los puntos de partida y llegada.",
            "Si usas la formula de distancia, escribe todos los pasos.",
            "Convierte a metros o kilometros si la escala lo pide.",
            "Al final, interpreta el resultado con una frase."
        ],
        "reminders": [
            "Distancia en el plano: $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
            "Si la escala es 1 unidad = 200 m, hay que convertir.",
            "La ruta mas corta no siempre coincide con la carretera real."
        ],
        "supports": [
            "Haz primero las diferencias horizontal y vertical.",
            "Recuerda que sin raiz cuadrada tendrias $d^2$, no $d$.",
            "Escribe la escala al lado del calculo."
        ],
        "evidence": [
            "Calcular distancias entre puntos del plano.",
            "Interpretar la diferencia entre linea recta y ruta real.",
            "Justificar una eleccion de recorrido."
        ],
        "blooms": [
            ("aplicar", [
                ("Distancias basicas", "Calcula la distancia entre $P(0,0)$ y $Q(3,4)$. Despues entre $R(1,2)$ y $S(4,6)$.", 6),
                ("Con escala", "Si en el plano 1 unidad son $200\\,m$, convierte a metros la distancia entre $A(2,1)$ y $B(6,4)$.", 6),
            ]),
            ("analizar", [
                ("Recta o carretera", "La distancia recta entre dos puntos es $8\\,km$, pero la carretera mide $12\\,km$. Analiza por que no coinciden.", 7),
                ("Eleccion de trayecto", "Compara estas dos rutas: una con menos kilometros y otra con mas paradas utiles. Analiza que criterio te parece mejor para un turista.", 7),
            ]),
            ("evaluar", [
                ("Ruta factible", "Tienes 2 horas y caminas a $4\\,km/h$. Evalua si una ruta total de $9\\,km$ es realista. Justifica.", 6),
                ("Mejor opcion", "Entre tres rutas propuestas por la clase, evalua cual incluirias en la guia y por que.", 7),
            ]),
        ],
    },
    {
        "id": "11",
        "block": "Bloque 3 · Datos, funciones y graficas",
        "title": "Variables urbanas",
        "objective": "Identificar la variable independiente y la dependiente al analizar datos reales de la ciudad.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora si se necesita"],
        "steps": [
            "Lee la situacion y subraya que cambia primero.",
            "Marca con una x la variable de entrada y con una y la de salida.",
            "Haz una tabla si te ayuda a ordenar.",
            "Justifica una respuesta con una frase breve."
        ],
        "reminders": [
            "Variable independiente: la que elegimos o controlamos.",
            "Variable dependiente: la que cambia segun la otra.",
            "En una tabla suele colocarse primero la variable independiente."
        ],
        "supports": [
            "Pregunta guia: ¿de que depende este valor?",
            "Puedes usar las palabras entrada y salida.",
            "Si cambias el tiempo y cambia la temperatura, el tiempo es x."
        ],
        "evidence": [
            "Distinguir variable independiente y dependiente.",
            "Organizar datos en una tabla sencilla.",
            "Relacionar variables con contextos urbanos reales."
        ],
        "blooms": [
            ("recordar", [
                ("Nombres de variables", "Define variable independiente y variable dependiente con una frase sencilla.", 5),
                ("Entrada y salida", "Completa: en una tabla, la variable de entrada suele ser la \\underline{\\hspace{3cm}}.", 4),
            ]),
            ("comprender", [
                ("Explica la dependencia", "En la situacion \\emph{horas de aparcamiento y precio pagado}, explica cual es la variable independiente y cual la dependiente.", 6),
                ("Otro ejemplo", "En \\emph{mes del año y temperatura media}, explica por que una variable depende de la otra.", 6),
            ]),
            ("aplicar", [
                ("Clasifica parejas", "Indica las variables independiente y dependiente en estos casos: distancia-tiempo, numero de entradas-precio total, dia del mes-visitantes.", 7),
                ("Tabla simple", "Construye una tabla con una variable independiente y una dependiente a partir de una situacion real de Almeria.", 7),
            ]),
            ("analizar", [
                ("Error de variable", "Un alumno dice que en \\emph{precio total y numero de billetes} el precio total es la variable independiente. Analiza el error.", 7),
                ("Misma situacion, dos miradas", "Analiza como cambia la interpretacion si en una situacion se toma como variable principal el tiempo o la distancia.", 7),
            ]),
        ],
    },
    {
        "id": "12",
        "block": "Bloque 3 · Datos, funciones y graficas",
        "title": "De enunciado a tabla",
        "objective": "Traducir situaciones verbales a tablas de datos claras y ordenadas.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora si se necesita"],
        "steps": [
            "Lee el enunciado dos veces.",
            "Rodea los datos que cambian y los que se repiten.",
            "Decide el nombre de cada columna antes de empezar.",
            "Ordena la tabla con cuidado."
        ],
        "reminders": [
            "Toda tabla necesita encabezados claros.",
            "La variable independiente suele ir en la primera columna.",
            "Las unidades deben aparecer en el encabezado o junto al dato."
        ],
        "supports": [
            "Puedes hacer primero un borrador muy sencillo de la tabla.",
            "Si un dato falta, deja hueco y relee el enunciado.",
            "No mezcles en la misma columna dos tipos de informacion."
        ],
        "evidence": [
            "Pasar de texto a tabla sin perder informacion.",
            "Nombrar bien las columnas y las unidades.",
            "Ordenar datos de forma legible."
        ],
        "blooms": [
            ("recordar", [
                ("Partes de una tabla", "Escribe tres elementos que no deben faltar en una tabla de datos.", 5),
                ("Encabezados", "Explica para que sirven los encabezados de una tabla.", 5),
            ]),
            ("comprender", [
                ("Organizacion de datos", "Explica por que no conviene mezclar en una misma columna tiempo y temperatura.", 6),
                ("Unidad visible", "Explica por que es mejor escribir \\emph{Temperatura (ºC)} en lugar de solo \\emph{Temperatura}.", 5),
            ]),
            ("aplicar", [
                ("Tabla desde texto", "Convierte en tabla este enunciado: \\emph{Lunes 18 ºC, martes 20 ºC, miercoles 17 ºC, jueves 22 ºC}.", 7),
                ("Precio total", "Haz una tabla para el precio total de 1, 2, 3, 4 y 5 entradas si cada entrada cuesta $6\\,\\euro$.", 7),
            ]),
        ],
    },
    {
        "id": "13",
        "block": "Bloque 3 · Datos, funciones y graficas",
        "title": "De tabla a grafica",
        "objective": "Representar visualmente los datos de una tabla en ejes cartesianos eligiendo una escala adecuada.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Lapis de color"],
        "steps": [
            "Dibuja primero los ejes.",
            "Escribe el nombre y la unidad de cada eje.",
            "Elige una escala regular y clara.",
            "Coloca los puntos y une solo si tiene sentido."
        ],
        "reminders": [
            "Eje horizontal: variable independiente.",
            "Eje vertical: variable dependiente.",
            "La escala debe ser regular y facil de leer."
        ],
        "supports": [
            "Haz una marca ligera de la escala antes de escribir los numeros.",
            "Si dudas, usa pocos intervalos grandes y regulares.",
            "Comprueba que todos los datos caben en los ejes."
        ],
        "evidence": [
            "Pasar una tabla a grafica de forma ordenada.",
            "Etiquetar ejes y unidades correctamente.",
            "Elegir una escala razonable."
        ],
        "blooms": [
            ("recordar", [
                ("Elementos de una grafica", "Escribe cuatro elementos que debe tener una grafica bien hecha.", 5),
                ("Nombre de ejes", "Completa: la variable independiente se coloca en el eje \\underline{\\hspace{2cm}}.", 4),
            ]),
            ("comprender", [
                ("Escala adecuada", "Explica por que una escala regular ayuda a leer mejor una grafica.", 6),
                ("Grafica y tabla", "Explica que informacion es la misma en una tabla y en una grafica.", 5),
            ]),
            ("aplicar", [
                ("Representa datos", "Representa en unos ejes esta tabla: tiempo (min) 0, 5, 10, 15; distancia (m) 0, 400, 800, 1200.", 8),
                ("Etiqueta bien", "Dibuja una grafica de barras para los visitantes de tres monumentos con estos valores: 120, 90 y 150.", 8),
            ]),
        ],
    },
    {
        "id": "14",
        "block": "Bloque 3 · Datos, funciones y graficas",
        "title": "Leer e interpretar graficas",
        "objective": "Identificar maximos, minimos y tendencias para explicar que esta pasando en los datos de la ciudad.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora si se necesita"],
        "steps": [
            "Lee primero el titulo de la grafica.",
            "Despues mira los ejes y las unidades.",
            "Busca maximos, minimos y tramos crecientes o decrecientes.",
            "Escribe una conclusion final con una frase completa."
        ],
        "reminders": [
            "Maximo: valor mas alto.",
            "Minimo: valor mas bajo.",
            "Una tendencia puede ser creciente, decreciente o estable."
        ],
        "supports": [
            "Señala con una flecha el punto mas alto y el mas bajo.",
            "Haz una tabla pequeña con lo que ves en la grafica.",
            "Si comparas dos anos, escribe primero los valores."
        ],
        "evidence": [
            "Leer valores concretos en una grafica.",
            "Describir tendencias con vocabulario adecuado.",
            "Interpretar que puede explicar un cambio notable."
        ],
        "blooms": [
            ("comprender", [
                ("Lectura guiada", "A partir de una grafica de temperatura, explica que significa que julio tenga un valor mayor que abril.", 6),
                ("Tendencia", "Explica la diferencia entre un tramo creciente y un tramo decreciente.", 5),
            ]),
            ("aplicar", [
                ("Valores clave", "En una grafica de visitantes por mes, localiza el maximo, el minimo y un tramo de subida.", 7),
                ("Cambio porcentual sencillo", "Si una grafica pasa de 180 a 240 visitantes, calcula el aumento absoluto y describe si la tendencia es positiva.", 6),
            ]),
            ("analizar", [
                ("Anomalia", "Analiza por que en una grafica de turismo puede aparecer una bajada fuerte en un ano concreto.", 7),
                ("Relacion con el contexto", "Una grafica de terrazas abiertas sube cuando sube la temperatura. Analiza que conclusion se puede extraer y que no se puede asegurar del todo.", 7),
            ]),
        ],
    },
    {
        "id": "15",
        "block": "Bloque 3 · Datos, funciones y graficas",
        "title": "Comparar graficas",
        "objective": "Comparar dos graficas para descubrir relaciones entre datos y decidir cual explica mejor una situacion turistica.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora si se necesita"],
        "steps": [
            "Observa primero cada grafica por separado.",
            "Anota maximos, minimos y tendencia general.",
            "Despues compara lo que ocurre a la vez en las dos graficas.",
            "Escribe una conclusion bien justificada."
        ],
        "reminders": [
            "Comparar no es solo mirar el dibujo: hay que usar datos.",
            "Dos variables pueden cambiar a la vez, pero eso no siempre significa causa.",
            "Una buena comparacion cita semejanzas y diferencias."
        ],
        "supports": [
            "Puedes hacer una tabla con dos columnas: grafica A y grafica B.",
            "Subraya los meses o anos que aparecen en ambas.",
            "Escribe primero los datos y despues tu opinion."
        ],
        "evidence": [
            "Comparar dos representaciones con datos concretos.",
            "Argumentar si una grafica es mas util que otra.",
            "Proponer una mejora de presentacion."
        ],
        "blooms": [
            ("analizar", [
                ("Semejanzas y diferencias", "Compara una grafica de lluvia y otra de aforo de playa. Escribe dos semejanzas y dos diferencias.", 7),
                ("Relacion posible", "Analiza si cuando sube una variable baja la otra y que tipo de relacion parece haber.", 7),
            ]),
            ("evaluar", [
                ("Grafica mas clara", "Evalua cual de dos graficas explica mejor una ruta turistica y justifica tu respuesta con dos criterios.", 7),
                ("Escala enganosa", "Evalua si una grafica con el eje vertical recortado ayuda o puede confundir al lector.", 7),
            ]),
            ("crear", [
                ("Mejora de presentacion", "Diseña una version mejorada de una de las dos graficas indicando titulo, ejes y escala.", 8),
                ("Comentario comparativo", "Redacta un pequeno comentario final de 5 o 6 lineas para la guia en el que compares dos graficas de la ciudad.", 8),
            ]),
        ],
    },
    {
        "id": "16",
        "block": "Bloque 3 · Datos, funciones y graficas",
        "title": "Relaciones y proporcionalidad",
        "objective": "Reconocer relaciones funcionales y distinguir cuando existe proporcionalidad directa entre dos variables.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Calculadora"],
        "steps": [
            "Lee la pareja de variables.",
            "Comprueba si al multiplicar una variable la otra tambien se multiplica igual.",
            "Si tienes tabla, calcula el cociente $y/x$ cuando se pueda.",
            "No olvides justificar tu conclusion."
        ],
        "reminders": [
            "Hay proporcionalidad directa si $y=kx$.",
            "En una tabla proporcional, el cociente $y/x$ es constante.",
            "No toda relacion funcional es proporcional."
        ],
        "supports": [
            "Haz una columna extra para el cociente $y/x$.",
            "Si el cociente cambia, no hay proporcionalidad directa.",
            "Escribe siempre con que datos has comprobado la relacion."
        ],
        "evidence": [
            "Diferenciar relacion funcional y proporcionalidad directa.",
            "Usar tablas para verificar un modelo.",
            "Explicar por que una situacion si o no es proporcional."
        ],
        "blooms": [
            ("comprender", [
                ("Que significa proporcional", "Explica con tus palabras que quiere decir que dos variables sean directamente proporcionales.", 6),
                ("No siempre proporcional", "Explica por que \\emph{edad y altura} pueden estar relacionadas pero no ser proporcionales.", 6),
            ]),
            ("aplicar", [
                ("Cociente constante", "Comprueba si esta tabla es proporcional: $(x,y)=(1,3),(2,6),(3,9),(4,12)$.", 6),
                ("Precio y entradas", "Cada entrada cuesta $5\\,\\euro$. Completa una tabla para 1, 2, 3, 4 y 5 entradas y escribe la expresion $y=kx$.", 7),
            ]),
            ("analizar", [
                ("Dos tablas", "Analiza cual de estas dos tablas es proporcional y cual no. Justifica usando el cociente.", 7),
                ("Contexto real", "Analiza si \\emph{distancia recorrida y tiempo} son proporcionales cuando una persona se para a descansar.", 7),
            ]),
            ("evaluar", [
                ("Modelo correcto", "Evalua si la expresion $y=5x+2$ puede representar una proporcionalidad directa. Justifica.", 6),
                ("Decide y argumenta", "Entre varias situaciones de ciudad, evalua cuales incluirias en la guia como ejemplos de proporcionalidad y por que.", 7),
            ]),
        ],
    },
    {
        "id": "17",
        "block": "Bloque 4 · Producto final",
        "title": "Seleccionar la informacion de la guia",
        "objective": "Filtrar mapas, calculos y graficas para elegir solo la informacion mas clara, precisa y relevante para la guia final.",
        "materials": ["Ficha impresa", "Lapiz", "Borradores del proyecto", "Rubrica o lista de comprobacion del equipo"],
        "steps": [
            "Reune todos los materiales del proyecto.",
            "Elige primero lo que este bien calculado y bien explicado.",
            "Descarta lo repetido o poco claro.",
            "Anota por escrito cada decision del equipo."
        ],
        "reminders": [
            "No todo lo hecho tiene que entrar en la guia final.",
            "Una seleccion buena combina claridad, correccion y utilidad.",
            "Hay que justificar por que se incluye o se descarta algo."
        ],
        "supports": [
            "Puedes usar una tabla con dos columnas: entra / no entra.",
            "Marca con una estrella lo imprescindible.",
            "Si algo no tiene fuente, unidad o explicacion, revisalo antes de incluirlo."
        ],
        "evidence": [
            "Aplicar criterios para elegir contenidos.",
            "Justificar decisiones de inclusion y descarte.",
            "Proponer una estructura inicial coherente."
        ],
        "blooms": [
            ("analizar", [
                ("Candidatos a la guia", "Analiza una lista de ocho posibles datos y decide cuales son fiables, claros y utiles para una guia matematica.", 8),
                ("Informacion repetida", "Analiza dos materiales que dicen casi lo mismo. Explica cual conservarias y cual resumirias.", 7),
            ]),
            ("evaluar", [
                ("Razonar una seleccion", "Evalua si una grafica sin unidades deberia entrar en la guia. Justifica con criterios matematicos.", 7),
                ("Orden de secciones", "Evalua que estructura seria mejor: empezar por mapa, por datos o por rutas. Explica tu decision.", 7),
            ]),
            ("crear", [
                ("Indice provisional", "Crea un indice provisional de la guia con entre 4 y 6 apartados.", 8),
                ("Portada matematica", "Diseña la idea de una portada que incluya titulo, subtitulo, una estadistica y un mini mapa con tres puntos.", 8),
            ]),
        ],
    },
    {
        "id": "18",
        "block": "Bloque 4 · Producto final",
        "title": "Construimos la guia",
        "objective": "Integrar mapas, textos, tablas y graficas en un unico producto claro, ordenado y visualmente coherente.",
        "materials": ["Ficha impresa", "Lapiz", "Regla", "Materiales definitivos del equipo", "Ordenador o cartulina segun el formato elegido"],
        "steps": [
            "Reparte tareas claras dentro del equipo.",
            "Coloca primero el mapa y las secciones principales.",
            "Inserta despues tablas, calculos y graficas en el lugar adecuado.",
            "Revisa al final que todo tenga titulo, unidad y orden."
        ],
        "reminders": [
            "Cada pagina o panel debe tener una funcion clara.",
            "Los datos matematicos tienen que verse y entenderse rapido.",
            "Un buen diseño deja espacio en blanco y evita saturar."
        ],
        "supports": [
            "Antes de pegar o maquetar, haz un boceto rapido.",
            "Si una pagina tiene demasiado texto, resume.",
            "Usa el mismo estilo de titulos y colores en toda la guia."
        ],
        "evidence": [
            "Organizar el producto final con orden y coherencia.",
            "Integrar calculos, imagenes y explicaciones.",
            "Tomar decisiones de diseño justificadas."
        ],
        "blooms": [
            ("aplicar", [
                ("Montaje guiado", "Organiza en una pagina estos elementos: mapa, tabla de monumentos, una grafica y un texto breve. Indica donde iria cada uno.", 8),
                ("Seccion util", "Diseña la distribucion de una seccion titulada \\emph{Monumentos en cifras} con espacio para dato, unidad y explicacion.", 8),
            ]),
            ("crear", [
                ("Maqueta una pagina", "Crea el borrador de una pagina completa de la guia con titulo, subtitulo, mapa o imagen y al menos dos datos matematicos.", 10),
                ("Manual visual", "Crea una lista de tres normas de diseño para que todas las paginas del equipo mantengan el mismo estilo.", 7),
            ]),
        ],
    },
    {
        "id": "19",
        "block": "Bloque 4 · Producto final",
        "title": "Ensayo y mejora",
        "objective": "Ensayar la exposicion, aplicar la rubrica y corregir los puntos debiles de la guia.",
        "materials": ["Ficha impresa", "Lapiz", "Guia casi final", "Rubrica de autoevaluacion y coevaluacion"],
        "steps": [
            "Haz un ensayo corto respetando el tiempo.",
            "Escucha el feedback con atencion y sin interrumpir.",
            "Marca tres mejoras prioritarias.",
            "Aplica los cambios antes de la entrega final."
        ],
        "reminders": [
            "Una buena revision es concreta y respetuosa.",
            "Las mejoras deben basarse en criterios, no en gustos sin justificar.",
            "Corregir tambien es parte del trabajo matematico."
        ],
        "supports": [
            "Puedes usar la estructura: estrella, estrella, deseo.",
            "Escribe primero el problema y despues la solucion.",
            "Si una mejora afecta a una formula o unidad, compruebala dos veces."
        ],
        "evidence": [
            "Autoevaluar la guia con criterio.",
            "Aplicar correcciones concretas y justificadas.",
            "Mejorar la exposicion oral y el producto escrito."
        ],
        "blooms": [
            ("evaluar", [
                ("Puntos debiles", "Evalua tu propia guia con una rubrica sencilla y detecta tres puntos debiles.", 8),
                ("Feedback a otro equipo", "Evalua una guia ajena y escribe dos puntos fuertes y dos mejoras concretas.", 8),
            ]),
            ("crear", [
                ("Plan de mejora", "Crea un plan de mejora con tres cambios: que cambiaras, por que y quien lo hara.", 8),
                ("Version corregida", "Redacta una version corregida de una parte de la guia que antes estaba incompleta o poco clara.", 8),
            ]),
        ],
    },
    {
        "id": "20",
        "block": "Bloque 4 · Producto final",
        "title": "Exposicion y cierre",
        "objective": "Presentar la guia final, valorar otras exposiciones y cerrar el proyecto con una reflexion sobre lo aprendido.",
        "materials": ["Ficha impresa", "Lapiz", "Guia final del equipo", "Rubrica de observacion de exposiciones"],
        "steps": [
            "Escucha las exposiciones con respeto.",
            "Toma notas breves mientras observas.",
            "Usa la rubrica para valorar con justicia.",
            "Cierra la ficha con una reflexion personal."
        ],
        "reminders": [
            "Exponer no es solo leer: hay que explicar.",
            "Una evaluacion justa usa evidencias observables.",
            "La reflexion final ayuda a consolidar el aprendizaje."
        ],
        "supports": [
            "Anota palabras clave mientras escuchas.",
            "Si valoras una exposicion, justifica con un ejemplo concreto.",
            "En la reflexion final, usa frases cortas y sinceras."
        ],
        "evidence": [
            "Valorar varias exposiciones con criterio.",
            "Reconocer rasgos de una buena guia matematica.",
            "Reflexionar sobre lo aprendido durante el proyecto."
        ],
        "blooms": [
            ("evaluar", [
                ("Observacion de exposiciones", "Evalua tres exposiciones de la clase con dos criterios: claridad matematica y calidad visual. Justifica cada valoracion.", 9),
                ("Que diferencia a un buen trabajo", "Escribe que diferencia, en tu opinion, una guia notable de una sobresaliente.", 7),
            ]),
            ("crear", [
                ("Nueva ciudad", "Imagina que ahora debes empezar una guia matematica sobre otra ciudad. Crea la propuesta de sus dos primeras paginas.", 10),
                ("Cierre personal", "Escribe un texto final breve: que he aprendido, que me ha costado mas y donde he visto matematicas en la ciudad.", 8),
            ]),
        ],
    },
]


def render_items(items, env):
    body = "\n".join(f"    \\item {item}" for item in items)
    return f"\\begin{{{env}}}\n{body}\n\\end{{{env}}}"


def block_number(session_id):
    number = int(session_id)
    if number <= 4:
        return 1
    if number <= 10:
        return 2
    if number <= 16:
        return 3
    return 4


def html_metadata(session_id):
    html_path = ROOT / f"bloque{block_number(session_id)}" / f"sesion{session_id}.html"
    text = html_path.read_text(encoding="utf-8", errors="ignore")

    dimension_match = re.search(
        r"Dimensi[oó]n del conocimiento:\s*<strong>([^<]+)</strong>",
        text,
        flags=re.IGNORECASE,
    )
    dimension = dimension_match.group(1).strip() if dimension_match else "Conceptual"

    verbs = [
        match.lower()
        for match in re.findall(r"[●\u25cf]\s*([A-ZÁÉÍÓÚ]+)", text)
    ]
    normalized = []
    replacements = {
        "cr\u00edticar": "evaluar",
        "criticar": "evaluar",
    }
    for verb in verbs:
        normalized_verb = replacements.get(verb, verb)
        if normalized_verb not in normalized:
            normalized.append(normalized_verb)
    return dimension, normalized


def pretty_processes(processes):
    labels = {
        "recordar": "Recordar",
        "comprender": "Comprender",
        "aplicar": "Aplicar",
        "analizar": "Analizar",
        "evaluar": "Evaluar",
        "crear": "Crear",
    }
    ordered = [labels[p] for p in LEVEL_ORDER if p in processes]
    return ", ".join(ordered)


def dimension_hint(dimension):
    hints = {
        "Hechos": "prioriza reconocer datos, ejemplos, magnitudes y vocabulario esencial",
        "Conceptual": "prioriza comprender relaciones, propiedades, definiciones y conexiones entre ideas",
        "Procedimientos": "prioriza seguir, explicar, revisar y mejorar pasos de resolucion",
        "Procesos": "prioriza tomar decisiones, organizar el trabajo y reflexionar sobre como se actua",
    }
    return hints.get(dimension, "prioriza comprender y aplicar el conocimiento de forma clara")


def generic_exercises(session, level, dimension):
    title = session["title"]
    objective = session["objective"]
    hint = dimension_hint(dimension)
    generic = {
        "recordar": [
            (
                "Vocabulario esencial",
                f"Escribe \\textbf{{cuatro palabras clave}} relacionadas con \\emph{{{title}}}. Despues escribe al lado una idea breve sobre cada una.",
                6,
            ),
            (
                "Datos o elementos basicos",
                f"Anota \\textbf{{tres elementos importantes}} de esta sesion. Ten en cuenta que la dimension {dimension.lower()} {hint}.",
                6,
            ),
        ],
        "comprender": [
            (
                "Explicacion con tus palabras",
                f"Explica con tus palabras la idea principal de la sesion: \\emph{{{objective}}}. Intenta usar un ejemplo sencillo.",
                7,
            ),
            (
                "Ejemplo y contraejemplo",
                f"Escribe un ejemplo correcto relacionado con \\emph{{{title}}} y explica por que encaja. Si puedes, añade tambien un contraejemplo o un caso que no encaje.",
                7,
            ),
        ],
        "aplicar": [
            (
                "Situacion nueva",
                f"Aplica lo aprendido en \\emph{{{title}}} a una situacion nueva de Almeria o de tu entorno. Explica los pasos seguidos y el resultado.",
                8,
            ),
            (
                "Transforma la informacion",
                f"Usa lo trabajado en esta sesion para pasar de una forma de informacion a otra: texto, tabla, dibujo, plano o calculo. Elige la transformacion que mejor encaje con la sesion y justifica.",
                8,
            ),
        ],
        "analizar": [
            (
                "Partes y relaciones",
                f"Analiza un ejemplo relacionado con \\emph{{{title}}}. Separa sus partes, indica cuales son relevantes y explica como se relacionan entre si.",
                8,
            ),
            (
                "Detecta errores o diferencias",
                f"Compara dos respuestas, dos representaciones o dos procedimientos relacionados con esta sesion. Analiza sus diferencias y explica que errores o mejoras detectas.",
                8,
            ),
        ],
        "evaluar": [
            (
                "Valora una propuesta",
                f"Evalua una posible solucion o producto relacionado con \\emph{{{title}}}. Decide si es adecuado y justifica tu opinion con criterios matematicos claros.",
                8,
            ),
            (
                "Elige la mejor opcion",
                f"Entre varias opciones posibles para cumplir este objetivo: \\emph{{{objective}}}, elige la mejor y argumenta por que. Incluye al menos dos criterios de valoracion.",
                8,
            ),
        ],
        "crear": [
            (
                "Diseño propio",
                f"Crea una produccion nueva relacionada con \\emph{{{title}}}: un problema, una representacion, una mini guia, una explicacion visual o una propuesta de mejora.",
                9,
            ),
            (
                "Alternativa mejorada",
                f"Inventa una alternativa mas clara, mas util o mas creativa para trabajar este contenido. Debe estar alineada con el objetivo de la sesion y con la dimension {dimension.lower()}.",
                9,
            ),
        ],
    }
    return generic[level]


def normalize_blooms(session):
    dimension, canonical_processes = html_metadata(session["id"])
    manual = {level: exercises for level, exercises in session["blooms"]}
    normalized = []
    for level in LEVEL_ORDER:
        if level not in canonical_processes:
            continue
        exercises = manual.get(level)
        if not exercises or len(exercises) < 2:
            exercises = generic_exercises(session, level, dimension)
        normalized.append((level, exercises[:2]))
    session["dimension"] = dimension
    session["processes"] = canonical_processes
    session["blooms"] = normalized
    return session


def render_exercises(blooms):
    parts = []
    for level, exercises in blooms:
        parts.append(f"\\BloomSection{{{level}}}")
        for idx, (title, prompt, lines) in enumerate(exercises, start=1):
            parts.append(
                "\\BloomExercise"
                f"{{{level}}}{{{idx}}}{{{title}}}{{{prompt}}}{{{lines}}}"
            )
    return "\n\n".join(parts)


def render_tex(session):
    dimension = session["dimension"]
    processes = pretty_processes(session["processes"])
    materials = render_items(session["materials"], "itemize")
    steps = render_items(session["steps"], "enumerate")
    reminders = render_items(session["reminders"], "itemize")
    supports = render_items(session["supports"], "itemize")
    evidence = render_items(session["evidence"], "itemize")
    exercises = render_exercises(session["blooms"])

    return textwrap.dedent(
        f"""
        \\documentclass[12pt,a4paper]{{article}}
        \\makeatletter
        \\def\\input@path{{{{../}}}}
        \\makeatother
        \\usepackage{{almeria-fichas}}

        \\FichaMeta{{Sesion {session["id"]}}}{{{session["title"]}}}{{{session["block"]}}}{{{session["objective"]}}}{{{dimension}}}{{{processes}}}

        \\begin{{document}}

        \\FichaCabecera

        \\begin{{materialesbox}}
        {materials}
        \\end{{materialesbox}}

        \\begin{{pasosbox}}
        {steps}
        \\end{{pasosbox}}

        \\begin{{recordatoriobox}}
        {reminders}
        \\end{{recordatoriobox}}

        \\begin{{apoyobox}}
        {supports}
        \\end{{apoyobox}}

        {exercises}

        \\begin{{evidenciabox}}
        {evidence}
        \\end{{evidenciabox}}

        \\end{{document}}
        """
    ).strip() + "\n"


def ensure_readmes():
    latex_readme = LATEX_ROOT / "README.md"
    latex_readme.write_text(
        textwrap.dedent(
            """
            # Fichas de sesion

            Esta carpeta contiene las fichas A4 en LaTeX para cada sesion del proyecto.

            Estructura:

            - `almeria-fichas.sty`: estilo comun print-friendly y de lectura facilitada.
            - `sesionXX/sesionXX-ficha.tex`: ficha individual de cada sesion.
            - `generar_fichas.py`: regenerador de las fichas si se actualiza el contenido.

            Sugerencia de compilacion:

            1. Entra en la carpeta de la sesion que quieras.
            2. Compila `sesionXX-ficha.tex` con `pdflatex`.
            3. Guarda el PDF final en la carpeta gemela de `../fichas-pdf/sesionXX/`.
            """
        ).strip()
        + "\n",
        encoding="utf-8",
    )

    pdf_readme = PDF_ROOT / "README.md"
    pdf_readme.parent.mkdir(parents=True, exist_ok=True)
    pdf_readme.write_text(
        textwrap.dedent(
            """
            # PDFs de las fichas

            Esta carpeta esta preparada para almacenar los PDF finales de cada ficha de sesion.

            Cada subcarpeta `sesionXX` corresponde a la ficha `.tex` situada en `../fichas-latex/sesionXX/`.
            """
        ).strip()
        + "\n",
        encoding="utf-8",
    )


def main():
    LATEX_ROOT.mkdir(parents=True, exist_ok=True)
    PDF_ROOT.mkdir(parents=True, exist_ok=True)
    ensure_readmes()

    normalized_sessions = [normalize_blooms(dict(session)) for session in SESSIONS]

    for session in normalized_sessions:
        latex_session_dir = LATEX_ROOT / f"sesion{session['id']}"
        pdf_session_dir = PDF_ROOT / f"sesion{session['id']}"
        latex_session_dir.mkdir(parents=True, exist_ok=True)
        pdf_session_dir.mkdir(parents=True, exist_ok=True)

        tex_path = latex_session_dir / f"sesion{session['id']}-ficha.tex"
        tex_path.write_text(render_tex(session), encoding="utf-8")

        keep_path = pdf_session_dir / ".gitkeep"
        keep_path.write_text("", encoding="utf-8")


if __name__ == "__main__":
    main()
