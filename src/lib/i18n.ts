export type Lang = 'en' | 'es'

const translations = {
  en: {
    brand: {
      short: 'Mayan League',
      full: 'International Mayan League',
    },
    nav: {
      about: 'About',
      programs: 'Programs',
      resources: 'Resources',
      media: 'News',
      contact: 'Contact',
      donate: 'Donate',
    },
    ui: {
      skipToMain: 'Skip to main content',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      aboutMenu: 'About pages',
      selectLanguage: 'Select language',
      switchToEnglish: 'Switch language to English',
      switchToSpanish: 'Switch language to Spanish',
      selectTheme: 'Select appearance',
      themeAuto: 'Auto',
      themeLight: 'Light',
      themeDark: 'Dark',
      switchToAutoTheme: 'Use automatic light or dark mode',
      switchToLightTheme: 'Switch to light mode',
      switchToDarkTheme: 'Switch to dark mode',
    },
    hero: {
      eyebrow: 'International Mayan League',
      tagline: "Let's walk together in defense of Mother Earth and future generations",
      mission: 'International Mayan League',
      ctaDonate: 'Donate now',
      ctaConnect: 'Contact us',
      proofPoints: ['Maya women & youth led', 'Defenders of Mother Earth', 'Across Abya Yala'],
      clarityLine: 'A Maya women & youth-led organization defending Indigenous rights, culture, and Mother Earth — for 23+ years.',
    },
    resources: {
      sectionLabel: 'Resources',
      sectionKicker: 'Indigenous Language Resources',
      eyebrow: 'Indigenous Language Resources',
      heading: 'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
      intro:
        'Know your rights in Maya Mam. If you have any contact with la Migra (ICE) or the police on the street, at home, in jail, at work or while driving.',
      explore: 'Explore',
      spotlightEyebrow: 'Indigenous Language Resources',
      spotlightHeading: 'Conozca sus derechos — Know Your Rights',
      spotlightIntro:
        'Audiovisual Know Your Rights resources in six Mayan languages — created for Maya refugees, asylum seekers, migrants, and families across Turtle Island who need information in their own languages, not only in Spanish or English.',
      spotlightCredit: 'Recording and editing by International Mayan League/USA',
      viewAllLanguage: 'Browse all language resources',
      downloadKyr: 'Download KYR resources',
      familiesLabel: 'Language families',
      familiesHeading: 'Six Mayan languages. Ten communities.',
      familiesIntro:
        'Each family links to community-specific videos on ICE encounters, red cards, and family preparedness plans.',
      featuredLabel: 'Featured guides',
      featuredHeading: 'Your rights, in your language.',
      moreResourcesLabel: 'More resource areas',
      moreResourcesHeading: 'Statements, guides, and solidarity resources',
      browseAll: 'Browse all resources',
      stats: {
        families: 'language families',
        videos: 'KYR videos',
        communities: 'communities',
      },
      items: [
        {
          title: 'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
          description:
            'Original translation and interpretation in Maya Mam by the International Maya League. Content provided by the National Day Laborer Organizing Network - NDLON.',
        },
        {
          title: 'SI LA MIGRA (ICE) VIENE A SU CASA en Maya Mam.',
          description:
            'If ICE Comes to your house, Maya Mam.',
        },
        {
          title: 'SI LA MIGRA (ICE) LE DETIENE EN UN LUGAR PUBLICO en Maya Mam.',
          description:
            'If you are detained by ICE in a public place, Maya Mam.',
        },
        {
          title: 'SI LA MIGRA (ICE) O LA POLICIA ARRESTA O DETIENE A UN SER QUERIDO en Maya Mam.',
          description:
            'If ICE or the police arrest or detain a family member, Maya Mam.',
        },
      ],
    },
    programs: {
      sectionLabel: 'Programs',
      sectionKicker: 'Maya Cosmovision / Human Rights / Environmental Protection / Immigration',
      eyebrow: 'Maya Cosmovision',
      heading: 'The current generation is working hard to keep all these values alive.',
      intro:
        'The new generation is receiving teachings from the elders to keep this great knowledge alive in order to transmit it to future generations for the benefit of our people and all of humanity.',
      learnMore: 'Follow this work',
      items: [
        {
          name: 'Maya Cosmovision',
          description:
            'Our connection to the world and the cosmos are the basis of our action, of our thoughts, and our sentiments in life and of life.',
        },
        {
          name: 'Human Rights & Advocacy',
          description:
            'The Mayan League seeks to assist Maya leaders to fully engage in human rights fora and use existing human rights mechanisms to safeguard their rights.',
        },
        {
          name: 'Environmental Protection',
          description:
            'The Maya have a special relationship with Mother Earth and Mother Nature. We defend her because she is our mother.',
        },
        {
          name: 'Immigration',
          description:
            'The defense of our lands and territories is fundamental but we also understand that there have been various consequences from these long-standing conflicts, in particular the forced displacement of indigenous peoples.',
        },
        {
          name: 'Maya Women Delegation',
          description:
            'The Maya Women Interpreter Delegation traveled to Tucson Arizona with allies on April 24th- 28th to provide Indigenous Language Services at Casa Alitas, at the U.S./Mexico border.',
        },
        {
          name: 'Gathering of Ancestral Wisdom',
          description:
            'Maya Ancestral Authorities from diverse Maya nations of Mexico and Guatemala convened a three-day meeting titled, Ancestral Wisdom for the Defense of Life, Mother Earth, and her Natural Elements.',
        },
      ],
    },
    mission: {
      sectionLabel: 'Who we are.',
      sectionKicker: 'International Mayan League Board of Directors',
      eyebrow: 'Who we are.',
      heading: 'International Mayan League',
      boardStatement: [
        'The International Mayan League is a Maya organization whose purpose is to promote, preserve, and transmit the cosmovision and worldview, culture, history, and contributions of our ancestors and the values of our traditional knowledge and stewardship of the earth into solutions and actions against current threats and violations affecting our peoples, the earth, and humanity.',
        'We are committed to creating a permanent link between our contemporary world and ancestral traditions, respecting the diversity of our Nation while building a shared vision with our peoples, and working closely with other indigenous peoples, organizations, and allies who support our beliefs and values.',
      ],
      boardStatementAttribution: 'International Mayan League Board of Directors',
      imageSrc: '/site-images/team-hero.webp',
      imageAlt: 'International Mayan League team',
      stats: [
        { value: '6', label: 'Active Programs' },
        { value: '23+', label: 'Years Serving Maya Communities' },
        { value: '19k+', label: 'Growing Social Community' },
      ],
      pillars: [
        {
          title: 'Promote, preserve, and transmit',
          text: 'Promote, preserve, and transmit the cosmovision and worldview, culture, history, and contributions of our ancestors.',
        },
        {
          title: 'Permanent link',
          text: 'Creating a permanent link between our contemporary world and ancestral traditions, respecting the diversity of our Nation while building a shared vision with our peoples.',
        },
        {
          title: 'Working closely',
          text: 'Working closely with other indigenous peoples, organizations, and allies who support our beliefs and values.',
        },
      ],
      learnMore: 'Learn more',
    },
    news: {
      sectionLabel: 'Public witness',
      sectionKicker: 'News',
      eyebrow: 'News',
      heading: 'Perspectives and Analysis from our Nation',
      intro:
        'News',
      viewAll: 'Visit the newsroom',
      readDispatch: 'Read dispatch',
      items: [
        {
          date: 'Justice',
          title: 'Who killed Claudia Gomez?',
          excerpt:
            'A year ago this month, a 20-year-old Guatemalan woman seeking opportunity in the U.S. was shot dead by a Border Patrol agent in Texas.',
        },
        {
          date: 'Protection',
          title: 'Protesters demand protection for indigenous migrant children',
          excerpt:
            'Nearly 150 people protested outside the U.S. Customs and Border Protection building Tuesday, chanting “down with deportation” and demanding better monitoring of border detention centers and access to indigenous language translators.',
        },
        {
          date: 'Culture',
          title: 'Art Can Transform the World',
          excerpt:
            'On Sunday evening, Sept. 10, some 60 area residents got a chance to see an international dance group perform in Centreville’s Historic District, outside St. John’s Episcopal Church.',
        },
        {
          date: 'Land & water',
          title: 'In defense of land and water, from Standing Rock to Guatemala',
          excerpt:
            'The defense of water knows no borders, according to the Mayan Ancestral Authorities, the communal authorities and elders of Mayan towns across Guatemala.',
        },
      ],
    },
    impactMoment: {
      label: 'In the community',
      kicker: 'March 26, 2026 · United Nations',
      lockupLabel: 'United Nations emblem and International Mayan League logo',
      heading: 'Our voice at the United Nations.',
      body:
        "Our Executive Director Juanita Cabrera López participated in a roundtable with UN High Commissioner for Human Rights Volker Türk, presenting the International Mayan League's statement on Indigenous Peoples' Rights in the context of inhumane immigration policies. Her participation brought urgent attention to how immigration systems impact Indigenous migrant communities and affirmed the need for centering Indigenous-led solutions.",
      readStatement: 'Read the full statement',
      statementUrl:
        'https://www.mayanleague.org/s/Roundtable-on-the-human-rights-situation-in-the-United-States_Final.pdf',
    },
    cta: {
      eyebrow: 'Donate now',
      heading: 'Stand with Maya communities.',
      body:
        'When you give to The International Mayan League, you join Maya women, youth, and Elders at the frontlines of justice as we defend our Peoples and Mother Earth, and nurture hope for future generations. Your financial commitment ensures that Maya communities facing displacement, detention, and violence are not alone.',
      donate: 'Become a monthly donor',
      donateOnce: 'Give once',
      connect: 'Contact us',
    },
    footer: {
      tagline: "Let's walk together in defense of Mother Earth and future generations",
      quickLinks: 'Quick Links',
      contact: 'Contact',
      address: '1201 K ST NW, Washington, D.C. 20005',
      copyright: '© 2026 International Mayan League. All Rights Reserved.',
      whoWeAre: 'Who we are',
      whatWeDo: 'What we do',
      getInvolved: 'Get Involved',
      whoLinks: ['Board of Directors', 'Team', 'Donors', 'Join the team'],
      involvedLinks: ['Donate', 'Partnerships', 'Campaigns'],
      socialLabel: 'Visit Mayan League on',
      appearance: 'Appearance',
    },
    aboutPage: {
      label: 'About',
      heroHeading: 'Guided by elders and ancestors.',
      whoWeAreLabel: 'Who we are',
      howWeWorkLabel: 'How we work',
      methodStatement:
        'The work of the Mayan League is guided by the knowledge and teachings of our elders and ancestors to respect and care for Mother Earth and Mother Nature.',
      paragraphs: [
        'Guided by this vision we want to share these values with all of humanity and help raise awareness of the detrimental treatment we have given to the earth and the cosmos.',
        'Our work and priorities are guided by the vision and practices of our spiritual and traditional leaders, elders, and authorities in order to address the root causes contributing to discrimination, inequality, and oppression of the Maya and the destruction of our communities and environment.',
        'We work closely with our Nation and support the process of our unity for the good of our peoples and our earth.',
        'We join in partnerships with allies from other indigenous nations, human rights organizations, academics, scholars, scientists, and faith based communities to stand in solidarity with the struggle of our peoples protecting the earth. Jointly we address the many critical issues affecting not just the Maya but all of humanity and Mother Earth.',
      ],
      links: ['About', 'Board Of Directors', 'Our Path', 'Our Core Values', 'Team', 'Job Opportunities'],
      principles: [
        'Guided by spiritual and traditional leaders, elders, and authorities.',
        'Addressing the root causes of discrimination, inequality, and oppression of the Maya.',
        'Working in unity with our Nation for the good of our peoples and our earth.',
        'Joining allies from Indigenous nations, human rights organizations, academia, science, and faith communities.',
      ],
      quoteLabel: 'Ancestral reference',
      quote:
        '“They came together and held council in the darkness and in the night, then they searched and discussed, and here they reflected and thought. In this way their decisions came out in clear light.”',
      quoteSource: 'Pop Wuj',
    },
    teamPage: {
      label: 'Team',
      sectionKicker: 'Mayan League',
      heroEyebrow: 'Mayan League',
      heroHeading: 'Team',
      intro:
        'Our staff brings together Maya leaders and allies working across policy, operations, language rights, development, and communications—rooted in community and guided by ancestral responsibility.',
      introLabel: 'Who we are',
      membersSectionLabel: 'Team members',
      members: [
        {
          name: 'Juanita',
          role: 'Executive Director',
          image: '/site-images/team-juanita.webp',
          bio: [
            'Juanita is Maya Mam and is a survivor of the internal armed conflict in her home country a former political refugee. She now works with Maya leaders and elders through their traditional institutions for environmental protection, recognition of land rights, human rights, cultural preservation and education. Juanita’s work with indigenous peoples has focused on the full and effective use and implementation of the United Nations Declaration on the Rights of Indigenous Peoples. Her emphasis is focused on the right of self-determination and collective rights to lands, territories, natural resources and the environment. She holds a Master of International Public Policy from Johns Hopkins School of Advanced International Studies.',
          ],
        },
        {
          name: 'Lorena',
          role: 'Policy and Program Manager',
          image: '/site-images/team-lorena.webp',
          bio: [
            'Lorena has worked alongside indigenous leaders, elders, attorneys, and human rights defenders for the past decade. Her work has focused on supporting indigenous peoples from the United States, Mexico, Central and South America in both local and international human rights advocacy.',
            'Her primary areas of work have been policy, communications and fundraising efforts that assist indigenous peoples’ fight for the recognition of their right of self-determination and securing rights to lands, territories and natural resources. Lorena has worked with prominent indigenous led organizations throughout her entire career in support of the indigenous human rights movement. She studied Government and International Politics with a minor in Conflict Analysis and Resolution from George Mason University in the DC area.',
          ],
        },
        {
          name: 'Ramon',
          role: 'Director of Operations',
          image: '/site-images/team-ramon.webp',
          bio: [
            'Ramon is an organizational development leader committed to amplifying the impact of people and organizations who drive social justice and impact in our communities. His dedication is deeply rooted in his personal experiences, coming from a proud immigrant family that faced social challenges living in low socioeconomic communities. As a youth, he was fortunate to access social resources and community programs that played an instrumental role in helping him overcome social disparities. This lived experience galvanized Ramon to invest in his community through his work, just as his community invested in him. He has dedicated his career to serving missions that aim to rebuild, nourish, and provide equal access to underserved communities. Ramon’s work ensures that the social resources and programs that supported his development as a youth continue to be present and profound for today’s current and future generations. Ramon’s leadership journey began in human resources, where he implemented organizational development strategies to create mission-driven work environments. He intentionally transitioned into operation roles with the goal of aligning human resources, operations, finances, and information technology frameworks to support building cohesion and strategy within organizations. Ramon holds a BAAS degree in Organizational Development and has recently earned a Master’s in Public Leadership from the University of North Texas at Dallas, with a focus on nonprofit and community leadership.',
          ],
        },
        {
          name: 'Ernesto',
          role: 'Indigenous Language Rights Program Coordinator',
          image: '/site-images/team-ernesto.webp',
          bio: [
            "Ernesto is a Maya K’iche’ youth leader. His parents are survivors of the internal armed conflict in his home country and due to war and genocide, his family was internally displaced. He is fluent in Maya K'iche', Ixil, and Spanish because of his upbringing, and is conversational in English. Ernesto's natural leadership formation stems from his parents' resistance, teachings, and survival. Throughout his childhood, he learned about the importance of languages as a tool to fight for the rights of the Maya People. He continues his work as a community leader where he leads and supports the Maya community's access to resources and better understanding of their rights.",
          ],
        },
        {
          name: 'Manuela',
          role: 'Development Associate',
          image: '/site-images/team-manuela.webp',
          bio: [
            'Manuela is an experienced fundraiser whose work has focused on supporting those most affected by the oppressive systems under which we live. Driven by community-centered practices, she enjoys collaborating with communities to create sustainable fundraising practices to meet ongoing needs and decrease reliance on corporate nonprofits and governmental agencies. Through her work in fundraising, she has been able to collaborate with exceptional movement leaders to produce documentaries exploring the white pathological foundations of Latinidad, provide financial and material support to undocumented communities through wealth redistribution, and support currently and formerly incarcerated folks.',
            'Prior to focusing on fundraising, Manuela worked as a bilingual gender-based violence educator hosting workshops on language access services for survivors, the criminalization of survival, identifying patterns of abuse, and more. Manuela is passionate about food, family, and service, so in her spare time, you can find her baking, laughing with loved ones, and narrating audiobooks for kiddos with learning disabilities.',
          ],
        },
        {
          name: 'Andrea',
          role: 'Administrative Coordinator',
          image: '/site-images/team-andrea.webp',
          bio: [
            'Andrea is a proud ascendent of the Maya Q’eqchi’ nation. She witnessed firsthand the unfiltered and disproportionate effects that poverty, policing, and racism had on minority communities. This experience has shaped her worldview and given her a deep understanding that just as all collective struggles are intrinsically linked, so is their collective liberation.',
            'Andrea has continued to channel her advocacy through her work at the International Mayan League and particularly through her art as the lead communications assistant for the League. She is intentional about always rooting her activism in truth-telling and allowing the words and stories of her relatives to be told through her graphics, with the hope of sparking real and permanent change.',
          ],
        },
      ],
    },
    contactPage: {
      label: 'Contact',
      sectionKicker: 'Call / visit / newsletter',
      heroEyebrow: 'Mayan League',
      heroHeading: 'Follow us, connect, and engage.',
      heroBody: 'Follow us on social media, connect with our staff, and engage with others.',
      callLabel: 'Call or visit',
      callHeading: 'You can make a difference.',
      callBody: 'Volunteer or intern with us. Write us at info@mayanleague.org.',
      addressName: 'Eaton House C/O International Mayan League/USA',
      writeUs: 'Write us',
      callUs: 'Call us',
      mapLabel: 'View location',
      mapButton: 'Open in Google Maps',
      mapTitle: 'Google Map showing Eaton House, 1201 K ST NW, Washington, D.C. 20005',
      newsletterLabel: 'Our newsletter',
      newsletterHeading: "NOJB'EL MAYAB'",
      newsletterAlt: "NOJB'EL MAYAB' newsletter artwork with Maya calendar glyphs around a central figure",
      newsletterBody:
        "NOJB'EL MAYAB' provides editorials, analysis, and urgent actions. The work of the International Mayan League is guided by the knowledge and teachings of our elders and ancestors to respect and care for Mother Earth and Mother Nature. Let's join together for the future of all generations.",
      firstName: 'First Name',
      lastName: 'Last Name',
      emailAddress: 'Email Address',
      signUp: 'Sign up',
      privacy: 'We respect your privacy.',
    },
  },
  es: {
    brand: {
      short: 'Liga Maya',
      full: 'Liga Maya Internacional',
    },
    nav: {
      about: 'Quiénes Somos',
      programs: 'Programas',
      resources: 'Recursos',
      media: 'Noticias',
      contact: 'Contacto',
      donate: 'Donar',
    },
    ui: {
      skipToMain: 'Saltar al contenido principal',
      openMenu: 'Abrir menú de navegación',
      closeMenu: 'Cerrar menú de navegación',
      aboutMenu: 'Páginas sobre nosotros',
      selectLanguage: 'Seleccionar idioma',
      switchToEnglish: 'Cambiar idioma a inglés',
      switchToSpanish: 'Cambiar idioma a español',
      selectTheme: 'Seleccionar apariencia',
      themeAuto: 'Auto',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      switchToAutoTheme: 'Usar modo claro u oscuro automático',
      switchToLightTheme: 'Cambiar a modo claro',
      switchToDarkTheme: 'Cambiar a modo oscuro',
    },
    hero: {
      eyebrow: 'Liga Maya Internacional',
      tagline: 'Caminemos juntos en defensa de la Madre Tierra y las generaciones futuras',
      mission: 'Liga Maya Internacional',
      ctaDonate: 'Donar ahora',
      ctaConnect: 'Contáctenos',
      proofPoints: ['Liderado por mujeres y juventud Maya', 'Defensores de la Madre Tierra', 'A través de Abya Yala'],
      clarityLine: 'Una organización liderada por mujeres y juventud Maya que defiende los derechos indígenas, la cultura y la Madre Tierra — por más de 23 años.',
    },
    resources: {
      sectionLabel: 'Recursos',
      sectionKicker: 'Recursos en idiomas Indígenas',
      eyebrow: 'Recursos en idiomas Indígenas',
      heading: 'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
      intro:
        'Si tiene cualquier contacto con la Migra (ICE) o la policía en la calle, en su casa, en la cárcel, en el trabajo o mientras maneja.',
      explore: 'Explorar',
      spotlightEyebrow: 'Recursos en idiomas Indígenas',
      spotlightHeading: 'Conozca sus derechos',
      spotlightIntro:
        'Recursos audiovisuales de Conozca sus Derechos en seis idiomas Mayas — creados para refugiados, solicitantes de asilo, migrantes y familias Maya en la Isla Tortuga que necesitan información en su propio idioma, no solo en español o inglés.',
      spotlightCredit: 'Grabación y edición por la Liga Maya Internacional/USA',
      viewAllLanguage: 'Ver todos los recursos de idiomas',
      downloadKyr: 'Descargar recursos KYR',
      familiesLabel: 'Familias lingüísticas',
      familiesHeading: 'Seis idiomas Mayas. Diez comunidades.',
      familiesIntro:
        'Cada familia enlaza a videos comunitarios sobre encuentros con ICE, tarjetas rojas y planes de preparación familiar.',
      featuredLabel: 'Guías destacadas',
      featuredHeading: 'Tus derechos, en tu idioma.',
      moreResourcesLabel: 'Más áreas de recursos',
      moreResourcesHeading: 'Declaraciones, guías y recursos de solidaridad',
      browseAll: 'Ver todos los recursos',
      stats: {
        families: 'familias lingüísticas',
        videos: 'videos KYR',
        communities: 'comunidades',
      },
      items: [
        {
          title: 'Conozca sus derechos en Maya Mam. Know your Rights in Maya Mam.',
          description:
            'Traducción e interpretación original en Maya Mam por la Liga Maya Internacional. Contenido por NDLON.',
        },
        {
          title: 'SI LA MIGRA (ICE) VIENE A SU CASA en Maya Mam.',
          description:
            'Si ICE llega a su casa, en Maya Mam.',
        },
        {
          title: 'SI LA MIGRA (ICE) LE DETIENE EN UN LUGAR PUBLICO en Maya Mam.',
          description:
            'Si ICE le detiene en un lugar público, en Maya Mam.',
        },
        {
          title: 'SI LA MIGRA (ICE) O LA POLICIA ARRESTA O DETIENE A UN SER QUERIDO en Maya Mam.',
          description:
            'Si ICE o la policía arresta o detiene a un ser querido, en Maya Mam.',
        },
      ],
    },
    programs: {
      sectionLabel: 'Programas',
      sectionKicker: 'Cosmovisión Maya / Derechos humanos / Protección ambiental / Inmigración',
      eyebrow: 'Cosmovisión Maya',
      heading: 'La generación actual trabaja para mantener vivos estos valores.',
      intro:
        'La nueva generación recibe enseñanzas de las y los mayores para mantener vivo este gran conocimiento y transmitirlo a las futuras generaciones para beneficio de nuestro pueblo y de toda la humanidad.',
      learnMore: 'Seguir este trabajo',
      items: [
        {
          name: 'Cosmovisión Maya',
          description:
            'Nuestra conexión con el mundo y el cosmos es la base de nuestra acción, pensamiento y sentimiento en la vida y por la vida.',
        },
        {
          name: 'Derechos Humanos y Abogacía',
          description:
            'La Liga Maya acompaña a liderazgos Mayas para participar plenamente en espacios de derechos humanos y usar mecanismos existentes para proteger sus derechos.',
        },
        {
          name: 'Protección Ambiental',
          description:
            'El pueblo Maya tiene una relación especial con la Madre Tierra y la Madre Naturaleza. La defendemos porque es nuestra madre.',
        },
        {
          name: 'Inmigración',
          description:
            'La defensa de nuestras tierras y territorios es fundamental, y también entendemos las consecuencias de conflictos históricos, en particular el desplazamiento forzado de los pueblos Indígenas.',
        },
        {
          name: 'Delegación de Mujeres Mayas',
          description:
            'La Delegación de Mujeres Intérpretes Mayas viajó a Tucson, Arizona, con aliadas para brindar servicios en idiomas Indígenas en Casa Alitas, en la frontera entre Estados Unidos y México.',
        },
        {
          name: 'Encuentro de Sabiduría Ancestral',
          description:
            'Autoridades Ancestrales Mayas de diversas naciones Mayas de México y Guatemala convocaron un encuentro de tres días: Sabiduría ancestral para la defensa de la vida, la Madre Tierra y sus elementos naturales.',
        },
      ],
    },
    mission: {
      sectionLabel: 'Quiénes somos.',
      sectionKicker: 'Junta Directiva de la Liga Maya Internacional',
      eyebrow: '¿Qué es la Liga Maya?',
      heading: 'LIGA MAYA INTERNACIONAL',
      boardStatement: [
        'La Liga Maya Internacional es una organización Maya cuyo propósito es promover, preservar y transmitir la cosmovisión, cultura, historia y contribuciones de nuestros ancestros y los valores de nuestro conocimiento tradicional y la administración de la tierra en soluciones y acciones contra las amenazas y violaciones actuales que afectan a nuestros pueblos, la tierra y la humanidad.',
        'Estamos comprometidos a crear un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales, respetando la diversidad de nuestra Nación y construyendo una visión compartida con nuestros pueblos, y trabajando de cerca con otros pueblos indígenas, organizaciones y aliados que apoyan nuestras creencias y valores.',
      ],
      boardStatementAttribution: 'Junta Directiva de la Liga Maya Internacional',
      imageSrc: '/site-images/team-hero.webp',
      imageAlt: 'Equipo de la Liga Maya Internacional',
      stats: [
        { value: '6', label: 'Programas Activos' },
        { value: '23+', label: 'Años Sirviendo a Comunidades Mayas' },
        { value: '19k+', label: 'Comunidad Social en Crecimiento' },
      ],
      pillars: [
        {
          title: 'Promover, conservar, difundir y transmitir',
          text: 'Promover, conservar, difundir y transmitir el pensamiento cosmogónico y abstracto de nuestros antepasados.',
        },
        {
          title: 'Vínculo permanente',
          text: 'Queremos construir un vínculo permanente entre nuestro mundo contemporáneo y las tradiciones ancestrales.',
        },
        {
          title: 'Trabajar de cerca',
          text: 'Trabajar de cerca con otros pueblos originarios, organizaciones y otros quienes comparten los mismos sentimientos, creencias y valores.',
        },
      ],
      learnMore: 'Leer más',
    },
    news: {
      sectionLabel: 'Testimonio público',
      sectionKicker: 'Noticias',
      eyebrow: 'Noticias',
      heading: 'Perspectivas y análisis de nuestra Nación',
      intro:
        'Noticias',
      viewAll: 'Visitar noticias',
      readDispatch: 'Leer despacho',
      items: [
        {
          date: 'Justicia',
          title: '¿Quién mató a Claudia Gómez?',
          excerpt:
            'A year ago this month, a 20-year-old Guatemalan woman seeking opportunity in the U.S. was shot dead by a Border Patrol agent in Texas.',
        },
        {
          date: 'Protección',
          title: 'Manifestantes exigen protección para niñas y niños migrantes Indígenas',
          excerpt:
            'Nearly 150 people protested outside the U.S. Customs and Border Protection building Tuesday, chanting “down with deportation” and demanding better monitoring of border detention centers and access to indigenous language translators.',
        },
        {
          date: 'Cultura',
          title: 'El arte puede transformar el mundo',
          excerpt:
            'On Sunday evening, Sept. 10, some 60 area residents got a chance to see an international dance group perform in Centreville’s Historic District, outside St. John’s Episcopal Church.',
        },
        {
          date: 'Tierra y agua',
          title: 'En defensa de la tierra y el agua, de Standing Rock a Guatemala',
          excerpt:
            'The defense of water knows no borders, according to the Mayan Ancestral Authorities, the communal authorities and elders of Mayan towns across Guatemala.',
        },
      ],
    },
    impactMoment: {
      label: 'En la comunidad',
      kicker: '26 de marzo de 2026 · Naciones Unidas',
      lockupLabel: 'Emblema de las Naciones Unidas y logo de la Liga Maya Internacional',
      heading: 'Nuestra voz en las Naciones Unidas.',
      body:
        'Nuestra Directora Ejecutiva Juanita Cabrera López participó en una mesa redonda con el Alto Comisionado de la ONU para los Derechos Humanos, Volker Türk, presentando la declaración de la Liga Maya Internacional sobre los Derechos de los Pueblos Indígenas en el contexto de políticas migratorias inhumanas.',
      readStatement: 'Leer la declaración completa',
      statementUrl:
        'https://www.mayanleague.org/s/Roundtable-on-the-human-rights-situation-in-the-United-States_Final.pdf',
    },
    cta: {
      eyebrow: 'Donar ahora',
      heading: 'Apoya a las comunidades Mayas.',
      body:
        'Cuando das a la Liga Maya Internacional, te unes a mujeres, jóvenes y ancianos Maya en la primera línea de la justicia mientras defendemos a nuestros Pueblos y a la Madre Tierra, y nutrimos esperanza para las generaciones futuras.',
      donate: 'Hazte donante mensual',
      donateOnce: 'Donar una vez',
      connect: 'Contáctenos',
    },
    footer: {
      tagline: 'Caminemos juntos en defensa de la Madre Tierra y las generaciones futuras',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contacto',
      address: '1201 K ST NW, Washington, D.C. 20005',
      copyright: '© 2026 Liga Maya Internacional. Todos los Derechos Reservados.',
      whoWeAre: 'Quiénes somos',
      whatWeDo: 'Qué hacemos',
      getInvolved: 'Participa',
      whoLinks: ['Junta Directiva', 'Equipo', 'Donantes', 'Únete al equipo'],
      involvedLinks: ['Donar', 'Alianzas', 'Campañas'],
      socialLabel: 'Visita a la Liga Maya en',
      appearance: 'Apariencia',
    },
    aboutPage: {
      label: 'Acerca de nosotros',
      heroHeading: 'Guiados por ancianos y ancestros.',
      whoWeAreLabel: 'Quiénes somos',
      howWeWorkLabel: 'Cómo trabajamos',
      methodStatement:
        'El trabajo de la Liga Maya está guiado por el conocimiento y las enseñanzas de nuestros ancianos y ancestros para respetar y cuidar a la Madre Tierra y la Madre Naturaleza.',
      paragraphs: [
        'Guiados por esta visión queremos compartir estos valores con toda la humanidad y ayudar a crear conciencia sobre el trato dañino que le hemos dado a la tierra y al cosmos.',
        'Nuestro trabajo y prioridades están guiados por la visión y las prácticas de nuestros líderes espirituales y tradicionales, ancianos y autoridades para abordar las causas profundas de la discriminación, la desigualdad y la opresión de los Maya y la destrucción de nuestras comunidades y medio ambiente.',
        'Trabajamos estrechamente con nuestra Nación y apoyamos el proceso de nuestra unidad por el bien de nuestros pueblos y nuestra tierra.',
        'Nos unimos en alianzas con aliados de otras naciones indígenas, organizaciones de derechos humanos, académicos, científicos y comunidades de fe para estar en solidaridad con la lucha de nuestros pueblos protegiendo la tierra. Juntos abordamos los muchos problemas críticos que afectan no solo a los Maya sino a toda la humanidad y a la Madre Tierra.',
      ],
      links: ['Acerca de nosotros', 'Junta Directiva', 'Nuestro camino', 'Nuestros valores', 'Equipo', 'Oportunidades de empleo'],
      principles: [
        'Guiados por líderes espirituales y tradicionales, ancianos y autoridades.',
        'Abordando las causas profundas de la discriminación, la desigualdad y la opresión de los Maya.',
        'Trabajando en unidad con nuestra Nación por el bien de nuestros pueblos y nuestra tierra.',
        'Uniéndonos con aliados de naciones Indígenas, organizaciones de derechos humanos, academia, ciencia y comunidades de fe.',
      ],
      quoteLabel: 'Referencia ancestral',
      quote:
        '“Se juntaron y celebraron consejo en la oscuridad y en la noche, luego buscaron y discutieron, y aquí reflexionaron y pensaron. De esta manera sus decisiones salieron a la luz clara.”',
      quoteSource: 'Pop Wuj',
    },
    teamPage: {
      label: 'Equipo',
      sectionKicker: 'Liga Maya',
      heroEyebrow: 'Liga Maya',
      heroHeading: 'Equipo',
      intro:
        'Nuestro equipo reúne a líderes Maya y aliados que trabajan en política, operaciones, derechos lingüísticos, desarrollo y comunicaciones—con raíces comunitarias y guiados por la responsabilidad ancestral.',
      introLabel: 'Quiénes somos',
      membersSectionLabel: 'Miembros del equipo',
      members: [
        {
          name: 'Juanita',
          role: 'Executive Director',
          image: '/site-images/team-juanita.webp',
          bio: [
            'Juanita is Maya Mam and is a survivor of the internal armed conflict in her home country a former political refugee. She now works with Maya leaders and elders through their traditional institutions for environmental protection, recognition of land rights, human rights, cultural preservation and education. Juanita’s work with indigenous peoples has focused on the full and effective use and implementation of the United Nations Declaration on the Rights of Indigenous Peoples. Her emphasis is focused on the right of self-determination and collective rights to lands, territories, natural resources and the environment. She holds a Master of International Public Policy from Johns Hopkins School of Advanced International Studies.',
          ],
        },
        {
          name: 'Lorena',
          role: 'Policy and Program Manager',
          image: '/site-images/team-lorena.webp',
          bio: [
            'Lorena has worked alongside indigenous leaders, elders, attorneys, and human rights defenders for the past decade. Her work has focused on supporting indigenous peoples from the United States, Mexico, Central and South America in both local and international human rights advocacy.',
            'Her primary areas of work have been policy, communications and fundraising efforts that assist indigenous peoples’ fight for the recognition of their right of self-determination and securing rights to lands, territories and natural resources. Lorena has worked with prominent indigenous led organizations throughout her entire career in support of the indigenous human rights movement. She studied Government and International Politics with a minor in Conflict Analysis and Resolution from George Mason University in the DC area.',
          ],
        },
        {
          name: 'Ramon',
          role: 'Director of Operations',
          image: '/site-images/team-ramon.webp',
          bio: [
            'Ramon is an organizational development leader committed to amplifying the impact of people and organizations who drive social justice and impact in our communities. His dedication is deeply rooted in his personal experiences, coming from a proud immigrant family that faced social challenges living in low socioeconomic communities. As a youth, he was fortunate to access social resources and community programs that played an instrumental role in helping him overcome social disparities. This lived experience galvanized Ramon to invest in his community through his work, just as his community invested in him. He has dedicated his career to serving missions that aim to rebuild, nourish, and provide equal access to underserved communities. Ramon’s work ensures that the social resources and programs that supported his development as a youth continue to be present and profound for today’s current and future generations. Ramon’s leadership journey began in human resources, where he implemented organizational development strategies to create mission-driven work environments. He intentionally transitioned into operation roles with the goal of aligning human resources, operations, finances, and information technology frameworks to support building cohesion and strategy within organizations. Ramon holds a BAAS degree in Organizational Development and has recently earned a Master’s in Public Leadership from the University of North Texas at Dallas, with a focus on nonprofit and community leadership.',
          ],
        },
        {
          name: 'Ernesto',
          role: 'Indigenous Language Rights Program Coordinator',
          image: '/site-images/team-ernesto.webp',
          bio: [
            "Ernesto is a Maya K’iche’ youth leader. His parents are survivors of the internal armed conflict in his home country and due to war and genocide, his family was internally displaced. He is fluent in Maya K'iche', Ixil, and Spanish because of his upbringing, and is conversational in English. Ernesto's natural leadership formation stems from his parents' resistance, teachings, and survival. Throughout his childhood, he learned about the importance of languages as a tool to fight for the rights of the Maya People. He continues his work as a community leader where he leads and supports the Maya community's access to resources and better understanding of their rights.",
          ],
        },
        {
          name: 'Manuela',
          role: 'Development Associate',
          image: '/site-images/team-manuela.webp',
          bio: [
            'Manuela is an experienced fundraiser whose work has focused on supporting those most affected by the oppressive systems under which we live. Driven by community-centered practices, she enjoys collaborating with communities to create sustainable fundraising practices to meet ongoing needs and decrease reliance on corporate nonprofits and governmental agencies. Through her work in fundraising, she has been able to collaborate with exceptional movement leaders to produce documentaries exploring the white pathological foundations of Latinidad, provide financial and material support to undocumented communities through wealth redistribution, and support currently and formerly incarcerated folks.',
            'Prior to focusing on fundraising, Manuela worked as a bilingual gender-based violence educator hosting workshops on language access services for survivors, the criminalization of survival, identifying patterns of abuse, and more. Manuela is passionate about food, family, and service, so in her spare time, you can find her baking, laughing with loved ones, and narrating audiobooks for kiddos with learning disabilities.',
          ],
        },
        {
          name: 'Andrea',
          role: 'Administrative Coordinator',
          image: '/site-images/team-andrea.webp',
          bio: [
            'Andrea is a proud ascendent of the Maya Q’eqchi’ nation. She witnessed firsthand the unfiltered and disproportionate effects that poverty, policing, and racism had on minority communities. This experience has shaped her worldview and given her a deep understanding that just as all collective struggles are intrinsically linked, so is their collective liberation.',
            'Andrea has continued to channel her advocacy through her work at the International Mayan League and particularly through her art as the lead communications assistant for the League. She is intentional about always rooting her activism in truth-telling and allowing the words and stories of her relatives to be told through her graphics, with the hope of sparking real and permanent change.',
          ],
        },
      ],
    },
    contactPage: {
      label: 'Contacto',
      sectionKicker: 'Llamar / visitar / boletín',
      heroEyebrow: 'Liga Maya',
      heroHeading: 'Síguenos, conéctate y participa.',
      heroBody: 'Síguenos en redes sociales, conéctate con nuestro equipo y participa con otros.',
      callLabel: 'Llama o visita',
      callHeading: 'Puedes hacer la diferencia.',
      callBody: 'Haz voluntariado o una pasantía con nosotros. Escríbenos a info@mayanleague.org.',
      addressName: 'Eaton House C/O Liga Maya Internacional/USA',
      writeUs: 'Escríbenos',
      callUs: 'Llámanos',
      mapLabel: 'Ver ubicación',
      mapButton: 'Abrir en Google Maps',
      mapTitle: 'Mapa de Google que muestra Eaton House, 1201 K ST NW, Washington, D.C. 20005',
      newsletterLabel: 'Nuestro boletín',
      newsletterHeading: "NOJB'EL MAYAB'",
      newsletterAlt: "Arte del boletín NOJB'EL MAYAB' con glifos del calendario Maya alrededor de una figura central",
      newsletterBody:
        "NOJB'EL MAYAB' ofrece editoriales, análisis y acciones urgentes. El trabajo de la Liga Maya Internacional está guiado por el conocimiento y las enseñanzas de nuestros ancianos y ancestros para respetar y cuidar a la Madre Tierra y la Madre Naturaleza. Unámonos por el futuro de todas las generaciones.",
      firstName: 'Nombre',
      lastName: 'Apellido',
      emailAddress: 'Correo electrónico',
      signUp: 'Registrarse',
      privacy: 'Respetamos tu privacidad.',
    },
  },
} as const

export default translations
