export const newsCategories = [
  'Justice',
  'Land & Water',
  'Human Rights',
  'Immigration',
  'Culture & Identity',
  'Indigenous Languages',
  'Community Action',
] as const

export type NewsCategory = (typeof newsCategories)[number]
export type NewsArticleType = 'external' | 'internal'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mayanleague.vercel.app'

export interface NewsArticleI18n {
  title?: string
  dek?: string
  summary?: string
  whyItMatters?: string
  excerpt?: string
  socialTitle?: string
  socialDescription?: string
  suggestedPostCopy?: string
  category?: string
  keywords?: string[]
  /** Spanish article body paragraphs (Internal articles only). */
  body?: string[]
  mainImage?: {
    alt?: string
    caption?: string
  }
}

export interface NewsArticle {
  title: string
  slug: string
  category: NewsCategory
  keywords: string[]
  dek: string
  summary: string
  whyItMatters: string
  excerpt: string
  date: string
  author?: string
  sourceName?: string
  sourceUrl?: string
  type: NewsArticleType
  body?: string[]
  featured?: boolean
  socialTitle?: string
  socialDescription?: string
  suggestedPostCopy?: string
  hashtags?: string[]
  shareImage?: string
  shareImageAlt?: string
  mainImage?: {
    url: string
    alt: string
    caption?: string
    photographerName: string
    photographerUrl: string
    sourceName: string
    sourceUrl: string
    unsplashPhotoId?: string
    unsplashDownloadLocation?: string
    paletteNotes?: string[]
  }
  /** Spanish copy from Sanity (`localized*` fields). */
  _i18n?: { es: NewsArticleI18n }
}

