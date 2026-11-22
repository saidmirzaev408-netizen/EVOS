// ISTIQLOL Products Data with Multi-language support and realistic pricing in Uzbek Soums (UZS)
export const initialCategories = [
  { id: 'all', name: { uz: 'Barchasi', ru: 'Все', en: 'All' }, icon: '✨' },
  { id: 'somsa', name: { uz: 'Somsa', ru: 'Самса', en: 'Samsa' }, icon: '🥟' },
  { id: 'pirojniy', name: { uz: 'Pirojniy', ru: 'Пирожные', en: 'Pastries' }, icon: '🍰' },
  { id: 'hotdogs', name: { uz: 'Hot-doglar', ru: 'Хот-доги', en: 'Hot Dogs' }, icon: '🌭' },
  { id: 'coffee', name: { uz: 'Qofe', ru: 'Кофе', en: 'Coffee' }, icon: '☕' },
  { id: 'tea', name: { uz: 'Choy', ru: 'Чай', en: 'Tea' }, icon: '🍵' },
  { id: 'mojito', name: { uz: 'Moxito', ru: 'Мохито', en: 'Mojito' }, icon: '🍹' },
  { id: 'napitkalar', name: { uz: 'Napitkalar', ru: 'Напитки', en: 'Cold Drinks' }, icon: '🥤' },
  { id: 'lavash', name: { uz: 'Lavash', ru: 'Лаваш', en: 'Lavash' }, icon: '🌯' },
  { id: 'burgers', name: { uz: 'Burgerlar', ru: 'Бургеры', en: 'Burgers' }, icon: '🍔' },
  { id: 'combos', name: { uz: 'Kombolar', ru: 'Комбо', en: 'Combos' }, icon: '🍱' }
];

