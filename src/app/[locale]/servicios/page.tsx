import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

const content = {
  en: {
    title: "Programs & Services",
    subtitle: "Comprehensive mental health support through education, prevention, and intervention",
    heroDescription: "Discover our range of programs designed to promote mental health awareness, provide professional support, and build resilient communities.",
    registrationCta: "Register at edu.transformarte.com.mx",
    webinarsTitle: "Monthly Webinars",
    webinarsSubtitle: "12 Monthly Sessions on Mental Health Topics",
    webinarsDescription: "Raise awareness among the general population on various emotional health topics and provide action strategies for their well-being.",
    webinarsFormat: "Format: Live Online | Capacity: 500 people",
    webinarTopics: ["Positive Mental Health", "Am I in a toxic relationship?", "Learning to set boundaries", "Healing after a loss", "Control your anger before it controls you", "Coping with retirement syndrome", "Emotional Salary", "Fostering adolescent well-being", "Leave procrastination behind", "Find your Balance: personal and professional", "Do I eat my emotions?", "We can all save a life: suicide prevention"],
    firstAidTitle: "Psychological First Aid Workshop",
    firstAidSubtitle: "Crisis Intervention Training",
    firstAidObjective: "Learn the basics and intervention strategies of Psychological First Aid for major emotional crises: Panic Attacks, Self-harm/Suicide Attempts, Aggressive People.",
    firstAidTopics: ["Basic Principles of Emotional First Aid and crisis care", "Physiological, cognitive, behavioral, and emotional reactions to crises", "Identification and evaluation of people requiring psychological care", "Protocols and Strategies for Psychological Intervention in crisis", "Common crisis types: Anxiety, Aggression, Suicidal ideation, Abuse"],
    firstAidFormat: "Format: In-person or Online | Capacity: 20 people per group | Includes participant materials",
    screeningTitle: "Online Psychological Screening",
    screeningSubtitle: "Mental Health Assessment",
    screeningObjective: "Measure anxiety, depression, and stress levels and provide self-care recommendations.",
    screeningTests: ["Beck Depression Inventory II", "Beck Anxiety Inventory", "Levenstein Perceived Stress Test"],
    screeningDetails: "Application time: 25 minutes | Automatic results via email with self-care recommendations",
    programTitle: "TransformArte Program",
    programSubtitle: "7-Session Youth Development Program (Ages 15-19)",
    programObjective: "Develop emotional regulation skills in adolescents, as well as strategies to Transform their thoughts and social relationships for their well-being.",
    programMethodology: "Based on Cognitive Behavioral Therapy, Dialectical Behavioral Therapy, and Positive Psychology.",
    programSessions: [
      { session: "Session 1", title: "Initial Assessment", description: "Identify what emotions are and what they're for in our lives" },
      { session: "Session 2", title: "Basic Emotions", description: "Know the functions and manifestations of basic emotions" },
      { session: "Session 3", title: "Emotional Expression", description: "Learn healthy expression of emotions and their regulation" },
      { session: "Session 4", title: "Thought Traps", description: "Learn about thought traps and their relationship with emotions" },
      { session: "Session 5", title: "Transformation Tools", description: "Practice tools for Thought Transformation" },
      { session: "Session 6", title: "Relationships", description: "Transform interpersonal relationships through social skills" },
      { session: "Session 7", title: "Emotional Toolkit", description: "Prepare the closing emotional toolbox - Final assessment" }
    ],
    programFormat: "Format: In-person | Duration: 2 hours per session | Capacity: 20 participants per group",
    programBenefitsTitle: "5 Benefits of the Program",
    programBenefits: ["Reduction of anxiety and depression problems", "Reduction of disruptive behaviors", "Increase in social skills and improvement of interpersonal relationships", "Increase in problem-solving skills and decision-making", "Increase in resilience"],
    helplineTitle: "Psychological Helpline",
    helplineSubtitle: "12-Month Professional Support Service",
    helplineFeatures: ["100% anonymous and confidential", "2 contact channels (exclusive phone line and email)", "Crisis intervention via phone", "Psychotherapeutic intervention via video calls (as needed)", "100% personalized sessions", "Same therapist from start to finish", "Support material for coping skills", "Implemented by CPCCM Psychotherapists trained in Telehealth by the Beck Institute"],
    mentorshipTitle: "Rotarian-Rotaract Mentorship Program",
    mentorshipSubtitle: "The 4 Keys to Self-Realization",
    mentorshipObjective: "Through mentorship, participants will acquire 4 keys: Emotions, Positive Relationships, Personal Strengths, and Resilience.",
    mentorshipKeys: [
      { key: "Emotions", description: "Open the door to emotions, regulate them, and experience them positively" },
      { key: "Relationships", description: "Build relationships in different areas of interpersonal development" },
      { key: "Personal Strengths", description: "Identify character strengths and use them creatively for personal well-being" },
      { key: "Resilience", description: "Obtain emotional tools to cope with daily stress and face adversity" }
    ],
    mentorshipFormat: "Format: In-person Rotarian-Rotaract | Duration: 1.5 hours per session",
    teamTitle: "Our Team",
    teamDescription: "Programs implemented by certified professionals from the Centro de Psicología Cognitivo Conductual de Monterrey (CPCCM)",
    teamMembers: [{ name: "MPC. Gerardo Valdivia Graniel", role: "Founding Director of CPCCM" }, { name: "MPC. Minerva Cázares Escalera", role: "Founding Director of CPCCM" }],
    ctaTitle: "Ready to Participate?",
    ctaDescription: "Register for our programs and start your transformation journey today.",
    ctaButton: "Register Now"
  },
  es: {
    title: "Programas y Servicios",
    subtitle: "Apoyo integral de salud mental a través de educación, prevención e intervención",
    heroDescription: "Descubre nuestra gama de programas diseñados para promover la conciencia sobre salud mental, brindar apoyo profesional y construir comunidades resilientes.",
    registrationCta: "Inscríbete en edu.transformarte.com.mx",
    webinarsTitle: "Webinars Mensuales",
    webinarsSubtitle: "12 Sesiones Mensuales sobre Temas de Salud Mental",
    webinarsDescription: "Concientizar a la población general en diversos temas de salud emocional y dotar de estrategias de acción para su bienestar.",
    webinarsFormat: "Formato: En línea en vivo | Capacidad: 500 personas",
    webinarTopics: ["Salud Mental Positiva", "¿Estoy en una relación tóxica?", "Aprendiendo a poner límites", "Sanar después de una pérdida", "Controle su ira antes de que la ira lo controle a usted", "Afrontando el síndrome del jubilado", "Salario Emocional", "Fomentando el bienestar adolescente", "Deja atrás la procrastinación", "Encuentra tu Balance: personal y profesional", "¿Me como mis emociones?", "Todos podemos salvar una vida: prevención del suicidio"],
    firstAidTitle: "Taller de Primeros Auxilios Psicológicos",
    firstAidSubtitle: "Capacitación en Intervención de Crisis",
    firstAidObjective: "Conocer las bases y estrategias de intervención de los Primeros Auxilios Psicológicos para las principales crisis emocionales.",
    firstAidTopics: ["Principios Básicos de los Primeros Auxilios Emocionales y atención en crisis", "Reacciones fisiológicas, cognitivas, conductuales y emocionales de las personas ante las crisis", "Identificación y evaluación de las personas que requieren de atención psicológica", "Protocolos y Estrategias de Intervención Psicológica en crisis", "Tipos de crisis comunes: Ansiedad, Agresión, Ideación suicida, Maltrato"],
    firstAidFormat: "Formato: Presencial o en línea | Cupo: 20 personas por grupo | Incluye material para el participante",
    screeningTitle: "Screening Psicológico Online",
    screeningSubtitle: "Evaluación de Salud Mental",
    screeningObjective: "Medir los niveles de ansiedad, depresión y estrés que presenta la persona y brindar recomendaciones para su autocuidado.",
    screeningTests: ["Inventario de Depresión de Beck II", "Inventario de Ansiedad de Beck", "Test de Estrés Percibido de Levenstein"],
    screeningDetails: "Tiempo de aplicación: 25 minutos | Resultados automáticos vía correo electrónico con recomendaciones de autocuidado",
    programTitle: "Programa TransformArte",
    programSubtitle: "Programa de Desarrollo Juvenil de 7 Sesiones (15-19 años)",
    programObjective: "Desarrollar en los adolescentes de 15 a 19 años habilidades para la regulación de sus emociones, así como estrategias para Transformar sus pensamientos y relaciones sociales.",
    programMethodology: "Basados en la metodología de la Terapia Cognitivo Conductual, Terapia Dialéctica Conductual y Psicología Positiva.",
    programSessions: [
      { session: "Sesión 1", title: "Evaluación Inicial", description: "Identificar qué son y para qué sirven las emociones en nuestra vida" },
      { session: "Sesión 2", title: "Emociones Básicas", description: "Conocer las funciones y manifestaciones de las emociones básicas" },
      { session: "Sesión 3", title: "Expresión Emocional", description: "Aprender la expresión saludable de las emociones y su regulación" },
      { session: "Sesión 4", title: "Trampas del Pensamiento", description: "Aprender las trampas del pensamiento y su relación con las emociones" },
      { session: "Sesión 5", title: "Herramientas de Transformación", description: "Practicar herramientas para la Transformación del pensamiento" },
      { session: "Sesión 6", title: "Relaciones", description: "Transformar las relaciones interpersonales por medio del desarrollo de habilidades sociales" },
      { session: "Sesión 7", title: "Caja de Herramientas", description: "Preparar la caja de herramientas emocionales de cierre - Evaluación final" }
    ],
    programFormat: "Formato: Presencial | Duración: 2 horas por sesión | Capacidad: 20 participantes por grupo",
    programBenefitsTitle: "5 Beneficios del Programa",
    programBenefits: ["Disminución de problemas de ansiedad y depresión", "Disminución de conductas disruptivas", "Aumento de las habilidades sociales y mejora de las relaciones interpersonales", "Aumento de las habilidades de solución de problemas y toma de decisiones", "Incremento de la resiliencia"],
    helplineTitle: "Línea de Atención Psicológica",
    helplineSubtitle: "Servicio de Apoyo Profesional por 12 Meses",
    helplineFeatures: ["100% anónimo y confidencial", "2 vías de contacto (línea telefónica y correo exclusivos)", "Atención en crisis mediante la línea telefónica", "Intervención psicoterapéutica mediante videollamadas (según necesidades)", "Sesiones 100% personalizadas", "El mismo terapeuta de principio a fin", "Material de apoyo para adquirir habilidades de afrontamiento", "Implementado por Psicoterapeutas del CPCCM entrenados en Telehealth por el Beck Institute"],
    mentorshipTitle: "Programa de Mentoría Rotarios-Rotaract",
    mentorshipSubtitle: "Las 4 Llaves hacia la Autorrealización",
    mentorshipObjective: "Que los participantes a través de la mentoría adquieran 4 llaves: Emociones, Relaciones Positivas, Fortalezas Personales y Resiliencia.",
    mentorshipKeys: [
      { key: "Emociones", description: "Abrir la puerta a las emociones, regularlas y experimentarlas de manera positiva" },
      { key: "Relaciones", description: "Abrir la puerta a la construcción de relaciones en las diferentes áreas del desarrollo interpersonal" },
      { key: "Fortalezas Personales", description: "Identificación de las fortalezas del carácter y utilizarlas de una manera creativa" },
      { key: "Resiliencia", description: "Abrir la puerta para obtener herramientas emocionales que permitan sortear el estrés del día a día" }
    ],
    mentorshipFormat: "Formato: Presencial Rotario-Rotaract | Duración: 1.5 horas por sesión",
    teamTitle: "Nuestro Equipo",
    teamDescription: "Programas implementados por profesionales certificados del Centro de Psicología Cognitivo Conductual de Monterrey (CPCCM)",
    teamMembers: [{ name: "MPC. Gerardo Valdivia Graniel", role: "Director-Fundador del CPCCM" }, { name: "MPC. Minerva Cázares Escalera", role: "Directora-Fundadora del CPCCM" }],
    ctaTitle: "¿Listo para Participar?",
    ctaDescription: "Inscríbete en nuestros programas y comienza tu viaje de transformación hoy.",
    ctaButton: "Inscríbete Ahora"
  }
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];
  return { title: t.title, description: t.heroDescription };
}