export const newsArticles: NewsArticle[] = [
  {
    title: 'IML presents at UN roundtable on human rights with High Commissioner Türk',
    slug: 'iml-un-roundtable-human-rights-2026',
    category: 'Human Rights',
    keywords: ['United Nations', 'Indigenous rights', 'immigration', 'Indigenous migrants'],
    dek:
      "Executive Director Juanita Cabrera López brought the International Mayan League's statement on Indigenous Peoples' Rights to a UN roundtable alongside High Commissioner Volker Türk, centering the impact of inhumane immigration policies on Maya communities.",
    summary:
      'On March 26, 2026, the International Mayan League participated in a roundtable convened by UN High Commissioner for Human Rights Volker Türk. Executive Director Juanita Cabrera López delivered a statement on the human rights situation in the United States, with a focus on how immigration enforcement systems fail Indigenous migrant communities.',
    whyItMatters:
      "Maya migrants often fall through the gaps of immigration legal frameworks designed around national, not Indigenous, identity. Juanita's presence at the UN affirms that Indigenous voices must be centered in international human rights conversations — and that the International Mayan League operates at the highest levels of advocacy.",
    excerpt:
      "The International Mayan League joined a United Nations roundtable to present its statement on Indigenous Peoples' Rights in the context of U.S. immigration policies.",
    date: 'Mar 26, 2026',
    author: 'International Mayan League',
    sourceName: 'International Mayan League',
    sourceUrl:
      'https://www.mayanleague.org/s/Roundtable-on-the-human-rights-situation-in-the-United-States_Final.pdf',
    type: 'external',
    featured: true,
    socialTitle: 'IML at the United Nations: Our voice on Indigenous rights',
    socialDescription:
      'Executive Director Juanita Cabrera López presented at a UN roundtable with High Commissioner Volker Türk, speaking to the impact of immigration policies on Maya communities.',
    suggestedPostCopy:
      'We were at the United Nations on March 26, 2026, bringing the voices of Maya communities to the highest levels of international human rights advocacy.',
    hashtags: ['MayanLeague', 'IndigenousRights', 'UnitedNations', 'HumanRights'],
  },
  {
    title: 'Protesters demand protection for Indigenous migrant children',
    slug: 'protesters-demand-protection-indigenous-migrant-children',
    category: 'Immigration',
    keywords: ['Indigenous children', 'detention', 'language access', 'border policy'],
    dek:
      'Outside CBP headquarters, Maya organizers and allies named what detention systems too often erase: Indigenous identity, language, and children’s right to be understood.',
    summary:
      'Community members protested outside U.S. Customs and Border Protection to demand stronger protections for Indigenous migrant children, better detention oversight, and access to Indigenous language interpretation.',
    whyItMatters:
      'The protest connected border detention conditions to a specific Indigenous rights crisis: many Maya children and parents arrive speaking neither English nor Spanish, making medical care, legal consent, and basic safety impossible without interpretation. The story is a public record of community demands after the deaths of Indigenous children in U.S. custody.',
    excerpt:
      'Nearly 150 people protested outside the U.S. Customs and Border Protection building, demanding better monitoring of detention centers and Indigenous language access.',
    date: 'Jul 9, 2019',
    author: 'Josephine Chu and Thomas Ilalaole',
    sourceName: 'Medill News Service',
    sourceUrl: 'https://dc.medill.northwestern.edu/blog/2019/07/09/protesters-demand-protection-for-indigenous-migrant-children/#sthash.K96fgxkO.dpbs',
    type: 'external',
    featured: true,
    socialTitle: 'Indigenous children deserve language access and protection',
    socialDescription:
      'Maya organizers and allies demanded detention oversight, humane treatment, and Indigenous language interpretation outside CBP headquarters.',
    suggestedPostCopy:
      'Indigenous identity and language access are life-and-death issues at the border. Read this dispatch from the International Mayan League archive.',
    hashtags: ['MayanLeague', 'IndigenousChildren', 'LanguageAccess', 'Immigration'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1745104283244-6e7d0deffc20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwzfHxpbW1pZ3JhdGlvbiUyMHByb3Rlc3R8ZW58MHwwfHx8MTc3OTA3NzYxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Protestors demonstrate for due process rights.',
      caption:
        'A protest sign calling for due process, used here as a visual reference for the article’s focus on detention, legal rights, and language access.',
      photographerName: 'Chad Stembridge',
      photographerUrl: 'https://unsplash.com/@cstembridge?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/protestors-demonstrate-for-due-process-rights-cFXFIBL3coc?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'cFXFIBL3coc',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/cFXFIBL3coc/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwzfHxpbW1pZ3JhdGlvbiUyMHByb3Rlc3R8ZW58MHwwfHx8MTc3OTA3NzYxNXww',
      paletteNotes: [
        'Dominant color: #730c26',
        'Flexible crop for article image modules and balanced editorial layouts.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'Amazonia Synod 7: Laudato Si and the Synod on the Amazon',
    slug: 'amazonia-synod-laudato-si-synod-amazon',
    category: 'Human Rights',
    keywords: ['Amazon', 'Indigenous rights', 'faith communities', 'forced migration'],
    dek:
      'A faith-rooted reflection ties child migration, climate disruption, extractive economies, and Indigenous survival into one shared moral question.',
    summary:
      'This reflection connects Indigenous child migration, structural inequality, and environmental justice to broader faith-based calls for solidarity with Indigenous peoples.',
    whyItMatters:
      'The article places Indigenous migration within a wider ecology of harm: climate change, mining, poverty, and political exclusion all push families from their lands. It also preserves Juanita Cabrera Lopez’s reminder that Indigenous children forced to migrate are among those most affected by centuries of discrimination in Guatemala.',
    excerpt:
      'Each Indigenous child whose life was stolen was forced to migrate because they are among those most affected by structural inequality and discrimination.',
    date: 'Jun 2, 2019',
    author: 'Scott Wright',
    sourceName: 'Independent Catholic News',
    sourceUrl: 'https://www.indcatholicnews.com/news/37214',
    type: 'external',
    socialTitle: 'Climate, migration, and the cry of Indigenous children',
    socialDescription:
      'A faith-rooted reflection connects forced migration, climate disruption, extractive economies, and Indigenous survival.',
    suggestedPostCopy:
      'Forced migration, climate disruption, and Indigenous survival are connected. Read this dispatch from the International Mayan League archive.',
    hashtags: ['MayanLeague', 'HumanRights', 'ClimateJustice', 'IndigenousRights'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1593069567131-53a0614dde1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwxfHxBbWF6b24lMjByYWluZm9yZXN0JTIwSW5kaWdlbm91cyUyMGNsaW1hdGUlMjBtaWdyYXRpb258ZW58MHwwfHx8MTc3OTA4NTIzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Aerial view of dense green forest canopy.',
      caption:
        'A forest canopy used as a visual reference for the article’s focus on climate disruption, land, migration, and Indigenous survival.',
      photographerName: 'Vlad Hilitanu',
      photographerUrl: 'https://unsplash.com/@vladhilitanu?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/aerial-view-of-green-trees-pt7QzB4ZLWw?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'pt7QzB4ZLWw',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/pt7QzB4ZLWw/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwxfHxBbWF6b24lMjByYWluZm9yZXN0JTIwSW5kaWdlbm91cyUyMGNsaW1hdGUlMjBtaWdyYXRpb258ZW58MHwwfHx8MTc3OTA4NTIzNXww',
      paletteNotes: [
        'Dominant color: #26260c',
        'Best suited for wide hero sections, editorial banners, or Open Graph crops.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'Who Killed Claudia Gomez?',
    slug: 'who-killed-claudia-gomez',
    category: 'Justice',
    keywords: ['Claudia Gomez', 'Border Patrol', 'migration', 'accountability'],
    dek:
      'Claudia Gomez left home carrying clothes and corn from her family’s yard. Days later, her death became a test of whether border violence would be named and investigated.',
    summary:
      'A year after Claudia Patricia Gomez Gonzalez was killed by a Border Patrol agent, the article asks whether her family will receive answers, accountability, and justice.',
    whyItMatters:
      'Claudia’s story is not only about one fatal shooting. It reveals how Indigenous women migrants can be reduced to statistics while their families are left without answers. Keeping this article in the archive centers her name, her family, and the unresolved demand for accountability.',
    excerpt:
      'A 20-year-old Guatemalan woman seeking opportunity in the U.S. was shot dead by a Border Patrol agent in Texas.',
    date: 'May 1, 2019',
    author: 'Lauren Bohn',
    sourceName: 'Marie Claire',
    sourceUrl: 'https://www.marieclaire.com/politics/a27319518/claudia-gomez-killed-mexico-us-border-by-border-patrol-agent/',
    type: 'external',
    featured: true,
    socialTitle: 'Who killed Claudia Gomez?',
    socialDescription:
      'Claudia Gomez’s death remains a demand for accountability, memory, and justice at the border.',
    suggestedPostCopy:
      'Claudia Gomez’s name belongs in the archive of border accountability and Indigenous migrant justice. Read this dispatch.',
    hashtags: ['MayanLeague', 'Justice', 'ClaudiaGomez', 'BorderAccountability'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1604251086259-8f3bf6000a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwxfHxHdWF0ZW1hbGElMjBjb3JufGVufDB8MHx8fDE3NzkwODUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Green field and mountains in Guatemala.',
      caption:
        'A rural Guatemala landscape used as a respectful visual reference for Claudia Gomez’s home, family, and the journey named in the article.',
      photographerName: 'Kellie Shepherd Moeller',
      photographerUrl: 'https://unsplash.com/@kmoeller?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/green-grass-field-near-mountains-during-daytime-gzRpFNak3vs?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'gzRpFNak3vs',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/gzRpFNak3vs/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwxfHxHdWF0ZW1hbGElMjBjb3JufGVufDB8MHx8fDE3NzkwODUyNTN8MA',
      paletteNotes: [
        'Dominant color: #c0d9f3',
        'Flexible crop for cards, square modules, and balanced bento layouts.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'Report: Department of Homeland Security is ill-equipped to protect the lives Indigenous immigrants',
    slug: 'dhs-ill-equipped-protect-indigenous-immigrants',
    category: 'Indigenous Languages',
    keywords: ['DHS', 'language access', 'asylum seekers', 'Indigenous migrants'],
    dek:
      'When a person cannot explain pain, fear, illness, or consent in a language officials understand, language access becomes a matter of life and death.',
    summary:
      'The report highlights how language barriers between federal officials and Indigenous immigrants can create life-or-death consequences for asylum seekers at the southern border.',
    whyItMatters:
      'This article documents the structural failure behind many border harms: DHS encounters Indigenous language speakers at nearly every stage of immigration processing, yet interpretation is often delayed, unavailable, or routed through multiple languages. For Maya migrants in detention, that gap can determine whether medical needs are heard at all.',
    excerpt:
      'Language barriers between DHS officials and Indigenous immigrant and asylum seekers have life-or-death consequences.',
    date: 'Feb 21, 2019',
    author: 'Rebekah Entralgo',
    sourceName: 'ThinkProgress',
    sourceUrl: 'https://archive.thinkprogress.org/homeland-security-language-barriers-immigrants-38a0b4b0d071/',
    type: 'external',
    socialTitle: 'Language access is a matter of life and death',
    socialDescription:
      'A report shows how DHS language barriers endanger Indigenous immigrants and asylum seekers.',
    suggestedPostCopy:
      'When Indigenous migrants cannot communicate medical needs, fear, or consent, language access becomes a matter of life and death.',
    hashtags: ['MayanLeague', 'IndigenousLanguages', 'LanguageAccess', 'HumanRights'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1454496406107-dc34337da8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwyfHxpbW1pZ3JhdGlvbiUyMGRvY3VtZW50cyUyMGFzeWx1bXxlbnwwfDB8fHwxNzc5MDg1OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'A passport booklet rests on top of immigration paperwork.',
      caption:
        'Immigration paperwork used as a closer visual reference for the article’s focus on asylum processing, official systems, and the need for language access.',
      photographerName: 'Nicole Geri',
      photographerUrl: 'https://unsplash.com/@nicolegeri?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/passport-booklet-on-top-of-white-paper-gMJ3tFOLvnA?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'gMJ3tFOLvnA',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/gMJ3tFOLvnA/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwyfHxpbW1pZ3JhdGlvbiUyMGRvY3VtZW50cyUyMGFzeWx1bXxlbnwwfDB8fHwxNzc5MDg1OTgwfDA',
      paletteNotes: [
        'Dominant color: #0c2626',
        'Best suited for wide hero sections, editorial banners, or Open Graph crops.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'Art Can Transform the World',
    slug: 'art-can-transform-the-world',
    category: 'Culture & Identity',
    keywords: ['Grupo Sotzil', 'Maya dance', 'cultural preservation', 'arts'],
    dek:
      'A performance of “Uk’u’x Ulew: Heart of the Earth” turned a local gathering into a lesson in memory, resistance, and cultural continuity.',
    summary:
      'Coverage of a Maya dance performance in Centreville highlights the role of art, performance, and cultural expression in sharing messages of strength, unity, and resistance.',
    whyItMatters:
      'The story shows culture as strategy, not decoration. Through dance, music, and youth education, Grupo Sotz’il and community partners made ancestral knowledge visible while connecting cultural pride to deportation threats, environmental destruction, and the search for balance with Mother Earth.',
    excerpt:
      'Grupo Sotz’il performed “Uk’u’x Ulew: Heart of the Earth” in Centreville’s Historic District.',
    date: 'Sep 13, 2017',
    sourceName: 'Connection Newspapers',
    sourceUrl: 'https://www.connectionnewspapers.com/news/2017/sep/13/art-can-transform-world/',
    type: 'external',
    socialTitle: 'Art can transform the world',
    socialDescription:
      'A Maya dance performance becomes a lesson in memory, resistance, cultural continuity, and balance with Mother Earth.',
    suggestedPostCopy:
      'Culture is strategy, memory, and resistance. Read this dispatch from the International Mayan League archive.',
    hashtags: ['MayanLeague', 'Culture', 'MayaArt', 'IndigenousIdentity'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1669572203593-d11ad4d3e15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwzfHxHdWF0ZW1hbGElMjB0cmFkaXRpb25hbCUyMGRhbmNlfGVufDB8MHx8fDE3NzkwODUyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Group of people in traditional dress.',
      caption:
        'Traditional dress and gathering used as a visual reference for the article’s focus on Maya cultural expression and continuity.',
      photographerName: 'mana5280',
      photographerUrl: 'https://unsplash.com/@mana5280?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/a-group-of-people-in-traditional-dress-qsd4lDgg2QA?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'qsd4lDgg2QA',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/qsd4lDgg2QA/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwzfHxHdWF0ZW1hbGElMjB0cmFkaXRpb25hbCUyMGRhbmNlfGVufDB8MHx8fDE3NzkwODUyNTl8MA',
      paletteNotes: [
        'Dominant color: #595959',
        'Flexible crop for cards, square modules, and balanced bento layouts.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'In Defense of Land and Water, From Standing Rock to Guatemala',
    slug: 'defense-land-water-standing-rock-guatemala',
    category: 'Land & Water',
    keywords: ['Standing Rock', 'water protection', 'Maya authorities', 'land defense'],
    dek:
      'From Guatemala to Standing Rock, Mayan Ancestral Authorities carried a clear message: the defense of water does not stop at borders.',
    summary:
      'Mayan Ancestral Authorities connect struggles for land and water defense in Guatemala with the resistance at Standing Rock, emphasizing that defense of water knows no borders.',
    whyItMatters:
      'This article frames Standing Rock as part of a global Indigenous struggle against extraction and dispossession. By linking Maya land defense in Guatemala with Lakota resistance to the Dakota Access Pipeline, it documents solidarity rooted in shared responsibilities to water, territory, and future generations.',
    excerpt:
      'The defense of water knows no borders, according to the Mayan Ancestral Authorities.',
    date: 'Aug 9, 2017',
    author: 'Jeff Abbott',
    sourceName: 'Remezcla',
    sourceUrl: 'https://remezcla.com/culture/mayan-elders-guatemala-standing-rock-solidarity-nodapl/',
    type: 'external',
    featured: true,
    socialTitle: 'The defense of water knows no borders',
    socialDescription:
      'Mayan Ancestral Authorities connect land and water defense from Guatemala to Standing Rock.',
    suggestedPostCopy:
      'From Guatemala to Standing Rock, the defense of water knows no borders. Read this dispatch from the International Mayan League archive.',
    hashtags: ['MayanLeague', 'LandAndWater', 'StandingRock', 'WaterIsLife'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1612655811304-2acabb5b5a47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwyfHxHdWF0ZW1hbGElMjBJbmRpZ2Vub3VzJTIwcHJvdGVzdHxlbnwwfDB8fHwxNzc5MDg1NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'People gather on a street during a protest in Guatemala.',
      caption:
        'A Guatemala street gathering used as a closer visual reference for the article’s focus on Indigenous land, water, and cross-movement solidarity.',
      photographerName: 'Shalom de León',
      photographerUrl: 'https://unsplash.com/@sakgraphy?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/people-gathering-on-street-during-daytime-Xb2PP_pwQok?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'Xb2PP_pwQok',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/Xb2PP_pwQok/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwyfHxHdWF0ZW1hbGElMjBJbmRpZ2Vub3VzJTIwcHJvdGVzdHxlbnwwfDB8fHwxNzc5MDg1NTUxfDA',
      paletteNotes: [
        'Dominant color: #c0c0d9',
        'Best suited for wide hero sections, editorial banners, or Open Graph crops.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'Mayan Elders from Guatemala Traveled to Standing Rock to Show Their Support for #NoDAPL',
    slug: 'mayan-elders-guatemala-standing-rock-nodapl',
    category: 'Land & Water',
    keywords: ['Standing Rock', 'NoDAPL', 'Maya elders', 'Indigenous solidarity'],
    dek:
      'The journey to Standing Rock transformed solidarity from a statement into a meeting between peoples carrying histories of genocide, land defense, and survival.',
    summary:
      'Mayan elders from Guatemala traveled to Standing Rock to stand with the Sioux Tribe against the Dakota Access Pipeline, linking Indigenous land defense across borders.',
    whyItMatters:
      'Remezcla’s coverage makes the symbolic weight of the visit clear: Maya communities who endured genocide and continue fighting for land justice stood with Standing Rock water protectors. The article helps show how #NoDAPL became an international Indigenous movement rather than a single-site protest.',
    excerpt:
      'Mayan Ancestral Authorities from Guatemala traveled to Standing Rock to demonstrate solidarity with the movement against the Dakota Access Pipeline.',
    date: 'Nov 8, 2016',
    author: 'Andrew S. Vargas',
    sourceName: 'Remezcla',
    sourceUrl: 'https://remezcla.com/culture/mayan-elders-guatemala-standing-rock-solidarity-nodapl/',
    type: 'external',
    socialTitle: 'Mayan elders stood with Standing Rock',
    socialDescription:
      'Mayan Ancestral Authorities traveled to Standing Rock to support #NoDAPL and internationalize Indigenous land defense.',
    suggestedPostCopy:
      'Maya elders carried histories of survival and land defense to Standing Rock. Read this dispatch from the International Mayan League archive.',
    hashtags: ['MayanLeague', 'NoDAPL', 'StandingRock', 'IndigenousSolidarity'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1551941270-6e0300bf5969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwxfHxNYXlhbiUyMGVsZGVycyUyMHByb3Rlc3R8ZW58MHwwfHx8MTc3OTA4NTUzOHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Indigenous women lead a protest march.',
      caption:
        'An Indigenous women-led march used as a closer visual reference for the article’s focus on elders, family, Standing Rock, and Indigenous land defense.',
      photographerName: 'Dulcey Lima',
      photographerUrl: 'https://unsplash.com/@dulceylima?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/group-of-women-walking-at-the-street-protesting-about-womans-right-AQxl8gSYJ-c?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'AQxl8gSYJ-c',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/AQxl8gSYJ-c/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHwxfHxNYXlhbiUyMGVsZGVycyUyMHByb3Rlc3R8ZW58MHwwfHx8MTc3OTA4NTUzOHww',
      paletteNotes: [
        'Dominant color: #595973',
        'Best suited for wide hero sections, editorial banners, or Open Graph crops.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
  {
    title: 'Mayan Elders Go to Standing Rock to Show Solidarity',
    slug: 'mayan-elders-standing-rock-solidarity',
    category: 'Community Action',
    keywords: ['Standing Rock', 'solidarity', 'Maya Nation', 'Mother Earth'],
    dek:
      'At Oceti Sakowin Camp, Maya representatives shared pain, prayer, and solidarity with Standing Rock leaders defending sacred water.',
    summary:
      'Maya representatives from the Mam and Ixil peoples came to Oceti Sakowin Camp to share their experiences, support Standing Rock, and affirm international Indigenous solidarity.',
    whyItMatters:
      'This piece preserves the movement language of the moment: the Dakota Access Pipeline was named as a threat not only to the Sioux Nation, but to Mother Earth. It records how Maya, Aztec, Maori, and other Indigenous peoples recognized Standing Rock as part of a worldwide defense of land, water, and life.',
    excerpt:
      'Maya representatives from the Mam and Ixil peoples of Guatemala came to the Oceti Sakowin Camp to meet with Standing Rock leaders.',
    date: 'Nov 2016',
    sourceName: 'White Wolf Pack',
    sourceUrl: 'https://www.whitewolfpack.com/2016/11/mayan-elders-go-to-standing-rock-to.html',
    type: 'external',
    socialTitle: 'Maya solidarity at Standing Rock',
    socialDescription:
      'Maya representatives from the Mam and Ixil peoples joined Standing Rock leaders in defense of sacred water and Mother Earth.',
    suggestedPostCopy:
      'Your fight is our fight. This archive dispatch records Maya solidarity with Standing Rock and the defense of Mother Earth.',
    hashtags: ['MayanLeague', 'StandingRock', 'MotherEarth', 'IndigenousSolidarity'],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1508978905892-a3b049964046?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHw3fHx0aXBpJTIwY2FtcCUyMGluZGlnZW5vdXN8ZW58MHwwfHx8MTc3OTI0NTIyMXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Five tipi tents stand in an open field under daylight.',
      caption:
        'A tipi encampment used as a closer visual reference for Oceti Sakowin Camp, prayer, international Indigenous solidarity, and the defense of sacred water.',
      photographerName: 'Martin Robles',
      photographerUrl: 'https://unsplash.com/@martinrobles?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      sourceName: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/five-tippi-tents-during-day-time-QtHzR4CN1kQ?utm_source=claude_projects_design_toolkit&utm_medium=referral',
      unsplashPhotoId: 'QtHzR4CN1kQ',
      unsplashDownloadLocation:
        'https://api.unsplash.com/photos/QtHzR4CN1kQ/download?ixid=M3w5NTQxNTJ8MHwxfHNlYXJjaHw3fHx0aXBpJTIwY2FtcCUyMGluZGlnZW5vdXN8ZW58MHwwfHx8MTc3OTI0NTIyMXww',
      paletteNotes: [
        'Dominant color: #c0d9d9',
        'Best suited for wide hero sections, editorial banners, or Open Graph crops.',
        'Includes a blur hash for low-quality image placeholders.',
      ],
    },
  },
]

export type LocalizedNewsArticle = Omit<NewsArticle, 'category' | 'keywords'> & {
  category: string
  keywords: string[]
}

export const localizedNewsCategories = {
  en: [...newsCategories],
  es: [
    'Justicia',
    'Tierra y agua',
    'Derechos humanos',
    'Inmigración',
    'Cultura e identidad',
    'Idiomas Indígenas',
    'Acción comunitaria',
  ],
} as const

const categoryLabelsEs: Record<NewsCategory, string> = {
  Justice: 'Justicia',
  'Land & Water': 'Tierra y agua',
  'Human Rights': 'Derechos humanos',
  Immigration: 'Inmigración',
  'Culture & Identity': 'Cultura e identidad',
  'Indigenous Languages': 'Idiomas Indígenas',
  'Community Action': 'Acción comunitaria',
}

const keywordLabelsEs: Record<string, string> = {
  'Indigenous children': 'Niñez Indígena',
  detention: 'detención',
  'language access': 'acceso lingüístico',
  'border policy': 'política fronteriza',
  Amazon: 'Amazonía',
  'Indigenous rights': 'derechos Indígenas',
  'faith communities': 'comunidades de fe',
  'forced migration': 'migración forzada',
  'Claudia Gomez': 'Claudia Gomez',
  'Border Patrol': 'Patrulla Fronteriza',
  migration: 'migración',
  accountability: 'rendición de cuentas',
  DHS: 'DHS',
  'asylum seekers': 'solicitantes de asilo',
  'Indigenous migrants': 'migrantes Indígenas',
  'Grupo Sotzil': 'Grupo Sotzil',
  'Maya dance': 'danza Maya',
  'cultural preservation': 'preservación cultural',
  arts: 'artes',
  'Standing Rock': 'Standing Rock',
  'water protection': 'defensa del agua',
  'Maya authorities': 'autoridades Mayas',
  'land defense': 'defensa territorial',
  NoDAPL: 'NoDAPL',
  'Maya elders': 'abuelas y abuelos Mayas',
  'Indigenous solidarity': 'solidaridad Indígena',
  solidarity: 'solidaridad',
  'Maya Nation': 'Nación Maya',
  'Mother Earth': 'Madre Tierra',
  'United Nations': 'Naciones Unidas',
  immigration: 'inmigración',
}

export const newsArticleTranslationsEs: Record<string, Partial<NewsArticle>> = {
  'iml-un-roundtable-human-rights-2026': {
    title: 'La LMI presenta en mesa redonda de la ONU sobre derechos humanos con el Alto Comisionado Türk',
    dek:
      'La Directora Ejecutiva Juanita Cabrera López llevó la declaración de la Liga Maya Internacional sobre los Derechos de los Pueblos Indígenas a una mesa redonda de la ONU junto al Alto Comisionado Volker Türk, centrando el impacto de las políticas migratorias inhumanas en las comunidades Mayas.',
    summary:
      'El 26 de marzo de 2026, la Liga Maya Internacional participó en una mesa redonda convocada por el Alto Comisionado de la ONU para los Derechos Humanos, Volker Türk. La Directora Ejecutiva Juanita Cabrera López presentó una declaración sobre la situación de los derechos humanos en Estados Unidos, con énfasis en cómo los sistemas de cumplimiento migratorio fallan a las comunidades migrantes Indígenas.',
    whyItMatters:
      'Las y los migrantes Mayas frecuentemente quedan fuera de los marcos legales migratorios diseñados en torno a la identidad nacional, no Indígena. La presencia de Juanita en la ONU afirma que las voces Indígenas deben ser centrales en las conversaciones internacionales de derechos humanos.',
    excerpt:
      'La Liga Maya Internacional se unió a una mesa redonda de las Naciones Unidas para presentar su declaración sobre los Derechos de los Pueblos Indígenas en el contexto de las políticas migratorias de EE.UU.',
    socialTitle: 'La LMI en la ONU: Nuestra voz sobre los derechos Indígenas',
    socialDescription:
      'La Directora Ejecutiva Juanita Cabrera López presentó en una mesa redonda de la ONU con el Alto Comisionado Volker Türk, abordando el impacto de las políticas migratorias en las comunidades Mayas.',
    suggestedPostCopy:
      'El 26 de marzo de 2026, llevamos las voces de las comunidades Mayas a los más altos niveles de la defensa internacional de los derechos humanos en la ONU.',
  },
  'protesters-demand-protection-indigenous-migrant-children': {
    title: 'Manifestantes exigen protección para la niñez migrante Indígena',
    dek:
      'Frente a la sede de CBP, organizadoras Mayas y aliadas nombraron lo que los sistemas de detención demasiadas veces borran: la identidad Indígena, el idioma y el derecho de la niñez a ser entendida.',
    summary:
      'Integrantes de la comunidad protestaron frente a la Oficina de Aduanas y Protección Fronteriza de Estados Unidos para exigir mayor protección para la niñez migrante Indígena, mejor supervisión de los centros de detención y acceso a interpretación en idiomas Indígenas.',
    whyItMatters:
      'La protesta conectó las condiciones de detención en la frontera con una crisis específica de derechos Indígenas: muchas niñas, niños, madres y padres Mayas llegan sin hablar inglés ni español, lo que hace imposible la atención médica, el consentimiento legal y la seguridad básica sin interpretación. La historia deja constancia pública de las demandas comunitarias tras la muerte de niñas y niños Indígenas bajo custodia estadounidense.',
    excerpt:
      'Casi 150 personas protestaron frente al edificio de CBP para exigir mejor monitoreo de los centros de detención y acceso a idiomas Indígenas.',
    socialTitle: 'La niñez Indígena merece acceso lingüístico y protección',
    socialDescription:
      'Organizadoras Mayas y aliadas exigieron supervisión de detención, trato humano e interpretación en idiomas Indígenas frente a la sede de CBP.',
    suggestedPostCopy:
      'La identidad Indígena y el acceso lingüístico son asuntos de vida o muerte en la frontera. Lee este despacho del archivo de la Liga Maya Internacional.',
  },
  'amazonia-synod-laudato-si-synod-amazon': {
    title: 'Sínodo de la Amazonía 7: Laudato Si y el Sínodo sobre la Amazonía',
    dek:
      'Una reflexión desde la fe conecta la migración infantil, la crisis climática, las economías extractivas y la supervivencia Indígena en una misma pregunta moral.',
    summary:
      'Esta reflexión vincula la migración de niñas y niños Indígenas, la desigualdad estructural y la justicia ambiental con llamados de fe a la solidaridad con los pueblos Indígenas.',
    whyItMatters:
      'El artículo sitúa la migración Indígena dentro de una ecología más amplia de daños: el cambio climático, la minería, la pobreza y la exclusión política expulsan a las familias de sus tierras. También preserva el recordatorio de Juanita Cabrera Lopez de que la niñez Indígena obligada a migrar está entre quienes más sufren siglos de discriminación en Guatemala.',
    excerpt:
      'Cada niña y niño Indígena cuya vida fue arrebatada fue obligado a migrar por estar entre los más afectados por la desigualdad estructural y la discriminación.',
  },
  'who-killed-claudia-gomez': {
    title: '¿Quién mató a Claudia Gomez?',
    dek:
      'Claudia Gomez salió de casa con ropa y maíz del patio de su familia. Días después, su muerte se convirtió en una prueba de si la violencia fronteriza sería nombrada e investigada.',
    summary:
      'Un año después de que Claudia Patricia Gomez Gonzalez fuera asesinada por un agente de la Patrulla Fronteriza, el artículo pregunta si su familia recibirá respuestas, rendición de cuentas y justicia.',
    whyItMatters:
      'La historia de Claudia no se trata solo de un tiroteo fatal. Revela cómo las mujeres migrantes Indígenas pueden ser reducidas a estadísticas mientras sus familias quedan sin respuestas. Mantener este artículo en el archivo centra su nombre, su familia y la demanda pendiente de rendición de cuentas.',
    excerpt:
      'Una mujer guatemalteca de 20 años que buscaba oportunidades en Estados Unidos fue asesinada por un agente de la Patrulla Fronteriza en Texas.',
  },
  'dhs-ill-equipped-protect-indigenous-immigrants': {
    title: 'Informe: Seguridad Nacional no está preparada para proteger la vida de inmigrantes Indígenas',
    dek:
      'Cuando una persona no puede explicar dolor, miedo, enfermedad o consentimiento en un idioma que las autoridades entienden, el acceso lingüístico se vuelve cuestión de vida o muerte.',
    summary:
      'El informe muestra cómo las barreras lingüísticas entre funcionarios federales e inmigrantes Indígenas pueden crear consecuencias de vida o muerte para solicitantes de asilo en la frontera sur.',
    whyItMatters:
      'Este artículo documenta la falla estructural detrás de muchos daños fronterizos: DHS se encuentra con hablantes de idiomas Indígenas en casi cada etapa del proceso migratorio, pero la interpretación suele retrasarse, no estar disponible o pasar por varios idiomas. Para migrantes Mayas en detención, esa brecha puede determinar si sus necesidades médicas son escuchadas.',
    excerpt:
      'Las barreras lingüísticas entre funcionarios de DHS e inmigrantes y solicitantes de asilo Indígenas tienen consecuencias de vida o muerte.',
  },
  'art-can-transform-the-world': {
    title: 'El arte puede transformar el mundo',
    dek:
      'Una presentación de “Uk’u’x Ulew: Corazón de la Tierra” convirtió un encuentro local en una lección de memoria, resistencia y continuidad cultural.',
    summary:
      'La cobertura de una presentación de danza Maya en Centreville destaca el papel del arte, la performance y la expresión cultural para compartir mensajes de fuerza, unidad y resistencia.',
    whyItMatters:
      'La historia muestra la cultura como estrategia, no como decoración. A través de la danza, la música y la educación juvenil, Grupo Sotz’il y sus aliadas hicieron visible el conocimiento ancestral mientras conectaban el orgullo cultural con amenazas de deportación, destrucción ambiental y la búsqueda de equilibrio con la Madre Tierra.',
    excerpt:
      'Grupo Sotz’il presentó “Uk’u’x Ulew: Corazón de la Tierra” en el distrito histórico de Centreville.',
  },
  'defense-land-water-standing-rock-guatemala': {
    title: 'En defensa de la tierra y el agua, de Standing Rock a Guatemala',
    dek:
      'De Guatemala a Standing Rock, las Autoridades Ancestrales Mayas llevaron un mensaje claro: la defensa del agua no se detiene en las fronteras.',
    summary:
      'Autoridades Ancestrales Mayas conectan las luchas por la defensa de la tierra y el agua en Guatemala con la resistencia en Standing Rock, subrayando que la defensa del agua no conoce fronteras.',
    whyItMatters:
      'Este artículo presenta Standing Rock como parte de una lucha Indígena global contra el extractivismo y el despojo. Al vincular la defensa territorial Maya en Guatemala con la resistencia Lakota al oleoducto Dakota Access, documenta una solidaridad arraigada en responsabilidades compartidas hacia el agua, el territorio y las futuras generaciones.',
    excerpt:
      'La defensa del agua no conoce fronteras, según las Autoridades Ancestrales Mayas.',
  },
  'mayan-elders-guatemala-standing-rock-nodapl': {
    title: 'Abuelas y abuelos Mayas de Guatemala viajaron a Standing Rock para apoyar #NoDAPL',
    dek:
      'El viaje a Standing Rock transformó la solidaridad de una declaración en un encuentro entre pueblos que cargan historias de genocidio, defensa territorial y supervivencia.',
    summary:
      'Abuelas y abuelos Mayas de Guatemala viajaron a Standing Rock para acompañar a la Nación Sioux contra el oleoducto Dakota Access, conectando la defensa territorial Indígena a través de fronteras.',
    whyItMatters:
      'La cobertura de Remezcla deja claro el peso simbólico de la visita: comunidades Mayas que sobrevivieron genocidio y siguen luchando por justicia territorial acompañaron a protectoras y protectores del agua en Standing Rock. El artículo ayuda a mostrar cómo #NoDAPL se volvió un movimiento Indígena internacional y no una protesta de un solo lugar.',
    excerpt:
      'Autoridades Ancestrales Mayas de Guatemala viajaron a Standing Rock para demostrar solidaridad con el movimiento contra el oleoducto Dakota Access.',
  },
  'mayan-elders-standing-rock-solidarity': {
    title: 'Abuelas y abuelos Mayas van a Standing Rock para mostrar solidaridad',
    dek:
      'En el campamento Oceti Sakowin, representantes Mayas compartieron dolor, oración y solidaridad con líderes de Standing Rock que defendían el agua sagrada.',
    summary:
      'Representantes Mayas de los pueblos Mam e Ixil llegaron al campamento Oceti Sakowin para compartir sus experiencias, apoyar a Standing Rock y afirmar la solidaridad Indígena internacional.',
    whyItMatters:
      'Esta pieza conserva el lenguaje del movimiento en ese momento: el oleoducto Dakota Access fue nombrado como una amenaza no solo para la Nación Sioux, sino para la Madre Tierra. Registra cómo pueblos Mayas, Aztecas, Maori y otros pueblos Indígenas reconocieron Standing Rock como parte de una defensa mundial de la tierra, el agua y la vida.',
    excerpt:
      'Representantes Mayas de los pueblos Mam e Ixil de Guatemala llegaron al campamento Oceti Sakowin para reunirse con líderes de Standing Rock.',
  },
}

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug)
}

export function getLocalizedNewsArticle(article: NewsArticle, lang: 'en' | 'es'): LocalizedNewsArticle {
  if (lang === 'en') {
    return article
  }

  const fromSanity = article._i18n?.es
  const fromStatic = newsArticleTranslationsEs[article.slug] || {}
  const translation = { ...fromStatic, ...fromSanity }

  return {
    ...article,
    ...translation,
    category: translation.category ?? categoryLabelsEs[article.category],
    keywords: (translation.keywords ?? article.keywords).map(
      (keyword) => keywordLabelsEs[keyword] || keyword,
    ),
    mainImage: article.mainImage
      ? {
          ...article.mainImage,
          alt:
            translation.mainImage?.alt ??
            (article.slug === 'protesters-demand-protection-indigenous-migrant-children'
              ? 'Manifestantes protestan por derechos al debido proceso.'
              : article.slug === 'mayan-elders-standing-rock-solidarity'
                ? 'Cinco tipis en un campo abierto bajo la luz del día.'
                : article.mainImage.alt),
          caption: translation.mainImage?.caption ?? article.mainImage.caption,
        }
      : undefined,
  }
}

export function getNewsArticleUrl(slug: string) {
  return `${siteUrl}/news/${slug}`
}

export function getNewsShareImageUrl(slug: string) {
  return `/news/${slug}/opengraph-image?v=article-photo`
}

export function getNewsInstagramStoryImageUrl(slug: string) {
  return `/news/${slug}/instagram-story-image`
}

export function getNewsShareImageAbsoluteUrl(slug: string) {
  return `${siteUrl}/news/${slug}/opengraph-image?v=article-photo`
}

export function getNewsSocial(article: NewsArticle) {
  const hashtags = article.hashtags || [
    'MayanLeague',
    article.category.replace(/[^a-zA-Z0-9]/g, ''),
    ...article.keywords.slice(0, 2).map((keyword) => keyword.replace(/[^a-zA-Z0-9]/g, '')),
  ]

  return {
    title: article.socialTitle || article.title,
    description: article.socialDescription || article.dek,
    suggestedPostCopy:
      article.suggestedPostCopy ||
      `${article.dek}\n\nRead this dispatch from the International Mayan League archive.`,
    hashtags,
    shareImage: article.shareImage || getNewsShareImageAbsoluteUrl(article.slug),
    shareImageAlt:
      article.shareImageAlt ||
      `Branded Mayan League share card for ${article.title}`,
  }
}

export function getFeaturedNewsArticles() {
  return newsArticles.filter((article) => article.featured)
}

export function getRelatedNewsArticles(article: NewsArticle, limit = 3) {
  return newsArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedKeywords = candidate.keywords.filter((keyword) => article.keywords.includes(keyword)).length
      const categoryScore = candidate.category === article.category ? 3 : 0
      return { article: candidate, score: categoryScore + sharedKeywords }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: relatedArticle }) => relatedArticle)
}