export const initialProducts = [
  // ==========================================
  // 1. SOMSA (Tandir, Qatlama, Pishloqli, etc.)
  // ==========================================
  {
    id: 'sms-1',
    category: 'somsa',
    name: {
      uz: 'Tandir Go\'shtli Somsa',
      ru: 'Тандырная Самса с мясом',
      en: 'Traditional Tandoor Meat Samsa'
    },
    description: {
      uz: 'Tandirda pishirilgan, mayda to\'g\'ralgan shirali mol go\'shti, qora murch va piyoz bilan to\'ldirilgan qarsildoq somsa',
      ru: 'Хрустящая тандырная самса с рубленым сочным мясом говядины, лучком и восточной зирой',
      en: 'Crisp clay oven samsa packed with juicy minced beef, onions and traditional spices'
    },
    price: 14000,
    oldPrice: 16000,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    calories: '310 kcal',
    weight: '160g',
    rating: 4.95,
    reviewsCount: 384,
    badge: 'Xit',
    spicy: false,
    isPopular: true
  },
  {
    id: 'sms-2',
    category: 'somsa',
    name: {
      uz: 'Qatlama Mol Go\'shtli Somsa',
      ru: 'Слоеная Самса с говядиной',
      en: 'Flaky Layered Beef Samsa'
    },
    description: {
      uz: 'Ko\'p qatlamli sariyog\'li yupqa xamir, yumshoq maydalangan go\'sht va xushbo\'y zira',
      ru: 'Нежнейшее многослойное хрустящее тесто со сливочным маслом и отборной говядиной',
      en: 'Multi-layered flaky buttery pastry stuffed with tender beef and crushed cumin'
    },
    price: 15000,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80',
    calories: '330 kcal',
    weight: '170g',
    rating: 4.88,
    reviewsCount: 245,
    badge: 'Popular',
    spicy: false,
    isPopular: true
  },
  {
    id: 'sms-3',
    category: 'somsa',
    name: {
      uz: 'Pishloqli va Ko\'katli Somsa',
      ru: 'Самса с сыром и зеленью',
      en: 'Melted Cheese & Herb Samsa'
    },
    description: {
      uz: 'Erigan cho\'ziluvchan motsarella pishlog\'i, yangi rayhon va barra ko\'katlar bilan',
      ru: 'Тянущийся сыр моцарелла со свежей зеленью и базиликом в хрустящем тесте',
      en: 'Melted stretchy mozzarella cheese infused with aromatic fresh garden herbs'
    },
    price: 13000,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    calories: '280 kcal',
    weight: '150g',
    rating: 4.8,
    reviewsCount: 160,
    badge: 'Pishloqli',
    spicy: false,
    isPopular: false
  },
  {
    id: 'sms-4',
    category: 'somsa',
    name: {
      uz: 'Tovuqli Parxez Somsa',
      ru: 'Куриная Самса нежная',
      en: 'Tender Chicken Samsa'
    },
    description: {
      uz: 'Mayin tovuq filesi, yengil ziravorlar va sarxil piyoz bilan to\'ldirilgan mazali somsa',
      ru: 'Нежнейшее куриное филе со сладким луком и легкими специями',
      en: 'Lean chicken breast strips with sweet onions and gentle oriental spices'
    },
    price: 12000,
    image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80',
    calories: '260 kcal',
    weight: '155g',
    rating: 4.75,
    reviewsCount: 118,
    badge: '',
    spicy: false,
    isPopular: false
  },
  {
    id: 'sms-5',
    category: 'somsa',
    name: {
      uz: 'Shirin Tandir Qovoq Somsa',
      ru: 'Самса с тыквой из тандыра',
      en: 'Sweet Pumpkin Tandoor Samsa'
    },
    description: {
      uz: 'Tandirda pishirilgan tabiiy shirin qovoq, sariyog\' va murch uyg\'unligi',
      ru: 'Ароматная сладкая тыква со сливочным маслом и щепоткой черного перца',
      en: 'Autumn sweet pumpkin roasted with butter and a dash of black pepper'
    },
    price: 9000,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    calories: '210 kcal',
    weight: '150g',
    rating: 4.7,
    reviewsCount: 92,
    badge: 'Mavsumiy',
    spicy: false,
    isPopular: false
  },

  // ==========================================
  // 2. PIROJNIY & DESERTLAR (Medovik, Napoleon, etc.)
  // ==========================================
  {
    id: 'prj-1',
    category: 'pirojniy',
    name: {
      uz: 'Klassik Asalli Medovik',
      ru: 'Медовик Классический медовый',
      en: 'Classic Honey Medovik Cake'
    },
    description: {
      uz: 'Tabiiy tog\' asali shimdirilgan 8 qavat mayin biskvit va yengil smetana kremi',
      ru: 'Восемь тонких медовых коржей со сливочно-сметанным кремом',
      en: '8 delicate honey-soaked sponge layers layered with velvety sour cream frosting'
    },
    price: 24000,
    oldPrice: 28000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    calories: '360 kcal',
    weight: '160g',
    rating: 4.96,
    reviewsCount: 512,
    badge: 'Eng sara',
    spicy: false,
    isPopular: true
  },
  {
    id: 'prj-2',
    category: 'pirojniy',
    name: {
      uz: 'Qarsildoq Napoleon Pirojniy',
      ru: 'Пирожное Наполеон хрустящее',
      en: 'Crispy Mille-Feuille Napoleon'
    },
    description: {
      uz: 'Yuzlab qatlamli qarsildoq qatlama xamir va xushbo\'y vanilli zavarnoy krem',
      ru: 'Хрустящие слоеные коржи с нежным ванильным заварным кремом пломбир',
      en: 'Airy flaky puff pastry filled with rich Madagascar vanilla custard'
    },
    price: 26000,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    calories: '390 kcal',
    weight: '170g',
    rating: 4.92,
    reviewsCount: 340,
    badge: 'Hit',
    spicy: false,
    isPopular: true
  },
  {
    id: 'prj-3',
    category: 'pirojniy',
    name: {
      uz: 'Qizil Baxmal (Red Velvet)',
      ru: 'Пирожное Красный Бархат',
      en: 'Red Velvet Pastry Slice'
    },
    description: {
      uz: 'Shirin shokoladli baxmal korjlar va mayin qaymoqli krem-chiz qoplami',
      ru: 'Яркие бархатные коржи с какао и сливочно-сырным кремом',
      en: 'Rich crimson cocoa sponge layered with whipped Philadelphia cream cheese'
    },
    price: 28000,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
    calories: '410 kcal',
    weight: '165g',
    rating: 4.89,
    reviewsCount: 220,
    badge: 'Premium',
    spicy: false,
    isPopular: true
  },
  {
    id: 'prj-4',
    category: 'pirojniy',
    name: {
      uz: 'Belgiya Shokoladli Eclair',
      ru: 'Эклер с бельгийским шоколадом',
      en: 'Belgian Chocolate Éclair'
    },
    description: {
      uz: 'Havo kabi yengil qaynoq xamir, quyuq shokoladli ganash va qaymoq',
      ru: 'Заварное тесто с начинкой из шоколадного крема и темной глазурью',
      en: 'Crisp choux pastry shell brimming with Belgian dark chocolate ganache'
    },
    price: 18000,
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=800&q=80',
    calories: '290 kcal',
    weight: '120g',
    rating: 4.84,
    reviewsCount: 175,
    badge: '',
    spicy: false,
    isPopular: false
  },
  {
    id: 'prj-5',
    category: 'pirojniy',
    name: {
      uz: 'San-Sebastian Pishloqli Chizkeyk',
      ru: 'Чизкейк Сан-Себастьян',
      en: 'San Sebastian Burnt Cheesecake'
    },
    description: {
      uz: 'Karamellangan tilla po\'stloq va ichi erigan qaymoqli pishloq kremi',
      ru: 'Знаменитый баскский чизкейк с карамельной корочкой и нежной текстурой',
      en: 'Famous Basque burnt cheesecake with caramel notes and silky melting heart'
    },
    price: 32000,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    calories: '420 kcal',
    weight: '180g',
    rating: 4.94,
    reviewsCount: 289,
    badge: 'Super Deal',
    spicy: false,
    isPopular: true
  },

  // ==========================================
  // 3. HOT-DOGLAR
  // ==========================================
  {
    id: 'hd-1',
    category: 'hotdogs',
    name: {
      uz: 'Fransuzcha Xot-Dog',
      ru: 'Французский Хот-дог',
      en: 'French Baguette Hot Dog'
    },
    description: {
      uz: 'Qarsildoq baget noni ichiga joylashtirilgan dudlangan halol sosiska, maxsus sous va xantal',
      ru: 'Хрустящий багет с подкопченной сосиской, фирменным соусом и горчицей',
      en: 'Crisp hollow baguette with smoked gourmet sausage, signature relish and mustard'
    },
    price: 22000,
    oldPrice: 25000,
    image: 'https://images.unsplash.com/photo-1627059173264-b5a81e3cf5ea?auto=format&fit=crop&w=800&q=80',
    calories: '390 kcal',
    weight: '200g',
    rating: 4.88,
    reviewsCount: 310,
    badge: 'Top Tanlov',
    spicy: false,
    isPopular: true
  },
  {
    id: 'hd-2',
    category: 'hotdogs',
    name: {
      uz: 'ISTIQLOL Royal Hot-Dog',
      ru: 'ИСТИКЛОЛ Роял Хот-дог с сыром',
      en: 'ISTIQLOL Royal Hot Dog'
    },
    description: {
      uz: 'Yumshoq kunchutli bulochka, katta gril sosiskasi, erigan Chedder pishlog\'i va qovurilgan piyoz',
      ru: 'Булочка с кунжутом, сосиска на гриле, расплавленный чеддер и жареный лук',
      en: 'Toasted sesame bun, jumbo grilled sausage, cheddar cheese and crispy fried onion flakes'
    },
    price: 26000,
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    calories: '450 kcal',
    weight: '250g',
    rating: 4.82,
    reviewsCount: 228,
    badge: 'Hit',
    spicy: false,
    isPopular: true
  },
  {
    id: 'hd-3',
    category: 'hotdogs',
    name: {
      uz: 'Pishloqli Double Hot-Dog',
      ru: 'Двойной Сырный Хот-дог',
      en: 'Double Cheesy Hot Dog'
    },
    description: {
      uz: 'Ikkita sersuv sosiska, mo\'l pishloq sousi, tuzlangan bodring va ketchup',
      ru: 'Две сочные сосиски гриль, щедрый слой сырного соуса и маринованный огурчик',
      en: 'Two juicy sausages, smothered in warm cheese sauce with sliced gherkins'
    },
    price: 29000,
    image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=800&q=80',
    calories: '520 kcal',
    weight: '280g',
    rating: 4.79,
    reviewsCount: 160,
    badge: 'Double',
    spicy: false,
    isPopular: false
  },

  // ==========================================
  // 4. QOFE (Coffee)
  // ==========================================
  {
    id: 'cof-1',
    category: 'coffee',
    name: {
      uz: 'Kapuchino (Krem-ko\'pikli)',
      ru: 'Капучино с нежной пенкой',
      en: 'Creamy Cappuccino'
    },
    description: {
      uz: '100% Arabika espresso, bug\'da ko\'pirtirilgan baxmaldek mayin sut va qalin krem ko\'pik',
      ru: 'Эспрессо из 100% арабики и взбитое горячее молоко с густой шелковистой пенкой',
      en: 'Rich Arabica espresso balanced with steamed silky milk and velvety dense foam'
    },
    price: 20000,
    oldPrice: 23000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    calories: '140 kcal',
    weight: '300ml',
    rating: 4.95,
    reviewsCount: 420,
    badge: 'Xushbo\'y',
    spicy: false,
    isPopular: true
  },
  {
    id: 'cof-2',
    category: 'coffee',
    name: {
      uz: 'Latte Macchiato',
      ru: 'Латте Макиато классический',
      en: 'Latte Macchiato'
    },
    description: {
      uz: 'Yumshoq sutli qatlamlar va mayin qahva ta\'mi, vanil yoki karamel ta\'bi bilan',
      ru: 'Мягкий многослойный кофейно-молочный напиток с карамельным оттенком',
      en: 'Three layered espresso and steamed whole milk with delicate sweet notes'
    },
    price: 22000,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    calories: '160 kcal',
    weight: '350ml',
    rating: 4.88,
    reviewsCount: 260,
    badge: 'Hit',
    spicy: false,
    isPopular: true
  },
  {
    id: 'cof-3',
    category: 'coffee',
    name: {
      uz: 'Klassik Americano',
      ru: 'Классический Американо',
      en: 'Classic Americano'
    },
    description: {
      uz: 'Oltin rang krema bilan yangi damlangan kuchli va xushbo\'y qora qahva',
      ru: 'Свежесваренный бодрящий черный кофе с насыщенным ароматом',
      en: 'Bold freshly pulled espresso diluted with hot water for pure clean coffee taste'
    },
    price: 16000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    calories: '15 kcal',
    weight: '250ml',
    rating: 4.78,
    reviewsCount: 190,
    badge: '',
    spicy: false,
    isPopular: false
  },
  {
    id: 'cof-4',
    category: 'coffee',
    name: {
      uz: 'Muzdek Iced Karamel Latte',
      ru: 'Айс Карамель Латте с солью',
      en: 'Iced Salted Caramel Latte'
    },
    description: {
      uz: 'Muz bo\'laklari, quyuq karamel sousi, sovuq sut va kuchli espresso',
      ru: 'Освежающий холодный латте с кубиками льда и соленой карамелью',
      en: 'Cold milk, fresh espresso and golden caramel syrup served over ice cubes'
    },
    price: 24000,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    calories: '220 kcal',
    weight: '400ml',
    rating: 4.92,
    reviewsCount: 310,
    badge: 'Sovuq ❄️',
    spicy: false,
    isPopular: true
  },

  // ==========================================
  // 5. CHOY (Tea)
  // ==========================================
  {
    id: 'tea-1',
    category: 'tea',
    name: {
      uz: 'Limonli Ko\'k Choy (Choynakda)',
      ru: 'Зеленый Чай с лимоном (Чайник)',
      en: 'Green Tea with Fresh Lemon'
    },
    description: {
      uz: 'Oliy navli yashil bargli choy, yangi kesilgan barra limon va tabiiy asal',
      ru: 'Отборный листовой зеленый чай со спелым лимоном и медом в чайнике',
      en: 'Premium green whole-leaf tea brewed with fresh lemon slices and natural honey'
    },
    price: 14000,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    calories: '25 kcal',
    weight: '800ml',
    rating: 4.9,
    reviewsCount: 280,
    badge: 'Tinchlantiruvchi',
    spicy: false,
    isPopular: true
  },
  {
    id: 'tea-2',
    category: 'tea',
    name: {
      uz: 'Tog\' Giyohlari Qora Choy',
      ru: 'Горный Чай с травами и чабрецом',
      en: 'Mountain Herbs Black Tea'
    },
    description: {
      uz: 'Chimyon tog\'larining xushbo\'y kiyiko\'ti (tog\' rayhoni), yalpiz va qora choy',
      ru: 'Ароматный черный чай с чабрецом, горной мятой и душистыми травами',
      en: 'Robust black tea blended with wild mountain thyme, oregano and wild mint'
    },
    price: 15000,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    calories: '10 kcal',
    weight: '800ml',
    rating: 4.88,
    reviewsCount: 195,
    badge: 'Tabiiy',
    spicy: false,
    isPopular: false
  },
  {
    id: 'tea-3',
    category: 'tea',
    name: {
      uz: 'Issiq Malina va Yalpizli Choy',
      ru: 'Малиновый Чай с мятой',
      en: 'Hot Raspberry Mint Tea'
    },
    description: {
      uz: 'Tabiiy malina pyuresi, tetiklantiruvchi yalpiz barglari va yengil shirinlik',
      ru: 'Натуральное пюре спелой малины, свежая мята и согревающий аромат',
      en: 'Crushed sweet raspberries paired with cool garden mint and warm berry notes'
    },
    price: 18000,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80',
    calories: '65 kcal',
    weight: '800ml',
    rating: 4.93,
    reviewsCount: 215,
    badge: 'Hit',
    spicy: false,
    isPopular: true
  },

  // ==========================================
  // 6. MOXITO (Mojito)
  // ==========================================
  {
    id: 'moj-1',
    category: 'mojito',
    name: {
      uz: 'Klassik Yalpizli Moxito',
      ru: 'Мохито Классический освежающий',
      en: 'Classic Fresh Mint Mojito'
    },
    description: {
      uz: 'Yangi yalpiz barglari, suvli laym, shakar qamish siropi, gazlangan suv va muz bo\'laklari',
      ru: 'Свежая мята, лайм, сахарный тростниковый сироп и колотый лед',
      en: 'Muddled fresh spearmint leaves, tart lime wedges, cane syrup, soda and crushed ice'
    },
    price: 18000,
    oldPrice: 22000,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    calories: '95 kcal',
    weight: '450ml',
    rating: 4.97,
    reviewsCount: 620,
    badge: 'Super Fresh',
    spicy: false,
    isPopular: true
  },
  {
    id: 'moj-2',
    category: 'mojito',
    name: {
      uz: 'Qulupnayli Moxito (Strawberry)',
      ru: 'Клубничный Мохито со льдом',
      en: 'Strawberry Mojito Cooler'
    },
    description: {
      uz: 'Shirin yetilgan qulupnay mevalari, yalpiz, laym va muzdek tetiklantiruvchi gazli drayv',
      ru: 'Спелая клубника, бодрящая мята, дольки сочного лайма и лед',
      en: 'Sweet ripe strawberries crushed with cool garden mint and refreshing lime'
    },
    price: 20000,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    calories: '115 kcal',
    weight: '450ml',
    rating: 4.91,
    reviewsCount: 380,
    badge: 'Meva lazzati',
    spicy: false,
    isPopular: true
  },
  {
    id: 'moj-3',
    category: 'mojito',
    name: {
      uz: 'Moviy Laym Blue Curacao Moxito',
      ru: 'Голубой Мохито Блю Кюрасао',
      en: 'Blue Curacao Ocean Mojito'
    },
    description: {
      uz: 'Ekzotik moviy sitrus siropi, laym, yangi yalpiz va tetiklantiruvchi muzli kokteyl',
      ru: 'Цитрусовый сироп Кюрасао, мята, лайм и кристальный колотый лед',
      en: 'Vibrant blue citrus essence combined with crisp mint and lime fizz'
    },
    price: 21000,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80',
    calories: '110 kcal',
    weight: '450ml',
    rating: 4.86,
    reviewsCount: 190,
    badge: 'Rang-barang',
    spicy: false,
    isPopular: false
  },

  // ==========================================
  // 7. NAPITKALAR (Cold Sodas & Juices)
  // ==========================================
  {
    id: 'nap-1',
    category: 'napitkalar',
    name: {
      uz: 'Pepsi 0.5L (Muzdek)',
      ru: 'Пепси 0.5л (Охлажденный)',
      en: 'Pepsi 0.5L Chilled'
    },
    description: {
      uz: 'Muzdek tetiklantiruvchi mashhur gazlangan ichimlik, shisha idishda',
      ru: 'Классический газированный напиток Pepsi в удобной бутылке 0.5л',
      en: 'Classic chilled carbonated soda, perfectly paired with any snack'
    },
    price: 11000,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
    calories: '150 kcal',
    weight: '500ml',
    rating: 4.9,
    reviewsCount: 750,
    badge: 'Klassika',
    spicy: false,
    isPopular: true
  },
  {
    id: 'nap-2',
    category: 'napitkalar',
    name: {
      uz: 'Coca-Cola 0.5L (Muzdek)',
      ru: 'Кока-Кола 0.5л',
      en: 'Coca-Cola 0.5L Bottle'
    },
    description: {
      uz: 'Muzdek shaqillagan Coca-Cola, taomlaringizga o\'zgacha lazzat bag\'ishlaydi',
      ru: 'Оригинальный освежающий напиток Coca-Cola 0.5л',
      en: 'Original crisp Coca-Cola bottle served chilled'
    },
    price: 11000,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80',
    calories: '145 kcal',
    weight: '500ml',
    rating: 4.88,
    reviewsCount: 420,
    badge: '',
    spicy: false,
    isPopular: false
  },
  {
    id: 'nap-3',
    category: 'napitkalar',
    name: {
      uz: 'Yangi Siqilgan Apelsin Sharbat (Fresh)',
      ru: 'Свежевыжатый Апельсиновый Фреш',
      en: 'Fresh Squeezed Orange Juice'
    },
    description: {
      uz: '100% tabiiy shirali apelsinlardan siqilgan, shakarsiz vitamin C manbai',
      ru: '100% натуральный фреш из спелых апельсинов без сахара и красителей',
      en: 'Pure cold-pressed 100% natural orange juice loaded with vitamin C'
    },
    price: 25000,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    calories: '120 kcal',
    weight: '350ml',
    rating: 4.95,
    reviewsCount: 310,
    badge: '100% Fresh',
    spicy: false,
    isPopular: true
  },

  // ==========================================
  // 8. LAVASH
  // ==========================================
  {
    id: 'lav-1',
    category: 'lavash',
    name: {
      uz: 'Klassik Go\'shtli Lavash',
      ru: 'Классический Мясной Лаваш',
      en: 'Classic Beef Lavash'
    },
    description: {
      uz: 'Yupqa xamir, mayin mol go\'shti, yangi pomidor, bodring, maxsus sous va qarsildoq chipslar',
      ru: 'Тонкое тесто, нежная говядина, свежие томаты, огурцы, фирменный соус и хрустящие чипсы',
      en: 'Thin flatbread, tender beef, fresh tomatoes, cucumbers, signature sauce and crunchy chips'
    },
    price: 36000,
    oldPrice: 40000,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    calories: '540 kcal',
    weight: '320g',
    rating: 4.94,
    reviewsCount: 680,
    badge: 'Xit',
    spicy: false,
    isPopular: true
  },
  {
    id: 'lav-2',
    category: 'lavash',
    name: {
      uz: 'Pishloqli Lavash (Sirli)',
      ru: 'Сырный Лаваш с говядиной',
      en: 'Cheesy Beef Lavash'
    },
    description: {
      uz: 'Erigan Golland pishlog\'i, suvli mol go\'shti, maxsus pishloqli sous va yangi sabzavotlar',
      ru: 'Расплавленный голландский сыр, сочная говядина, сливочный сырный соус и свежие овощи',
      en: 'Melted Dutch cheese, juicy grilled beef, signature cheese sauce and fresh veggies'
    },
    price: 41000,
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    calories: '620 kcal',
    weight: '350g',
    rating: 4.88,
    reviewsCount: 390,
    badge: 'Bestseller',
    spicy: false,
    isPopular: true
  },

  // ==========================================
  // 9. BURGERS
  // ==========================================
  {
    id: 'burg-1',
    category: 'burgers',
    name: {
      uz: 'ISTIQLOL Double Cheeseburger',
      ru: 'ИСТИКЛОЛ Двойной Чизбургер',
      en: 'ISTIQLOL Double Cheeseburger'
    },
    description: {
      uz: 'Ikki qavat 100% tabiiy mol go\'shti kotleti, erigan Chedder pishlog\'i, aysberg va karamellangan piyoz',
      ru: 'Два сочных бифштекса из 100% говядины, двойной чеддер, соус тартар, айсберг и томаты',
      en: 'Two 100% pure beef patties, double melted cheddar, iceberg lettuce and signature burger sauce'
    },
    price: 44000,
    oldPrice: 48000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    calories: '710 kcal',
    weight: '340g',
    rating: 4.95,
    reviewsCount: 520,
    badge: 'Hit',
    spicy: false,
    isPopular: true
  },

  // ==========================================
  // 10. COMBOS
  // ==========================================
  {
    id: 'cmb-1',
    category: 'combos',
    name: {
      uz: 'ISTIQLOL Super Lavash & Somsa Kombo',
      ru: 'ИСТИКЛОЛ Супер Лаваш и Самса Комбо',
      en: 'ISTIQLOL Super Lavash & Samsa Combo'
    },
    description: {
      uz: 'Klassik Go\'shtli Lavash + 2 dona Tandir Somsa + Qarsildoq Fri + Muzdek Pepsi 0.5L',
      ru: 'Классический мясной лаваш + 2 тандырные самсы + Картофель фри + Пепси 0.5л',
      en: 'Classic Beef Lavash + 2 Tandoor Samsas + Crispy French Fries + Pepsi 0.5L'
    },
    price: 68000,
    oldPrice: 79000,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    calories: '1150 kcal',
    weight: '780g',
    rating: 4.98,
    reviewsCount: 790,
    badge: 'SAVE 20%',
    spicy: false,
    isPopular: true
  }
];

