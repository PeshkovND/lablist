import { HistoryType, Lab, Message, Student } from "../types";

export const labData: Student[] = [
  {
    id: 0,
    name: "Александр",
    surname: "Александров",
    photo: "/user1.svg",
    email: "alex@mail.ru",
    phone: '+78005553535',
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    done: [
      { id: 0, labId: 0, status: 0, score: 10 },
      { id: 1, labId: 1, status: 0, score: 10 },
      { id: 2, labId: 2, status: 0, score: 8 },
      { id: 3, labId: 3, status: 1, score: 0 },
      { id: 4, labId: 4, status: 1, score: 0 },
      { id: 5, labId: 5, status: 1, score: 0 },
      { id: 6, labId: 6, status: 2, score: 0 },
      { id: 7, labId: 7, status: 3, score: 0 },
      { id: 8, labId: 8, status: 3, score: 0 },
      { id: 9, labId: 9, status: 3, score: 0 },
      { id: 232, labId: 10, status: 3, score: 0 },
      { id: 233, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 0,
        type: 'vk',
        value: 'https://vk.com/alex',
      },
      {
        id: 1,
        type: 'tg',
        value: '@alex',
      },
    ]
  },
  {
    id: 1,
    name: "Иван",
    surname: "Иванов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: "/user2.svg",
    email: "ivan@mail.ru",
    phone: '+78006666666',
    done: [
      { id: 11, labId: 0, status: 0, score: 10 },
      { id: 12, labId: 1, status: 0, score: 10 },
      { id: 13, labId: 2, status: 0, score: 10 },
      { id: 14, labId: 3, status: 0, score: 7 },
      { id: 15, labId: 4, status: 0, score: 7 },
      { id: 16, labId: 5, status: 1, score: 0 },
      { id: 17, labId: 6, status: 2, score: 0 },
      { id: 18, labId: 7, status: 2, score: 0 },
      { id: 19, labId: 8, status: 3, score: 0 },
      { id: 20, labId: 9, status: 3, score: 0 },
      { id: 234, labId: 10, status: 3, score: 0 },
      { id: 235, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 2,
        type: 'vk',
        value: 'https://vk.com/ivan',
      },
      {
        id: 3,
        type: 'instagram',
        value: 'ivan2001',
      },
      {
        id: 4,
        type: 'tg',
        value: '@ivan',
      },
    ]
  },
  {
    id: 2,
    name: "Генадий",
    surname: "Генадиев",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: "/user3.svg",
    email: "gena@mail.ru",
    phone: '+79041111111',
    done: [
      { id: 22, labId: 0, status: 3, score: 0 },
      { id: 23, labId: 1, status: 3, score: 0 },
      { id: 24, labId: 2, status: 3, score: 0 },
      { id: 25, labId: 3, status: 3, score: 0 },
      { id: 26, labId: 4, status: 3, score: 0 },
      { id: 28, labId: 5, status: 3, score: 0 },
      { id: 29, labId: 6, status: 3, score: 0 },
      { id: 30, labId: 7, status: 3, score: 0 },
      { id: 31, labId: 8, status: 3, score: 0 },
      { id: 32, labId: 9, status: 3, score: 0 },
      { id: 236, labId: 10, status: 3, score: 0 },
      { id: 237, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 5,
        type: 'vk',
        value: 'https://vk.com/gena',
      },
    ]
  },
  {
    id: 3,
    name: "Елена",
    surname: "Еленовна",
    photo: "/user6.svg",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    email: "elena@mail.ru",
    phone: '+79042222222',
    done: [
      { id: 34, labId: 0, status: 0, score: 10 },
      { id: 35, labId: 1, status: 0, score: 10 },
      { id: 36, labId: 2, status: 0, score: 10 },
      { id: 37, labId: 3, status: 0, score: 10 },
      { id: 38, labId: 4, status: 0, score: 10 },
      { id: 39, labId: 5, status: 0, score: 7 },
      { id: 40, labId: 6, status: 0, score: 10 },
      { id: 41, labId: 7, status: 0, score: 10 },
      { id: 42, labId: 8, status: 0, score: 9 },
      { id: 43, labId: 9, status: 0, score: 10 },
      { id: 238, labId: 10, status: 3, score: 0 },
      { id: 239, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 6,
        type: 'vk',
        value: 'https://vk.com/elena',
      },
      {
        id: 7,
        type: 'instagram',
        value: 'elena2001',
      },
      {
        id: 8,
        type: 'tg',
        value: '@elena',
      },
      {
        id: 9,
        type: 'skype',
        value: 'elena',
      },
      {
        id: 28,
        type: 'discord',
        value: 'elena#1234',
      },
    ]
  },
  {
    id: 4,
    name: "Дмитрий",
    surname: "Дмитриев",
    email: "dmitry@mail.ru",
    phone: '+79043333333',
    photo: null,
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    done: [
      { id: 45, labId: 0, status: 0, score: 10 },
      { id: 46, labId: 1, status: 0, score: 10 },
      { id: 47, labId: 2, status: 0, score: 10 },
      { id: 48, labId: 3, status: 0, score: 10 },
      { id: 49, labId: 4, status: 1, score: 0 },
      { id: 50, labId: 5, status: 1, score: 0 },
      { id: 51, labId: 6, status: 0, score: 10 },
      { id: 52, labId: 7, status: 2, score: 0 },
      { id: 53, labId: 8, status: 3, score: 0 },
      { id: 54, labId: 9, status: 3, score: 0 },
      { id: 240, labId: 10, status: 3, score: 0 },
      { id: 241, labId: 11, status: 3, score: 0 },
    ],
  },
  {
    id: 5,
    name: "Алексей",
    surname: "Алексеев",
    email: "lexa@mail.ru",
    phone: '+79044444444',
    photo: '/user4.svg',
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    done: [
      { id: 56, labId: 0, status: 0, score: 10 },
      { id: 57, labId: 1, status: 0, score: 10 },
      { id: 58, labId: 2, status: 0, score: 10 },
      { id: 59, labId: 3, status: 0, score: 10 },
      { id: 60, labId: 4, status: 1, score: 0 },
      { id: 61, labId: 5, status: 1, score: 0 },
      { id: 62, labId: 6, status: 0, score: 10 },
      { id: 63, labId: 7, status: 1, score: 0 },
      { id: 64, labId: 8, status: 2, score: 0 },
      { id: 65, labId: 9, status: 2, score: 0 },
      { id: 242, labId: 10, status: 3, score: 0 },
      { id: 243, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 10,
        type: 'vk',
        value: 'https://vk.com/alexey',
      },
    ]
  },
  {
    id: 6,
    name: "Данил",
    surname: "Данилов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    email: "danil@mail.ru",
    phone: '+79046666666',
    photo: '/user5.svg',
    done: [
      { id: 67, labId: 0, status: 0, score: 10 },
      { id: 68, labId: 1, status: 2, score: 0 },
      { id: 69, labId: 2, status: 3, score: 0 },
      { id: 70, labId: 3, status: 3, score: 0 },
      { id: 71, labId: 4, status: 3, score: 0 },
      { id: 72, labId: 5, status: 3, score: 0 },
      { id: 73, labId: 6, status: 3, score: 0 },
      { id: 74, labId: 7, status: 3, score: 0 },
      { id: 75, labId: 8, status: 3, score: 0 },
      { id: 76, labId: 9, status: 3, score: 0 },
      { id: 244, labId: 10, status: 3, score: 0 },
      { id: 245, labId: 11, status: 3, score: 0 },
    ],
  },
  {
    id: 7,
    name: "Вячеслав",
    surname: "Вячеславов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    email: "slava@mail.ru",
    phone: '+79047777777',
    photo: null,
    done: [
      { id: 78, labId: 0, status: 0, score: 10 },
      { id: 79, labId: 1, status: 0, score: 10 },
      { id: 80, labId: 2, status: 0, score: 10 },
      { id: 81, labId: 3, status: 0, score: 10 },
      { id: 82, labId: 4, status: 1, score: 0 },
      { id: 83, labId: 5, status: 1, score: 0 },
      { id: 84, labId: 6, status: 2, score: 0 },
      { id: 85, labId: 7, status: 2, score: 0 },
      { id: 86, labId: 8, status: 3, score: 0 },
      { id: 87, labId: 9, status: 3, score: 0 },
      { id: 246, labId: 10, status: 3, score: 0 },
      { id: 247, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 11,
        type: 'vk',
        value: 'https://vk.com/slava',
      },
    ]
  },
  {
    id: 8,
    name: "Евгений",
    surname: "Евгеньев",
    photo: '/user1.svg',
    phone: '+79048888888',
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    email: "evgeniy@mail.ru",
    done: [
      { id: 89, labId: 0, status: 0, score: 10 },
      { id: 90, labId: 1, status: 0, score: 10 },
      { id: 91, labId: 2, status: 0, score: 10 },
      { id: 92, labId: 3, status: 0, score: 10 },
      { id: 93, labId: 4, status: 0, score: 10 },
      { id: 94, labId: 5, status: 0, score: 10 },
      { id: 95, labId: 6, status: 0, score: 10 },
      { id: 96, labId: 7, status: 0, score: 10 },
      { id: 97, labId: 8, status: 0, score: 10 },
      { id: 98, labId: 9, status: 0, score: 10 },
      { id: 248, labId: 10, status: 0, score: 10 },
      { id: 249, labId: 11, status: 0, score: 10 },
    ],
    contacts: [
      {
        id: 12,
        type: 'vk',
        value: 'https://vk.com/zhenya',
      },
    ]
  },
  {
    id: 9,
    name: "Екатерина",
    surname: "Екатеринова",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user7.svg',
    email: "ekatrina@mail.ru",
    phone: '+79049999999',
    done: [
      { id: 100, labId: 0, status: 0, score: 10 },
      { id: 101, labId: 1, status: 0, score: 10 },
      { id: 102, labId: 2, status: 0, score: 10 },
      { id: 103, labId: 3, status: 0, score: 6 },
      { id: 104, labId: 4, status: 0, score: 10 },
      { id: 105, labId: 5, status: 0, score: 10 },
      { id: 106, labId: 6, status: 0, score: 8 },
      { id: 107, labId: 7, status: 1, score: 0 },
      { id: 108, labId: 8, status: 1, score: 0 },
      { id: 109, labId: 9, status: 1, score: 0 },
      { id: 250, labId: 10, status: 3, score: 0 },
      { id: 251, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 13,
        type: 'vk',
        value: 'https://vk.com/katya',
      },
      {
        id: 14,
        type: 'tg',
        value: '@katya',
      },
    ]
  },
  {
    id: 10,
    name: "Мария",
    surname: "Мариновна",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user6.svg',
    email: "maria@mail.ru",
    phone: '+79040000000',
    done: [
      { id: 111, labId: 0, status: 0, score: 10 },
      { id: 112, labId: 1, status: 0, score: 10 },
      { id: 113, labId: 2, status: 0, score: 10 },
      { id: 114, labId: 3, status: 0, score: 10 },
      { id: 115, labId: 4, status: 0, score: 10 },
      { id: 116, labId: 5, status: 0, score: 10 },
      { id: 117, labId: 6, status: 0, score: 10 },
      { id: 118, labId: 7, status: 0, score: 10 },
      { id: 119, labId: 8, status: 0, score: 7 },
      { id: 120, labId: 9, status: 1, score: 0 },
      { id: 252, labId: 10, status: 3, score: 0 },
      { id: 253, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 15,
        type: 'vk',
        value: 'https://vk.com/maria',
      },
      {
        id: 16,
        type: 'tg',
        value: '@maria',
      },
    ]
  },
  {
    id: 11,
    name: "Степан",
    surname: "Степанов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user2.svg',
    email: "stepa@mail.ru",
    phone: '+79081111111',
    done: [
      { id: 122, labId: 0, status: 0, score: 10 },
      { id: 123, labId: 1, status: 0, score: 10 },
      { id: 124, labId: 2, status: 0, score: 10 },
      { id: 125, labId: 3, status: 0, score: 10 },
      { id: 126, labId: 4, status: 0, score: 10 },
      { id: 127, labId: 5, status: 0, score: 10 },
      { id: 128, labId: 6, status: 0, score: 10 },
      { id: 129, labId: 7, status: 0, score: 10 },
      { id: 130, labId: 8, status: 0, score: 7 },
      { id: 131, labId: 9, status: 1, score: 0 },
      { id: 254, labId: 10, status: 3, score: 0 },
      { id: 255, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 17,
        type: 'vk',
        value: 'https://vk.com/stepa',
      },
    ]
  },
  {
    id: 12,
    name: "Артём",
    surname: "Артёмов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user3.svg',
    email: "artem@mail.ru",
    phone: '+79082222222',
    done: [
      { id: 133, labId: 0, status: 0, score: 10 },
      { id: 134, labId: 1, status: 0, score: 10 },
      { id: 135, labId: 2, status: 0, score: 10 },
      { id: 136, labId: 3, status: 0, score: 10 },
      { id: 137, labId: 4, status: 0, score: 10 },
      { id: 138, labId: 5, status: 0, score: 10 },
      { id: 139, labId: 6, status: 0, score: 10 },
      { id: 140, labId: 7, status: 0, score: 10 },
      { id: 141, labId: 8, status: 0, score: 7 },
      { id: 142, labId: 9, status: 1, score: 0 },
      { id: 256, labId: 10, status: 3, score: 0 },
      { id: 257, labId: 11, status: 3, score: 0 },
    ],
  },
  {
    id: 13,
    name: "Станислав",
    surname: "Станиславов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: null,
    email: "stanislave@mail.ru",
    phone: '+79083333333',
    done: [
      { id: 144, labId: 0, status: 0, score: 10 },
      { id: 145, labId: 1, status: 0, score: 10 },
      { id: 146, labId: 2, status: 0, score: 10 },
      { id: 147, labId: 3, status: 0, score: 10 },
      { id: 148, labId: 4, status: 0, score: 10 },
      { id: 149, labId: 5, status: 0, score: 10 },
      { id: 150, labId: 6, status: 0, score: 10 },
      { id: 151, labId: 7, status: 0, score: 10 },
      { id: 152, labId: 8, status: 0, score: 7 },
      { id: 153, labId: 9, status: 1, score: 0 },
      { id: 258, labId: 10, status: 3, score: 0 },
      { id: 259, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 18,
        type: 'tg',
        value: '@stanislave',
      },
    ]
  },
  {
    id: 14,
    name: "Андрей",
    surname: "Андреев",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user5.svg',
    email: "andrew@mail.ru",
    phone: '+79084444444',
    done: [
      { id: 156, labId: 0, status: 0, score: 10 },
      { id: 157, labId: 1, status: 0, score: 10 },
      { id: 158, labId: 2, status: 0, score: 10 },
      { id: 159, labId: 3, status: 0, score: 10 },
      { id: 160, labId: 4, status: 0, score: 10 },
      { id: 161, labId: 5, status: 0, score: 10 },
      { id: 162, labId: 6, status: 0, score: 10 },
      { id: 163, labId: 7, status: 0, score: 10 },
      { id: 164, labId: 8, status: 0, score: 7 },
      { id: 165, labId: 9, status: 1, score: 0 },
      { id: 260, labId: 10, status: 3, score: 0 },
      { id: 261, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 19,
        type: 'vk',
        value: 'https://vk.com/andrew',
      },
    ]
  },
  {
    id: 15,
    name: "Михаил",
    surname: "Михаилов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: null,
    email: "misha@mail.ru",
    phone: '+79085555555',
    done: [
      { id: 167, labId: 0, status: 0, score: 10 },
      { id: 168, labId: 1, status: 0, score: 10 },
      { id: 169, labId: 2, status: 0, score: 10 },
      { id: 170, labId: 3, status: 0, score: 10 },
      { id: 171, labId: 4, status: 0, score: 10 },
      { id: 172, labId: 5, status: 0, score: 10 },
      { id: 173, labId: 6, status: 0, score: 10 },
      { id: 174, labId: 7, status: 0, score: 10 },
      { id: 175, labId: 8, status: 0, score: 7 },
      { id: 176, labId: 9, status: 1, score: 0 },
      { id: 262, labId: 10, status: 3, score: 0 },
      { id: 263, labId: 11, status: 3, score: 0 },
    ],
  },
  {
    id: 16,
    name: "Никита",
    surname: "Никитов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user4.svg',
    email: "nikita@mail.ru",
    phone: '+79086666666',
    done: [
      { id: 178, labId: 0, status: 0, score: 10 },
      { id: 179, labId: 1, status: 0, score: 10 },
      { id: 180, labId: 2, status: 0, score: 10 },
      { id: 181, labId: 3, status: 0, score: 10 },
      { id: 182, labId: 4, status: 0, score: 10 },
      { id: 183, labId: 5, status: 0, score: 10 },
      { id: 184, labId: 6, status: 0, score: 10 },
      { id: 185, labId: 7, status: 0, score: 10 },
      { id: 186, labId: 8, status: 0, score: 7 },
      { id: 187, labId: 9, status: 1, score: 0 },
      { id: 264, labId: 10, status: 3, score: 0 },
      { id: 265, labId: 11, status: 3, score: 0 },
    ],
  },
  {
    id: 17,
    name: "Антон",
    surname: "Антонов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user3.svg',
    email: "anton@mail.ru",
    phone: '+79087777777',
    done: [
      { id: 189, labId: 0, status: 0, score: 10 },
      { id: 190, labId: 1, status: 0, score: 10 },
      { id: 191, labId: 2, status: 0, score: 10 },
      { id: 192, labId: 3, status: 0, score: 10 },
      { id: 193, labId: 4, status: 0, score: 10 },
      { id: 194, labId: 5, status: 0, score: 10 },
      { id: 195, labId: 6, status: 0, score: 10 },
      { id: 196, labId: 7, status: 0, score: 10 },
      { id: 197, labId: 8, status: 0, score: 7 },
      { id: 198, labId: 9, status: 1, score: 0 },
      { id: 266, labId: 10, status: 3, score: 0 },
      { id: 267, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 20,
        type: 'vk',
        value: 'https://vk.com/anton',
      },
      {
        id: 21,
        type: 'tg',
        value: '@anton',
      },
    ]
  },
  {
    id: 18,
    name: "Sam",
    surname: "Jetstream",
    photo: '/user1.svg',
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    email: "sam@mail.ru",
    phone: '+79088888888',
    done: [
      { id: 200, labId: 0, status: 0, score: 10 },
      { id: 201, labId: 1, status: 0, score: 10 },
      { id: 202, labId: 2, status: 0, score: 10 },
      { id: 203, labId: 3, status: 0, score: 10 },
      { id: 204, labId: 4, status: 0, score: 10 },
      { id: 205, labId: 5, status: 0, score: 10 },
      { id: 206, labId: 6, status: 0, score: 10 },
      { id: 207, labId: 7, status: 0, score: 10 },
      { id: 208, labId: 8, status: 0, score: 7 },
      { id: 209, labId: 9, status: 1, score: 0 },
      { id: 268, labId: 10, status: 3, score: 0 },
      { id: 269, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 22,
        type: 'vk',
        value: 'https://vk.com/sam',
      },
      {
        id: 23,
        type: 'tg',
        value: '@sam',
      },
    ]
  },
  {
    id: 19,
    name: "Владислав",
    surname: "Владиславов",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user2.svg',
    email: "vladik@mail.ru",
    phone: '+79089999999',
    done: [
      { id: 211, labId: 0, status: 0, score: 10 },
      { id: 212, labId: 1, status: 0, score: 10 },
      { id: 213, labId: 2, status: 0, score: 10 },
      { id: 214, labId: 3, status: 0, score: 10 },
      { id: 215, labId: 4, status: 0, score: 10 },
      { id: 216, labId: 5, status: 0, score: 10 },
      { id: 217, labId: 6, status: 0, score: 10 },
      { id: 218, labId: 7, status: 0, score: 10 },
      { id: 219, labId: 8, status: 0, score: 7 },
      { id: 220, labId: 9, status: 1, score: 0 },
      { id: 270, labId: 10, status: 3, score: 0 },
      { id: 271, labId: 11, status: 3, score: 0 },
    ],
    contacts: [
      {
        id: 24,
        type: 'vk',
        value: 'https://vk.com/vlad',
      },
    ]
  },
  {
    id: 20,
    name: "Владимир",
    surname: "Владимиров",
    group: "ФИТ-191",
    course: "2 курс, очное отделение",
    photo: '/user3.svg',
    email: "vladimir@mail.ru",
    phone: '+79080000000',
    done: [
      { id: 222, labId: 0, status: 0, score: 10 },
      { id: 223, labId: 1, status: 0, score: 10 },
      { id: 224, labId: 2, status: 0, score: 10 },
      { id: 225, labId: 3, status: 0, score: 10 },
      { id: 226, labId: 4, status: 0, score: 10 },
      { id: 227, labId: 5, status: 0, score: 10 },
      { id: 228, labId: 6, status: 0, score: 10 },
      { id: 229, labId: 7, status: 0, score: 10 },
      { id: 230, labId: 8, status: 0, score: 7 },
      { id: 231, labId: 9, status: 1, score: 0 },
      { id: 272, labId: 10, status: 3, score: 0 },
      { id: 273, labId: 11, status: 3, score: 0 },
    ],
  },
];

