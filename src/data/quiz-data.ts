export type MemberKey = "Minji" | "Hanni" | "Danielle" | "Haerin" | "Hyein";

export interface MemberInfo {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  accent: string;
  bg: string;
  gradient: string;
  image: string;
}

export interface QuizOption {
  text: string;
  emoji: string;
  member: MemberKey;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

// ── Integrantes ─────────────────────────────────────────────────────────────
export const MEMBERS: Record<MemberKey, MemberInfo> = {
  Minji: {
    name: "MINJI",
    emoji: "👑",
    tagline: "La Líder Elegante",
    description:
      "Eres la líder natural y la elegancia personificada. Tu calma y madurez inspiran a todos a tu alrededor. Tienes un estilo clásico pero con un toque moderno que nunca pasa de moda. ¡Los demás siempre te buscan para pedir consejo!",
    accent: "#5B9BD5",
    bg: "#EBF4FD",
    gradient: "linear-gradient(135deg, #c9e9f6 0%, #5B9BD5 100%)",
    image: "/images/quiz/minji-quiz.avif",
  },
  Hanni: {
    name: "HANNI",
    emoji: "🎤",
    tagline: "La Estrella del Show",
    description:
      "¡Eres pura diversión y expresividad! Tu energía es contagiosa y siempre encuentras la manera de hacer sonreír a los demás. Tienes un talento natural para brillar en cualquier escenario y tu carisma no tiene rival.",
    accent: "#FF69B4",
    bg: "#FFF0F7",
    gradient: "linear-gradient(135deg, #f4d8ed 0%, #FF69B4 100%)",
    image: "/images/quiz/hanni-quiz.avif",
  },
  Danielle: {
    name: "DANIELLE",
    emoji: "🌻",
    tagline: "La Luz del Grupo",
    description:
      "Eres como un rayo de sol constante. Tu positividad y dulzura no tienen límites. Siempre ves el lado bueno de las cosas y tu entusiasmo es simplemente irresistible. Todo el mundo quiere estar cerca de ti.",
    accent: "#F5A623",
    bg: "#FFFBEC",
    gradient: "linear-gradient(135deg, #f9f1c3 0%, #F5A623 100%)",
    image: "/images/quiz/danielle-quiz.avif",
  },
  Haerin: {
    name: "HAERIN",
    emoji: "🐱",
    tagline: "La Chica Cool",
    description:
      "Tienes una vibra única y misteriosa que atrae a todos. Eres curiosa, observadora y posees un encanto especial que te hace destacar sin necesidad de gritar. Eres la definición de 'effortlessly cool'.",
    accent: "#2ECC71",
    bg: "#EAFAF1",
    gradient: "linear-gradient(135deg, #b2f2bb 0%, #2ECC71 100%)",
    image: "/images/quiz/haerin-quiz.avif",
  },
  Hyein: {
    name: "HYEIN",
    emoji: "💎",
    tagline: "La it-girl del Futuro",
    description:
      "A pesar de ser la más joven, tu madurez y presencia son impresionantes. Tienes un sentido de la moda impecable y una confianza que te llevará muy lejos. ¡Tu potencial no tiene techo y todos lo saben!",
    accent: "#A78BFA",
    bg: "#F5F3FF",
    gradient: "linear-gradient(135deg, #ffb6c1 0%, #A78BFA 100%)",
    image: "/images/quiz/hyein-quiz.avif",
  },
};

// ── Banco de 50 preguntas ───────────────────────────────────────────────────
// Cada pregunta tiene exactamente 5 opciones, una por integrante.
export const ALL_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "¿CUÁL ES TU ENERGÍA UN VIERNES NOCHE?",
    options: [
      { emoji: "🕯️", text: "CENA TRANQUILA Y CONVERSACIÓN PROFUNDA", member: "Minji" },
      { emoji: "💃", text: "A BAILAR SIN PARAR HASTA LAS 3AM", member: "Hanni" },
      { emoji: "🎬", text: "MARATÓN DE SERIES CON MI GRUPO", member: "Danielle" },
      { emoji: "🎧", text: "EN CASA CON MI PLAYLIST FAVORITA", member: "Haerin" },
      { emoji: "🛍️", text: "NOCHE DE COMPRAS ONLINE HASTA TARDE", member: "Hyein" },
    ],
  },
  {
    id: 2,
    text: "¿QUÉ ACTIVIDAD PREFIERES EN TU TIEMPO LIBRE?",
    options: [
      { emoji: "📚", text: "LEER UN BUEN LIBRO O ESTUDIAR ALGO NUEVO", member: "Minji" },
      { emoji: "🎭", text: "HACER SKETCHES O IMPROS DIVERTIDAS", member: "Hanni" },
      { emoji: "🌳", text: "PASEO AL AIRE LIBRE BAJO EL SOL", member: "Danielle" },
      { emoji: "🎨", text: "DIBUJAR O ESCUCHAR MÚSICA EN SILENCIO", member: "Haerin" },
      { emoji: "📸", text: "HACER FOTOS PARA MIS REDES", member: "Hyein" },
    ],
  },
  {
    id: 3,
    text: "SI FUERAS UN ANIMAL, ¿CUÁL SERÍAS?",
    options: [
      { emoji: "🐻", text: "UN OSO NOBLE Y PROTECTOR", member: "Minji" },
      { emoji: "🐬", text: "UN DELFÍN JUGUETÓN Y SOCIAL", member: "Hanni" },
      { emoji: "🐶", text: "UN PERRITO LEAL Y CARIÑOSO", member: "Danielle" },
      { emoji: "🐱", text: "UN GATO INDEPENDIENTE Y MISTERIOSO", member: "Haerin" },
      { emoji: "🦋", text: "UNA MARIPOSA ELEGANTE Y LIBRE", member: "Hyein" },
    ],
  },
  {
    id: 4,
    text: "¿CUÁL ES TU ACCESORIO IMPRESCINDIBLE?",
    options: [
      { emoji: "👒", text: "UN SOMBRERO CLÁSICO Y ELEGANTE", member: "Minji" },
      { emoji: "🎀", text: "UN LAZO O DIADEMA MUY DIVERTIDA", member: "Hanni" },
      { emoji: "✨", text: "ALGO QUE BRILLE MUCHO", member: "Danielle" },
      { emoji: "🎧", text: "MIS AURICULARES, SIEMPRE Y EN TODO LUGAR", member: "Haerin" },
      { emoji: "👜", text: "UN BOLSO PEQUEÑO Y ULTRA TRENDY", member: "Hyein" },
    ],
  },
  {
    id: 5,
    text: "¿CÓMO REACCIONAS CUANDO HAY ESTRÉS?",
    options: [
      { emoji: "🧘", text: "ME ORGANIZO Y HAGO UN PLAN PASO A PASO", member: "Minji" },
      { emoji: "🗣️", text: "HABLO CON AMIGOS Y ME DESAHOGO", member: "Hanni" },
      { emoji: "🍫", text: "BUSCO ALGO RICOMÍSIMO QUE COMER", member: "Danielle" },
      { emoji: "🎵", text: "ME ENCIERRO CON BUENA MÚSICA", member: "Haerin" },
      { emoji: "💅", text: "ME HAGO UNA SESIÓN DE AUTOCUIDADO", member: "Hyein" },
    ],
  },
  {
    id: 6,
    text: "¿CUÁL SERÍA TU SUPERPODER IDEAL?",
    options: [
      { emoji: "⏳", text: "CONTROLAR EL TIEMPO PARA SER MÁS PRODUCTIVA", member: "Minji" },
      { emoji: "🌀", text: "TELETRANSPORTARME A CUALQUIER FIESTA", member: "Hanni" },
      { emoji: "☀️", text: "HACER FELIZ A CUALQUIER PERSONA AL INSTANTE", member: "Danielle" },
      { emoji: "🔮", text: "LEER LA MENTE DE LAS PERSONAS", member: "Haerin" },
      { emoji: "👗", text: "MATERIALIZAR CUALQUIER OUTFIT QUE IMAGINE", member: "Hyein" },
    ],
  },
  {
    id: 7,
    text: "¿QUÉ COLOR DEFINE MEJOR TU PERSONALIDAD?",
    options: [
      { emoji: "🔵", text: "AZUL PROFUNDO — CALMA Y CONFIANZA", member: "Minji" },
      { emoji: "🩷", text: "ROSA VIBRANTE — ENERGÍA Y AMOR", member: "Hanni" },
      { emoji: "🟡", text: "AMARILLO SOLEADO — ALEGRÍA Y LUZ", member: "Danielle" },
      { emoji: "🟢", text: "VERDE OSCURO — MISTERIO Y NATURALEZA", member: "Haerin" },
      { emoji: "🟣", text: "LILA PASTEL — CREATIVIDAD Y ORIGINALIDAD", member: "Hyein" },
    ],
  },
  {
    id: 8,
    text: "¿QUÉ PONES EN TU PLAYLIST DE ESTUDIO?",
    options: [
      { emoji: "🎻", text: "MÚSICA CLÁSICA O LO-FI CHILL", member: "Minji" },
      { emoji: "🎤", text: "KPOP A TODO VOLUMEN", member: "Hanni" },
      { emoji: "🎸", text: "POP ANIMADO QUE ME MANTIENE FELIZ", member: "Danielle" },
      { emoji: "🎷", text: "JAZZ O INDIE OSCURO", member: "Haerin" },
      { emoji: "🎹", text: "MÚSICA VIRAL DE TIKTOK", member: "Hyein" },
    ],
  },
  {
    id: 9,
    text: "¿QUÉ HARÍAS EN UNA TARDE COMPLETAMENTE LIBRE?",
    options: [
      { emoji: "📖", text: "PONERME AL DÍA CON MIS LECTURAS PENDIENTES", member: "Minji" },
      { emoji: "🎪", text: "MONTAR UN SHOW O UNA BROMA A ALGUIEN", member: "Hanni" },
      { emoji: "🍦", text: "PASEAR Y DESCUBRIR CAFÉS NUEVOS", member: "Danielle" },
      { emoji: "🌃", text: "VER PELÍCULAS EN SOLEDAD Y REFLEXIONAR", member: "Haerin" },
      { emoji: "🛍️", text: "BUSCAR PRENDAS ÚNICAS EN TIENDAS VINTAGE", member: "Hyein" },
    ],
  },
  {
    id: 10,
    text: "¿CUÁL ES TU ESTILO A LA HORA DE VESTIR?",
    options: [
      { emoji: "🧥", text: "ELEGANTE Y MINIMALISTA, SIEMPRE IMPECABLE", member: "Minji" },
      { emoji: "🎀", text: "COLORIDO, DIVERTIDO Y LLENO DE VIDA", member: "Hanni" },
      { emoji: "🌸", text: "KAWAII, CON FLORES Y TONOS PASTEL", member: "Danielle" },
      { emoji: "🖤", text: "STREETWEAR OSCURO Y OVERSIZE", member: "Haerin" },
      { emoji: "✨", text: "LO ÚLTIMO EN TENDENCIAS, SIEMPRE", member: "Hyein" },
    ],
  },
  {
    id: 11,
    text: "¿CÓMO TE DESCRIBIRÍAN TUS MEJORES AMIGOS?",
    options: [
      { emoji: "🛡️", text: "MADURA, RESPONSABLE Y MUY CONFIABLE", member: "Minji" },
      { emoji: "🎉", text: "DIVERTIDA, ESCANDALOSA Y LA VIDA DE LA FIESTA", member: "Hanni" },
      { emoji: "🌈", text: "ALEGRE, EMPÁTICA Y SIEMPRE POSITIVA", member: "Danielle" },
      { emoji: "🌙", text: "TRANQUILA, CREATIVA Y DIFERENTE A LAS DEMÁS", member: "Haerin" },
      { emoji: "💪", text: "SEGURA DE SÍ MISMA, TRENDY E INSPIRADORA", member: "Hyein" },
    ],
  },
  {
    id: 12,
    text: "¿CUÁL ES TU COMIDA DE CONFORT?",
    options: [
      { emoji: "🍱", text: "SUSHI O COMIDA JAPONESA SOFISTICADA", member: "Minji" },
      { emoji: "🍕", text: "PIZZA GIGANTE CON AMIGOS", member: "Hanni" },
      { emoji: "🧇", text: "PANCAKES CON FRUTA Y MUCHO MAPLE", member: "Danielle" },
      { emoji: "🍜", text: "RAMEN PICANTE EN SOLEDAD", member: "Haerin" },
      { emoji: "🧋", text: "BUBBLE TEA Y SNACKS COREANOS", member: "Hyein" },
    ],
  },
  {
    id: 13,
    text: "¿CUÁL ES TU ESTACIÓN FAVORITA Y POR QUÉ?",
    options: [
      { emoji: "🍂", text: "OTOÑO — ES REFLEXIVA Y CÓMODA", member: "Minji" },
      { emoji: "🌺", text: "PRIMAVERA — ESTÁ LLENA DE VIDA Y COLOR", member: "Hanni" },
      { emoji: "☀️", text: "VERANO — SOL, MAR Y AVENTURAS", member: "Danielle" },
      { emoji: "❄️", text: "INVIERNO — ES MISTERIOSO Y TRANQUILO", member: "Haerin" },
      { emoji: "🌸", text: "TODAS, SEGÚN EL OUTFIT QUE ME PUEDO PONER", member: "Hyein" },
    ],
  },
  {
    id: 14,
    text: "SI FUERAN UN TIPO DE CAFÉ, ¿CUÁL SERÍAS?",
    options: [
      { emoji: "☕", text: "CAFÉ NEGRO SOLO — CLÁSICO Y FUERTE", member: "Minji" },
      { emoji: "🧁", text: "FRAPPUCCINO CON MUCHA NATA Y SIROPE", member: "Hanni" },
      { emoji: "🍵", text: "CAFÉ CON LECHE DULCE Y CANELA", member: "Danielle" },
      { emoji: "🖤", text: "AMERICANO HELADO SIN AZÚCAR", member: "Haerin" },
      { emoji: "🧋", text: "DALGONA COFFEE MONTADO Y FOTOGÉNICO", member: "Hyein" },
    ],
  },
  {
    id: 15,
    text: "¿QUÉ ROL SUELES TENER EN UN PROYECTO GRUPAL?",
    options: [
      { emoji: "📋", text: "ORGANIZO TODO Y REPARTO LAS TAREAS", member: "Minji" },
      { emoji: "🙋", text: "ANIMO AL GRUPO Y PONGO LA ENERGÍA", member: "Hanni" },
      { emoji: "🤝", text: "APOYO A TODOS Y RESUELVO CONFLICTOS", member: "Danielle" },
      { emoji: "💡", text: "TENGO LAS IDEAS MÁS ORIGINALES", member: "Haerin" },
      { emoji: "🎨", text: "ME ENCARGO DEL DISEÑO Y LA PRESENTACIÓN", member: "Hyein" },
    ],
  },
  {
    id: 16,
    text: "¿QUÉ TIPO DE PELÍCULA TE EMOCIONA MÁS?",
    options: [
      { emoji: "🎭", text: "DRAMA HISTÓRICO CON ACTUACIONES ÉPICAS", member: "Minji" },
      { emoji: "😂", text: "COMEDIA LOCA A CARCAJADAS", member: "Hanni" },
      { emoji: "💕", text: "ROMANCE CON MUCHO SENTIMENTALISMO", member: "Danielle" },
      { emoji: "🔪", text: "THRILLER OSCURO Y LLENO DE GIROS", member: "Haerin" },
      { emoji: "🚀", text: "CIENCIA FICCIÓN CON EFECTOS VISUALES", member: "Hyein" },
    ],
  },
  {
    id: 17,
    text: "¿CÓMO SUELES LLEGAR A LAS FIESTAS?",
    options: [
      { emoji: "🕙", text: "PUNTUAL, COMO ES DE ESPERAR", member: "Minji" },
      { emoji: "🎊", text: "ESTREPITOSAMENTE TARDE Y HACIENDO RUIDO", member: "Hanni" },
      { emoji: "🫂", text: "DANDO ABRAZOS NADA MÁS ENTRAR", member: "Danielle" },
      { emoji: "😎", text: "FASHION LATE PARA QUE TODOS ME VEAN LLEGAR", member: "Haerin" },
      { emoji: "📱", text: "GRABÁNDOLO TODO PARA MIS STORIES", member: "Hyein" },
    ],
  },
  {
    id: 18,
    text: "¿QUÉ FRASE DESCRIBE MEJOR TU LEMA DE VIDA?",
    options: [
      { emoji: "🎯", text: "\"TRABAJA DURO Y SE RESPONSABLE\"", member: "Minji" },
      { emoji: "🌟", text: "\"VIVE CADA MOMENTO A TOPE\"", member: "Hanni" },
      { emoji: "🌈", text: "\"EL AMOR LO PUEDE TODO\"", member: "Danielle" },
      { emoji: "🌊", text: "\"SIGUE TU PROPIO CAMINO\"", member: "Haerin" },
      { emoji: "💫", text: "\"CRÉETELO Y LO LOGRARÁS\"", member: "Hyein" },
    ],
  },
  {
    id: 19,
    text: "¿QUÉ ES LO PRIMERO QUE HACES AL DESPERTAR?",
    options: [
      { emoji: "📅", text: "REVISAR MI AGENDA Y PLANIFICAR EL DÍA", member: "Minji" },
      { emoji: "📱", text: "MIRAR NOTIFICACIONES Y MANDAR MEMES", member: "Hanni" },
      { emoji: "🌤️", text: "ABRIR LA VENTANA Y RESPIRAR PROFUNDO", member: "Danielle" },
      { emoji: "🛌", text: "DAR MIL VUELTAS ANTES DE LEVANTARME", member: "Haerin" },
      { emoji: "🪞", text: "VERME EN EL ESPEJO Y ORGANIZARME", member: "Hyein" },
    ],
  },
  {
    id: 20,
    text: "¿QUÉ TIPO DE LIBRO ELEGIRÍAS PARA LEER ESTE FIN DE SEMANA?",
    options: [
      { emoji: "📜", text: "CLÁSICO DE LITERATURA UNIVERSAL", member: "Minji" },
      { emoji: "😆", text: "HUMOR Y ANÉCDOTAS DIVERTIDAS", member: "Hanni" },
      { emoji: "💌", text: "ROMANCE CURSI Y APASIONADO", member: "Danielle" },
      { emoji: "🕵️", text: "SUSPENSE O NOVELA NEGRA", member: "Haerin" },
      { emoji: "🌐", text: "ENSAYO SOBRE MODA O TENDENCIAS", member: "Hyein" },
    ],
  },
  {
    id: 21,
    text: "¿EN QUÉ SITUACIÓN TE SIENTES MÁS TÚ MISMA?",
    options: [
      { emoji: "🏛️", text: "CUANDO ESTOY AL MANDO DE ALGO IMPORTANTE", member: "Minji" },
      { emoji: "🎙️", text: "CUANDO TODO EL MUNDO ME ESTÁ MIRANDO", member: "Hanni" },
      { emoji: "🫶", text: "CUANDO ESTOY RODEADA DE GENTE QUE QUIERO", member: "Danielle" },
      { emoji: "🔇", text: "CUANDO ESTOY SOLA CON MIS PENSAMIENTOS", member: "Haerin" },
      { emoji: "🏆", text: "CUANDO DESTACO ENTRE LOS DEMÁS", member: "Hyein" },
    ],
  },
  {
    id: 22,
    text: "¿QUÉ TIPO DE FIESTA ORGANIZARÍAS?",
    options: [
      { emoji: "🍷", text: "CENA ELEGANTE CON MENÚ DE 4 PLATOS", member: "Minji" },
      { emoji: "🕺", text: "RAVE O FIESTA DE BAILE A TODO VOLUMEN", member: "Hanni" },
      { emoji: "🌸", text: "PICNIC EN EL PARQUE CON JUEGOS", member: "Danielle" },
      { emoji: "🎞️", text: "NOCHE DE CINE CON PALOMITAS EN CASA", member: "Haerin" },
      { emoji: "📸", text: "PHOTOCALL Y FIESTA TEMÁTICA SUPER INSTAGRAMEABLE", member: "Hyein" },
    ],
  },
  {
    id: 23,
    text: "¿CUÁL SERÍA TU TRABAJO SOÑADO?",
    options: [
      { emoji: "⚖️", text: "DIRECTORA EJECUTIVA O ABOGADA", member: "Minji" },
      { emoji: "🎬", text: "ACTRIZ O PRESENTADORA DE TV", member: "Hanni" },
      { emoji: "👩‍⚕️", text: "MÉDICO O PSICÓLOGA, AYUDANDO A OTROS", member: "Danielle" },
      { emoji: "🎵", text: "COMPOSITORA O DIRECTORA DE CINE INDIE", member: "Haerin" },
      { emoji: "👗", text: "DISEÑADORA DE MODA O INFLUENCER", member: "Hyein" },
    ],
  },
  {
    id: 24,
    text: "¿CUÁL ES TU TIPO DE VACACIONES IDEAL?",
    options: [
      { emoji: "🏯", text: "TOUR CULTURAL POR MUSEOS Y CIUDADES HISTÓRICAS", member: "Minji" },
      { emoji: "🎡", text: "PARQUE TEMÁTICO Y ATRACCIONES EXTREMAS", member: "Hanni" },
      { emoji: "🏖️", text: "PLAYA, SOL Y COCTELITOS SIN PREOCUPACIONES", member: "Danielle" },
      { emoji: "⛰️", text: "ESCAPADA DE MONTAÑA EN SOLEDAD", member: "Haerin" },
      { emoji: "🗼", text: "CIUDAD INTERNACIONAL CON MUCHO SHOPPING", member: "Hyein" },
    ],
  },
  {
    id: 25,
    text: "¿QUÉ HACES CUANDO CONOCES A ALGUIEN NUEVO?",
    options: [
      { emoji: "🤝", text: "ESCUCHO ATENTAMENTE Y ANALIZO BIEN", member: "Minji" },
      { emoji: "😜", text: "LE CUENTO UN CHISTE PARA ROMPER EL HIELO", member: "Hanni" },
      { emoji: "😊", text: "SONRÍO Y LE PREGUNTO MUCHAS COSAS", member: "Danielle" },
      { emoji: "👁️", text: "OBSERVO ANTES DE HABLAR MUCHO", member: "Haerin" },
      { emoji: "💁", text: "ME PRESENTO CON CONFIANZA Y ACTITUD", member: "Hyein" },
    ],
  },
  {
    id: 26,
    text: "¿QUÉ ELEMENTO DE LA NATURALEZA ERES?",
    options: [
      { emoji: "🌊", text: "AGUA — TRANQUILA PERO PODEROSA", member: "Minji" },
      { emoji: "🔥", text: "FUEGO — APASIONADA E IMPARABLE", member: "Hanni" },
      { emoji: "🌻", text: "TIERRA — CÁLIDA Y QUE DA VIDA", member: "Danielle" },
      { emoji: "🌑", text: "LUNA — MISTERIOSA E INDEPENDIENTE", member: "Haerin" },
      { emoji: "⚡", text: "RAYO — RÁPIDA, BRILLANTE Y ÚNICA", member: "Hyein" },
    ],
  },
  {
    id: 27,
    text: "¿QUÉ APP USAS MÁS EN TU MÓVIL?",
    options: [
      { emoji: "📊", text: "NOTION O ALGUNA APP DE NOTAS Y ORGANIZACIÓN", member: "Minji" },
      { emoji: "💬", text: "WHATSAPP MANDANDO AUDIOS A TODOS", member: "Hanni" },
      { emoji: "🎵", text: "SPOTIFY CON PLAYLIST PARA CADA ESTADO DE ÁNIMO", member: "Danielle" },
      { emoji: "🎮", text: "ALGÚN JUEGO SOLITARIO O DE ESTRATEGIA", member: "Haerin" },
      { emoji: "📷", text: "INSTAGRAM O TIKTOK SIEMPRE ABIERTO", member: "Hyein" },
    ],
  },
  {
    id: 28,
    text: "¿CÓMO TE COMPORTAS EN UN KARAOKE?",
    options: [
      { emoji: "🎵", text: "ELIJO CANCIONES DIFÍCILES E IMPRESIONO A TODOS", member: "Minji" },
      { emoji: "🎤", text: "COJO EL MICRO Y NO LO SUELTO EN TODA LA NOCHE", member: "Hanni" },
      { emoji: "🥰", text: "CANTO LAS BALADAS Y LLORO UN POQUITO", member: "Danielle" },
      { emoji: "📱", text: "GRABO A LOS DEMÁS PERO PASO DE CANTAR YO", member: "Haerin" },
      { emoji: "💃", text: "BAILO MIENTRAS OTROS CANTAN Y ROBO EL SHOW", member: "Hyein" },
    ],
  },
  {
    id: 29,
    text: "¿QUÉ ES LO QUE MÁS VALORAS EN UNA AMISTAD?",
    options: [
      { emoji: "🤍", text: "LA LEALTAD Y LA CONFIANZA ABSOLUTA", member: "Minji" },
      { emoji: "😂", text: "EL HUMOR Y PASARLA BIEN SIEMPRE", member: "Hanni" },
      { emoji: "🫂", text: "EL APOYO EMOCIONAL EN CUALQUIER MOMENTO", member: "Danielle" },
      { emoji: "🧠", text: "CONVERSACIONES PROFUNDAS E INTERESANTES", member: "Haerin" },
      { emoji: "💅", text: "QUE ME ACOMPAÑEN EN MIS PLANES Y AMBICIONES", member: "Hyein" },
    ],
  },
  {
    id: 30,
    text: "¿QUÉ LLEVARÍAS A UNA ISLA DESIERTA?",
    options: [
      { emoji: "📚", text: "UNA BIBLIOTECA COMPLETA DE LIBROS", member: "Minji" },
      { emoji: "🔊", text: "UN ALTAVOZ CON BATERÍA INFINITA", member: "Hanni" },
      { emoji: "🫂", text: "A MI PERSONA FAVORITA DEL MUNDO", member: "Danielle" },
      { emoji: "🎸", text: "UN INSTRUMENTO MUSICAL", member: "Haerin" },
      { emoji: "📱", text: "MI MÓVIL CON CARGA INFINITA", member: "Hyein" },
    ],
  },
  {
    id: 31,
    text: "¿CÓMO DESCRIBES TU SENTIDO DEL HUMOR?",
    options: [
      { emoji: "😏", text: "SARCÁSTICO Y SUTIL, NO TODOS LO PILLAN", member: "Minji" },
      { emoji: "🤣", text: "ABSURDO Y ESCANDALOSO, TODOS SE RÍEN", member: "Hanni" },
      { emoji: "😄", text: "DULCE Y DE BUEN ROLLO, NUNCA HIERE A NADIE", member: "Danielle" },
      { emoji: "🌑", text: "HUMOR NEGRO Y ÁCIDO QUE SORPRENDE", member: "Haerin" },
      { emoji: "💁", text: "IRÓNICO Y CON MUCHO CARÁCTER", member: "Hyein" },
    ],
  },
  {
    id: 32,
    text: "¿EN QUÉ PARTE DEL MUNDO TE GUSTARÍA VIVIR?",
    options: [
      { emoji: "🇫🇷", text: "PARÍS — ELEGANCIA Y CULTURA", member: "Minji" },
      { emoji: "🇦🇺", text: "SÍDNEY — PLAYA, SOL Y FIESTA", member: "Hanni" },
      { emoji: "🇮🇹", text: "ROMA — HISTORIA, COMIDA Y AMOR", member: "Danielle" },
      { emoji: "🇯🇵", text: "TOKIO — MINIMALISMO Y PROFUNDIDAD", member: "Haerin" },
      { emoji: "🇺🇸", text: "NUEVA YORK — MODA Y AMBICIÓN", member: "Hyein" },
    ],
  },
  {
    id: 33,
    text: "¿QUÉ POSTRE ERAS SI FUERAS UN DULCE?",
    options: [
      { emoji: "🍮", text: "CRÈME BRÛLÉE — ELEGANTE Y REFINADO", member: "Minji" },
      { emoji: "🍩", text: "DONUT MULTICOLOR — DIVERTIDO Y LLAMATIVO", member: "Hanni" },
      { emoji: "🧸", text: "ALGODÓN DE AZÚCAR — SUAVE Y TIERNO", member: "Danielle" },
      { emoji: "🍫", text: "CHOCOLATE NEGRO — INTENSO Y ADICTIVO", member: "Haerin" },
      { emoji: "🎂", text: "TARTA DE CUMPLEAÑOS — LAS PROTAGONISTA DE SIEMPRE", member: "Hyein" },
    ],
  },
  {
    id: 34,
    text: "¿CÓMO PREFIERES APRENDER COSAS NUEVAS?",
    options: [
      { emoji: "📖", text: "LEYENDO Y TOMANDO APUNTES DETALLADOS", member: "Minji" },
      { emoji: "🎬", text: "VIENDO VIDEOS ENTRETENIDOS Y TUTORIALES", member: "Hanni" },
      { emoji: "👫", text: "CON ALGUIEN QUE ME LO EXPLIQUE EN PERSONA", member: "Danielle" },
      { emoji: "🧪", text: "EXPERIMENTANDO Y EQUIVOCÁNDOME HASTA APRENDER", member: "Haerin" },
      { emoji: "💻", text: "CURSOS ONLINE CON CERTIFICADOS Y ESTÉTICA", member: "Hyein" },
    ],
  },
  {
    id: 35,
    text: "¿QUÉ TIPO DE MÚSICA ESCUCHAS AL DUCHARTE?",
    options: [
      { emoji: "🎼", text: "INSTRUMENTAL O JAZZ SOFISTICADO", member: "Minji" },
      { emoji: "💥", text: "LOS HITS MÁS ENERGÉTICOS DEL MOMENTO", member: "Hanni" },
      { emoji: "🌈", text: "POP ANIMADO CANTANDO A PLENO PULMÓN", member: "Danielle" },
      { emoji: "🌧️", text: "MÚSICA LLUVIA O AMBIENT OSCURO", member: "Haerin" },
      { emoji: "📲", text: "LO QUE ESTÁ SONANDO EN TIKTOK AHORA MISMO", member: "Hyein" },
    ],
  },
  {
    id: 36,
    text: "¿CÓMO REACCIONAS ANTE UN RETO DIFÍCIL?",
    options: [
      { emoji: "📐", text: "LO ANALIZO CON CALMA Y BUSCO LA SOLUCIÓN ÓPTIMA", member: "Minji" },
      { emoji: "🚀", text: "ME EMOCIONO Y ME LANZO SIN PENSAR DEMASIADO", member: "Hanni" },
      { emoji: "🤗", text: "BUSCO APOYO EN LOS DEMÁS Y LO RESOLVEMOS JUNTOS", member: "Danielle" },
      { emoji: "🎲", text: "LO AFRONTO A MI MANERA, DIFERENTE A TODOS", member: "Haerin" },
      { emoji: "💪", text: "LO VEO COMO UNA OPORTUNIDAD DE DEMOSTRARME", member: "Hyein" },
    ],
  },
  {
    id: 37,
    text: "¿QUÉ ES LO QUE MÁS ODIA TU CÍRCULO CERCANO DE TI?",
    options: [
      { emoji: "😤", text: "QUE SIEMPRE QUIERO HACER LAS COSAS PERFECTAS", member: "Minji" },
      { emoji: "📣", text: "QUE HABLO DEMASIADO ALTO Y SIN FILTRO", member: "Hanni" },
      { emoji: "😭", text: "QUE ME EMOCIONO CON CUALQUIER COSA", member: "Danielle" },
      { emoji: "😒", text: "QUE A VECES ESTOY EN MI PROPIO MUNDO", member: "Haerin" },
      { emoji: "💸", text: "QUE GASTO DEMASIADO EN ROPA", member: "Hyein" },
    ],
  },
  {
    id: 38,
    text: "¿QUÉ HARÍA CON UN MILLÓN DE EUROS?",
    options: [
      { emoji: "🏦", text: "INVERTIRLO CON CUIDADO Y ASEGURAR MI FUTURO", member: "Minji" },
      { emoji: "🎢", text: "VIAJAR Y VIVIR EXPERIENCIAS ÚNICAS", member: "Hanni" },
      { emoji: "💝", text: "DONAR UNA PARTE Y AYUDAR A LOS QUE NECESITO", member: "Danielle" },
      { emoji: "🏡", text: "COMPRAR UNA CASA CON MUCHO ESPACIO PARA MÍ", member: "Haerin" },
      { emoji: "🛒", text: "HACER EL SHOPPING DE MI VIDA", member: "Hyein" },
    ],
  },
  {
    id: 39,
    text: "¿CUÁL ES TU POSTURA FAVORITA PARA RELAJARTE?",
    options: [
      { emoji: "🪑", text: "SENTADA ERGUIDA CON UN LIBRO EN MIS MANOS", member: "Minji" },
      { emoji: "🛋️", text: "TUMBADA EN EL SOFÁ RIENDO CON AMIGOS", member: "Hanni" },
      { emoji: "🛁", text: "BAÑO DE BURBUJAS CON VELAS Y MÚSICA", member: "Danielle" },
      { emoji: "🛌", text: "ENROSCADA EN LA CAMA BAJO LAS SÁBANAS", member: "Haerin" },
      { emoji: "💆", text: "MASAJE O RITUAL DE BELLEZA COMPLETO", member: "Hyein" },
    ],
  },
  {
    id: 40,
    text: "¿QUÉ HARÍAS SI FUERAS INVISIBLE POR UN DÍA?",
    options: [
      { emoji: "👀", text: "ESCUCHARÍA CONVERSACIONES IMPORTANTES", member: "Minji" },
      { emoji: "😈", text: "GASTARÍA BROMAS ÉPICAS A TODOS", member: "Hanni" },
      { emoji: "🤫", text: "HARÍA COSAS BUENAS SIN QUE NADIE SEPA", member: "Danielle" },
      { emoji: "🌍", text: "EXPLORARÍA LUGARES PROHIBIDOS", member: "Haerin" },
      { emoji: "👗", text: "MIRARÍA LOS ARCHIVOS DE LAS MARCAS DE MODA", member: "Hyein" },
    ],
  },
  {
    id: 41,
    text: "¿CUÁNDO ESTÁS DE MAL HUMOR, QUÉ HACES?",
    options: [
      { emoji: "🧹", text: "ME PONGO A LIMPIAR Y ORDENAR TODO", member: "Minji" },
      { emoji: "🗣️", text: "LO EXTERNALIZO Y CUENTO MIS PROBLEMAS", member: "Hanni" },
      { emoji: "🍰", text: "COMO ALGO RICO Y ME ABRAZO A ALGUIEN", member: "Danielle" },
      { emoji: "😶", text: "ME CIERRO Y NECESITO TIEMPO SOLA", member: "Haerin" },
      { emoji: "🛒", text: "ME DIGO QUE ME MEREZCO UN CAPRICHO", member: "Hyein" },
    ],
  },
  {
    id: 42,
    text: "¿QUÉ TIPO DE CONTENIDO CREAS O CONSUMIRÍAS EN REDES?",
    options: [
      { emoji: "📰", text: "ARTÍCULOS Y PODCASTS DE CALIDAD", member: "Minji" },
      { emoji: "🎭", text: "SKETCHES, CHALLENGES Y VIDEOS VIRALES", member: "Hanni" },
      { emoji: "🌸", text: "RECETAS, VLOGS DE VIDA CUTE Y CONSEJOS", member: "Danielle" },
      { emoji: "🎞️", text: "FOTOGRAFÍA ARTÍSTICA Y MÚSICA ALTERNATIVA", member: "Haerin" },
      { emoji: "💄", text: "MODA, BELLEZA Y LOOKS DEL DÍA", member: "Hyein" },
    ],
  },
  {
    id: 43,
    text: "¿QUÉ TIPO DE MASCOTA TE GUSTARÍA TENER?",
    options: [
      { emoji: "🐕", text: "UN PERRO GRANDE ENTRENADO Y TRANQUILO", member: "Minji" },
      { emoji: "🐹", text: "UN HÁMSTER O CONEJO SUPERTIERNO", member: "Hanni" },
      { emoji: "🐶", text: "UN CACHORRO PEQUEÑO Y CARIÑOSO", member: "Danielle" },
      { emoji: "🐈", text: "UN GATO QUE HAGA LO QUE LE DA LA GANA", member: "Haerin" },
      { emoji: "🦜", text: "UN PÁJARO EXÓTICO Y FOTOGÉNICO", member: "Hyein" },
    ],
  },
  {
    id: 44,
    text: "¿CUÁL SERÍA TU ACTITUD EN UN CONCURSO DE TALENTOS?",
    options: [
      { emoji: "🎼", text: "PRESENTARÍA UN NÚMERO PERFECTAMENTE ENSAYADO", member: "Minji" },
      { emoji: "🎤", text: "ME ROBARÍA EL SHOW CON PURA ENERGÍA", member: "Hanni" },
      { emoji: "💃", text: "BAILARÍA ALGO BONITO Y LLENO DE SENTIMIENTO", member: "Danielle" },
      { emoji: "🖼️", text: "MOSTRARÍA ALGO ARTÍSTICO Y DIFERENTE", member: "Haerin" },
      { emoji: "🏆", text: "GANARÍA, PORQUE SENCILLAMENTE SIEMPRE LO HAGO", member: "Hyein" },
    ],
  },
  {
    id: 45,
    text: "¿QUÉ ES ALGO QUE TE DA VERGÜENZA ADMITIR?",
    options: [
      { emoji: "😳", text: "QUE A VECES SOY DEMASIADO PERFECCIONISTA", member: "Minji" },
      { emoji: "🙈", text: "QUE ME RÍO DE MIS PROPIOS CHISTES", member: "Hanni" },
      { emoji: "🥹", text: "QUE LLORO CON LOS ANUNCIOS DE NAVIDAD", member: "Danielle" },
      { emoji: "😏", text: "QUE DISFRUTO MÁS SOLA QUE EN GRUPO", member: "Haerin" },
      { emoji: "💸", text: "QUE ME GASTO EL DINERO ANTES DE RECIBIRLO", member: "Hyein" },
    ],
  },
  {
    id: 46,
    text: "¿QUÉ CELEBRACIÓN TE GUSTA MÁS?",
    options: [
      { emoji: "🥂", text: "AÑO NUEVO — REFLEXIÓN Y BUENOS PROPÓSITOS", member: "Minji" },
      { emoji: "🎃", text: "HALLOWEEN — DISFRAZ ÉPICO Y FIESTA TOTAL", member: "Hanni" },
      { emoji: "🎄", text: "NAVIDAD — FAMILIA, REGALOS Y MAGIA", member: "Danielle" },
      { emoji: "🌙", text: "NADA ESPECIAL, PREFIERO UN DÍA TRANQUILO", member: "Haerin" },
      { emoji: "🎂", text: "MI CUMPLEAÑOS, EL DÍA MÁS IMPORTANTE", member: "Hyein" },
    ],
  },
  {
    id: 47,
    text: "¿A QUÉ HUELE TU PERFUME IDEAL?",
    options: [
      { emoji: "🌹", text: "ROSAS Y ALMIZCLE — CLÁSICO Y SOFISTICADO", member: "Minji" },
      { emoji: "🍬", text: "DULCE Y AFRUTADO, COMO UN CARAMELO", member: "Hanni" },
      { emoji: "🌸", text: "FLORES FRESCAS Y AGUA DE PRIMAVERA", member: "Danielle" },
      { emoji: "🌲", text: "MADERA, ÁMBAR Y NOTAS OSCURAS", member: "Haerin" },
      { emoji: "✨", text: "ALGO ÚNICO QUE NADIE HAYA OLIDO ANTES", member: "Hyein" },
    ],
  },
  {
    id: 48,
    text: "¿QUÉ DICES CUANDO ER MÁS JOVEN QUERÍAS SER?",
    options: [
      { emoji: "👩‍⚖️", text: "ABOGADA O POLÍTICA — QUERÍA CAMBIAR EL MUNDO", member: "Minji" },
      { emoji: "🎪", text: "ACTRIZ O CANTANTE — ESTRELLA TOTAL", member: "Hanni" },
      { emoji: "👩‍⚕️", text: "VETERINARIA O MAESTRA — CUIDAR DE OTROS", member: "Danielle" },
      { emoji: "🔬", text: "CIENTÍFICA O INVENTORA DE ALGO INCREÍBLE", member: "Haerin" },
      { emoji: "👒", text: "DISEÑADORA DE MODA O MODELO", member: "Hyein" },
    ],
  },
  {
    id: 49,
    text: "¿CUÁL ES TU HÁBITO MÁS RARO?",
    options: [
      { emoji: "🗂️", text: "REORGANIZAR MIS COSAS CUANDO ESTOY NERVIOSA", member: "Minji" },
      { emoji: "😂", text: "REÍRME SOLA DE COSAS QUE RECUERDO", member: "Hanni" },
      { emoji: "💌", text: "GUARDAR CADA RECUERDO EN UNA CAJITA", member: "Danielle" },
      { emoji: "🌙", text: "QUEDARME DESPIERTA MIRANDO EL TECHO", member: "Haerin" },
      { emoji: "🪞", text: "PRACTICAR POSES Y EXPRESIONES FRENTE AL ESPEJO", member: "Hyein" },
    ],
  },
  {
    id: 50,
    text: "¿QUÉ OBJETO REFLEJA MEJOR QUIÉN ERES?",
    options: [
      { emoji: "🗝️", text: "UNA LLAVE — ABRO PUERTAS IMPORTANTES", member: "Minji" },
      { emoji: "🎆", text: "FUEGOS ARTIFICIALES — EXPLOTO DE VIDA", member: "Hanni" },
      { emoji: "🌻", text: "UN GIRASOL — SIEMPRE BUSCO LA LUZ", member: "Danielle" },
      { emoji: "🔭", text: "UN TELESCOPIO — SIEMPRE OBSERVANDO LO QUE HAY DETRÁS", member: "Haerin" },
      { emoji: "💎", text: "UN DIAMANTE — BRILLANTE Y VALIOSO", member: "Hyein" },
    ],
  },
  {
    id: 51,
    text: "¿QUÉ TIPO DE VIAJERA ERES?",
    options: [
      { emoji: "📋", text: "PLANIFICO TODO AL MILÍMETRO CON SEMANAS DE ANTELACIÓN", member: "Minji" },
      { emoji: "🎉", text: "VAN DONDE HAYA FIESTA Y GENTE NUEVA", member: "Hanni" },
      { emoji: "🗺️", text: "ME PIERDO POR LOS PUEBLECITOS DESCUBRIENDO COMIDA LOCAL", member: "Danielle" },
      { emoji: "🚶", text: "VOY SIN PLAN Y VEO QUÉ PASA", member: "Haerin" },
      { emoji: "🛍️", text: "MI OBJETIVO SIEMPRE ES EL SHOPPING DEL DESTINO", member: "Hyein" },
    ],
  },
  {
    id: 52,
    text: "¿QUÉ TIPO DE ESTUDIANTE ERAS EN EL COLEGIO?",
    options: [
      { emoji: "📝", text: "LA DELEGADA RESPONSABLE CON NOTAS PERFECTAS", member: "Minji" },
      { emoji: "😂", text: "LA DEL FONDO QUE HACÍA REÍR A TODA LA CLASE", member: "Hanni" },
      { emoji: "🤝", text: "LA QUE AYUDABA A TODOS CON SUS DEBERES", member: "Danielle" },
      { emoji: "🎨", text: "LA ARTISTA QUE VIVÍA EN SU PROPIO MUNDO", member: "Haerin" },
      { emoji: "👗", text: "LA MÁS FASHIONISTA DEL CENTRO", member: "Hyein" },
    ],
  },
  {
    id: 53,
    text: "¿CUÁL SERÍA TU REACCIÓN SI TE SALIERAN A BAILAR EN UN RESTAURANTE?",
    options: [
      { emoji: "😊", text: "APLAUDIRÍA Y ME APUNTARÍA CON CLASE", member: "Minji" },
      { emoji: "💃", text: "SERÍA LA PRIMERA EN LEVANTARME A BAILAR", member: "Hanni" },
      { emoji: "🥰", text: "ME EMOCIONARÍA Y COMPARTIRÍA EL MOMENTO", member: "Danielle" },
      { emoji: "😬", text: "MORIRÍA DE VERGÜENZA AJENA", member: "Haerin" },
      { emoji: "📸", text: "LO GRABARÍA TODO PARA SUBIRLO A MIS REDES", member: "Hyein" },
    ],
  },
  {
    id: 54,
    text: "¿CUÁL ES TU MAYOR INSEGURIDAD?",
    options: [
      { emoji: "⚖️", text: "NO SER SUFICIENTEMENTE BUENA EN LO QUE HAGO", member: "Minji" },
      { emoji: "🤡", text: "QUE ME TOMEN MUY EN SERIO PERO NO ME RESPETEN", member: "Hanni" },
      { emoji: "💔", text: "DECEPCIONAR A LAS PERSONAS QUE QUIERO", member: "Danielle" },
      { emoji: "👁️", text: "QUE ME MALINTERPRETEN POR SER TAN RESERVADA", member: "Haerin" },
      { emoji: "🌟", text: "NO CUMPLIR LAS EXPECTATIVAS QUE ME PONGO", member: "Hyein" },
    ],
  },
  {
    id: 55,
    text: "¿CÓMO TE GUSTARÍA QUE TE RECORDARAN?",
    options: [
      { emoji: "🏛️", text: "COMO ALGUIEN QUE MARCÓ UNA DIFERENCIA REAL", member: "Minji" },
      { emoji: "🎊", text: "COMO LA PERSONA MÁS DIVERTIDA QUE CONOCISTE", member: "Hanni" },
      { emoji: "💛", text: "COMO ALGUIEN QUE SIEMPRE DIO AMOR", member: "Danielle" },
      { emoji: "🌌", text: "COMO UNA MENTE ÚNICA E IRREPETIBLE", member: "Haerin" },
      { emoji: "⭐", text: "COMO ALGUIEN QUE BRILLÓ Y TRIUNFÓ", member: "Hyein" },
    ],
  },
];

/** Número de preguntas que se usan por partida */
export const QUIZ_SIZE = 20;

/**
 * Devuelve `count` preguntas aleatorias del banco, cada una con sus
 * opciones en orden también aleatorio.
 */
export function getRandomQuestions(count: number = QUIZ_SIZE): QuizQuestion[] {
  // 1. Mezclar el banco completo (Fisher-Yates)
  const pool = [...ALL_QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // 2. Tomar las primeras `count`
  const selected = pool.slice(0, count);

  // 3. Mezclar las opciones de cada pregunta
  return selected.map((q) => {
    const opts = [...q.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return { ...q, options: opts };
  });
}
