import { EventItem } from '../types/event';
import { getRelativeDate } from '../utils/dateUtils';

export const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Зцілююче коло Рейкі: Відновлення життєвої енергії та баланс чакр',
    slug: 'healing-reiki-circle',
    category: 'reiki',
    categoryName: '🌿 Рейкі',
    ...getRelativeDate(0), // Сьогодні
    time: '20:00 (Київ)',
    durationMinutes: 75,
    platform: 'Zoom',
    platformUrl: 'https://zoom.us/j/example-reiki',
    priceType: 'donation',
    priceFormatted: 'Вільний донейшн',
    priceAmount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: `Запрошую у теплий та безпечний онлайн-простір для відновлення внутрішнього балансу через традиційну японську практику Рейкі.

Під час сесії ми:
• Відпустимо накопичений стрес, напругу в плечах та тілесні затиски;
• М'яко очистимо та гармонізуємо 7 основних енергетичних центрів (чакр);
• Наповнимося чистим потоком універсальної життєвої енергії;
• Завершимо практику глибоким заземленням і почуттям спокою.

Практика підходить як для новачків, так і для тих, хто вже має налаштування у Рейкі.`,
    programSteps: [
      'Вступне налаштування та створення безпечного енергетичного кола (10 хв)',
      'Дихання Гасьо та сканування тіла Бьосен (15 хв)',
      'Основна дистанційна передача Рейкі для кожного учасника (35 хв)',
      'Мʼякий вихід, інтеграція та відповіді на відчуття (15 хв)'
    ],
    preparationTips: [
      { icon: '🎧', text: 'Навушники для чистого аудіосупроводу' },
      { icon: '🕯', text: 'Свічка або улюблені пахощі (ладан, пало санто)' },
      { icon: '🛋', text: 'Зручний одяг, теплий плед і подушка' },
      { icon: '💧', text: 'Склянка чистої води кімнатної температури' }
    ],
    master: {
      id: 'm1',
      name: 'Олена Вайра',
      title: 'Майстер-вчитель традиційного Рейкі Усуї, енерготерапевт',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      bio: 'Понад 8 років проводжу цілющі сесії та навчаю слухати внутрішню мудрість тіла. Допомагаю відновити ресурс у періоди виснаження.',
      experienceYears: 8,
      telegram: '@elena_vaira'
    },
    viewsCount: 428
  },
  {
    id: '2',
    title: 'Вечірня медитація спокою: Звільнення від ментального шуму та тривоги',
    slug: 'evening-mindfulness-peace',
    category: 'meditation',
    categoryName: '🧘 Медитації',
    ...getRelativeDate(1), // Завтра
    time: '21:00 (Київ)',
    durationMinutes: 50,
    platform: 'YouTube Live',
    platformUrl: 'https://youtube.com/live/example-mindfulness',
    priceType: 'free',
    priceFormatted: 'Безкоштовно',
    priceAmount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    description: `Після насиченого дня наш розум продовжує крутити плани, розмови та тривожні думки. Ця практика створена, щоб повернути вашу увагу додому — у серце і тіло.

Через керовану візуалізацію та техніку Yoga Nidra ми розслабимо нервову систему, активуємо парасимпатичний режим та підготуємося до глибокого здорового сну.`,
    programSteps: [
      'Мʼяке занурення: відпускання очікувань дня (5 хв)',
      'Свідоме розслаблення тіла від маківки до кінчиків пальців (20 хв)',
      'Занурення у стан внутрішньої тиші та світла (15 хв)',
      'Тихе завершення без зайвих слів (10 хв)'
    ],
    preparationTips: [
      { icon: '🔕', text: 'Вимкнути всі сповіщення на телефоні' },
      { icon: '🛌', text: 'Можна лягти у ліжко або комфортно присісти' },
      { icon: '🌙', text: 'Приглушене вечірнє світло у кімнаті' },
      { icon: '🎧', text: 'Бажано навушники для ефекту присутності' }
    ],
    master: {
      id: 'm2',
      name: 'Данило Мирний',
      title: 'Інструктор Mindfulness та соматичної уважності',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Практикую медитацію 10 років, навчався у монастирях Непалу. Проводжу відкриті вечірні зустрічі для українців.',
      experienceYears: 10,
      instagram: '@danylo.peace'
    },
    viewsCount: 689
  },
  {
    id: '3',
    title: 'Звукова ванна: Тибетські співочі чаші, гонги та шум океану',
    slug: 'sound-bath-tibetan-bowls',
    category: 'sound',
    categoryName: '🔔 Звукотерапія',
    ...getRelativeDate(2), // Через 2 дні
    time: '19:30 (Київ)',
    durationMinutes: 90,
    platform: 'Zoom HD Audio',
    platformUrl: 'https://zoom.us/j/example-soundbath',
    priceType: 'fixed',
    priceFormatted: '400 ₴',
    priceAmount: 400,
    bannerUrl: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
    description: `Звукова терапія (Sound Healing) — це найдавніший спосіб глибокої регенерації клітин тіла через вібрації.

У трансляції використовується студійне стереофонічне обладнання високої чіткості, що передає найтонші обертони 7 кованих тибетських чаш, планетарного гонгу та інструментів коші (стихії вітру і води). Вібрації нормалізують хвилі мозку (переводять у альфа- і тета-стан).`,
    programSteps: [
      'Вступна гармонізація дихання (10 хв)',
      'Занурення у звукове поле тибетських чаш (30 хв)',
      'Кульмінація: вібрація очисного гонгу (25 хв)',
      'Кришталеві чаші та дзвіночки Коші для мʼякого пробудження (25 хв)'
    ],
    preparationTips: [
      { icon: '🎧', text: 'Якісні повнорозмірні навушники обовʼязкові' },
      { icon: '🛋', text: 'Місце, де можна повністю лягти на спину' },
      { icon: '👁', text: 'Повʼязка або маска на очі' },
      { icon: '☕', text: 'Травʼяний чай після завершення' }
    ],
    master: {
      id: 'm3',
      name: 'Анна Світла',
      title: 'Sound-терапевт, дослідниця акустичного впливу',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Створюю звукові ландшафти, які повертають до відчуття дому всередині. Авторка авторських аудіо-подорожей.',
      experienceYears: 6
    },
    viewsCount: 512
  },
  {
    id: '4',
    title: 'Енергетичний детокс та захист: Очищення аури та відновлення меж',
    slug: 'energy-detox-aura-clearing',
    category: 'energy',
    categoryName: '🔮 Енергопрактики',
    ...getRelativeDate(3), // Через 3 дні
    time: '18:00 (Київ)',
    durationMinutes: 70,
    platform: 'Zoom',
    platformUrl: 'https://zoom.us/j/example-energy',
    priceType: 'fixed',
    priceFormatted: '350 ₴',
    priceAmount: 350,
    bannerUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    description: `Коли ми щодня взаємодіємо з великою кількістю людей та новинних каналів, наше енергетичне поле накопичує чужорідні вібрації, чужі емоції та втому.

Ця сесія — це генеральне прибирання вашого тонкого простору. Ми виявимо місця відтоку енергії, розірвемо неекологічні енергетичні зв'язки та відбудуємо міцне, сяюче захисне поле навколо вас.`,
    programSteps: [
      'Діагностика власного стану та енергетичних витоків (15 хв)',
      'Техніка вогняного очищення ментальних каналів (20 хв)',
      'Побудова дзеркальної сфери захисту (25 хв)',
      'Закріплення та індивідуальні рекомендації (10 хв)'
    ],
    preparationTips: [
      { icon: '🕯', text: 'Біла свічка' },
      { icon: '🧂', text: 'Дрібка солі біля робочого місця' },
      { icon: '🪑', text: 'Стілець, щоб стопи впевнено торкалися підлоги' },
      { icon: '📝', text: 'Блокнот та ручка для інсайтів' }
    ],
    master: {
      id: 'm4',
      name: 'Ярослав Вогняний',
      title: 'Практик біоенергетики та кармічної корекції',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Працюю з тонким планом, поєднуючи давні словʼянські та ведичні знання про енергетичну анатомію людини.',
      experienceYears: 12
    },
    viewsCount: 310
  },
  {
    id: '5',
    title: 'Пранаяма та звʼязне дихання: Пробудження внутрішнього вогню',
    slug: 'pranayama-breathwork-awakening',
    category: 'breath',
    categoryName: '🌬 Дихання',
    ...getRelativeDate(4), // Через 4 дні
    time: '09:00 (Київ)',
    durationMinutes: 60,
    platform: 'Google Meet',
    platformUrl: 'https://meet.google.com/example-breath',
    priceType: 'donation',
    priceFormatted: 'Вільний донейшн',
    priceAmount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    description: `Ранкова активізуюча сесія усвідомленого дихання. Подих — це прямий міст між свідомістю та вегетативною нервовою системою.

Через комбінацію Капалабхаті, Анулома Вілома та зв'язного циркулярного дихання ми наситимо кров киснем, усунемо застійні явища в легенях та зарядимося енергією на весь день.`,
    programSteps: [
      'Мʼяка розминка шиї та грудного відділу (10 хв)',
      'Очисні дихальні цикли (20 хв)',
      'Затримки дихання (Кумбхака) для розширення життєвої ємності (20 хв)',
      'Інтеграція в тиші та намір на день (10 хв)'
    ],
    preparationTips: [
      { icon: '🪟', text: 'Добре провітрити кімнату перед початком' },
      { icon: '☕', text: 'Практикувати натщесерце або випивши теплої води' },
      { icon: '🧘', text: 'Килимок для йоги або зручна подушка для сидіння' }
    ],
    master: {
      id: 'm5',
      name: 'Марта Сонячна',
      title: 'Сертифікований викладач йоги та Breathwork',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Понад 7 років навчаю людей дихати повноцінно і вільно, знімаючи хронічні блоки у грудях та діафрагмі.',
      experienceYears: 7
    },
    viewsCount: 395
  },
  {
    id: '6',
    title: 'Жіноче онлайн-коло: Звʼязок з інтуїцією та стихією Води',
    slug: 'womens-sacred-circle',
    category: 'women_circle',
    categoryName: '🌸 Жіночі кола',
    ...getRelativeDate(5), // Через 5 днів
    time: '19:00 (Київ)',
    durationMinutes: 90,
    platform: 'Zoom',
    platformUrl: 'https://zoom.us/j/example-women-circle',
    priceType: 'fixed',
    priceFormatted: '450 ₴',
    priceAmount: 450,
    bannerUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
    description: `Простір щирості, підтримки та відновлення жіночої чуттєвості. У колі ми знімемо тягар контролю, повернемося до плавного, текучого стану та зʼєднаємося з архетипом внутрішньої Цілительки.

На вас чекають метафоричні асоціативні карти (МАК), сердечна медитація та індивідуальні послання для кожної учасниці.`,
    programSteps: [
      'Відкриття кола та знайомство (15 хв)',
      'Медитація занурення у сакральний центр серця (30 хв)',
      'Робота з метафоричними картами онлайн (25 хв)',
      'Благословення та закриття простору (20 хв)'
    ],
    preparationTips: [
      { icon: '🌸', text: 'Квітка або приємний аромат ефірної олії' },
      { icon: '🫖', text: 'Теплий напій (ромашковий або мʼятний чай)' },
      { icon: '👗', text: 'Одяг, у якому ви почуваєтеся жіночно та вільно' }
    ],
    master: {
      id: 'm6',
      name: 'Софія Лагода',
      title: 'Ведуча жіночих кіл, психолог, арт-терапевт',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      bio: 'Бережно тримаю простір для жінок понад 5 років, допомагаючи зцілювати стосунки з собою та відчувати силу роду.',
      experienceYears: 5
    },
    viewsCount: 460
  },
  {
    id: '7',
    title: 'Йога-нідра при свічках: Глибоке відновлення та перезавантаження',
    slug: 'yoga-nidra-candlelight',
    category: 'yoga',
    categoryName: '🧘 Йога',
    ...getRelativeDate(2), // Через 2 дні
    time: '20:30 (Київ)',
    durationMinutes: 60,
    platform: 'Zoom',
    platformUrl: 'https://zoom.us/j/example-yoga-nidra',
    priceType: 'donation',
    priceFormatted: 'Вільний донейшн',
    priceAmount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: `Йога психічного сну — це стан між неспанням та сном, у якому тіло відпочиває так само глибоко, як за 4 години звичайного сну.

Практика спрямована на перезавантаження нервової системи, зняття хронічної втоми та інтеграцію санкальпи (глибокого наміру душі).`,
    programSteps: [
      'Підготовка простору та зручне положення Шавасани (10 хв)',
      'Ротація свідомості по тілу та дихання (25 хв)',
      'Візуалізація символів та пробудження санкальпи (15 хв)',
      'Мʼяке пробудження та чаювання (10 хв)'
    ],
    preparationTips: [
      { icon: '🕯', text: 'Жива свічка у полі зору перед сном' },
      { icon: '🛋', text: 'Теплий плед та зручний валик під шию або коліна' },
      { icon: '🎧', text: 'Навушники для комфортного сприйняття голосу' }
    ],
    master: {
      id: 'm7',
      name: 'Катерина Жива',
      title: 'Викладач традиційної йоги та йога-терапевт',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      bio: 'Навчаю слухати тишу між думками та відновлювати життєву силу природним шляхом.',
      experienceYears: 9
    },
    viewsCount: 380
  },
  {
    id: '8',
    title: 'Кундаліні-активація: Підйом життєвої сили та ясності',
    slug: 'kundalini-activation-energy',
    category: 'energy',
    categoryName: '🔮 Енергопрактики',
    ...getRelativeDate(6), // Через 6 днів (останній день 7-денного вікна)
    time: '18:30 (Київ)',
    durationMinutes: 80,
    platform: 'Zoom',
    platformUrl: 'https://zoom.us/j/example-kundalini',
    priceType: 'fixed',
    priceFormatted: '500 ₴',
    priceAmount: 500,
    bannerUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    description: `Пряма передача енергії життєвої сили для активації власного внутрішнього потенціалу, розблокування скутих емоцій та відчуття чистого творчого потоку.`,
    programSteps: [
      'Налаштування на енергетичну частоту простору (15 хв)',
      'Активація через спеціальні музичні частоти та подих (45 хв)',
      'Заземлення та інтеграція нового стану (20 хв)'
    ],
    preparationTips: [
      { icon: '🧘', text: 'Повністю вільний простір для рухів тіла' },
      { icon: '💧', text: 'Пляшка чистої води' },
      { icon: '🔕', text: 'Усамітнення під час практики' }
    ],
    master: {
      id: 'm8',
      name: 'Олексій Промінь',
      title: 'Фасилітатор KAP (Kundalini Activation Process)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Провів понад 300 енергетичних сесій в Україні та Європі, допомагаючи людям відчути свою справжню силу.',
      experienceYears: 6
    },
    viewsCount: 520
  },
  {
    id: '9',
    title: 'Шаманська подорож під бубон: Пошук тотемної сили та мудрості роду',
    slug: 'shamanic-journey-drum',
    category: 'meditation',
    categoryName: '🧘 Медитації',
    ...getRelativeDate(9), // Через 9 днів (поза межами 7 днів)
    time: '19:00 (Київ)',
    durationMinutes: 90,
    platform: 'Zoom HD Audio',
    platformUrl: 'https://zoom.us/j/example-shamanic',
    priceType: 'fixed',
    priceFormatted: '450 ₴',
    priceAmount: 450,
    bannerUrl: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
    description: `Архетипова подорож під ритм шаманського бубна у Нижній Світ для зустрічі зі своїм тотемним провідником та отримання сили для подолання життєвих викликів.`,
    programSteps: [
      'Створення сакрального кола чотирьох сторін світу (15 хв)',
      'Подорож під ритмічне звучання бубна (45 хв)',
      'Повернення, закріплення інсайтів та малювання образу (30 хв)'
    ],
    preparationTips: [
      { icon: '👁', text: 'Щільна повʼязка на очі для повної темряви' },
      { icon: '📝', text: 'Папір і кольорові олівці' },
      { icon: '🕯', text: 'Свічка' }
    ],
    master: {
      id: 'm9',
      name: 'Тарас Світовид',
      title: 'Провідник шаманських практик та соматичний терапевт',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Досліджую давні трансові традиції та їхній цілющий вплив на сучасну психіку.',
      experienceYears: 11
    },
    viewsCount: 340
  },
  {
    id: '10',
    title: 'Голосова терапія: Звільнення природного звучання та горлової чакри',
    slug: 'vocal-therapy-throat-chakra',
    category: 'sound',
    categoryName: '🔔 Звукотерапія',
    ...getRelativeDate(12), // Через 12 днів (поза межами 7 днів)
    time: '18:00 (Київ)',
    durationMinutes: 75,
    platform: 'Google Meet',
    platformUrl: 'https://meet.google.com/example-vocal',
    priceType: 'donation',
    priceFormatted: 'Вільний донейшн',
    priceAmount: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
    description: `Голос — найшвидший інструмент розблокування тіла. Коли ми звучимо вільно, ми відпускаємо невисловлені образи, страх засудження та повертаємо сміливість заявляти про себе світові.`,
    programSteps: [
      'Зняття затисків щелепи та діафрагми (15 хв)',
      'Інтуїтивне інтонування та прозвучування чакр (35 хв)',
      'Спільне гармонійне коло звуку онлайн (25 хв)'
    ],
    preparationTips: [
      { icon: '💧', text: 'Тепла вода з лимоном' },
      { icon: '🪑', text: 'Зручна поза з прямою спиною' },
      { icon: '🚪', text: 'Простір, де ви можете звучати вголос без сорому' }
    ],
    master: {
      id: 'm10',
      name: 'Лада Голосна',
      title: 'Голосовий терапевт, співачка, етно-музикант',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Допомагаю віднайти автентичний голос і довіру до свого внутрішнього звучання.',
      experienceYears: 8
    },
    viewsCount: 290
  }
];