export const historyData: HistoryType[] = [
  {
    id: 0,
    date: new Date(2022, 6, 1),
    studentName: "Сидорово-Загоруйский В.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 2,
  },
  {
    id: 1,
    date: new Date(2022, 6, 15),
    studentName: "Мусоргский М.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 0,
  },
  {
    id: 2,
    date: new Date(2022, 6, 20),
    studentName: "Склодовская-Кюри М.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 1,
  },
  {
    id: 3,
    date: new Date(2022, 6, 28),
    studentName: "Лермонтов М.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 2,
  },
  {
    id: 4,
    date: new Date(2022, 7, 1),
    studentName: "Королев С.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 0,
  },
  {
    id: 5,
    date: new Date(2022, 7, 3),
    studentName: "Вертинская А.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 1,
  },
  {
    id: 6,
    date: new Date(2022, 7, 5),
    studentName: "Пушкин А.",
    labName: "Название длинное длинное для лабораторной работы",
    status: 2,
  },
];

export const labs: Lab[] = [
  {
    id: 0,
    number: 1,
    subject: "ООП",
    name: "лр 1",
    deadline: new Date(2022, 5, 8),
  },
  {
    id: 1,
    number: 2,
    subject: "ООП",
    name: "лр 2",
    deadline: new Date(2022, 5, 20),
  },
  {
    id: 2,
    number: 3,
    subject: "ООП",
    name: "лр 3",
    deadline: new Date(2022, 5, 29),
  },
  {
    id: 3,
    number: 4,
    subject: "ООП",
    name: "лр 4",
    deadline: new Date(2022, 6, 1),
  },
  {
    id: 4,
    number: 5,
    subject: "ООП",
    name: "лр 5",
    deadline: new Date(2022, 6, 4),
  },
  {
    id: 5,
    number: 6,
    subject: "ООП",
    name: "лр 6",
    deadline: new Date(2022, 6, 13),
  },
  {
    id: 6,
    number: 7,
    subject: "ООП",
    name: "лр 7",
    deadline: new Date(2022, 6, 27),
  },
  {
    id: 7,
    number: 8,
    subject: "ООП",
    name: "лр 8",
    deadline: new Date(2022, 7, 1),
  },
  {
    id: 8,
    number: 9,
    subject: "ООП",
    name: "лр 9",
    deadline: new Date(2022, 7, 8),
  },
  {
    id: 9,
    number: 10,
    subject: "ООП",
    name: "лр 10",
    deadline: new Date(2022, 7, 13),
  },
  {
    id: 10,
    number: 11,
    subject: "ООП",
    name: "лр 11",
    deadline: new Date(2022, 7, 13),
  },
  {
    id: 11,
    number: 12,
    subject: "ООП",
    name: "лр 12",
    deadline: new Date(2022, 7, 13),
  },
];

export const messeges: Message[] = [
  {  
    id: 0,
    from: 100,
    to: 0,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 1,
    from: 100,
    to: 0,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 2,
    from: 100,
    to: 0,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 3,
    from: 100,
    to: 0,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 4,
    from: 0,
    to: 100,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 5,
    from: 1,
    to: 100,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 6,
    from: 4,
    to: 100,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 7,
    from: 4,
    to: 100,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 8,
    from: 100,
    to: 4,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 9,
    from: 100,
    to: 3,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 10,
    from: 100,
    to: 3,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 11,
    from: 100,
    to: 3,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 12,
    from: 100,
    to: 3,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
  {  
    id: 13,
    from: 100,
    to: 3,
    theme: 'Lorem Ipsum',
    content: 'Dolore sit eu ex aute in exercitation aute irure labore enim. Officia magna magna in aliquip minim velit non dolor exercitation labore eu eiusmod. Ullamco laboris reprehenderit et nulla consectetur dolor enim ex est ea mollit reprehenderit in dolore. Et non aliquip cillum excepteur proident eiusmod laborum',
  },
]