export default async function ServiciosPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const t = content[locale === 'en' ? 'en' : 'es'];

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center text-white min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 z-0" />
        <div className="absolute inset-0 bg-black/30 z-1" />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">{t.title}</h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">{t.subtitle}</p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{t.heroDescription}</p>
          <a href="https://edu.transformarte.com.mx" target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl">{t.registrationCta}</a>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          {[{ id: 'webinars', icon: '📺', label: 'Webinars' }, { id: 'firstaid', icon: '🩹', label: locale === 'en' ? 'First Aid' : 'Primeros Auxilios' }, { id: 'screening', icon: '📋', label: 'Screening' }, { id: 'program', icon: '🎯', label: locale === 'en' ? 'Program' : 'Programa' }, { id: 'helpline', icon: '📞', label: locale === 'en' ? 'Helpline' : 'Línea de Atención' }, { id: 'mentorship', icon: '🤝', label: locale === 'en' ? 'Mentorship' : 'Mentoría' }].map((item) => (
            <a key={item.id} href={`#${item.id}`} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium transition-colors">{item.icon} {item.label}</a>
          ))}
        </div>
      </section>

      {/* Webinars */}
      <section id="webinars" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="text-5xl mb-4 block">📺</span>
          <h2 className="text-4xl font-bold text-primary mb-4">{t.webinarsTitle}</h2>
          <p className="text-xl text-gray-600 mb-2">{t.webinarsSubtitle}</p>
          <p className="text-gray-700 max-w-2xl mx-auto">{t.webinarsDescription}</p>
          <p className="text-sm text-blue-600 mt-4 font-medium">{t.webinarsFormat}</p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          {t.webinarTopics.map((topic, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>
              <span className="text-gray-800">{topic}</span>
            </div>
          ))}
        </div>
      </section>

      {/* First Aid */}
      <section id="firstaid" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-5xl mb-4 block">🩹</span>
            <h2 className="text-4xl font-bold text-primary mb-4">{t.firstAidTitle}</h2>
            <p className="text-xl text-gray-600 mb-4">{t.firstAidSubtitle}</p>
            <p className="text-gray-700 mb-6">{t.firstAidObjective}</p>
            <p className="text-sm text-blue-600 font-medium">{t.firstAidFormat}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-red-800 mb-6">{locale === 'en' ? 'Course Content' : 'Temario'}</h3>
            <div className="space-y-4">
              {t.firstAidTopics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="bg-red-100 text-red-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{index + 1}</span>
                  <span className="text-gray-700">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Screening */}
      <section id="screening" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl mb-4 block">📋</span>
          <h2 className="text-4xl font-bold text-primary mb-4">{t.screeningTitle}</h2>
          <p className="text-xl text-gray-600 mb-4">{t.screeningSubtitle}</p>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">{t.screeningObjective}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {t.screeningTests.map((test, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl mb-3">{['😔', '😰', '😫'][index]}</div>
                <span className="text-gray-800 font-medium">{test}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-600 font-medium">{t.screeningDetails}</p>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="text-5xl mb-4 block">🎯</span>
          <h2 className="text-4xl font-bold text-primary mb-4">{t.programTitle}</h2>
          <p className="text-xl text-gray-600 mb-4">{t.programSubtitle}</p>
          <p className="text-gray-700 max-w-3xl mx-auto mb-4">{t.programObjective}</p>
          <p className="text-sm text-blue-600 mt-4 font-medium">{t.programFormat}</p>
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          {t.programSessions.map((session, index) => (
            <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md inline-block">
                  <span className="text-blue-600 font-bold text-sm">{session.session}</span>
                  <h4 className="text-xl font-bold text-blue-900 mb-2">{session.title}</h4>
                  <p className="text-gray-700">{session.description}</p>
                </div>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-blue-600 rounded-full items-center justify-center text-white font-bold z-10 flex-shrink-0">{index + 1}</div>
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-green-800 text-center mb-8">{t.programBenefitsTitle}</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {t.programBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-4 rounded-xl text-center shadow">
                <div className="text-3xl mb-2">{['😌', '🎭', '🤝', '💡', '💪'][index]}</div>
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Helpline */}
      <section id="helpline" className="py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="text-5xl mb-4 block">📞</span>
          <h2 className="text-4xl font-bold mb-4">{t.helplineTitle}</h2>
          <p className="text-xl text-blue-200">{t.helplineSubtitle}</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {t.helplineFeatures.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center gap-4">
              <span className="text-yellow-400 text-xl">✓</span>
              <span className="text-white/90">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mentorship */}
      <section id="mentorship" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="text-5xl mb-4 block">🤝</span>
          <h2 className="text-4xl font-bold text-primary mb-4">{t.mentorshipTitle}</h2>
          <p className="text-xl text-gray-600 mb-4">{t.mentorshipSubtitle}</p>
          <p className="text-gray-700 max-w-3xl mx-auto">{t.mentorshipObjective}</p>
          <p className="text-sm text-blue-600 mt-4 font-medium">{t.mentorshipFormat}</p>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {t.mentorshipKeys.map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl shadow-lg text-center h-full">
                <div className="text-4xl mb-4">🔑</div>
                <h4 className="text-xl font-bold text-amber-800 mb-3">{item.key}</h4>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
              {index < 3 && <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-2xl">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">{t.teamTitle}</h2>
          <p className="text-gray-700 mb-12 max-w-2xl mx-auto">{t.teamDescription}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {t.teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center"><span className="text-4xl text-white">👤</span></div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.ctaTitle}</h2>
          <p className="text-xl text-white/90 mb-10">{t.ctaDescription}</p>
          <a href="https://edu.transformarte.com.mx" target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-5 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-xl">{t.ctaButton}</a>
        </div>
      </section>
    </>
  );
}
