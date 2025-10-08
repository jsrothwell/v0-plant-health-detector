export type Language = "en" | "es" | "fr" | "de" | "it" | "pt"

export interface Translation {
  // Navigation
  nav: {
    features: string
    howItWorks: string
    contact: string
  }
  // Hero Section
  hero: {
    badge: string
    title: string
    subtitle: string
    analyzeButton: string
    learnButton: string
  }
  // Upload Section
  upload: {
    title: string
    subtitle: string
    dragDrop: string
    orClick: string
    analyzing: string
    analyzeButton: string
    supportedFormats: string
  }
  // Process Section
  process: {
    title: string
    subtitle: string
    step1Title: string
    step1Description: string
    step2Title: string
    step2Description: string
    step3Title: string
    step3Description: string
  }
  // Features Section
  features: {
    title: string
    subtitle: string
    feature1Title: string
    feature1Description: string
    feature2Title: string
    feature2Description: string
    feature3Title: string
    feature3Description: string
  }
  // Contact Section
  contact: {
    title: string
    subtitle: string
    emailUs: string
    emailDescription: string
    supportHours: string
    supportDescription: string
    location: string
    locationDescription: string
    sendMessage: string
    formDescription: string
    name: string
    email: string
    subject: string
    message: string
    messagePlaceholder: string
    sendButton: string
    sending: string
  }
  // Analysis Results
  analysis: {
    results: string
    confidence: string
    disease: string
    treatment: string
    prevention: string
    careRecommendations: string
    nextCheckup: string
    feedback: string
    helpful: string
    notHelpful: string
    reportIncorrect: string
    lowConfidence: string
    lowConfidenceWarning: string
  }
  // Footer
  footer: {
    product: string
    resources: string
    company: string
    about: string
    privacy: string
    terms: string
    dataRights: string
    allRightsReserved: string
  }
  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    save: string
    close: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it Works",
      contact: "Contact",
    },
    hero: {
      badge: "AI-Powered Plant Health Detection",
      title: "Keep Your Plants Healthy with AI",
      subtitle:
        "Upload a photo of your plant and get instant AI-powered health analysis, disease detection, and personalized care recommendations.",
      analyzeButton: "Analyze Your Plant",
      learnButton: "See How it Works",
    },
    upload: {
      title: "Upload Plant Image",
      subtitle: "Take a clear photo of your plant showing any problem areas",
      dragDrop: "Drag and drop your plant image here",
      orClick: "or click to browse files",
      analyzing: "Analyzing your plant...",
      analyzeButton: "Analyze Plant Health",
      supportedFormats: "Supported formats: JPG, PNG, WebP (max 10MB)",
    },
    process: {
      title: "How It Works",
      subtitle: "Get professional plant health analysis in three simple steps",
      step1Title: "Upload Photo",
      step1Description: "Take a clear photo of your plant, focusing on any problem areas or symptoms you've noticed.",
      step2Title: "AI Analysis",
      step2Description: "Our advanced AI analyzes your plant image to identify diseases, pests, and health issues.",
      step3Title: "Get Recommendations",
      step3Description:
        "Receive detailed treatment plans, care instructions, and prevention tips tailored to your plant.",
    },
    features: {
      title: "Advanced Plant Care Features",
      subtitle: "Everything you need to keep your plants thriving",
      feature1Title: "Disease Detection",
      feature1Description:
        "Identify plant diseases, fungal infections, and pest problems with high accuracy using advanced computer vision.",
      feature2Title: "Treatment Plans",
      feature2Description:
        "Get step-by-step treatment recommendations with specific products, timing, and application methods.",
      feature3Title: "Care Guidance",
      feature3Description:
        "Receive personalized care instructions including watering, lighting, and nutrition recommendations.",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have questions about plant health or need support? We're here to help you keep your plants thriving.",
      emailUs: "Email Us",
      emailDescription: "Send us a message and we'll respond within 24 hours",
      supportHours: "Support Hours",
      supportDescription: "Our plant experts are available to help",
      location: "Location",
      locationDescription: "Serving plant enthusiasts worldwide with AI-powered plant health solutions",
      sendMessage: "Send us a Message",
      formDescription: "Fill out the form below and we'll get back to you soon",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      messagePlaceholder: "Tell us more about your plant health questions or concerns...",
      sendButton: "Send Message",
      sending: "Sending...",
    },
    analysis: {
      results: "Analysis Results",
      confidence: "Confidence",
      disease: "Detected Issue",
      treatment: "Treatment",
      prevention: "Prevention",
      careRecommendations: "Care Recommendations",
      nextCheckup: "Next Checkup",
      feedback: "Was this analysis helpful?",
      helpful: "Yes, helpful",
      notHelpful: "Not helpful",
      reportIncorrect: "Report Incorrect Diagnosis",
      lowConfidence: "Low Confidence Result",
      lowConfidenceWarning:
        "This analysis has low confidence. Please consult with a plant expert for accurate diagnosis.",
    },
    footer: {
      product: "Product",
      resources: "Resources",
      company: "Company",
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
      dataRights: "Data Rights",
      allRightsReserved: "All rights reserved",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
    },
  },
  es: {
    nav: {
      features: "Características",
      howItWorks: "Cómo Funciona",
      contact: "Contacto",
    },
    hero: {
      badge: "Detección de Salud de Plantas con IA",
      title: "Mantén Tus Plantas Saludables con IA",
      subtitle:
        "Sube una foto de tu planta y obtén análisis instantáneo de salud con IA, detección de enfermedades y recomendaciones personalizadas de cuidado.",
      analyzeButton: "Analizar Tu Planta",
      learnButton: "Ver Cómo Funciona",
    },
    upload: {
      title: "Subir Imagen de Planta",
      subtitle: "Toma una foto clara de tu planta mostrando cualquier área problemática",
      dragDrop: "Arrastra y suelta tu imagen de planta aquí",
      orClick: "o haz clic para buscar archivos",
      analyzing: "Analizando tu planta...",
      analyzeButton: "Analizar Salud de la Planta",
      supportedFormats: "Formatos soportados: JPG, PNG, WebP (máx 10MB)",
    },
    process: {
      title: "Cómo Funciona",
      subtitle: "Obtén análisis profesional de salud de plantas en tres simples pasos",
      step1Title: "Subir Foto",
      step1Description:
        "Toma una foto clara de tu planta, enfocándote en cualquier área problemática o síntomas que hayas notado.",
      step2Title: "Análisis IA",
      step2Description:
        "Nuestra IA avanzada analiza tu imagen de planta para identificar enfermedades, plagas y problemas de salud.",
      step3Title: "Obtener Recomendaciones",
      step3Description:
        "Recibe planes de tratamiento detallados, instrucciones de cuidado y consejos de prevención adaptados a tu planta.",
    },
    features: {
      title: "Características Avanzadas de Cuidado de Plantas",
      subtitle: "Todo lo que necesitas para mantener tus plantas prósperas",
      feature1Title: "Detección de Enfermedades",
      feature1Description:
        "Identifica enfermedades de plantas, infecciones fúngicas y problemas de plagas con alta precisión usando visión computacional avanzada.",
      feature2Title: "Planes de Tratamiento",
      feature2Description:
        "Obtén recomendaciones de tratamiento paso a paso con productos específicos, tiempos y métodos de aplicación.",
      feature3Title: "Guía de Cuidado",
      feature3Description:
        "Recibe instrucciones de cuidado personalizadas incluyendo recomendaciones de riego, iluminación y nutrición.",
    },
    contact: {
      title: "Ponte en Contacto",
      subtitle:
        "¿Tienes preguntas sobre salud de plantas o necesitas soporte? Estamos aquí para ayudarte a mantener tus plantas prósperas.",
      emailUs: "Envíanos un Email",
      emailDescription: "Envíanos un mensaje y responderemos en 24 horas",
      supportHours: "Horarios de Soporte",
      supportDescription: "Nuestros expertos en plantas están disponibles para ayudar",
      location: "Ubicación",
      locationDescription:
        "Sirviendo a entusiastas de plantas en todo el mundo con soluciones de salud de plantas con IA",
      sendMessage: "Envíanos un Mensaje",
      formDescription: "Completa el formulario a continuación y te responderemos pronto",
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos más sobre tus preguntas o preocupaciones sobre salud de plantas...",
      sendButton: "Enviar Mensaje",
      sending: "Enviando...",
    },
    analysis: {
      results: "Resultados del Análisis",
      confidence: "Confianza",
      disease: "Problema Detectado",
      treatment: "Tratamiento",
      prevention: "Prevención",
      careRecommendations: "Recomendaciones de Cuidado",
      nextCheckup: "Próxima Revisión",
      feedback: "¿Fue útil este análisis?",
      helpful: "Sí, útil",
      notHelpful: "No útil",
      reportIncorrect: "Reportar Diagnóstico Incorrecto",
      lowConfidence: "Resultado de Baja Confianza",
      lowConfidenceWarning:
        "Este análisis tiene baja confianza. Por favor consulta con un experto en plantas para un diagnóstico preciso.",
    },
    footer: {
      product: "Producto",
      resources: "Recursos",
      company: "Empresa",
      about: "Acerca de",
      privacy: "Privacidad",
      terms: "Términos",
      dataRights: "Derechos de Datos",
      allRightsReserved: "Todos los derechos reservados",
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      cancel: "Cancelar",
      save: "Guardar",
      close: "Cerrar",
    },
  },
  fr: {
    nav: {
      features: "Fonctionnalités",
      howItWorks: "Comment ça marche",
      contact: "Contact",
    },
    hero: {
      badge: "Détection de Santé des Plantes par IA",
      title: "Gardez Vos Plantes en Bonne Santé avec l'IA",
      subtitle:
        "Téléchargez une photo de votre plante et obtenez une analyse instantanée de santé par IA, détection de maladies et recommandations de soins personnalisées.",
      analyzeButton: "Analyser Votre Plante",
      learnButton: "Voir Comment ça Marche",
    },
    upload: {
      title: "Télécharger Image de Plante",
      subtitle: "Prenez une photo claire de votre plante montrant les zones problématiques",
      dragDrop: "Glissez et déposez votre image de plante ici",
      orClick: "ou cliquez pour parcourir les fichiers",
      analyzing: "Analyse de votre plante...",
      analyzeButton: "Analyser la Santé de la Plante",
      supportedFormats: "Formats supportés: JPG, PNG, WebP (max 10MB)",
    },
    process: {
      title: "Comment ça Marche",
      subtitle: "Obtenez une analyse professionnelle de santé des plantes en trois étapes simples",
      step1Title: "Télécharger Photo",
      step1Description:
        "Prenez une photo claire de votre plante, en vous concentrant sur les zones problématiques ou symptômes que vous avez remarqués.",
      step2Title: "Analyse IA",
      step2Description:
        "Notre IA avancée analyse votre image de plante pour identifier les maladies, parasites et problèmes de santé.",
      step3Title: "Obtenir Recommandations",
      step3Description:
        "Recevez des plans de traitement détaillés, instructions de soins et conseils de prévention adaptés à votre plante.",
    },
    features: {
      title: "Fonctionnalités Avancées de Soins des Plantes",
      subtitle: "Tout ce dont vous avez besoin pour garder vos plantes prospères",
      feature1Title: "Détection de Maladies",
      feature1Description:
        "Identifiez les maladies des plantes, infections fongiques et problèmes de parasites avec une haute précision utilisant la vision par ordinateur avancée.",
      feature2Title: "Plans de Traitement",
      feature2Description:
        "Obtenez des recommandations de traitement étape par étape avec des produits spécifiques, timing et méthodes d'application.",
      feature3Title: "Guide de Soins",
      feature3Description:
        "Recevez des instructions de soins personnalisées incluant des recommandations d'arrosage, éclairage et nutrition.",
    },
    contact: {
      title: "Contactez-nous",
      subtitle:
        "Avez-vous des questions sur la santé des plantes ou besoin de support? Nous sommes là pour vous aider à garder vos plantes prospères.",
      emailUs: "Envoyez-nous un Email",
      emailDescription: "Envoyez-nous un message et nous répondrons dans les 24 heures",
      supportHours: "Heures de Support",
      supportDescription: "Nos experts en plantes sont disponibles pour aider",
      location: "Localisation",
      locationDescription:
        "Servant les passionnés de plantes dans le monde entier avec des solutions de santé des plantes par IA",
      sendMessage: "Envoyez-nous un Message",
      formDescription: "Remplissez le formulaire ci-dessous et nous vous répondrons bientôt",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      messagePlaceholder: "Parlez-nous de vos questions ou préoccupations concernant la santé des plantes...",
      sendButton: "Envoyer Message",
      sending: "Envoi...",
    },
    analysis: {
      results: "Résultats d'Analyse",
      confidence: "Confiance",
      disease: "Problème Détecté",
      treatment: "Traitement",
      prevention: "Prévention",
      careRecommendations: "Recommandations de Soins",
      nextCheckup: "Prochaine Vérification",
      feedback: "Cette analyse était-elle utile?",
      helpful: "Oui, utile",
      notHelpful: "Pas utile",
      reportIncorrect: "Signaler Diagnostic Incorrect",
      lowConfidence: "Résultat de Faible Confiance",
      lowConfidenceWarning:
        "Cette analyse a une faible confiance. Veuillez consulter un expert en plantes pour un diagnostic précis.",
    },
    footer: {
      product: "Produit",
      resources: "Ressources",
      company: "Entreprise",
      about: "À propos",
      privacy: "Confidentialité",
      terms: "Conditions",
      dataRights: "Droits des Données",
      allRightsReserved: "Tous droits réservés",
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      cancel: "Annuler",
      save: "Sauvegarder",
      close: "Fermer",
    },
  },
  de: {
    nav: {
      features: "Funktionen",
      howItWorks: "Wie es funktioniert",
      contact: "Kontakt",
    },
    hero: {
      badge: "KI-gestützte Pflanzengesundheitserkennung",
      title: "Halten Sie Ihre Pflanzen mit KI gesund",
      subtitle:
        "Laden Sie ein Foto Ihrer Pflanze hoch und erhalten Sie sofortige KI-gestützte Gesundheitsanalyse, Krankheitserkennung und personalisierte Pflegeempfehlungen.",
      analyzeButton: "Ihre Pflanze analysieren",
      learnButton: "Sehen Sie, wie es funktioniert",
    },
    upload: {
      title: "Pflanzenbild hochladen",
      subtitle: "Machen Sie ein klares Foto Ihrer Pflanze und zeigen Sie problematische Bereiche",
      dragDrop: "Ziehen Sie Ihr Pflanzenbild hierher",
      orClick: "oder klicken Sie, um Dateien zu durchsuchen",
      analyzing: "Ihre Pflanze wird analysiert...",
      analyzeButton: "Pflanzengesundheit analysieren",
      supportedFormats: "Unterstützte Formate: JPG, PNG, WebP (max 10MB)",
    },
    process: {
      title: "Wie es funktioniert",
      subtitle: "Erhalten Sie professionelle Pflanzengesundheitsanalyse in drei einfachen Schritten",
      step1Title: "Foto hochladen",
      step1Description:
        "Machen Sie ein klares Foto Ihrer Pflanze und konzentrieren Sie sich auf problematische Bereiche oder Symptome, die Sie bemerkt haben.",
      step2Title: "KI-Analyse",
      step2Description:
        "Unsere fortschrittliche KI analysiert Ihr Pflanzenbild, um Krankheiten, Schädlinge und Gesundheitsprobleme zu identifizieren.",
      step3Title: "Empfehlungen erhalten",
      step3Description:
        "Erhalten Sie detaillierte Behandlungspläne, Pflegeanweisungen und Präventionstipps, die auf Ihre Pflanze zugeschnitten sind.",
    },
    features: {
      title: "Erweiterte Pflanzenpflege-Funktionen",
      subtitle: "Alles, was Sie brauchen, um Ihre Pflanzen gedeihen zu lassen",
      feature1Title: "Krankheitserkennung",
      feature1Description:
        "Identifizieren Sie Pflanzenkrankheiten, Pilzinfektionen und Schädlingsprobleme mit hoher Genauigkeit durch fortschrittliche Computer Vision.",
      feature2Title: "Behandlungspläne",
      feature2Description:
        "Erhalten Sie schrittweise Behandlungsempfehlungen mit spezifischen Produkten, Timing und Anwendungsmethoden.",
      feature3Title: "Pflegeanleitung",
      feature3Description:
        "Erhalten Sie personalisierte Pflegeanweisungen einschließlich Bewässerungs-, Beleuchtungs- und Ernährungsempfehlungen.",
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle:
        "Haben Sie Fragen zur Pflanzengesundheit oder benötigen Unterstützung? Wir helfen Ihnen dabei, Ihre Pflanzen gedeihen zu lassen.",
      emailUs: "E-Mail senden",
      emailDescription: "Senden Sie uns eine Nachricht und wir antworten innerhalb von 24 Stunden",
      supportHours: "Support-Zeiten",
      supportDescription: "Unsere Pflanzenexperten stehen zur Verfügung, um zu helfen",
      location: "Standort",
      locationDescription: "Wir bedienen Pflanzenliebhaber weltweit mit KI-gestützten Pflanzengesundheitslösungen",
      sendMessage: "Senden Sie uns eine Nachricht",
      formDescription: "Füllen Sie das untenstehende Formular aus und wir melden uns bald bei Ihnen",
      name: "Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      messagePlaceholder: "Erzählen Sie uns mehr über Ihre Fragen oder Bedenken zur Pflanzengesundheit...",
      sendButton: "Nachricht senden",
      sending: "Wird gesendet...",
    },
    analysis: {
      results: "Analyseergebnisse",
      confidence: "Vertrauen",
      disease: "Erkanntes Problem",
      treatment: "Behandlung",
      prevention: "Prävention",
      careRecommendations: "Pflegeempfehlungen",
      nextCheckup: "Nächste Überprüfung",
      feedback: "War diese Analyse hilfreich?",
      helpful: "Ja, hilfreich",
      notHelpful: "Nicht hilfreich",
      reportIncorrect: "Falsche Diagnose melden",
      lowConfidence: "Ergebnis mit geringem Vertrauen",
      lowConfidenceWarning:
        "Diese Analyse hat geringes Vertrauen. Bitte konsultieren Sie einen Pflanzenexperten für eine genaue Diagnose.",
    },
    footer: {
      product: "Produkt",
      resources: "Ressourcen",
      company: "Unternehmen",
      about: "Über uns",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      dataRights: "Datenrechte",
      allRightsReserved: "Alle Rechte vorbehalten",
    },
    common: {
      loading: "Wird geladen...",
      error: "Fehler",
      success: "Erfolg",
      cancel: "Abbrechen",
      save: "Speichern",
      close: "Schließen",
    },
  },
  it: {
    nav: {
      features: "Caratteristiche",
      howItWorks: "Come Funziona",
      contact: "Contatto",
    },
    hero: {
      badge: "Rilevamento Salute Piante con IA",
      title: "Mantieni le Tue Piante Sane con l'IA",
      subtitle:
        "Carica una foto della tua pianta e ottieni analisi istantanea della salute con IA, rilevamento malattie e raccomandazioni personalizzate per la cura.",
      analyzeButton: "Analizza la Tua Pianta",
      learnButton: "Vedi Come Funziona",
    },
    upload: {
      title: "Carica Immagine Pianta",
      subtitle: "Scatta una foto chiara della tua pianta mostrando eventuali aree problematiche",
      dragDrop: "Trascina e rilascia la tua immagine della pianta qui",
      orClick: "o clicca per sfogliare i file",
      analyzing: "Analizzando la tua pianta...",
      analyzeButton: "Analizza Salute della Pianta",
      supportedFormats: "Formati supportati: JPG, PNG, WebP (max 10MB)",
    },
    process: {
      title: "Come Funziona",
      subtitle: "Ottieni analisi professionale della salute delle piante in tre semplici passaggi",
      step1Title: "Carica Foto",
      step1Description:
        "Scatta una foto chiara della tua pianta, concentrandoti su eventuali aree problematiche o sintomi che hai notato.",
      step2Title: "Analisi IA",
      step2Description:
        "La nostra IA avanzata analizza la tua immagine della pianta per identificare malattie, parassiti e problemi di salute.",
      step3Title: "Ottieni Raccomandazioni",
      step3Description:
        "Ricevi piani di trattamento dettagliati, istruzioni per la cura e consigli di prevenzione su misura per la tua pianta.",
    },
    features: {
      title: "Caratteristiche Avanzate per la Cura delle Piante",
      subtitle: "Tutto ciò di cui hai bisogno per far prosperare le tue piante",
      feature1Title: "Rilevamento Malattie",
      feature1Description:
        "Identifica malattie delle piante, infezioni fungine e problemi di parassiti con alta precisione usando visione computerizzata avanzata.",
      feature2Title: "Piani di Trattamento",
      feature2Description:
        "Ottieni raccomandazioni di trattamento passo dopo passo con prodotti specifici, tempistiche e metodi di applicazione.",
      feature3Title: "Guida alla Cura",
      feature3Description:
        "Ricevi istruzioni personalizzate per la cura incluse raccomandazioni per irrigazione, illuminazione e nutrizione.",
    },
    contact: {
      title: "Mettiti in Contatto",
      subtitle:
        "Hai domande sulla salute delle piante o hai bisogno di supporto? Siamo qui per aiutarti a far prosperare le tue piante.",
      emailUs: "Inviaci un'Email",
      emailDescription: "Inviaci un messaggio e risponderemo entro 24 ore",
      supportHours: "Orari di Supporto",
      supportDescription: "I nostri esperti di piante sono disponibili per aiutare",
      location: "Posizione",
      locationDescription:
        "Serviamo appassionati di piante in tutto il mondo con soluzioni di salute delle piante basate su IA",
      sendMessage: "Inviaci un Messaggio",
      formDescription: "Compila il modulo qui sotto e ti risponderemo presto",
      name: "Nome",
      email: "Email",
      subject: "Oggetto",
      message: "Messaggio",
      messagePlaceholder: "Raccontaci di più sulle tue domande o preoccupazioni sulla salute delle piante...",
      sendButton: "Invia Messaggio",
      sending: "Invio...",
    },
    analysis: {
      results: "Risultati dell'Analisi",
      confidence: "Fiducia",
      disease: "Problema Rilevato",
      treatment: "Trattamento",
      prevention: "Prevenzione",
      careRecommendations: "Raccomandazioni per la Cura",
      nextCheckup: "Prossimo Controllo",
      feedback: "Questa analisi è stata utile?",
      helpful: "Sì, utile",
      notHelpful: "Non utile",
      reportIncorrect: "Segnala Diagnosi Incorretta",
      lowConfidence: "Risultato a Bassa Fiducia",
      lowConfidenceWarning:
        "Questa analisi ha bassa fiducia. Si prega di consultare un esperto di piante per una diagnosi accurata.",
    },
    footer: {
      product: "Prodotto",
      resources: "Risorse",
      company: "Azienda",
      about: "Chi Siamo",
      privacy: "Privacy",
      terms: "Termini",
      dataRights: "Diritti sui Dati",
      allRightsReserved: "Tutti i diritti riservati",
    },
    common: {
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo",
      cancel: "Annulla",
      save: "Salva",
      close: "Chiudi",
    },
  },
  pt: {
    nav: {
      features: "Recursos",
      howItWorks: "Como Funciona",
      contact: "Contato",
    },
    hero: {
      badge: "Detecção de Saúde de Plantas com IA",
      title: "Mantenha Suas Plantas Saudáveis com IA",
      subtitle:
        "Carregue uma foto da sua planta e obtenha análise instantânea de saúde com IA, detecção de doenças e recomendações personalizadas de cuidado.",
      analyzeButton: "Analisar Sua Planta",
      learnButton: "Veja Como Funciona",
    },
    upload: {
      title: "Carregar Imagem da Planta",
      subtitle: "Tire uma foto clara da sua planta mostrando quaisquer áreas problemáticas",
      dragDrop: "Arraste e solte sua imagem da planta aqui",
      orClick: "ou clique para procurar arquivos",
      analyzing: "Analisando sua planta...",
      analyzeButton: "Analisar Saúde da Planta",
      supportedFormats: "Formatos suportados: JPG, PNG, WebP (máx 10MB)",
    },
    process: {
      title: "Como Funciona",
      subtitle: "Obtenha análise profissional de saúde de plantas em três passos simples",
      step1Title: "Carregar Foto",
      step1Description:
        "Tire uma foto clara da sua planta, focando em quaisquer áreas problemáticas ou sintomas que você notou.",
      step2Title: "Análise IA",
      step2Description:
        "Nossa IA avançada analisa sua imagem da planta para identificar doenças, pragas e problemas de saúde.",
      step3Title: "Obter Recomendações",
      step3Description:
        "Receba planos de tratamento detalhados, instruções de cuidado e dicas de prevenção adaptadas à sua planta.",
    },
    features: {
      title: "Recursos Avançados de Cuidado de Plantas",
      subtitle: "Tudo que você precisa para manter suas plantas prósperas",
      feature1Title: "Detecção de Doenças",
      feature1Description:
        "Identifique doenças de plantas, infecções fúngicas e problemas de pragas com alta precisão usando visão computacional avançada.",
      feature2Title: "Planos de Tratamento",
      feature2Description:
        "Obtenha recomendações de tratamento passo a passo com produtos específicos, cronograma e métodos de aplicação.",
      feature3Title: "Guia de Cuidados",
      feature3Description:
        "Receba instruções de cuidado personalizadas incluindo recomendações de rega, iluminação e nutrição.",
    },
    contact: {
      title: "Entre em Contato",
      subtitle:
        "Tem dúvidas sobre saúde de plantas ou precisa de suporte? Estamos aqui para ajudar você a manter suas plantas prósperas.",
      emailUs: "Envie-nos um Email",
      emailDescription: "Envie-nos uma mensagem e responderemos em 24 horas",
      supportHours: "Horários de Suporte",
      supportDescription: "Nossos especialistas em plantas estão disponíveis para ajudar",
      location: "Localização",
      locationDescription: "Servindo entusiastas de plantas em todo o mundo com soluções de saúde de plantas com IA",
      sendMessage: "Envie-nos uma Mensagem",
      formDescription: "Preencha o formulário abaixo e entraremos em contato em breve",
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      messagePlaceholder: "Conte-nos mais sobre suas dúvidas ou preocupações sobre saúde de plantas...",
      sendButton: "Enviar Mensagem",
      sending: "Enviando...",
    },
    analysis: {
      results: "Resultados da Análise",
      confidence: "Confiança",
      disease: "Problema Detectado",
      treatment: "Tratamento",
      prevention: "Prevenção",
      careRecommendations: "Recomendações de Cuidado",
      nextCheckup: "Próxima Verificação",
      feedback: "Esta análise foi útil?",
      helpful: "Sim, útil",
      notHelpful: "Não útil",
      reportIncorrect: "Reportar Diagnóstico Incorreto",
      lowConfidence: "Resultado de Baixa Confiança",
      lowConfidenceWarning:
        "Esta análise tem baixa confiança. Por favor consulte um especialista em plantas para diagnóstico preciso.",
    },
    footer: {
      product: "Produto",
      resources: "Recursos",
      company: "Empresa",
      about: "Sobre",
      privacy: "Privacidade",
      terms: "Termos",
      dataRights: "Direitos de Dados",
      allRightsReserved: "Todos os direitos reservados",
    },
    common: {
      loading: "Carregando...",
      error: "Erro",
      success: "Sucesso",
      cancel: "Cancelar",
      save: "Salvar",
      close: "Fechar",
    },
  },
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
]

export function getTranslation(language: Language): Translation {
  return translations[language] || translations.en
}
