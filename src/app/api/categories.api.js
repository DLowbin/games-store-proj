// REVIEW:  если нет реального апи, то стоит поднять мок сервер, с эмуляцией работы реального сервера
// Если нет такой возможности, то все моки выносятся в отдельный каталог __mock__ 
// Это нужно для того что бы понимать где константы для работы а где заглушки, не заглядывая в сами файлы

export const categories = {
  psgames: { id: 'd01dd088750b48b181a964e105addecc', name: 'Игры PS5' },
  xbgames: { id: '5885ea46aa1b439c9124c71b38c95a72', name: 'Игры Xbox' },
  psaccesories: { id: '16fdf6ccf7184f35abf47f931d5b69ec', name: 'Аксессуары PS5' },
  xbaccesories: { id: 'fcd48188bab74f3da2259a889bfb697b', name: 'Аксессуары Xbox' },
  all: { id: 'edbd1a337fbc4e4aa8a5f3be507b2661', name: 'Все товары' },
};