export const samplePromoCodes = [
  { code: 'ISTIQLOL2025', discountPercent: 15, minOrder: 50000, description: '15% off for all online orders' },
  { code: 'EVOS2025', discountPercent: 15, minOrder: 50000, description: '15% off for all online orders' },
  { code: 'MAZZA', discountPercent: 10, minOrder: 30000, description: '10% discount on entire menu' },
  { code: 'BEPUL', discountPercent: 0, freeDelivery: true, minOrder: 40000, description: 'Free delivery on your order' },
  { code: 'SOMSA', fixedDiscount: 15000, minOrder: 60000, description: '15,000 UZS discount on Somsa & Tea' }
];

export const loyaltyRewards = [
  { id: 'rew-1', name: 'Pepsi 0.5L', points: 8000, category: 'napitkalar', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80' },
  { id: 'rew-2', name: 'Tandir Somsa', points: 10000, category: 'somsa', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80' },
  { id: 'rew-3', name: 'Fransuzcha Hot-Dog', points: 16000, category: 'hotdogs', image: 'https://images.unsplash.com/photo-1627059173264-b5a81e3cf5ea?auto=format&fit=crop&w=400&q=80' },
  { id: 'rew-4', name: 'Klassik Medovik', points: 18000, category: 'pirojniy', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80' }
];

export const categoryFallbacks = {
  somsa: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  pirojniy: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  hotdogs: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
  coffee: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
  tea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  mojito: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  napitkalar: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
  lavash: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
  burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  combos: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
};
