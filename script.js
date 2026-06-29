/* ═══════════════════════════════════════════════════════════════
   НЕЗНАКОМКА v8.0 — ПОЛНЫЙ JAVASCRIPT
   Часть 1 из 5: Ядро игры, Конфигурация,
   Системы тем и языков, Глобальное состояние,
   Система времени, Погоды, Репутации,
   Данные контактов (10+)
═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 1. КОНФИГУРАЦИЯ И НАСТРОЙКИ
// ═══════════════════════════════════════════════════════════════

// Конфигурация тем
const THEMES = {
    midnight: {
        name: 'Полночь',
        icon: '🌙',
        bg: 'linear-gradient(190deg, #0e0b20 0%, #06050f 50%, #030208 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(124,92,252,0.25) 0%, transparent 55%)'
    },
    light: {
        name: 'Светлая',
        icon: '☀️',
        bg: 'linear-gradient(190deg, #e8e0f5 0%, #f0ecf8 50%, #f5f3ff 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(124,92,252,0.10) 0%, transparent 55%)'
    },
    forest: {
        name: 'Лес',
        icon: '🌲',
        bg: 'linear-gradient(190deg, #0a1a0e 0%, #050f08 50%, #020804 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(0,200,100,0.2) 0%, transparent 55%)'
    },
    ocean: {
        name: 'Океан',
        icon: '🌊',
        bg: 'linear-gradient(190deg, #0a0e1e 0%, #050810 50%, #020408 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(0,150,255,0.2) 0%, transparent 55%)'
    },
    sunset: {
        name: 'Закат',
        icon: '🌅',
        bg: 'linear-gradient(190deg, #1e0a0a 0%, #100505 50%, #080202 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(255,100,50,0.25) 0%, transparent 55%)'
    },
    warm: {
        name: 'Тёплая',
        icon: '🔥',
        bg: 'linear-gradient(190deg, #1a1410 0%, #241e18 50%, #2e2620 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(180,140,80,0.15) 0%, transparent 55%)'
    },
    nature: {
        name: 'Природа',
        icon: '🌿',
        bg: 'linear-gradient(190deg, #0a120a 0%, #101e10 50%, #182a18 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(60,180,60,0.15) 0%, transparent 55%)'
    },
    black: {
        name: 'Чёрная',
        icon: '⬛',
        bg: 'linear-gradient(190deg, #000000 0%, #050505 50%, #000000 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(80,80,80,0.12) 0%, transparent 55%)'
    },
    white: {
        name: 'Белая',
        icon: '⬜',
        bg: 'linear-gradient(190deg, #ffffff 0%, #f8f8f8 50%, #f2f2f2 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(0,0,0,0.04) 0%, transparent 55%)'
    },
    pink: {
        name: 'Розовая',
        icon: '🌸',
        bg: 'linear-gradient(190deg, #fff0f5 0%, #fce8ef 50%, #f8e0ea 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(255,100,150,0.12) 0%, transparent 55%)'
    },
    sky: {
        name: 'Голубая',
        icon: '🩵',
        bg: 'linear-gradient(190deg, #f0f8ff 0%, #e4f2fc 50%, #d8ecf8 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(30,140,255,0.12) 0%, transparent 55%)'
    },
    mint: {
        name: 'Мятная',
        icon: '🌿',
        bg: 'linear-gradient(190deg, #f0fff8 0%, #e0f8ec 50%, #d0f0e4 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(0,180,110,0.12) 0%, transparent 55%)'
    },
    peach: {
        name: 'Персик',
        icon: '🍑',
        bg: 'linear-gradient(190deg, #fff5ee 0%, #ffeee0 50%, #ffe5d0 100%)',
        overlay: 'radial-gradient(ellipse 100% 50% at 50% -10%, rgba(255,140,60,0.12) 0%, transparent 55%)'
    }
};

// Конфигурация шрифтов
const FONTS = {
    unbounded: { name: 'Unbounded', css: "'Unbounded', sans-serif" },
    inter: { name: 'Inter', css: "'Inter', sans-serif" },
    noto: { name: 'Noto Sans', css: "'Noto Sans', sans-serif" },
    mono: { name: 'Mono', css: "'Roboto Mono', monospace" }
};

// Конфигурация языков
const LANGUAGES = {
    ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' }
};

// Текущие настройки
let currentTheme = localStorage.getItem('nez_theme') || 'midnight';
let currentFont = localStorage.getItem('nez_font') || 'unbounded';
let currentLang = localStorage.getItem('nez_lang') || 'ru';

// ═══════════════════════════════════════════════════════════════
// 2. I18N СИСТЕМА (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const I18N = {
    ru: {
        // Экран блокировки
        swipe_unlock: 'проведите чтобы разблокировать',
        lock_notif: 'Привет... извини, что пишу так поздно',
        
        // Домашний экран
        no_messages: 'Нет новых сообщений',
        
        // Приложения
        gallery: 'Галерея',
        browser: 'Браузер',
        contacts: 'Контакты',
        notes: 'Заметки',
        settings: 'Настройки',
        authors: 'Авторы',
        camera: 'Камера',
        support: 'Поддержать',
        app_store: 'Магазин приложений',
        dictaphone: 'Диктофон',
        map: 'Карта',
        calculator: 'Калькулятор',
        investigation: 'Расследование',
        diary: 'Дневник Анны',
        endings: 'Концовки',
        
        // Мессенджер
        unknown: 'Неизвестный номер',
        was_online: 'был(а) давно',
        typing: 'печатает...',
        online: 'онлайн',
        system: 'СИСТЕМА',
        choose_answer: 'Выберите ответ',
        
        // Уведомления
        app_unlocked: 'Новое приложение!',
        content_unlocked: 'Новый контент!',
        missed_call: 'Пропущенный вызов',
        
        // Диалоги Акта I
        act1_msg1: 'Привет... извини, что пишу так поздно. Я не знаю, к кому ещё обратиться.',
        act1_msg2: 'Ты ведь Миша? Катя дала мне этот номер. Сказала, ты поможешь.',
        act1_choice1: 'Нет, ты ошиблась. Я не Миша.',
        act1_choice2: 'Да, это я. Что случилось?',
        act1_choice3: '(Не отвечать)',
        
        // Общие
        close: 'Закрыть',
        save: 'Сохранить',
        cancel: 'Отмена',
        yes: 'Да',
        no: 'Нет',
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успех',
        warning: 'Предупреждение',
        info: 'Информация',
        delete: 'Удалить',
        edit: 'Редактировать',
        back: 'Назад',
        next: 'Далее',
        continue: 'Продолжить',
        start: 'Начать',
        end: 'Конец',
        restart: 'Начать заново'
    },
    
    en: {
        swipe_unlock: 'swipe up to unlock',
        lock_notif: 'Hey... sorry for texting so late',
        no_messages: 'No new messages',
        gallery: 'Gallery',
        browser: 'Browser',
        contacts: 'Contacts',
        notes: 'Notes',
        settings: 'Settings',
        authors: 'Authors',
        camera: 'Camera',
        support: 'Support',
        app_store: 'App Store',
        dictaphone: 'Dictaphone',
        map: 'Map',
        calculator: 'Calculator',
        investigation: 'Investigation',
        diary: "Anna's Diary",
        endings: 'Endings',
        unknown: 'Unknown number',
        was_online: 'last seen a while ago',
        typing: 'typing...',
        online: 'online',
        system: 'SYSTEM',
        choose_answer: 'Choose answer',
        app_unlocked: 'New App!',
        content_unlocked: 'New Content!',
        missed_call: 'Missed Call',
        act1_msg1: "Hey... sorry for texting so late. I didn't know who else to turn to.",
        act1_msg2: 'Are you Misha? Katya gave me this number. She said you could help.',
        act1_choice1: "No, you got the wrong person. I'm not Misha.",
        act1_choice2: "Yes, it's me. What happened?",
        act1_choice3: "(Don't answer)",
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        yes: 'Yes',
        no: 'No',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        delete: 'Delete',
        edit: 'Edit',
        back: 'Back',
        next: 'Next',
        continue: 'Continue',
        start: 'Start',
        end: 'End',
        restart: 'Restart'
    },
    
    es: {
        swipe_unlock: 'desliza para desbloquear',
        lock_notif: 'Hola... perdón por escribir tan tarde',
        no_messages: 'No hay mensajes nuevos',
        gallery: 'Galería',
        browser: 'Navegador',
        contacts: 'Contactos',
        notes: 'Notas',
        settings: 'Ajustes',
        authors: 'Autores',
        camera: 'Cámara',
        support: 'Apoyar',
        app_store: 'Tienda de Apps',
        dictaphone: 'Grabadora',
        map: 'Mapa',
        calculator: 'Calculadora',
        investigation: 'Investigación',
        diary: 'Diario de Ana',
        endings: 'Finales',
        unknown: 'Número desconocido',
        was_online: 'visto hace tiempo',
        typing: 'escribiendo...',
        online: 'en línea',
        system: 'SISTEMA',
        choose_answer: 'Elige tu respuesta',
        app_unlocked: '¡Nueva App!',
        content_unlocked: '¡Nuevo Contenido!',
        missed_call: 'Llamada perdida',
        act1_msg1: 'Hola... perdón por escribir tan tarde. No sabía a quién más recurrir.',
        act1_msg2: '¿Eres Misha? Katya me dio este número. Dijo que podrías ayudar.',
        act1_choice1: 'No, te equivocaste. No soy Misha.',
        act1_choice2: 'Sí, soy yo. ¿Qué pasó?',
        act1_choice3: '(No responder)',
        close: 'Cerrar',
        save: 'Guardar',
        cancel: 'Cancelar',
        yes: 'Sí',
        no: 'No',
        loading: 'Cargando...',
        error: 'Error',
        success: 'Éxito',
        warning: 'Advertencia',
        info: 'Información',
        delete: 'Eliminar',
        edit: 'Editar',
        back: 'Atrás',
        next: 'Siguiente',
        continue: 'Continuar',
        start: 'Comenzar',
        end: 'Fin',
        restart: 'Reiniciar'
    }
};

function t(key) {
    return I18N[currentLang]?.[key] || I18N['ru'][key] || key;
}

function setLanguage(lang) {
    if (!I18N[lang]) lang = 'ru';
    currentLang = lang;
    localStorage.setItem('nez_lang', lang);
    document.body.setAttribute('data-lang', lang);
    applyTranslations();
    // Обновляем G.annaName если контакт ещё не раскрыт
    const unknownNames = [null, I18N['ru']['unknown'], I18N['en']['unknown'], I18N['es']['unknown']];
    if (unknownNames.indexOf(G.annaName) !== -1) {
        G.annaName = t('unknown');
    }
    if (typeof buildSettings === 'function') buildSettings();
    if (typeof buildHomeGrid === 'function') buildHomeGrid();
    if (typeof GameTime !== 'undefined') GameTime.updateAllDisplays();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // Обновляем имя контакта
    const cName = document.getElementById('cName');
    if (cName && (!G.annaName || G.annaName === I18N['ru']['unknown'] || G.annaName === I18N['en']['unknown'] || G.annaName === I18N['es']['unknown'])) {
        G.annaName = t('unknown');
        cName.textContent = G.annaName;
    }
    
    const cStatus = document.getElementById('cStatus');
    if (cStatus && !cStatus.classList.contains('online') && !cStatus.classList.contains('typing')) {
        cStatus.textContent = t('was_online');
    }
    
    // Обновляем статичные тексты на экране блокировки
    const lockHint = document.querySelector('.lock-hint');
    if (lockHint) lockHint.textContent = t('swipe_unlock');
    
    const lkNotifTxt = document.getElementById('lkNotifTxt');
    if (lkNotifTxt && !G.gameStarted) {
        lkNotifTxt.textContent = t('lock_notif');
    }
    
    // Обновляем заголовок choices area
    const choicesLabel = document.querySelector('.choices-label');
    if (choicesLabel) choicesLabel.textContent = t('choose_answer');
    
    // Обновляем toast-app если показан системный тост
    const toastApp = document.getElementById('toastApp');
    if (toastApp && toastApp.textContent === I18N['ru'].system) {
        toastApp.textContent = t('system');
    }
}

// ═══════════════════════════════════════════════════════════════
// 3. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И СОСТОЯНИЕ ИГРЫ
// ═══════════════════════════════════════════════════════════════

// Состояние игры
const G = {
    // Прогресс сюжета
    act: 1, // 1, 2, 3, 4, 5
    step: 0,
    gameStarted: false,
    endingReached: false,
    endingType: null,
    lastEndingId: null,
    
    // Параметры Анны
    annaName: null, // будет установлено после загрузки языка
    annaAlive: true,
    truthRevealed: false,
    killerKnown: false,
    
    // Коллекции
    galleryUnlocked: ['g0', 'g1'],
    endingsUnlocked: new Set(),
    notesUnlocked: [],
    diaryUnlocked: [],
    recordsUnlocked: [],
    cluesFound: [],
    contactsMet: [],
    weatherSeen: [],
    
    // Приложения
    appsUnlocked: ['msg', 'contacts', 'gallery', 'browser', 'notes', 'settings', 'authors', 'camera', 'appstore'],
    appsInstalled: ['msg', 'contacts', 'gallery', 'browser', 'notes', 'settings', 'authors', 'camera', 'appstore'],
    
    // Сюжетные флаги
    annaFirstContact: false,
    annaPhoneRevealed: false,
    house7Mentioned: false,
    policeCalled: false,
    diaryRead: false,
    hackCompleted: false,
    mapRevealed: false,
    katyaCalled: false,
    mamaWorried: false,
    
    // Состояние чата
    lastMsgId: 0,
    msgHistory: [],
    choices: [],
    chatLocked: false,
    choiceMade: false,
    waitingForReply: false,
    typingTimeout: null,
    isTyping: false,
    _lastResponseContext: '',
    
    // Сохранения
    lastSave: Date.now(),
    gameStartTime: Date.now(),
    lastActivity: Date.now()
};

// Параметры персонажа
const P = {
    trust: 30,      // 0-100
    fear: 10,       // 0-100
    stress: 20,     // 0-100
    dependency: 0,  // 0-100
    suspicion: 5,   // 0-100
    mentalState: 70, // 0-100
    paranoia: 15,   // 0-100
    guilt: 0,       // 0-100
    courage: 0,     // 0-100
    truth: 0        // 0-100
};

function resetP() {
    P.trust = 30;
    P.fear = 10;
    P.stress = 20;
    P.dependency = 0;
    P.suspicion = 5;
    P.mentalState = 70;
    P.paranoia = 15;
    P.guilt = 0;
    P.courage = 0;
    P.truth = 0;
}

function adj(stats) {
    for (const key in stats) {
        if (P[key] !== undefined) {
            P[key] = Math.max(0, Math.min(100, P[key] + stats[key]));
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// 4. СИСТЕМА ВРЕМЕНИ (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const GameTime = {
    // Игровое время (15 ноября 2024, 23:41)
    day: 9,
    month: 11, // ноябрь
    year: 2024,
    hour: 23,
    minute: 41,
    dayPeriod: 'night', // night, morning, day, evening
    lastTick: Date.now(),
    paused: false,
    speed: 1, // минут в реальную секунду
    interval: null,
    
    // Дни недели и месяцы для разных языков
    days: {
        ru: ['ВОСКРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'],
        en: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
        es: ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO']
    },
    months: {
        ru: ['ЯНВАРЯ', 'ФЕВРАЛЯ', 'МАРТА', 'АПРЕЛЯ', 'МАЯ', 'ИЮНЯ', 'ИЮЛЯ', 'АВГУСТА', 'СЕНТЯБРЯ', 'ОКТЯБРЯ', 'НОЯБРЯ', 'ДЕКАБРЯ'],
        en: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
        es: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
    },
    
    // Основные методы
    start() {
        this.load();
        this.updateAllDisplays();
        this.interval = setInterval(() => {
            this.tick();
        }, 1000 / this.speed);
    },
    
    tick() {
        if (!this.paused) {
            this.advance(1);
            this.lastTick = Date.now();
        }
    },
    
    advance(minutes) {
        this.minute += minutes;
        while (this.minute >= 60) {
            this.minute -= 60;
            this.hour++;
        }
        while (this.hour >= 24) {
            this.hour -= 24;
            this.day++;
            if (this.day > this.getDaysInMonth()) {
                this.day = 1;
                this.month++;
                if (this.month > 12) {
                    this.month = 1;
                    this.year++;
                }
            }
        }
        this.dayPeriod = this.getDayPeriod();
        this.updateAllDisplays();
        this.checkTimeEvents();
    },
    
    getDaysInMonth() {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Високосный год
        if (this.month === 2 && (this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0))) {
            return 29;
        }
        return daysInMonth[this.month - 1];
    },
    
    getDayPeriod() {
        const h = this.hour;
        if (h >= 23 || h < 5) return 'night';
        if (h >= 5 && h < 9) return 'morning';
        if (h >= 9 && h < 18) return 'day';
        if (h >= 18 && h < 23) return 'evening';
        return 'night';
    },
    
    getDayOfWeek() {
        // 15 ноября 2024 — пятница (5)
        const baseDate = new Date(2024, 10, 15);
        const currentDate = new Date(this.year, this.month - 1, this.day);
        const diffDays = Math.floor((currentDate - baseDate) / (24 * 60 * 60 * 1000));
        const dayIndex = ((5 + diffDays) % 7 + 7) % 7;
        return dayIndex;
    },
    
    getTimeString() {
        return String(this.hour).padStart(2, '0') + ':' + String(this.minute).padStart(2, '0');
    },
    
    getDateString() {
        const lang = currentLang || 'ru';
        const days = this.days[lang] || this.days.ru;
        const months = this.months[lang] || this.months.ru;
        return days[this.getDayOfWeek()] + ', ' + this.day + ' ' + months[this.month - 1];
    },
    
    getShortDateString() {
        const lang = currentLang || 'ru';
        const days = this.days[lang] || this.days.ru;
        const months = this.months[lang] || this.months.ru;
        return days[this.getDayOfWeek()] + ' · ' + this.day + ' ' + months[this.month - 1];
    },
    
    getTimeOfDay() {
        const h = this.hour;
        if (h >= 23 || h < 5) return 'night';
        if (h >= 5 && h < 12) return 'morning';
        if (h >= 12 && h < 17) return 'day';
        return 'evening';
    },
    
    isNightTime() {
        const h = this.hour;
        return h >= 22 || h < 5;
    },
    
    // Управление временем
    setTime(day, month, hour, minute) {
        this.day = day;
        this.month = month;
        this.hour = hour;
        this.minute = minute;
        this.dayPeriod = this.getDayPeriod();
        this.updateAllDisplays();
    },
    
    jumpToNight() {
        if (this.hour < 22) {
            this.hour = 23;
            this.minute = 15 + Math.floor(Math.random() * 30);
        } else {
            this.day++;
            if (this.day > this.getDaysInMonth()) {
                this.day = 1;
                this.month++;
                if (this.month > 12) this.month = 1;
            }
            this.hour = 23;
            this.minute = 15 + Math.floor(Math.random() * 30);
        }
        this.dayPeriod = 'night';
        this.updateAllDisplays();
    },
    
    jumpToMorning() {
        this.day++;
        if (this.day > this.getDaysInMonth()) {
            this.day = 1;
            this.month++;
            if (this.month > 12) this.month = 1;
        }
        this.hour = 8 + Math.floor(Math.random() * 3);
        this.minute = Math.floor(Math.random() * 60);
        this.dayPeriod = 'morning';
        this.updateAllDisplays();
    },
    
    jumpToEvening() {
        this.hour = 19 + Math.floor(Math.random() * 3);
        this.minute = Math.floor(Math.random() * 60);
        this.dayPeriod = 'evening';
        this.updateAllDisplays();
    },
    
    // Обновление UI
    updateAllDisplays() {
        const time = this.getTimeString();
        const date = this.getDateString();
        const shortDate = this.getShortDateString();
        
        // Обновляем все элементы времени
        const timeIds = [
            'lkTime', 'lkClock', 'hmTime', 'hmClock', 'msgTime',
            'galleryTime', 'browserTime', 'contactsTime', 'notesTime', 
            'settingsTime', 'cameraTime', 'authorsTime', 'dictaphoneTime',
            'mapTime', 'calcTime', 'investigationTime', 'diaryTime', 
            'endingsTime', 'appstoreTime'
        ];
        
        timeIds.forEach(function(id) {
            const el = document.getElementById(id);
            if (el) el.textContent = time;
        });
        
        // Даты
        const lkDate = document.getElementById('lkDate');
        if (lkDate) lkDate.textContent = date;
        
        const hmDate = document.getElementById('hmDate');
        if (hmDate) hmDate.textContent = shortDate;
        
        const lkNotifTime = document.getElementById('lkNotifTime');
        if (lkNotifTime) lkNotifTime.textContent = time;
        
        // Ночной режим
        const isNight = this.isNightTime();
        document.body.classList.toggle('night-mode', isNight);
        G.isNight = isNight;
        
        const nightInd = document.getElementById('nightInd');
        if (nightInd) {
            nightInd.style.display = isNight ? 'block' : 'none';
            if (isNight) {
                nightInd.textContent = this.hour >= 2 && this.hour < 5 ? '🌑' : '🌙';
                nightInd.style.opacity = this.hour >= 2 && this.hour < 5 ? '0.3' : '0.6';
            }
        }
        
        this.save();
    },
    
    // Проверка временных событий
    checkTimeEvents() {
        const h = this.hour;
        const m = this.minute;
        
        // Смена погоды каждые 2-4 часа
        if (m === 0 && h % 3 === 0) {
            if (typeof WeatherSystem !== 'undefined') {
                WeatherSystem.changeWeather();
            }
        }
        
        // Переход от ночи к утру (около 6 утра)
        if (h === 6 && m === 0 && this.dayPeriod === 'night') {
            this.onMorning();
        }
        
        // Переход от дня к вечеру (около 18)
        if (h === 18 && m === 0 && (this.dayPeriod === 'day' || this.dayPeriod === 'evening')) {
            this.onEvening();
        }
    },
    
    onMorning() {
        this.dayPeriod = 'morning';
        this.updateAllDisplays();
        showToast('☀️ Наступило утро', t('system'));
        if (typeof WeatherSystem !== 'undefined') {
            WeatherSystem.changeWeather('clear');
        }
        if (G.act === 2 && typeof triggerMorningDialogue === 'function') {
            triggerMorningDialogue();
        }
    },
    
    onEvening() {
        this.dayPeriod = 'evening';
        this.updateAllDisplays();
        showToast('🌅 Наступает вечер', t('system'));
    },
    
    // Пауза/возобновление
    pause() {
        this.paused = true;
    },
    
    resume() {
        this.paused = false;
        this.lastTick = Date.now();
    },
    
    // Сохранение/загрузка
    save() {
        try {
            localStorage.setItem('nez_gametime', JSON.stringify({
                day: this.day,
                month: this.month,
                year: this.year,
                hour: this.hour,
                minute: this.minute
            }));
        } catch(e) {}
    },
    
    load() {
        const saved = localStorage.getItem('nez_gametime');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.day = data.day || 9;
                this.month = data.month || 11;
                this.year = data.year || 2024;
                this.hour = data.hour || 23;
                this.minute = data.minute || 41;
            } catch(e) {
                this.resetToDefault();
            }
        } else {
            this.resetToDefault();
        }
        this.dayPeriod = this.getDayPeriod();
    },
    
    resetToDefault() {
        this.day = 9;
        this.month = 11;
        this.year = 2024;
        this.hour = 23;
        this.minute = 41;
        this.dayPeriod = 'night';
    },
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

// Вспомогательная функция
function getT() {
    return GameTime.getTimeString();
}

// ═══════════════════════════════════════════════════════════════
// 5. СИСТЕМА ПОГОДЫ (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const WeatherSystem = {
    current: 'rain',
    intensity: 60,
    nextChange: 0,
    interval: null,
    stormInterval: null,
    
    types: ['clear', 'rain', 'storm', 'fog', 'snow'],
    
    weatherMessages: {
        rain: [
            'Слышишь дождь? Он заглушает шаги за окном.',
            'Капли стучат по подоконнику. Или это не капли?',
            'В дождь всегда труднее услышать, когда кто-то подходит.',
            'Я люблю дождь. Но не сегодня. Не этой ночью.',
            'Дождь смывает следы. И запахи. И звуки.'
        ],
        storm: [
            'Гроза! Я боюсь, что свет отключится!',
            'Молния на секунду осветила двор. Там кто-то был.',
            'Гром заглушает всё. Даже крики.',
            'Пожалуйста, не пропадай. Мне страшно одной в грозу.',
            'Каждый удар грома — как выстрел.'
        ],
        fog: [
            'В тумане ничего не видно. Он может быть где угодно.',
            'Я выглянула в окно — белая стена. Жутко.',
            'Туман такой густой, что фонари еле светятся.',
            'Говорят, в тумане легко заблудиться. Даже рядом с домом.',
            'Туман скрывает всё. Даже правду.'
        ],
        snow: [
            'Снег скрипит под окном. Кто-то ходит.',
            'На снегу следы. Они ведут к моей двери.',
            'Всё белое... слишком чистое. Как будто что-то скрывает.',
            'Снег заглушает звуки. Я ничего не слышу.',
            'Снег — как саван для города.'
        ],
        clear: [
            'Сегодня тихо. Слишком тихо.',
            'Ясное небо. Звёзды такие яркие.',
            'Без ветра. Даже листья не шевелятся.',
            'В ясную ночь видно всё. И это пугает.',
            'Звёзды смотрят на меня. Как тысячи глаз.'
        ]
    },
    
    weatherIcons: {
        clear: '☀️',
        rain: '🌧️',
        storm: '⛈️',
        fog: '🌫️',
        snow: '❄️'
    },
    
    weatherLabels: {
        clear: 'Ясно',
        rain: 'Дождь',
        storm: 'Гроза',
        fog: 'Туман',
        snow: 'Снег'
    },
    
    start() {
        this.randomize();
        this.apply();
        this.interval = setInterval(() => {
            this.tick();
        }, 30000);
    },
    
    randomize() {
        const month = GameTime.month;
        const roll = Math.random() * 100;
        let type = 'clear';
        let intensity = 0;
        
        // Сезонные погоды
        if (month >= 11 || month <= 2) { // Зима
            if (roll < 35) { type = 'snow'; intensity = 30 + Math.random() * 50; }
            else if (roll < 50) { type = 'fog'; intensity = 40 + Math.random() * 40; }
            else if (roll < 60) { type = 'rain'; intensity = 20 + Math.random() * 30; }
            else { type = 'clear'; intensity = 0; }
        } else if (month >= 3 && month <= 5) { // Весна
            if (roll < 40) { type = 'rain'; intensity = 30 + Math.random() * 50; }
            else if (roll < 55) { type = 'fog'; intensity = 30 + Math.random() * 30; }
            else if (roll < 65) { type = 'storm'; intensity = 50 + Math.random() * 40; }
            else { type = 'clear'; intensity = 0; }
        } else if (month >= 6 && month <= 8) { // Лето
            if (roll < 20) { type = 'storm'; intensity = 60 + Math.random() * 40; }
            else if (roll < 30) { type = 'rain'; intensity = 20 + Math.random() * 30; }
            else if (roll < 35) { type = 'fog'; intensity = 10 + Math.random() * 20; }
            else { type = 'clear'; intensity = 0; }
        } else { // Осень
            if (roll < 45) { type = 'rain'; intensity = 40 + Math.random() * 50; }
            else if (roll < 60) { type = 'fog'; intensity = 50 + Math.random() * 40; }
            else if (roll < 70) { type = 'storm'; intensity = 40 + Math.random() * 40; }
            else { type = 'clear'; intensity = 0; }
        }
        
        // Ночью чаще туман или дождь
        if (GameTime.dayPeriod === 'night' && type === 'clear' && Math.random() > 0.6) {
            const nightWeathers = ['fog', 'rain', 'storm'];
            type = nightWeathers[Math.floor(Math.random() * nightWeathers.length)];
            intensity = 30 + Math.random() * 40;
        }
        
        this.setWeather(type, intensity);
    },
    
    setWeather(type, intensity) {
        if (!this.types.includes(type)) type = 'clear';
        this.current = type;
        this.intensity = Math.min(100, Math.max(0, intensity || 0));
        this.nextChange = Date.now() + (5 + Math.random() * 15) * 60000;
        // Track seen weather for achievement
        if (!G.weatherSeen) G.weatherSeen = [];
        if (!G.weatherSeen.includes(type)) {
            G.weatherSeen.push(type);
            if (typeof AchievementSystem !== 'undefined') {
                AchievementSystem.check('weather_survivor');
            }
        }
        this.apply();
        this.updateIcons();
    },
    
    changeWeather(force) {
        let type;
        if (force && this.types.includes(force)) {
            type = force;
        } else {
            const others = this.types.filter(t => t !== this.current);
            type = others[Math.floor(Math.random() * others.length)];
        }
        this.setWeather(type, this.intensity);
        showToast(`🌤 Погода изменилась: ${this.getWeatherLabel(type)}`, t('system'));
    },
    
    apply() {
        this.clearEffects();
        
        const rainOverlay = document.getElementById('weatherRain');
        const stormFlash = document.getElementById('weatherStorm');
        const fogOverlay = document.getElementById('weatherFog');
        const snowOverlay = document.getElementById('weatherSnow');
        const condensation = document.getElementById('weatherCondensation');
        
        switch (this.current) {
            case 'rain':
                if (rainOverlay) {
                    rainOverlay.classList.add('active');
                    rainOverlay.innerHTML = '';
                    const dropCount = Math.floor(this.intensity * 1.5);
                    for (let i = 0; i < dropCount; i++) {
                        const drop = document.createElement('div');
                        drop.className = 'raindrop';
                        drop.style.left = Math.random() * 100 + '%';
                        drop.style.animationDuration = (0.5 + Math.random() * 0.8) + 's';
                        drop.style.animationDelay = Math.random() * 2 + 's';
                        drop.style.height = (10 + Math.random() * 25) + 'px';
                        drop.style.opacity = (0.2 + Math.random() * 0.4);
                        rainOverlay.appendChild(drop);
                    }
                }
                if (this.intensity > 30 && condensation) {
                    condensation.classList.add('active');
                }
                if (fogOverlay) fogOverlay.classList.remove('active');
                if (snowOverlay) snowOverlay.classList.remove('active');
                if (stormFlash) stormFlash.classList.remove('active');
                break;
                
            case 'storm':
                if (rainOverlay) {
                    rainOverlay.classList.add('active');
                    rainOverlay.innerHTML = '';
                    const dropCount = Math.floor(this.intensity * 1.8);
                    for (let i = 0; i < dropCount; i++) {
                        const drop = document.createElement('div');
                        drop.className = 'raindrop';
                        drop.style.left = Math.random() * 100 + '%';
                        drop.style.animationDuration = (0.3 + Math.random() * 0.6) + 's';
                        drop.style.animationDelay = Math.random() * 2 + 's';
                        drop.style.height = (15 + Math.random() * 30) + 'px';
                        drop.style.opacity = (0.3 + Math.random() * 0.5);
                        rainOverlay.appendChild(drop);
                    }
                }
                this.startStorm();
                if (condensation) condensation.classList.add('active');
                if (fogOverlay) fogOverlay.classList.remove('active');
                if (snowOverlay) snowOverlay.classList.remove('active');
                break;
                
            case 'fog':
                if (fogOverlay) fogOverlay.classList.add('active');
                if (condensation) condensation.classList.add('active');
                if (rainOverlay) rainOverlay.classList.remove('active');
                if (snowOverlay) snowOverlay.classList.remove('active');
                if (stormFlash) stormFlash.classList.remove('active');
                break;
                
            case 'snow':
                if (snowOverlay) {
                    snowOverlay.classList.add('active');
                    snowOverlay.innerHTML = '';
                    const flakeCount = Math.floor(this.intensity * 1.2);
                    for (let i = 0; i < flakeCount; i++) {
                        const flake = document.createElement('div');
                        flake.className = 'snowflake';
                        flake.style.left = Math.random() * 100 + '%';
                        const size = 2 + Math.random() * 4;
                        flake.style.width = size + 'px';
                        flake.style.height = size + 'px';
                        flake.style.animationDuration = (3 + Math.random() * 6) + 's';
                        flake.style.animationDelay = Math.random() * 5 + 's';
                        flake.style.opacity = (0.4 + Math.random() * 0.6);
                        snowOverlay.appendChild(flake);
                    }
                }
                if (this.intensity > 20 && condensation) {
                    condensation.classList.add('active');
                }
                if (rainOverlay) rainOverlay.classList.remove('active');
                if (fogOverlay) fogOverlay.classList.remove('active');
                if (stormFlash) stormFlash.classList.remove('active');
                break;
                
            case 'clear':
                if (rainOverlay) rainOverlay.classList.remove('active');
                if (fogOverlay) fogOverlay.classList.remove('active');
                if (snowOverlay) snowOverlay.classList.remove('active');
                if (stormFlash) stormFlash.classList.remove('active');
                if (condensation) condensation.classList.remove('active');
                break;
        }
    },
    
    clearEffects() {
        const rainOverlay = document.getElementById('weatherRain');
        const stormFlash = document.getElementById('weatherStorm');
        const fogOverlay = document.getElementById('weatherFog');
        const snowOverlay = document.getElementById('weatherSnow');
        const condensation = document.getElementById('weatherCondensation');
        
        if (rainOverlay) {
            rainOverlay.classList.remove('active');
            rainOverlay.innerHTML = '';
        }
        if (stormFlash) stormFlash.classList.remove('active');
        if (fogOverlay) fogOverlay.classList.remove('active');
        if (snowOverlay) {
            snowOverlay.classList.remove('active');
            snowOverlay.innerHTML = '';
        }
        if (condensation) condensation.classList.remove('active');
        
        if (this.stormInterval) {
            clearInterval(this.stormInterval);
            this.stormInterval = null;
        }
    },
    
    startStorm() {
        if (this.stormInterval) {
            clearInterval(this.stormInterval);
        }
        const self = this;
        this.stormInterval = setInterval(function() {
            if (Math.random() < self.intensity / 100 * 0.3) {
                const stormFlash = document.getElementById('weatherStorm');
                if (stormFlash) {
                    stormFlash.classList.add('active');
                    setTimeout(function() {
                        stormFlash.classList.remove('active');
                    }, 100 + Math.random() * 200);
                }
            }
        }, 2000 + Math.random() * 5000);
    },
    
    updateIcons() {
        const icon = this.weatherIcons[this.current] || '🌤️';
        document.querySelectorAll('.weather-icon, #weatherIcon, #weatherIconHome, #weatherIconMsg')
            .forEach(function(el) {
                if (el) {
                    el.textContent = icon;
                    el.style.display = 'inline';
                }
            });
    },
    
    getWeatherLabel(type) {
        return this.weatherLabels[type] || type;
    },
    
    getWeatherMessage() {
        const pool = this.weatherMessages[this.current] || this.weatherMessages.clear;
        return pool[Math.floor(Math.random() * pool.length)];
    },
    
    forceWeather(type, intensity, durationSeconds) {
        this.setWeather(type, intensity);
        this.nextChange = Date.now() + (durationSeconds || 60) * 1000;
    },
    
    tick() {
        if (Date.now() > this.nextChange) {
            this.randomize();
        }
    },
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        if (this.stormInterval) {
            clearInterval(this.stormInterval);
            this.stormInterval = null;
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 6. СИСТЕМА РЕПУТАЦИИ (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const ReputationSystem = {
    stars: 0,
    maxStars: 5,
    starThresholds: [0, 100, 250, 500, 1000, 2000],
    totalXP: 0,
    
    xpValues: {
        message_sent: 2,
        message_received: 1,
        clue_found: 25,
        ending_unlocked: 100,
        achievement: 50,
        call_answered: 20,
        hack_success: 75,
        katya_helped: 30,
        diary_read: 10,
        secret_found: 150,
        all_clues: 200,
        all_endings: 500,
        photo_unlocked: 5,
        act_completed: 50,
        trust_milestone: 30
    },
    
    addXP(action, amount) {
        const baseXP = this.xpValues[action] || 0;
        const xp = amount || baseXP;
        this.totalXP += xp;
        this.checkStars();
        this.save();
        if (xp > 5) {
            showToast(`+${xp} XP (${action})`, t('system'));
        }
        return xp;
    },
    
    checkStars() {
        let newStars = 0;
        for (let i = this.starThresholds.length - 1; i >= 0; i--) {
            if (this.totalXP >= this.starThresholds[i]) {
                newStars = i;
                break;
            }
        }
        if (newStars > this.stars) {
            this.stars = newStars;
            showToast(`⭐ Репутация повышена! Уровень ${this.stars}`, t('system'));
            if (typeof AchievementSystem !== 'undefined') {
                AchievementSystem.check('rep_level_' + this.stars);
            }
        }
        this.updateUI();
    },
    
    getStarsHTML() {
        let html = '<div class="reputation-stars">';
        for (let i = 1; i <= this.maxStars; i++) {
            html += `<span class="rep-star${i <= this.stars ? ' earned' : ''}">⭐</span>`;
        }
        return html + '</div>';
    },
    
    updateUI() {
        const el = document.getElementById('repDisplay');
        if (el) {
            el.textContent = `⭐ Ур.${this.stars} (${this.totalXP} XP)`;
        }
        document.querySelectorAll('.rep-star').forEach(function(star, i) {
            star.classList.toggle('earned', i < ReputationSystem.stars);
        });
    },
    
    getProgressToNext() {
        const current = this.starThresholds[this.stars];
        const next = this.starThresholds[this.stars + 1];
        if (!next) return 100;
        const progress = ((this.totalXP - current) / (next - current)) * 100;
        return Math.min(100, Math.max(0, progress));
    },
    
    save() {
        try {
            localStorage.setItem('nez_reputation', JSON.stringify({
                stars: this.stars,
                totalXP: this.totalXP
            }));
        } catch(e) {}
    },
    
    load() {
        const saved = localStorage.getItem('nez_reputation');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.stars = data.stars || 0;
                this.totalXP = data.totalXP || 0;
            } catch(e) {}
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 7. ДАННЫЕ КОНТАКТОВ (10+ КОНТАКТОВ С ИСТОРИЯМИ)
// ═══════════════════════════════════════════════════════════════

const CONTACTS_DATA = [
    {
        id: 'anna',
        name: 'Анна',
        avatar: '👩',
        status: 'online',
        phone: '+7 (999) 123-45-67',
        description: 'Молодой фотограф, живёт в доме №7. Тревожная, но добрая. Ищет ответы на вопросы о своём прошлом.',
        relation: 'Главная героиня',
        mood: 'Тревожно',
        story: 'Анна переехала в дом №7 полгода назад. С тех пор её начали преследовать странные сны и чувство дежавю. Она чувствует, что этот дом хранит какую-то тайну, связанную с её семьёй. Анна занимается фотографией, и у неё есть привычка фотографировать всё вокруг — возможно, это поможет раскрыть тайну.',
        tags: ['Фотограф', 'Тревожная', 'Ищущая']
    },
    {
        id: 'katya',
        name: 'Катя',
        avatar: '👩‍🦰',
        status: 'была недавно',
        phone: '+7 (999) 234-56-78',
        description: 'Лучшая подруга Анны. Работает психологом. Всегда готова выслушать и помочь.',
        relation: 'Подруга',
        mood: 'Спокойная',
        story: 'Катя дружит с Анной ещё со школы. Она всегда была той, кто поддерживал Анну в трудные моменты. Недавно Катя заметила, что Анна стала странно себя вести — слишком много говорить о доме №7 и его тайнах. Катя пытается помочь подруге, но чувствует, что та что-то скрывает.',
        tags: ['Психолог', 'Подруга', 'Поддержка']
    },
    {
        id: 'mama',
        name: 'Мама Анны',
        avatar: '👩‍🦳',
        status: 'онлайн',
        phone: '+7 (999) 345-67-89',
        description: 'Мама Анны. Живёт в другом городе. Беспокоится о дочери и её странных увлечениях.',
        relation: 'Мать',
        mood: 'Беспокойная',
        story: 'Мама Анны всегда была против того, чтобы дочь переезжала в дом №7. Она помнит, что в этом доме когда-то жила её собственная мать, которая исчезла при загадочных обстоятельствах. Мама боится, что Анна повторит судьбу бабушки.',
        tags: ['Мать', 'Беспокойная', 'Заботливая']
    },
    {
        id: 'sergey',
        name: 'Сергей',
        avatar: '👨',
        status: 'был вчера',
        phone: '+7 (999) 456-78-90',
        description: 'Сосед Анны по подъезду. Странный тип, который всегда что-то ищет в подвале.',
        relation: 'Сосед',
        mood: 'Подозрительный',
        story: 'Сергей живёт в квартире напротив. Он часто ходит в подвал и что-то там ищет. Анна заметила, что он всегда избегает разговоров о прошлом дома. Возможно, он знает больше, чем говорит.',
        tags: ['Сосед', 'Подозрительный', 'Скрытный']
    },
    {
        id: 'olga',
        name: 'Ольга',
        avatar: '👩‍💼',
        status: 'была недавно',
        phone: '+7 (999) 567-89-01',
        description: 'Риелтор, которая продала Анне квартиру. Странно себя вела при подписании документов.',
        relation: 'Риелтор',
        mood: 'Странная',
        story: 'Ольга была очень настойчивой, когда предлагала Анне эту квартиру. Она упоминала, что дом №7 "особенный", но отказывалась уточнять, что это значит. Анна подозревает, что Ольга знает о доме больше, чем говорит.',
        tags: ['Риелтор', 'Странная', 'Скрытная']
    },
    {
        id: 'misha',
        name: 'Миша',
        avatar: '👨‍💻',
        status: 'был давно',
        phone: '+7 (999) 678-90-12',
        description: 'Бывший парень Анны. Ушёл, когда она начала увлекаться тайнами дома №7.',
        relation: 'Бывший',
        mood: 'Обиженный',
        story: 'Миша и Анна расстались полгода назад. Он считал, что Анна "сошла с ума" из-за этого дома. Недавно он прислал сообщение, в котором предупреждал её быть осторожнее. Возможно, он что-то знает.',
        tags: ['Бывший', 'Обиженный', 'Осторожный']
    },
    {
        id: 'nikolay',
        name: 'Николай Петрович',
        avatar: '👴',
        status: 'был вчера',
        phone: '+7 (999) 789-01-23',
        description: 'Старый жилец дома №7. Живёт здесь уже 40 лет. Может многое рассказать.',
        relation: 'Сосед снизу',
        mood: 'Дружелюбный',
        story: 'Николай Петрович — единственный, кто живёт в этом доме дольше всех. Он помнит ещё тех, кто жил здесь до Анны. Говорит, что дом "помнит всё" и иногда "говорит" с жильцами.',
        tags: ['Старожил', 'Дружелюбный', 'Мудрый']
    },
    {
        id: 'larisa',
        name: 'Лариса',
        avatar: '👩‍🎨',
        status: 'онлайн',
        phone: '+7 (999) 890-12-34',
        description: 'Художница, которая иногда рисует дом №7. Знает его историю.',
        relation: 'Знакомая',
        mood: 'Творческая',
        story: 'Лариса часто рисует дом №7. Она говорит, что чувствует его "энергетику". Она показывала Анне свои картины — на них дом выглядит совсем не так, как в реальности. Возможно, она видит то, что скрыто от других.',
        tags: ['Художница', 'Творческая', 'Интуитивная']
    },
    {
        id: 'viktor',
        name: 'Виктор',
        avatar: '👨‍✈️',
        status: 'был недавно',
        phone: '+7 (999) 901-23-45',
        description: 'Полицейский, который ведёт дело о странных происшествиях в доме №7.',
        relation: 'Полицейский',
        mood: 'Настороженный',
        story: 'Виктор занимается расследованием исчезновений в этом районе. Он подозревает, что дом №7 связан с этим. Он дал Анне свой номер, чтобы она сообщала о странных вещах.',
        tags: ['Полицейский', 'Настороженный', 'Расследование']
    },
    {
        id: 'marina',
        name: 'Марина',
        avatar: '👩‍⚕️',
        status: 'была недавно',
        phone: '+7 (999) 012-34-56',
        description: 'Врач, которая лечила Анну после странного происшествия в доме.',
        relation: 'Врач',
        mood: 'Озабоченная',
        story: 'Марина лечила Анну после того, как та упала в обморок в подвале. Она заметила странные синяки на теле Анны, которые не могли возникнуть от падения. Марина посоветовала Анне покинуть дом.',
        tags: ['Врач', 'Озабоченная', 'Советующая']
    },
    {
        id: 'pavel',
        name: 'Павел',
        avatar: '👨‍🏫',
        status: 'был давно',
        phone: '+7 (999) 123-45-68',
        description: 'Учитель истории, который интересовался домом №7.',
        relation: 'Знакомый',
        mood: 'Заинтересованный',
        story: 'Павел собирал материалы о доме №7 для своей книги. Он нашёл старые документы, которые указывают на то, что дом был построен на месте старого кладбища. Он умер при загадочных обстоятельствах год назад.',
        tags: ['Учитель', 'Заинтересованный', 'Исследователь']
    },
    {
        id: 'dima',
        name: 'Дима',
        avatar: '👨‍🎤',
        status: 'онлайн',
        phone: '+7 (999) 234-56-79',
        description: 'Музыкант, который живёт в соседнем доме. Он часто играет на гитаре поздно ночью.',
        relation: 'Сосед из соседнего дома',
        mood: 'Расслабленный',
        story: 'Дима снимает квартиру в соседнем доме. Он говорит, что по ночам из дома №7 доносится странная музыка. Он записал несколько треков и хочет показать их Анне.',
        tags: ['Музыкант', 'Сосед', 'Наблюдательный']
    },
    {
        id: 'nastya',
        name: 'Настя',
        avatar: '👩‍🦱',
        status: 'была недавно',
        phone: '+7 (999) 345-67-80',
        description: 'Подруга Кати. Иногда приходит в гости к Анне.',
        relation: 'Подруга подруги',
        mood: 'Весёлая',
        story: 'Настя часто приходит к Анне вместе с Катей. Она любит шутить и не воспринимает "истории о доме" серьёзно. Но однажды она увидела что-то странное в окне дома №7 и с тех пор стала менее весёлой.',
        tags: ['Подруга', 'Весёлая', 'Скептичная']
    }
];

// ═══════════════════════════════════════════════════════════════
// 8. СИСТЕМА ДОСТИЖЕНИЙ (20+)
// ═══════════════════════════════════════════════════════════════

const AchievementSystem = {
    achievements: {
        // Базовые достижения
        first_contact: { 
            name: 'Первый контакт', 
            desc: 'Начать переписку с Анной', 
            icon: '💬', 
            unlocked: false 
        },
        trust_30: { 
            name: 'Начало доверия', 
            desc: 'Достичь 30 уровня доверия', 
            icon: '🤝', 
            unlocked: false,
            condition: () => P.trust >= 30
        },
        trust_60: { 
            name: 'Близость', 
            desc: 'Достичь 60 уровня доверия', 
            icon: '💛', 
            unlocked: false,
            condition: () => P.trust >= 60
        },
        trust_100: { 
            name: 'Абсолютное доверие', 
            desc: 'Достичь 100 уровня доверия', 
            icon: '💜', 
            unlocked: false,
            condition: () => P.trust >= 100
        },
        
        // Галерея
        gallery_3: { 
            name: 'Любопытный', 
            desc: 'Открыть 3 фото в галерее', 
            icon: '🖼️', 
            unlocked: false,
            condition: () => G.galleryUnlocked.length >= 3
        },
        gallery_6: { 
            name: 'Исследователь', 
            desc: 'Открыть 6 фото в галерее', 
            icon: '📸', 
            unlocked: false,
            condition: () => G.galleryUnlocked.length >= 6
        },
        gallery_12: { 
            name: 'Коллекционер', 
            desc: 'Открыть все 12 фото', 
            icon: '🏆', 
            unlocked: false,
            condition: () => G.galleryUnlocked.length >= 12
        },
        
        // Сюжетные
        hack_complete: { 
            name: 'Взломщик', 
            desc: 'Взломать полицейские файлы', 
            icon: '💻', 
            unlocked: false,
            condition: () => G.hackCompleted
        },
        all_endings: { 
            name: 'Искатель истины', 
            desc: 'Разблокировать все концовки', 
            icon: '🎭', 
            unlocked: false,
            condition: () => G.endingsUnlocked.size >= 8
        },
        detective: { 
            name: 'Детектив', 
            desc: 'Найти все улики', 
            icon: '🔍', 
            unlocked: false,
            condition: () => typeof ClueSystem !== 'undefined' && ClueSystem.getAllFound()
        },
        
        // Репутация
        rep_level_1: { 
            name: 'Знакомый', 
            desc: 'Достичь 1 уровня репутации', 
            icon: '⭐', 
            unlocked: false,
            condition: () => ReputationSystem.stars >= 1
        },
        rep_level_3: { 
            name: 'Друг', 
            desc: 'Достичь 3 уровня репутации', 
            icon: '⭐⭐⭐', 
            unlocked: false,
            condition: () => ReputationSystem.stars >= 3
        },
        rep_level_5: { 
            name: 'Легенда', 
            desc: 'Достичь 5 уровня репутации', 
            icon: '⭐⭐⭐⭐⭐', 
            unlocked: false,
            condition: () => ReputationSystem.stars >= 5
        },
        
        // Концовки
        ending_good: { 
            name: 'Спаситель', 
            desc: 'Получить хорошую концовку', 
            icon: '🌈', 
            unlocked: false,
            condition: () => G.endingType === 'redemption' || G.endingType === 'salvation'
        },
        ending_bad: { 
            name: 'Трагедия', 
            desc: 'Получить плохую концовку', 
            icon: '💀', 
            unlocked: false,
            condition: () => G.endingType === 'tragedy' || G.endingType === 'ghost'
        },
        ending_secret: { 
            name: 'Тайна', 
            desc: 'Получить секретную концовку', 
            icon: '🔮', 
            unlocked: false,
            condition: () => G.endingType === 'secret' || G.endingType === 'watcher'
        },
        
        // Дополнительные
        all_apps: { 
            name: 'Техноман', 
            desc: 'Установить все приложения', 
            icon: '📱', 
            unlocked: false,
            condition: () => G.appsInstalled.length >= 18
        },
        diary_fan: { 
            name: 'Дневниковед', 
            desc: 'Прочитать все записи в дневнике', 
            icon: '📖', 
            unlocked: false,
            condition: () => G.diaryRead
        },
        weather_survivor: { 
            name: 'Стихия', 
            desc: 'Пережить все виды погоды', 
            icon: '🌪️', 
            unlocked: false,
            condition: () => typeof WeatherSystem !== 'undefined' && 
                WeatherSystem.types.every(t => G.weatherSeen && G.weatherSeen.includes(t))
        },
        night_owl: { 
            name: 'Ночная сова', 
            desc: 'Провести в игре 5 ночей', 
            icon: '🦉', 
            unlocked: false
        },
        konami: { 
            name: 'Konami Code', 
            desc: 'Активировать секретный код', 
            icon: '🎮', 
            unlocked: false,
            secret: true
        },
        secret_button: { 
            name: 'Секретная кнопка', 
            desc: 'Нажать скрытую кнопку 10 раз', 
            icon: '🔮', 
            unlocked: false,
            secret: true
        },
        ghost_whisperer: { 
            name: 'Шёпот призраков', 
            desc: 'Найти скрытое сообщение в чате', 
            icon: '👻', 
            unlocked: false,
            secret: true
        }
    },
    
    unlock(id) {
        const ach = this.achievements[id];
        if (!ach || ach.unlocked) return;
        ach.unlocked = true;
        this.showToast(ach);
        this.save();
        ReputationSystem.addXP('achievement');
        return true;
    },
    
    check(id) {
        const ach = this.achievements[id];
        if (!ach || ach.unlocked) return;
        if (ach.condition && ach.condition()) {
            this.unlock(id);
            return true;
        }
        return false;
    },
    
    checkAll() {
        const self = this;
        Object.keys(this.achievements).forEach(function(id) {
            self.check(id);
        });
    },
    
    showToast(achievement) {
        const toast = document.getElementById('achievementToast');
        const icon = document.getElementById('achIcon');
        const name = document.getElementById('achName');
        const desc = document.getElementById('achDesc');
        if (!toast || !icon || !name || !desc) return;
        
        icon.textContent = achievement.icon;
        name.textContent = '🏆 ' + achievement.name;
        desc.textContent = achievement.desc;
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, 4000);
    },
    
    getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    },
    
    getTotalCount() {
        return Object.keys(this.achievements).length;
    },
    
    save() {
        const state = {};
        for (const [id, ach] of Object.entries(this.achievements)) {
            state[id] = ach.unlocked;
        }
        try {
            localStorage.setItem('nez_achievements', JSON.stringify(state));
        } catch(e) {}
    },
    
    load() {
        const saved = localStorage.getItem('nez_achievements');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                for (const [id, unlocked] of Object.entries(state)) {
                    if (this.achievements[id]) {
                        this.achievements[id].unlocked = unlocked;
                    }
                }
            } catch(e) {}
        }
    }
};

console.log('✅ НЕЗНАКОМКА v8.0 — Часть 1 загружена');
console.log('🌐 Язык:', currentLang);
console.log('🎨 Тема:', currentTheme);
console.log('🔤 Шрифт:', currentFont);
console.log('👥 Контактов:', CONTACTS_DATA.length);
console.log('🏆 Достижений:', Object.keys(AchievementSystem.achievements).length); /* ═══════════════════════════════════════════════════════════════
   НЕЗНАКОМКА v8.0 — ПОЛНЫЙ JAVASCRIPT
   Часть 2 из 5: Система приложений, Магазин приложений,
   Контент-система, Навигация, TOAST, UI-функции,
   Полная система чата (сообщения, голосовые, реакции)
═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 9. СИСТЕМА ПРИЛОЖЕНИЙ И МАГАЗИН
// ═══════════════════════════════════════════════════════════════

const AppStore = {
    apps: {
        // Базовые приложения (всегда разблокированы)
        msg: {
            id: 'msg',
            name: 'Zapregram',
            icon: '💬',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#0e1c3a,#152a5c)',
            category: 'Социальные'
        },
        gallery: {
            id: 'gallery',
            name: 'Галерея',
            icon: '🖼️',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#2a0e32,#1c0822)',
            category: 'Медиа'
        },
        browser: {
            id: 'browser',
            name: 'Браузер',
            icon: '🌐',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#0e2a1c,#0a1c12)',
            category: 'Интернет'
        },
        contacts: {
            id: 'contacts',
            name: 'Контакты',
            icon: '👥',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#2a1c0e,#1c1208)',
            category: 'Социальные'
        },
        notes: {
            id: 'notes',
            name: 'Заметки',
            icon: '📝',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#1e2a0e,#141e0a)',
            category: 'Работа'
        },
        settings: {
            id: 'settings',
            name: 'Настройки',
            icon: '⚙️',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#1e1e26,#12121c)',
            category: 'Система'
        },
        authors: {
            id: 'authors',
            name: 'Авторы',
            icon: '⭐',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#1a1040,#100a28)',
            category: 'Система'
        },
        support: {
            id: 'support',
            name: 'Поддержать',
            icon: '💜',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#300e28,#1e0a1a)',
            category: 'Система'
        },
        appstore: {
            id: 'appstore',
            name: 'Магазин',
            icon: '🏪',
            unlocked: true,
            unlockCondition: 'always',
            gradient: 'linear-gradient(140deg,#1a1a2e,#2a2a4e)',
            category: 'Система'
        },
        camera: {
            id: 'camera',
            name: 'Камера',
            icon: '📸',
            unlocked: false,
            unlockCondition: 'act1_end',
            unlockEvent: 'anna_contact_saved',
            gradient: 'linear-gradient(140deg,#2a1a0e,#1e1008)',
            category: 'Медиа',
            notificationTitle: '📸 Новая камера!',
            notificationText: 'Доступ к камере Анны восстановлен.'
        },
        dictaphone: {
            id: 'dictaphone',
            name: 'Диктофон',
            icon: '🎙️',
            unlocked: false,
            unlockCondition: 'act1_end',
            unlockEvent: 'anna_contact_saved',
            gradient: 'linear-gradient(140deg,#1e1040,#2a1560)',
            category: 'Инструменты',
            notificationTitle: '🎙️ Диктофон восстановлен!',
            notificationText: 'Облачное хранилище записей Анны синхронизировано.'
        },
        map: {
            id: 'map',
            name: 'Карта',
            icon: '🗺️',
            unlocked: false,
            unlockCondition: 'act2',
            unlockEvent: 'act2_started',
            gradient: 'linear-gradient(140deg,#0a1a2e,#0a1c12)',
            category: 'Навигация',
            notificationTitle: '📍 Геолокация активирована!',
            notificationText: 'Анна поделилась своим местоположением.'
        },
        calculator: {
            id: 'calculator',
            name: 'Калькулятор',
            icon: '🔢',
            unlocked: false,
            unlockCondition: 'act2_clue_3',
            unlockEvent: 'clues_found_3',
            gradient: 'linear-gradient(140deg,#2a1c0e,#1c1208)',
            category: 'Инструменты',
            notificationTitle: '🔐 Секретный калькулятор!',
            notificationText: 'Попробуйте ввести код 2305.'
        },
        investigation: {
            id: 'investigation',
            name: 'Расследование',
            icon: '🔍',
            unlocked: false,
            unlockCondition: 'act2_clue_4',
            unlockEvent: 'clues_found_4',
            gradient: 'linear-gradient(140deg,#1a1030,#2a1850)',
            category: 'Инструменты',
            notificationTitle: '🕵️ Доска расследования!',
            notificationText: 'Все найденные улики систематизированы.'
        },
        diary: {
            id: 'diary',
            name: 'Дневник',
            icon: '📔',
            unlocked: false,
            unlockCondition: 'act2_end',
            unlockEvent: 'act2_completed',
            gradient: 'linear-gradient(140deg,#301a20,#1a0e14)',
            category: 'Личное',
            notificationTitle: '📔 Дневник Анны!',
            notificationText: 'Личные записи Анны восстановлены.'
        },
        endings: {
            id: 'endings',
            name: 'Концовки',
            icon: '🏆',
            unlocked: false,
            unlockCondition: 'act3',
            unlockEvent: 'act3_started',
            gradient: 'linear-gradient(140deg,#1a3010,#0e1a08)',
            category: 'Прогресс',
            notificationTitle: '🏆 Коллекция концовок!',
            notificationText: 'Отслеживайте все возможные финалы.'
        }
    },
    
    notificationQueue: [],
    isShowingNotification: false,
    
    isUnlocked(appId) {
        const app = this.apps[appId];
        return app ? app.unlocked : false;
    },
    
    getAvailableApps() {
        const self = this;
        return Object.keys(this.apps).filter(function(id) {
            return self.apps[id].unlocked;
        });
    },
    
    getLockedApps() {
        const self = this;
        return Object.keys(this.apps)
            .filter(function(id) {
                return !self.apps[id].unlocked && !self.apps[id].comingSoon;
            })
            .map(function(id) {
                return {
                    id: id,
                    name: self.apps[id].name,
                    icon: self.apps[id].icon,
                    gradient: self.apps[id].gradient,
                    category: self.apps[id].category || 'Разное'
                };
            });
    },
    
    checkUnlocks(event) {
        const self = this;
        const newlyUnlocked = [];
        
        Object.keys(this.apps).forEach(function(appId) {
            const app = self.apps[appId];
            if (!app.unlocked && app.unlockEvent === event) {
                app.unlocked = true;
                newlyUnlocked.push(app);
                self.notificationQueue.push({
                    title: app.notificationTitle || '📱 Новое приложение!',
                    text: app.notificationText || 'Приложение разблокировано.',
                    appId: appId,
                    icon: app.icon
                });
                // Добавляем в список установленных
                if (!G.appsInstalled.includes(appId)) {
                    G.appsInstalled.push(appId);
                    if (typeof AchievementSystem !== 'undefined') {
                        AchievementSystem.check('all_apps');
                    }
                }
            }
        });
        
        if (newlyUnlocked.length > 0) {
            this.showNextNotification();
            this.save();
            if (typeof buildHomeGrid === 'function') {
                buildHomeGrid();
            }
        }
        
        return newlyUnlocked;
    },
    
    showNextNotification() {
        if (this.notificationQueue.length === 0 || this.isShowingNotification) return;
        
        this.isShowingNotification = true;
        const notif = this.notificationQueue.shift();
        const screen = document.getElementById('screen');
        if (!screen) {
            this.isShowingNotification = false;
            return;
        }
        
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: absolute;
            top: 60px;
            left: 16px;
            right: 16px;
            background: linear-gradient(135deg, rgba(124,92,252,0.95), rgba(30,20,80,0.95));
            border: 1px solid rgba(124,92,252,0.4);
            border-radius: 20px;
            padding: 16px;
            z-index: 260;
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateY(-120px);
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            pointer-events: auto;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        `;
        
        toast.innerHTML = `
            <div style="font-size:36px;flex-shrink:0;">${notif.icon}</div>
            <div style="flex:1;">
                <div style="font-family:var(--fh);font-size:12px;font-weight:800;color:#fff;margin-bottom:4px;">
                    ${notif.title}
                </div>
                <div style="font-family:var(--fm);font-size:10px;color:rgba(255,255,255,0.85);">
                    ${notif.text}
                </div>
            </div>
            <button style="
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.25);
                border-radius: 10px;
                padding: 8px 14px;
                color: #fff;
                font-family: var(--fh);
                font-size: 10px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.25)'" 
             onmouseout="this.style.background='rgba(255,255,255,0.15)'"
             onclick="this.parentElement.remove();AppStore.isShowingNotification=false;AppStore.showNextNotification();">
                OK
            </button>
        `;
        
        screen.appendChild(toast);
        
        requestAnimationFrame(function() {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });
        
        // Автоматическое закрытие через 6 секунд
        setTimeout(function() {
            if (toast.parentNode) {
                toast.style.transform = 'translateY(-120px)';
                toast.style.opacity = '0';
                setTimeout(function() {
                    if (toast.parentNode) {
                        toast.remove();
                        AppStore.isShowingNotification = false;
                        AppStore.showNextNotification();
                    }
                }, 500);
            } else {
                AppStore.isShowingNotification = false;
                AppStore.showNextNotification();
            }
        }, 6000);
    },
    
    save() {
        const state = {};
        const self = this;
        Object.keys(this.apps).forEach(function(id) {
            state[id] = self.apps[id].unlocked;
        });
        try {
            localStorage.setItem('nez_appstore', JSON.stringify(state));
        } catch(e) {}
    },
    
    load() {
        const saved = localStorage.getItem('nez_appstore');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                const self = this;
                Object.keys(state).forEach(function(id) {
                    if (self.apps[id]) {
                        self.apps[id].unlocked = state[id];
                        if (state[id] && !G.appsInstalled.includes(id)) {
                            G.appsInstalled.push(id);
                        }
                    }
                });
            } catch(e) {}
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 10. СИСТЕМА КОНТЕНТА (ПОСТЕПЕННОЕ РАСКРЫТИЕ)
// ═══════════════════════════════════════════════════════════════

const ContentUnlockSystem = {
    unlockedContent: {
        gallery: [],
        dictaphone: [],
        diary: [],
        clues: [],
        notes: []
    },
    
    checkAndUnlock(event) {
        const newlyUnlocked = [];
        const self = this;
        
        switch (event) {
            case 'act1_photo_sent':
                this.unlockGallery(['g2']);
                this.unlockDictaphone(['rec1']);
                newlyUnlocked.push({
                    type: 'gallery',
                    title: '📷 Новое фото!',
                    text: 'Анна поделилась фотографией.'
                });
                break;
                
            case 'act1_voice_sent':
                this.unlockDictaphone(['rec2']);
                newlyUnlocked.push({
                    type: 'dictaphone',
                    title: '🎙️ Новая запись!',
                    text: 'Разговор с Катей восстановлен.'
                });
                break;
                
            case 'act1_completed':
                this.unlockDictaphone(['rec3']);
                this.unlockDiary([0, 1, 2]);
                AppStore.checkUnlocks('anna_contact_saved');
                newlyUnlocked.push({
                    type: 'dictaphone',
                    title: '🎙️ Новые записи!',
                    text: 'Дополнительные аудиозаписи.'
                });
                newlyUnlocked.push({
                    type: 'diary',
                    title: '📔 Дневник!',
                    text: 'Первые страницы доступны.'
                });
                break;
                
            case 'act2_started':
                AppStore.checkUnlocks('act2_started');
                break;
                
            case 'act2_clue_found':
                const cc = typeof ClueSystem !== 'undefined' ? ClueSystem.getFoundCount() : 0;
                if (cc >= 3) {
                    AppStore.checkUnlocks('clues_found_3');
                }
                if (cc >= 4) {
                    AppStore.checkUnlocks('clues_found_4');
                }
                this.unlockDiary([3]);
                break;
                
            case 'act2_completed':
                this.unlockGallery(['g3', 'g4', 'g6', 'g7']);
                this.unlockDictaphone(['rec4']);
                this.unlockDiary([4]);
                AppStore.checkUnlocks('act2_completed');
                newlyUnlocked.push({
                    type: 'gallery',
                    title: '🖼️ Галерея пополнилась!',
                    text: 'Новые фотографии доступны.'
                });
                break;
                
            case 'act3_started':
                AppStore.checkUnlocks('act3_started');
                // БАГ #4 ИСПРАВЛЕН: проверка на дубли
                this.unlockGallery(['g5', 'g8', 'g9', 'g10', 'g11']);
                this.unlockDictaphone(['rec5']);
                this.unlockDiary([5, 6]);
                newlyUnlocked.push({
                    type: 'gallery',
                    title: '🖼️ Вся галерея открыта!',
                    text: '12 фотографий доступны.'
                });
                break;
                
            case 'truth_revealed':
                newlyUnlocked.push({
                    type: 'investigation',
                    title: '🔍 Расследование завершено!',
                    text: 'Все улики собраны.'
                });
                break;
        }
        
        if (newlyUnlocked.length > 0) {
            this.showNotifications(newlyUnlocked);
        }
        this.save();
        return newlyUnlocked;
    },
    
    unlockGallery(ids) {
        const self = this;
        ids.forEach(function(id) {
            // БАГ #4 ИСПРАВЛЕН: проверка на дубли
            if (!G.galleryUnlocked.includes(id)) {
                G.galleryUnlocked.push(id);
                if (!self.unlockedContent.gallery.includes(id)) {
                    self.unlockedContent.gallery.push(id);
                }
                ReputationSystem.addXP('photo_unlocked');
            }
        });
        // Check gallery achievements
        if (typeof AchievementSystem !== 'undefined') {
            AchievementSystem.check('gallery_3');
            AchievementSystem.check('gallery_6');
            AchievementSystem.check('gallery_12');
        }
    },
    
    unlockDictaphone(ids) {
        const self = this;
        ids.forEach(function(id) {
            if (!self.unlockedContent.dictaphone.includes(id)) {
                self.unlockedContent.dictaphone.push(id);
            }
        });
    },
    
    unlockDiary(indices) {
        const self = this;
        indices.forEach(function(i) {
            if (typeof DiaryData !== 'undefined' && DiaryData[i] && 
                !self.unlockedContent.diary.includes(i)) {
                self.unlockedContent.diary.push(i);
                if (DiaryData[i]) {
                    DiaryData[i].locked = false;
                }
            }
        });
    },
    
    showNotifications(notifs) {
        const screen = document.getElementById('screen');
        if (!screen) return;
        
        notifs.forEach(function(n, i) {
            setTimeout(function() {
                const toast = document.createElement('div');
                toast.style.cssText = `
                    position: absolute;
                    top: ${60 + i * 80}px;
                    left: 16px;
                    right: 16px;
                    background: rgba(14,11,26,0.97);
                    border: 1px solid rgba(124,92,252,0.25);
                    border-radius: 20px;
                    padding: 14px 16px;
                    z-index: 250;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transform: translateY(-80px);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                `;
                toast.innerHTML = `
                    <div style="font-size:24px;">📬</div>
                    <div style="flex:1;">
                        <div style="font-size:10px;font-weight:700;color:var(--violet);font-family:var(--fh);">
                            ${n.title}
                        </div>
                        <div style="font-size:10px;color:var(--text-secondary);font-family:var(--fm);">
                            ${n.text}
                        </div>
                    </div>
                `;
                screen.appendChild(toast);
                
                requestAnimationFrame(function() {
                    toast.style.transform = 'translateY(0)';
                    toast.style.opacity = '1';
                });
                
                setTimeout(function() {
                    if (toast.parentNode) {
                        toast.style.opacity = '0';
                        toast.style.transform = 'translateY(-80px)';
                        setTimeout(function() {
                            if (toast.parentNode) toast.remove();
                        }, 400);
                    }
                }, 4000);
            }, i * 300);
        });
    },
    
    save() {
        try {
            localStorage.setItem('nez_content_unlocks', JSON.stringify(this.unlockedContent));
        } catch(e) {}
    },
    
    load() {
        const saved = localStorage.getItem('nez_content_unlocks');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.unlockedContent = data;
                // Синхронизация с G.galleryUnlocked
                const self = this;
                if (this.unlockedContent.gallery) {
                    this.unlockedContent.gallery.forEach(function(id) {
                        if (!G.galleryUnlocked.includes(id)) {
                            G.galleryUnlocked.push(id);
                        }
                    });
                }
            } catch(e) {}
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 11. НАВИГАЦИЯ
// ═══════════════════════════════════════════════════════════════

let curView = 'lock';

function showView(id) {
    // Скрываем все экраны
    document.querySelectorAll('.view').forEach(function(v) {
        v.classList.remove('active');
        v.style.display = 'none';
    });
    
    // Показываем нужный
    const el = document.getElementById(id);
    if (el) {
        el.style.display = 'flex';
        el.classList.add('active');
        // Добавляем анимацию появления
        el.classList.remove('slide-in');
        el.offsetHeight; // Trigger reflow
        el.classList.add('slide-in');
    }
    
    curView = id;
    
    // Обновляем контент при открытии
    switch (id) {
        case 'gallery':
            if (typeof buildGallery === 'function') buildGallery();
            break;
        case 'browser':
            if (typeof buildBrowser === 'function') buildBrowser();
            break;
        case 'contacts':
            if (typeof buildContacts === 'function') buildContacts();
            break;
        case 'notes':
            if (typeof buildNotes === 'function') buildNotes();
            break;
        case 'settings':
            if (typeof buildSettings === 'function') buildSettings();
            break;
        case 'dictaphone':
            if (typeof buildDictaphone === 'function') buildDictaphone();
            break;
        case 'map':
            if (typeof buildMap === 'function') buildMap();
            break;
        case 'calculator':
            if (typeof buildCalculator === 'function') buildCalculator();
            break;
        case 'investigation':
            if (typeof buildInvestigationBoard === 'function') buildInvestigationBoard();
            break;
        case 'diary':
            if (typeof buildDiary === 'function') buildDiary();
            break;
        case 'endings':
            if (typeof showEndingsCollection === 'function') showEndingsCollection();
            break;
        case 'appstore':
            if (typeof buildAppStore === 'function') buildAppStore();
            break;
    }
}

function goHome() {
    showView('home');
}

function openApp(id) {
    // Специальные приложения
    if (['dictaphone', 'map', 'calculator', 'investigation', 'diary', 'endings', 'appstore'].indexOf(id) !== -1) {
        if (AppStore.isUnlocked(id)) {
            showView(id);
        } else {
            showToast('🔒 Приложение заблокировано', t('system'));
        }
        return;
    }
    
    showView(id);
    
    // Если открываем мессенджер
    if (id === 'msg') {
        const msgBadge = document.getElementById('msgBadge');
        const hwBadge = document.getElementById('hwBadge');
        const hwSub = document.getElementById('hwSub');
        
        if (msgBadge) msgBadge.classList.remove('show');
        if (hwBadge) hwBadge.classList.remove('show');
        if (hwSub) hwSub.textContent = t('no_messages');
        
        // Запускаем игру, если ещё не запущена
        if (!G.gameStarted) {
            G.gameStarted = true;
            AchievementSystem.unlock('first_contact');
            setTimeout(function() {
                if (typeof startGame === 'function') {
                    startGame();
                }
            }, 800);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// 12. ЭКРАН БЛОКИРОВКИ
// ═══════════════════════════════════════════════════════════════

function initLockScreen() {
    const lock = document.getElementById('lock');
    if (!lock) return;
    
    let startY = 0;
    let isSwiping = false;
    
    lock.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });
    
    lock.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        const diff = startY - e.touches[0].clientY;
        if (diff > 20) {
            unlockPhone();
            isSwiping = false;
        }
    }, { passive: true });
    
    lock.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        const diff = startY - e.changedTouches[0].clientY;
        if (diff > 35) {
            unlockPhone();
        }
        isSwiping = false;
    }, { passive: true });
    
    // Клик для десктопа
    lock.addEventListener('click', function(e) {
        if (e.target === lock || e.target.closest('.lock-content') || e.target.closest('.lock-hint')) {
            unlockPhone();
        }
    });
}

function unlockPhone() {
    const notif = document.getElementById('lkNotif');
    if (notif) {
        notif.classList.add('show');
    }
    
    setTimeout(function() {
        showView('home');
    }, 700);
}

// ═══════════════════════════════════════════════════════════════
// 13. TOAST (УВЕДОМЛЕНИЯ)
// ═══════════════════════════════════════════════════════════════

let toastTimer = null;

function showToast(msg, app) {
    app = app || t('system');
    
    const toast = document.getElementById('toast');
    const toastApp = document.getElementById('toastApp');
    const toastMsg = document.getElementById('toastMsg');
    const toastTime = document.getElementById('toastTime');
    
    if (!toast || !toastApp || !toastMsg || !toastTime) {
        // Fallback: создаём временный тост
        createFallbackToast(msg, app);
        return;
    }
    
    toastApp.textContent = app;
    toastMsg.textContent = msg;
    toastTime.textContent = GameTime.getTimeString();
    
    toast.classList.add('show');
    
    if (toastTimer) {
        clearTimeout(toastTimer);
    }
    
    toastTimer = setTimeout(function() {
        toast.classList.remove('show');
    }, 4500);
}

function createFallbackToast(msg, app) {
    const screen = document.getElementById('screen');
    if (!screen) return;
    
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: absolute;
        bottom: 80px;
        left: 16px;
        right: 16px;
        background: rgba(14,11,26,0.97);
        border: 1px solid rgba(124,92,252,0.2);
        border-radius: 16px;
        padding: 12px 16px;
        z-index: 300;
        animation: fadeUp 0.3s ease;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    `;
    toast.innerHTML = `
        <div style="font-size:9px;color:var(--violet);font-family:var(--fh);font-weight:700;margin-bottom:4px;">
            ${app}
        </div>
        <div style="font-size:11px;color:var(--text-secondary);font-family:var(--fm);">
            ${msg}
        </div>
    `;
    screen.appendChild(toast);
    
    setTimeout(function() {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 300);
        }
    }, 4000);
}

function showNotif(app, msg, delay) {
    setTimeout(function() {
        showToast(msg, app);
    }, delay || 0);
}

// ═══════════════════════════════════════════════════════════════
// 14. МОДАЛЬНЫЕ ОКНА
// ═══════════════════════════════════════════════════════════════

function openDonat() {
    const modal = document.getElementById('donatModal');
    if (modal) modal.classList.add('open');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
}

function doDonat() {
    window.open('https://t.me/Neznakomkagame', '_blank');
    closeModal('donatModal');
    showToast('💜 Спасибо за поддержку!', t('system'));
}

function resetGame() {
    var msg = currentLang === 'en' ? 'Delete all progress and restart?' :
              currentLang === 'es' ? '¿Eliminar todo el progreso y reiniciar?' :
              'Удалить весь прогресс и начать заново?';
    if (confirm(msg)) {
        localStorage.clear();
        location.reload();
    }
}

// ═══════════════════════════════════════════════════════════════
// 15. ПОЛНАЯ СИСТЕМА ЧАТА
// ═══════════════════════════════════════════════════════════════

// Вспомогательные функции
function getChatElement() {
    return document.getElementById('chatScroll');
}

function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function scrollChatDown() {
    requestAnimationFrame(function() {
        const chat = getChatElement();
        if (chat) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
}

// Управление статусом контакта
function setContactStatus(text, mode) {
    const status = document.getElementById('cStatus');
    if (!status) return;
    
    status.textContent = text;
    status.className = 'msg-contact-status';
    if (mode) status.classList.add(mode);
    
    // Обновляем индикаторы
    const dot = document.getElementById('avaDot');
    const ring = document.getElementById('avaRing');
    
    if (dot && ring) {
        if (mode === 'online' || mode === 'typing') {
            dot.classList.add('on');
            ring.classList.add('on');
        } else {
            dot.classList.remove('on');
            ring.classList.remove('on');
        }
    }
}

function setContactName(name) {
    G.annaName = name;
    const cName = document.getElementById('cName');
    if (cName) cName.textContent = name;
}

// Элементы чата
function addChatDivider(text) {
    const chat = getChatElement();
    if (!chat) return;
    
    const divider = document.createElement('div');
    divider.className = 'chat-divider';
    divider.innerHTML = '<span>' + (text || GameTime.getDateString() + ' · ' + GameTime.getTimeString()) + '</span>';
    chat.appendChild(divider);
    scrollChatDown();
}

function addChatSystem(text) {
    const chat = getChatElement();
    if (!chat) return;
    
    const system = document.createElement('div');
    system.className = 'chat-system';
    system.textContent = text;
    chat.appendChild(system);
    scrollChatDown();
}

// Хранилище сообщений
let messageIdCounter = 0;
const MessageLog = [];

// Основная функция добавления сообщения
function addMessage(direction, text, options) {
    options = options || {};
    const chat = getChatElement();
    if (!chat) return '';
    
    const msgId = 'msg_' + (messageIdCounter++);
    const row = document.createElement('div');
    row.className = 'msg-row ' + (direction === 'out' ? 'msg-row-out' : 'msg-row-in');
    row.dataset.msgId = msgId;
    
    const msgTime = options.time || GameTime.getTimeString();
    let html = '';
    
    // Голосовое сообщение
    if (options.type === 'voice') {
        const duration = options.duration || 15;
        const mood = options.mood || 'worried';
        const scared = mood === 'terrified' || mood === 'scared';
        
        let waveform = '';
        for (let i = 0; i < 22; i++) {
            let height;
            if (scared) {
                height = 4 + Math.random() * 28;
                if (Math.random() > 0.7) height = 2 + Math.random() * 8;
            } else {
                height = 6 + Math.sin(i * 0.5) * 8 + Math.random() * 12;
            }
            waveform += '<span style="height:' + Math.min(32, height) + 'px"></span>';
        }
        
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        
        html = `
            <div class="msg-voice" onclick="VoiceMessages.toggle(this, ${duration})">
                <div class="voice-btn">▶</div>
                <div class="voice-waveform">${waveform}</div>
                <div class="voice-duration">${mins}:${secs < 10 ? '0' : ''}${secs}</div>
            </div>
        `;
    }
    // Изображение
    else if (options.type === 'image') {
        html = `
            <div class="msg-image">
                <div class="msg-image-placeholder">
                    <div style="font-size:30px;opacity:0.4;">${options.icon || '📷'}</div>
                    <div style="font-size:9px;">${options.imgLabel || 'Фото'}</div>
                    ${options.timestamp ? '<div style="font-size:8px;color:var(--text-disabled);margin-top:4px;">' + options.timestamp + '</div>' : ''}
                </div>
            </div>
        `;
    }
    // Удалённое сообщение
    else if (options.deleted) {
        html = '<div class="msg-bubble"><span class="msg-deleted">сообщение удалено</span></div>';
    }
    // Обычное текстовое
    else {
        const escaped = String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/\n/g, '<br>');
        html = `
            <div class="msg-bubble">
                <span class="msg-text">${escaped}</span>
                ${options.edited ? '<span class="msg-edited">изменено</span>' : ''}
            </div>
        `;
    }
    
    // Добавляем мета-информацию
    const ticks = direction === 'out' ? '<span class="msg-ticks">✓✓</span>' : '';
    row.innerHTML = html + '<div class="msg-meta">' + msgTime + ' ' + ticks + '</div>';
    
    // Реакция
    if (options.reaction) {
        const reaction = document.createElement('div');
        reaction.className = 'msg-reaction';
        reaction.textContent = options.reaction;
        reaction.onclick = function() {
            addReaction(msgId);
        };
        const bubble = row.querySelector('.msg-bubble');
        if (bubble) bubble.appendChild(reaction);
    }
    
    chat.appendChild(row);
    
    // Сохраняем в лог
    MessageLog.push({
        id: msgId,
        direction: direction,
        content: text,
        type: options.type || 'text',
        time: msgTime,
        options: options,
        element: row
    });
    
    // Продвигаем время
    if (direction === 'in') {
        GameTime.advance(1 + Math.floor(Math.random() * 2));
    }
    
    scrollChatDown();
    
    // Репутация
    if (typeof ReputationSystem !== 'undefined') {
        ReputationSystem.addXP(direction === 'out' ? 'message_sent' : 'message_received');
    }
    
    // Контекст ответа
    if (direction === 'out') {
        const lower = String(text).toLowerCase();
        if (!text || lower.indexOf('...') !== -1 || lower.indexOf('молча') !== -1) {
            G._lastResponseContext = 'silent';
        } else if (lower.indexOf('верю') !== -1 || lower.indexOf('помогу') !== -1 || lower.indexOf('рядом') !== -1) {
            G._lastResponseContext = 'supportive';
        } else if (lower.indexOf('полиц') !== -1 || lower.indexOf('звон') !== -1) {
            G._lastResponseContext = 'police';
        } else {
            G._lastResponseContext = 'skeptical';
        }
    }
    
    return msgId;
}

// Реакции на сообщения
function addReaction(msgId) {
    const msg = MessageLog.find(function(m) {
        return m.id === msgId;
    });
    if (!msg || !msg.element) return;
    
    const bubble = msg.element.querySelector('.msg-bubble');
    if (!bubble) return;
    
    const existing = bubble.querySelector('.msg-reaction');
    const reactions = ['❤️', '😨', '💔', '🫂', '😢', '🙏', '😰', '💀', '👻'];
    
    if (existing) {
        const idx = reactions.indexOf(existing.textContent);
        existing.textContent = reactions[(idx + 1) % reactions.length];
        existing.style.animation = 'none';
        existing.offsetHeight;
        existing.style.animation = 'reactionPop 0.3s ease';
    } else {
        const reaction = document.createElement('div');
        reaction.className = 'msg-reaction';
        reaction.textContent = '❤️';
        reaction.onclick = function() {
            addReaction(msgId);
        };
        bubble.appendChild(reaction);
        reaction.style.animation = 'reactionPop 0.3s ease';
    }
}

// Удаление сообщения — реально убирает контент пузырька
function deleteMessage(msgId) {
    const msg = MessageLog.find(function(m) {
        return m.id === msgId;
    });
    if (!msg || !msg.element) return;
    
    const row = msg.element;
    // Удаляем любой существующий контент (bubble / voice / image)
    ['msg-bubble','msg-voice','msg-image'].forEach(function(cls) {
        const el = row.querySelector('.' + cls);
        if (el) el.remove();
    });
    
    // Вставляем пузырёк "сообщение удалено" перед msg-meta
    const meta = row.querySelector('.msg-meta');
    const deletedBubble = document.createElement('div');
    deletedBubble.className = 'msg-bubble';
    deletedBubble.innerHTML = '<span class="msg-deleted">сообщение удалено</span>';
    if (meta) {
        row.insertBefore(deletedBubble, meta);
    } else {
        row.appendChild(deletedBubble);
    }
    
    msg.type = 'deleted';
    msg.content = '[deleted]';
}

// Редактирование сообщения
function editMessage(msgId, newContent) {
    const msg = MessageLog.find(function(m) {
        return m.id === msgId;
    });
    if (!msg || !msg.element) return;
    
    const text = msg.element.querySelector('.msg-text');
    if (text) {
        text.innerHTML = String(newContent)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/\n/g, '<br>');
        
        if (!msg.element.querySelector('.msg-edited')) {
            const mark = document.createElement('span');
            mark.className = 'msg-edited';
            mark.textContent = 'изменено';
            const bubble = msg.element.querySelector('.msg-bubble');
            if (bubble) bubble.appendChild(mark);
        }
        
        msg.content = newContent;
        msg.options.edited = true;
    }
}

// Пауза в диалоге
function addPause(label, duration) {
    return new Promise(function(resolve) {
        const pause = document.createElement('div');
        pause.className = 'msg-pause';
        pause.textContent = label || 'Анна колеблется...';
        
        const chat = getChatElement();
        if (chat) chat.appendChild(pause);
        scrollChatDown();
        
        setTimeout(function() {
            if (pause.parentNode) pause.remove();
            resolve();
        }, duration || 2000);
    });
}

// Быстрые ответы
function addQuickReplies(replies) {
    const container = document.createElement('div');
    container.className = 'quick-reply';
    
    replies.forEach(function(reply) {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply.label;
        btn.onclick = function() {
            container.querySelectorAll('.quick-reply-btn').forEach(function(b) {
                b.disabled = true;
            });
            reply.action();
            setTimeout(function() {
                if (container.parentNode) container.remove();
            }, 300);
        };
        container.appendChild(btn);
    });
    
    const chat = getChatElement();
    if (chat) chat.appendChild(container);
    scrollChatDown();
}

// Индикатор отношений
function showRelationshipMeter() {
    const chat = getChatElement();
    if (!chat) return;
    
    const meter = document.createElement('div');
    meter.className = 'relation-meter';
    meter.innerHTML = `
        <span class="relation-label">Доверие</span>
        <div class="relation-bar">
            <div class="relation-fill trust" style="width:${Math.min(100, P.trust)}%;"></div>
        </div>
        <span style="font-size:8px;color:var(--teal);">${Math.floor(P.trust)}%</span>
        <span class="relation-label" style="margin-left:8px;">Страх</span>
        <div class="relation-bar">
            <div class="relation-fill fear" style="width:${Math.min(100, P.fear)}%;background:var(--crimson);"></div>
        </div>
        <span style="font-size:8px;color:var(--crimson);">${Math.floor(P.fear)}%</span>
    `;
    chat.appendChild(meter);
    scrollChatDown();
}

// Очистка чата
function clearChat() {
    const chat = getChatElement();
    if (chat) chat.innerHTML = '';
    MessageLog.length = 0;
    messageIdCounter = 0;
}

// ═══════════════════════════════════════════════════════════════
// 16. СИСТЕМА ПЕЧАТИ АННЫ
// ═══════════════════════════════════════════════════════════════

const AnnaState = {
    fear: 30,
    anxiety: 40,
    tiredness: 60,
    hesitation: 20,
    
    getTypingSpeed() {
        return Math.max(10, 40 - this.fear * 0.3 - this.tiredness * 0.15);
    },
    
    getHesitationChance() {
        return this.hesitation * 0.4;
    },
    
    update(stats) {
        if (stats.fear !== undefined) this.fear = stats.fear;
        if (stats.anxiety !== undefined) this.anxiety = stats.anxiety;
        if (stats.tiredness !== undefined) this.tiredness = stats.tiredness;
        if (stats.hesitation !== undefined) this.hesitation = stats.hesitation;
    }
};

function annaTyping(duration, options) {
    options = options || {};
    AnnaState.update({
        fear: options.fear || 30,
        anxiety: options.anxiety || 40,
        tiredness: options.tiredness || 60,
        hesitation: options.hesitation || 20
    });
    
    setContactStatus(t('typing'), 'typing');
    
    const base = duration || 2000;
    const multiplier = 40 / AnnaState.getTypingSpeed();
    const actual = Math.max(1200, base * multiplier * (0.8 + Math.random() * 0.4));
    
    // Создаём индикатор печати
    const row = document.createElement('div');
    row.className = 'msg-row msg-row-in';
    row.style.opacity = '0';
    row.style.animation = 'msgSlideIn 0.4s forwards';
    row.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    const chat = getChatElement();
    if (chat) chat.appendChild(row);
    scrollChatDown();
    
    return new Promise(function(resolve) {
        // Проверяем, будет ли колебание
        if (Math.random() * 100 < AnnaState.getHesitationChance()) {
            // Показываем "печатает..."
            sleep(actual * 0.4).then(function() {
                const livePreview = document.createElement('div');
                livePreview.className = 'typing-live';
                livePreview.textContent = options.previewText || '...';
                row.appendChild(livePreview);
                
                sleep(600 + Math.random() * 800).then(function() {
                    livePreview.remove();
                    sleep(actual * 0.6).then(finish);
                });
            });
        } else {
            sleep(actual).then(finish);
        }
        
        function finish() {
            if (row.parentNode) row.remove();
            resolve(actual);
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// 17. ГОЛОСОВЫЕ СООБЩЕНИЯ
// ═══════════════════════════════════════════════════════════════

const VoiceMessages = {
    active: null,
    playing: false,
    interval: null,
    
    toggle(el, duration) {
        if (!el) return;
        
        if (this.playing && this.active === el) {
            this.stop();
            return;
        }
        
        this.stop();
        this.active = el;
        this.playing = true;
        
        const btn = el.querySelector('.voice-btn');
        const waveform = el.querySelector('.voice-waveform');
        
        if (btn) {
            btn.textContent = '⏸';
            btn.classList.add('playing');
        }
        if (waveform) {
            waveform.classList.add('playing');
        }
        
        // Прогресс воспроизведения
        let progress = 0;
        const totalSteps = duration * 10;
        this.interval = setInterval(function() {
            progress++;
            if (progress >= totalSteps) {
                VoiceMessages.stop();
            }
        }, 100);
    },
    
    stop() {
        if (this.active) {
            const btn = this.active.querySelector('.voice-btn');
            const waveform = this.active.querySelector('.voice-waveform');
            
            if (btn) {
                btn.textContent = '▶';
                btn.classList.remove('playing');
            }
            if (waveform) {
                waveform.classList.remove('playing');
            }
        }
        
        this.playing = false;
        this.active = null;
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 18. СИСТЕМА ВЫБОРОВ
// ═══════════════════════════════════════════════════════════════

function showChoices(list) {
    const area = document.getElementById('choicesArea');
    if (!area) return;
    
    // Полная очистка — убираем все дочерние элементы кроме метки
    area.innerHTML = '<div class="choices-label">' + t('choose_answer') + '</div>';
    area.className = 'choices-area show';
    
    list.forEach(function(choice) {
        const btn = document.createElement('button');
        btn.className = 'choice-btn' + (choice.dng ? ' danger' : '');
        btn.textContent = choice.txt;
        
        btn.onclick = function() {
            // Блокируем кнопки
            area.className = 'choices-area';
            G.choices.push(choice.id);
            
            // Продвигаем время
            GameTime.advance(1 + Math.floor(Math.random() * 3));
            
            // Добавляем ответ игрока
            addMessage('out', choice.txt);
            
            // Применяем изменения параметров
            if (choice.p) adj(choice.p);
            
            // Проверяем достижения
            if (typeof AchievementSystem !== 'undefined') {
                AchievementSystem.checkAll();
            }
            
            // Выполняем следующее действие
            setTimeout(function() {
                if (choice.next) choice.next();
            }, 800);
        };
        
        area.appendChild(btn);
    });
    
    scrollChatDown();
}

// ═══════════════════════════════════════════════════════════════
// 19. ДОМАШНИЙ ЭКРАН
// ═══════════════════════════════════════════════════════════════

function buildHomeGrid() {
    const grid = document.getElementById('homeGrid');
    if (!grid) return;
    
    const allApps = [
        { id: 'msg', icon: '💬', label: 'Zapregram', gradient: 'linear-gradient(140deg,#0e1c3a,#152a5c)' },
        { id: 'gallery', icon: '🖼️', label: 'Галерея', gradient: 'linear-gradient(140deg,#2a0e32,#1c0822)' },
        { id: 'browser', icon: '🌐', label: 'Браузер', gradient: 'linear-gradient(140deg,#0e2a1c,#0a1c12)' },
        { id: 'contacts', icon: '👥', label: 'Контакты', gradient: 'linear-gradient(140deg,#2a1c0e,#1c1208)' },
        { id: 'notes', icon: '📝', label: 'Заметки', gradient: 'linear-gradient(140deg,#1e2a0e,#141e0a)' },
        { id: 'settings', icon: '⚙️', label: 'Настройки', gradient: 'linear-gradient(140deg,#1e1e26,#12121c)' },
        { id: 'authors', icon: '⭐', label: 'Авторы', gradient: 'linear-gradient(140deg,#1a1040,#100a28)' },
        { id: 'support', icon: '💜', label: 'Поддержать', gradient: 'linear-gradient(140deg,#300e28,#1e0a1a)' }
    ];
    
    // Всегда доступные приложения
    let html = '';
    const self = this;
    
    allApps.forEach(function(app) {
        const action = app.id === 'support' ? 'openDonat()' : "openApp('" + app.id + "')";
        html += `
            <div class="aicon" onclick="${action}">
                <div class="abox" style="background:${app.gradient};">
                    <span style="font-size:26px;position:relative;z-index:1;">${app.icon}</span>
                    ${app.id === 'msg' ? '<span class="abadge show" id="msgBadge">1</span>' : ''}
                </div>
                <div class="alabel">${app.label}</div>
            </div>
        `;
    });
    
    // Разблокируемые приложения
    const lockedApps = AppStore.getLockedApps();
    const availableApps = AppStore.getAvailableApps();
    
    // Показываем разблокированные, но не всегда доступные
    const unlockableApps = [
        { id: 'camera', icon: '📸', label: 'Камера' },
        { id: 'dictaphone', icon: '🎙️', label: 'Диктофон' },
        { id: 'map', icon: '🗺️', label: 'Карта' },
        { id: 'calculator', icon: '🔢', label: 'Кальк.' },
        { id: 'investigation', icon: '🔍', label: 'Улики' },
        { id: 'diary', icon: '📔', label: 'Дневник' },
        { id: 'endings', icon: '🏆', label: 'Финал' }
    ];
    
    unlockableApps.forEach(function(app) {
        if (AppStore.isUnlocked(app.id)) {
            const gradients = {
                camera: 'linear-gradient(140deg,#2a1a0e,#1e1008)',
                dictaphone: 'linear-gradient(140deg,#1e1040,#2a1560)',
                map: 'linear-gradient(140deg,#0a1a2e,#0a1c12)',
                calculator: 'linear-gradient(140deg,#2a1c0e,#1c1208)',
                investigation: 'linear-gradient(140deg,#1a1030,#2a1850)',
                diary: 'linear-gradient(140deg,#301a20,#1a0e14)',
                endings: 'linear-gradient(140deg,#1a3010,#0e1a08)'
            };
            html += `
                <div class="aicon" onclick="openApp('${app.id}')">
                    <div class="abox" style="background:${gradients[app.id] || 'linear-gradient(140deg,#1a1a2e,#2a2a4e)'};">
                        <span style="font-size:26px;position:relative;z-index:1;">${app.icon}</span>
                    </div>
                    <div class="alabel">${app.label}</div>
                </div>
            `;
        }
    });
    
    // Магазин приложений
    if (lockedApps.length > 0) {
        html += `
            <div class="aicon" onclick="openAppStore()">
                <div class="abox" style="background:linear-gradient(140deg,#1a1a2e,#2a2a4e);">
                    <span style="font-size:26px;">🏪</span>
                    <span class="abadge show" style="background:var(--violet);">${lockedApps.length}</span>
                </div>
                <div class="alabel">Магазин</div>
            </div>
        `;
    }
    
    grid.innerHTML = html;
}

function openAppStore() {
    const locked = AppStore.getLockedApps();
    if (locked.length === 0) {
        showToast('Все приложения уже установлены', t('system'));
        return;
    }
    
    // Показываем список доступных приложений
    let msg = '📱 Доступные приложения:\n\n';
    locked.forEach(function(app) {
        msg += app.icon + ' ' + app.name + ' (' + app.category + ')\n';
    });
    msg += '\nПродолжайте сюжет, чтобы разблокировать!';
    
    showToast(msg, t('app_store'));
}

console.log('✅ НЕЗНАКОМКА v8.0 — Часть 2 загружена');
console.log('📱 Приложений в магазине:', Object.keys(AppStore.apps).length);
console.log('📱 Разблокировано:', AppStore.getAvailableApps().length);
console.log('🔒 Заблокировано:', AppStore.getLockedApps().length);
console.log('💬 Система чата инициализирована');
/* ═══════════════════════════════════════════════════════════════
   НЕЗНАКОМКА v8.0 — ПОЛНЫЙ JAVASCRIPT
   Часть 3 из 5: Системы улик, Дневник, Концовки,
   Катя, Звонки, Флешбеки, Взлом, Пасхалки,
   Ежедневные события, Случайные мысли
═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 20. СИСТЕМА УЛИК (8 ШТУК)
// ═══════════════════════════════════════════════════════════════

const ClueSystem = {
    clues: [
        {
            id: 'c1',
            title: 'Записка у двери',
            icon: '📝',
            desc: '"Я знаю, что ты дома. Не выходи." — найдена 9 мая под дверью.',
            found: true,
            critical: false,
            connections: ['c2', 'c4']
        },
        {
            id: 'c2',
            title: 'Фото силуэта',
            icon: '📷',
            desc: 'Размытая фигура у подъезда. Снято автоматически в 23:17.',
            found: true,
            critical: false,
            connections: ['c1', 'c5']
        },
        {
            id: 'c3',
            title: 'Газетная вырезка',
            icon: '📰',
            desc: 'Статья об исчезновении Виктора Стрельникова. Март прошлого года.',
            found: false,
            critical: true,
            connections: ['c4', 'c6', 'c7']
        },
        {
            id: 'c4',
            title: 'Список жильцов',
            icon: '📋',
            desc: 'Три человека исчезли из дома 7. Стрельников, Ивановы. Анна — четвёртая.',
            found: false,
            critical: true,
            connections: ['c3', 'c6']
        },
        {
            id: 'c5',
            title: 'Запись с диктофона',
            icon: '🎙️',
            desc: 'Анна упоминает, что преследователь работает в полиции.',
            found: false,
            critical: true,
            connections: ['c6', 'c8']
        },
        {
            id: 'c6',
            title: 'Данные дежурного',
            icon: '🚔',
            desc: 'Номер дежурного из звонка в полицию совпадает с контактом "Наблюдателя".',
            found: false,
            critical: true,
            connections: ['c4', 'c5', 'c8']
        },
        {
            id: 'c7',
            title: 'Адресная книга',
            icon: '📖',
            desc: 'Улица Тихая, дом 7 — ранее принадлежал некоему "С.".',
            found: false,
            critical: false,
            connections: ['c3']
        },
        {
            id: 'c8',
            title: 'Личное дело',
            icon: '🔒',
            desc: 'Секретный файл из галереи. Содержит компромат на офицера полиции.',
            found: false,
            critical: true,
            connections: ['c5', 'c6']
        }
    ],

    findClue(id) {
        const clue = this.clues.find(function(c) {
            return c.id === id;
        });
        if (clue && !clue.found) {
            clue.found = true;
            showToast('🔍 Новая улика: ' + clue.title, t('investigation'));
            ReputationSystem.addXP('clue_found');
            AchievementSystem.check('detective');
            // Проверяем условия для разблокировки приложений
            const foundCount = this.getFoundCount();
            if (foundCount >= 3) {
                ContentUnlockSystem.checkAndUnlock('act2_clue_found');
            }
            if (foundCount >= 4) {
                ContentUnlockSystem.checkAndUnlock('act2_clue_found');
            }
            this.save();
            return true;
        }
        return false;
    },

    getFoundCount() {
        return this.clues.filter(function(c) {
            return c.found;
        }).length;
    },

    getCriticalFound() {
        return this.clues.filter(function(c) {
            return c.critical && c.found;
        }).length;
    },

    getAllFound() {
        return this.clues.every(function(c) {
            return c.found;
        });
    },

    getClueById(id) {
        return this.clues.find(function(c) {
            return c.id === id;
        });
    },

    getConnections(id) {
        const clue = this.getClueById(id);
        if (!clue) return [];
        return clue.connections.map(function(connId) {
            return this.getClueById(connId);
        }.bind(this)).filter(function(c) {
            return c;
        });
    },

    save() {
        const state = {};
        this.clues.forEach(function(c) {
            state[c.id] = c.found;
        });
        try {
            localStorage.setItem('nez_clues', JSON.stringify(state));
        } catch(e) {}
    },

    load() {
        const saved = localStorage.getItem('nez_clues');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                const self = this;
                Object.keys(state).forEach(function(id) {
                    const clue = self.clues.find(function(c) {
                        return c.id === id;
                    });
                    if (clue) {
                        clue.found = state[id];
                    }
                });
            } catch(e) {}
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 21. ДАННЫЕ ДНЕВНИКА (7 ЗАПИСЕЙ)
// ═══════════════════════════════════════════════════════════════

const DiaryData = [
    {
        id: 'd0',
        date: '1 мая',
        title: 'Всё началось',
        mood: '😟',
        text: 'Сегодня я заметила, что кто-то следит за мной. Сначала думала — показалось. Но вечером, когда возвращалась из библиотеки, увидела одну и ту же машину три раза. Может, совпадение?',
        locked: false
    },
    {
        id: 'd1',
        date: '3 мая',
        title: 'Первое обращение',
        mood: '😰',
        text: 'Звонила в полицию. Они сказали "обращайтесь, если будут реальные доказательства". Какие доказательства? Что я должна — дождаться, пока меня убьют?',
        locked: false
    },
    {
        id: 'd2',
        date: '5 мая',
        title: 'Катя не верит',
        mood: '😢',
        text: 'Рассказала Кате. Она считает, что я преувеличиваю. "Анна, у тебя просто стресс из-за учёбы". Но я знаю — это не стресс. Это что-то реальное.',
        locked: false
    },
    {
        id: 'd3',
        date: '7 мая',
        title: 'Ночной шум',
        mood: '😨',
        text: 'Ночью кто-то ходил под окнами. Я слышала шаги. Чёткие, тяжёлые. И скрип. Кто-то проверял дверь. Я заперлась в ванной и просидела там до утра.',
        locked: false
    },
    {
        id: 'd4',
        date: '8 мая',
        title: 'Расследование',
        mood: '🔍',
        text: 'Пошла в библиотеку, подняла старые газеты. Улица Тихая, дом 7 — здесь уже пропадали люди. ТРИ ЧЕЛОВЕКА. И никто не связал это? Или не захотел связывать?',
        locked: false
    },
    {
        id: 'd5',
        date: '9 мая',
        title: 'Я нашла его',
        mood: '💀',
        text: 'Я знаю, кто это. Он работает в полиции. Поэтому все заявления игнорируются. Поэтому никто не ищет пропавших.\n\nЕсли со мной что-то случится — проверьте дежурную часть отделения №4.',
        locked: true,
        unlockAct: 3
    },
    {
        id: 'd6',
        date: '9 мая · позже',
        title: 'ПОСЛЕДНЯЯ ЗАПИСЬ',
        mood: '⚠️',
        text: 'ОН ЗДЕСЬ. Слышу, как открывается дверь. Я спрятала телефон.\n\nЕсли ты читаешь это — МИША, БЕГИ. Он знает про тебя.',
        locked: true,
        unlockAct: 3
    }
];

// ═══════════════════════════════════════════════════════════════
// 22. СИСТЕМА КОНЦОВОК (8 ШТУК)
// ═══════════════════════════════════════════════════════════════

const EndingsSystem = {
    endings: {
        salvation: {
            id: 'salvation',
            name: 'Спасение',
            icon: '🕊️',
            desc: 'Анна выжила. Вы помогли ей сбежать из города. Она начала новую жизнь в другом месте, но каждый раз, когда идёт дождь, она вспоминает ту ночь.',
            unlocked: false,
            condition: function() {
                return P.trust >= 70 && P.courage >= 50 && G.annaAlive && G.act >= 3;
            }
        },
        tragedy: {
            id: 'tragedy',
            name: 'Трагедия',
            icon: '💔',
            desc: 'Анна не выжила. Вы не успели ей помочь. Её тело нашли через три дня в подвале дома №7. Полиция списала всё на несчастный случай.',
            unlocked: false,
            condition: function() {
                return P.trust < 30 && P.fear >= 70 && !G.annaAlive && G.act >= 3;
            }
        },
        truth: {
            id: 'truth',
            name: 'Правда',
            icon: '🔦',
            desc: 'Вы раскрыли сеть. Преступник арестован. Статья вышла в газете. Люди наконец узнали правду о доме №7. Но Анна так и не смогла забыть то, что видела.',
            unlocked: false,
            condition: function() {
                return G.truthRevealed && ClueSystem.getCriticalFound() >= 4 && G.killerKnown && G.act >= 3;
            }
        },
        ghost: {
            id: 'ghost',
            name: 'Призрак',
            icon: '👻',
            desc: 'Анна исчезла. Как и другие. Её никто не нашёл. Она стала ещё одной загадкой дома №7. Иногда говорят, что по ночам в окне виден её силуэт.',
            unlocked: false,
            condition: function() {
                return G.endingReached && G.endingType === 'interrupted' && !G.truthRevealed && G.act >= 3;
            }
        },
        sacrifice: {
            id: 'sacrifice',
            name: 'Жертва',
            icon: '🥀',
            desc: 'Вы пожертвовали собой ради Анны. Вы пришли в дом №7, чтобы спасти её. Вы успели. Но ценой собственной свободы. Теперь вы тот, кто живёт в этом доме.',
            unlocked: false,
            condition: function() {
                return P.courage >= 80 && P.dependency >= 60 && G.annaAlive && G.act >= 3;
            }
        },
        paranoia: {
            id: 'paranoia',
            name: 'Паранойя',
            icon: '🕸️',
            desc: 'Анна сошла с ума от страха. Реальность и вымысел смешались. Она больше не отличает друзей от врагов. Она заперлась в доме и никого не впускает.',
            unlocked: false,
            condition: function() {
                return P.mentalState <= 20 && P.paranoia >= 80 && G.act >= 3;
            }
        },
        watcher: {
            id: 'watcher',
            name: 'Наблюдатель',
            icon: '👁️',
            desc: 'Вы узнали, кто такой Наблюдатель. И теперь он следит за вами. Он знает, что вы знаете. Он всегда рядом. Вы чувствуете его взгляд даже сейчас.',
            unlocked: false,
            condition: function() {
                return G.killerKnown && P.suspicion >= 70 && !G.annaAlive && G.act >= 3;
            }
        },
        redemption: {
            id: 'redemption',
            name: 'Искупление',
            icon: '🌟',
            desc: 'Вы спасли Анну и помогли восстановить справедливость. Преступник наказан. Анна жива. Вы больше никогда не увидитесь, но она будет помнить вас всегда.',
            unlocked: false,
            condition: function() {
                return P.trust >= 90 && G.truthRevealed && G.annaAlive && ClueSystem.getAllFound() && G.act >= 3;
            }
        }
    },

    checkEndings() {
        const newUnlocks = [];
        const self = this;
        
        Object.keys(this.endings).forEach(function(id) {
            const ending = self.endings[id];
            if (!ending.unlocked && ending.condition()) {
                ending.unlocked = true;
                G.endingsUnlocked.add(id);
                newUnlocks.push({ id: id, ending: ending });
                ReputationSystem.addXP('ending_unlocked');
                AchievementSystem.unlock('ending_' + id);
            }
        });
        
        if (newUnlocks.length > 0) {
            G._lastEndingId = newUnlocks[newUnlocks.length - 1].id;
            AchievementSystem.checkAll();
            this.save();
        }
        
        return newUnlocks;
    },

    getUnlockedCount() {
        return Object.values(this.endings).filter(function(e) {
            return e.unlocked;
        }).length;
    },

    getTotalCount() {
        return Object.keys(this.endings).length;
    },

    getEndingById(id) {
        return this.endings[id] || null;
    },

    getAllEndings() {
        return this.endings;
    },

    save() {
        const state = {};
        const self = this;
        Object.keys(this.endings).forEach(function(id) {
            state[id] = self.endings[id].unlocked;
        });
        try {
            localStorage.setItem('nez_endings', JSON.stringify(state));
        } catch(e) {}
    },

    load() {
        const saved = localStorage.getItem('nez_endings');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                const self = this;
                Object.keys(state).forEach(function(id) {
                    if (self.endings[id]) {
                        self.endings[id].unlocked = state[id];
                        if (state[id]) {
                            G.endingsUnlocked.add(id);
                        }
                    }
                });
            } catch(e) {}
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 23. СИСТЕМА КАТИ (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const KatyaSystem = {
    active: false,
    relationship: 50,
    knowsAboutWatcher: false,
    revealedSecret: false,
    timesContacted: 0,
    usedMessages: [],
    chatStarted: false,

    messages: {
        firstContact: [
            'Привет! Это Катя. Анна дала мне твой номер.',
            'Слушай, я волнуюсь за неё. Она какая-то... странная в последнее время.',
            'Ты с ней общался? Она говорит что-нибудь про слежку?'
        ],
        worried: [
            'Анна не отвечает уже несколько часов. Обычно она всегда на связи.',
            'Я заходила к ней вчера — дверь была заперта, но внутри горел свет.',
            'Ты не знаешь, куда она могла пойти?'
        ],
        secret: [
            'Ладно... я должна тебе кое-что рассказать.',
            'Я знаю про дом 7. И про тех людей, что исчезли.',
            'Анна не первая. Я пыталась предупредить её, но она не слушала.'
        ],
        confession: [
            'Это я дала ей твой номер. Потому что знала — ты поможешь.',
            'Прости, что втянула тебя. Но я не знала, к кому ещё обратиться.',
            'Полиция бесполезна. Они часть этого.'
        ],
        final: [
            'Я сделала всё, что могла. Теперь всё зависит от тебя.',
            'Анна доверяет тебе. Не подведи её.',
            'И помни: не все двери должны быть открыты.'
        ]
    },

    getMessage(context) {
        const pool = this.messages[context] || this.messages.firstContact;
        const available = pool.filter(function(msg) {
            return this.usedMessages.indexOf(msg) === -1;
        }.bind(this));
        
        if (available.length === 0) {
            this.usedMessages = [];
            return pool[Math.floor(Math.random() * pool.length)];
        }
        
        const msg = available[Math.floor(Math.random() * available.length)];
        this.usedMessages.push(msg);
        return msg;
    },

    startChat() {
        if (this.chatStarted) return;
        this.active = true;
        this.chatStarted = true;
        this.timesContacted++;
        
        showView('msg');
        clearChat();
        
        const avatar = document.getElementById('msgAva');
        if (avatar) avatar.innerHTML = '👩';
        setContactName('Катя');
        setContactStatus(t('online'), 'online');
        
        addChatDivider();
        addChatSystem('Новый чат: Катя');
        
        const self = this;
        setTimeout(function() {
            self.introSequence();
        }, 1000);
    },

    introSequence() {
        const self = this;
        
        annaTyping(2000, { mood: 'worried', fear: 30 }).then(function() {
            addMessage('in', self.getMessage('firstContact'), { id: 'katya_1' });
            GameTime.advance(2);
            return sleep(1000);
        }).then(function() {
            return annaTyping(2500, { mood: 'anxious', fear: 40 });
        }).then(function() {
            addMessage('in', 'Она говорит, что за ней следят. Что кто-то ходит вокруг дома по ночам.', { id: 'katya_2' });
            GameTime.advance(1);
            return sleep(800);
        }).then(function() {
            showChoices([
                {
                    id: 'kat_yes',
                    txt: 'Да, она писала мне. Это выглядит серьёзно.',
                    p: { trust: +5 },
                    next: function() { self.responseYes(); }
                },
                {
                    id: 'kat_maybe',
                    txt: 'Может быть, она просто переутомилась?',
                    p: { suspicion: +5 },
                    next: function() { self.responseMaybe(); }
                },
                {
                    id: 'kat_what',
                    txt: 'Что ты знаешь об этом? Рассказывай.',
                    p: { trust: +10, suspicion: +3 },
                    next: function() { self.responseWhat(); }
                }
            ]);
        });
    },

    responseYes() {
        const self = this;
        this.relationship += 10;
        
        annaTyping(3000, { mood: 'relieved', fear: 20 }).then(function() {
            addMessage('in', 'Слава богу, ты мне веришь. Я уже думала, что схожу с ума.', { id: 'katya_3' });
            GameTime.advance(3);
            return sleep(1000);
        }).then(function() {
            addMessage('in', 'Слушай, есть кое-что ещё. Про дом, в котором она живёт...', { id: 'katya_4' });
            self.revealedSecret = true;
            setTimeout(function() { self.secretSequence(); }, 2000);
        });
    },

    responseMaybe() {
        const self = this;
        this.relationship -= 5;
        
        annaTyping(3500, { mood: 'worried', fear: 50 }).then(function() {
            addMessage('in', 'Ты не понимаешь. Это не просто усталость. Там что-то реальное.', { id: 'katya_3' });
            GameTime.advance(2);
            return sleep(1000);
        }).then(function() {
            addMessage('in', 'Я знаю Анну много лет. Она не истеричка. Если она говорит, что кто-то следит — значит, так и есть.', { id: 'katya_4' });
            setTimeout(function() { self.secretSequence(); }, 2000);
        });
    },

    responseWhat() {
        const self = this;
        this.relationship += 15;
        
        annaTyping(4000, { mood: 'scared', fear: 70 }).then(function() {
            addMessage('in', 'Ты хочешь знать правду? Хорошо. Но она тебе не понравится.', { id: 'katya_3' });
            GameTime.advance(3);
            return sleep(1000);
        }).then(function() {
            addMessage('in', 'Улица Тихая, дом 7. За последние два года оттуда исчезли три человека.', { id: 'katya_4' });
            self.revealedSecret = true;
            self.knowsAboutWatcher = true;
            setTimeout(function() { self.secretSequence(); }, 2000);
        });
    },

    secretSequence() {
        const self = this;
        
        annaTyping(5000, { mood: 'terrified', fear: 70, hesitation: 60 }).then(function() {
            addMessage('in', 'Полиция знает. Но они ничего не делают. Потому что один из них... он и есть преследователь.', { id: 'katya_5' });
            ClueSystem.findClue('c6');
            ClueSystem.findClue('c8');
            GameTime.advance(5);
            return sleep(2000);
        }).then(function() {
            addMessage('in', 'Я пыталась рассказать Анне. Но она не поверила. Сказала, я преувеличиваю.', { id: 'katya_6' });
            GameTime.advance(2);
            return sleep(1500);
        }).then(function() {
            return annaTyping(3000, { mood: 'scared', fear: 80 });
        }).then(function() {
            addMessage('in', 'А теперь... теперь она сама в это вляпалась. И я не знаю, как её спасти.', { id: 'katya_7', reaction: '😢' });
            ReputationSystem.addXP('katya_helped');
            showChoices([
                {
                    id: 'kat_help',
                    txt: 'Мы спасём её. Вместе.',
                    p: { trust: +20, courage: +15 },
                    next: function() { self.endingHelp(); }
                },
                {
                    id: 'kat_police',
                    txt: 'Нужно идти в прокуратуру. Собрать все доказательства.',
                    p: { trust: +10, courage: +10 },
                    next: function() { self.endingPolice(); }
                }
            ]);
        });
    },

    endingHelp() {
        const self = this;
        this.relationship += 20;
        
        annaTyping(2500, { mood: 'relieved', fear: 20 }).then(function() {
            addMessage('in', 'Спасибо. Правда, спасибо. Я знала, что ты поможешь.', { id: 'katya_end1' });
            GameTime.advance(3);
            return sleep(1000);
        }).then(function() {
            addMessage('in', 'У меня есть кое-какие записи. И адреса. Я перешлю тебе.', { id: 'katya_end2' });
            ClueSystem.findClue('c4');
            ClueSystem.findClue('c7');
            GameTime.advance(2);
            setContactStatus(t('was_online'), '');
            addChatSystem('Катя переслала файлы');
            showToast('Получены новые данные для расследования', 'Катя');
        });
    },

    endingPolice() {
        const self = this;
        this.relationship += 5;
        
        annaTyping(3000, { mood: 'worried', fear: 50 }).then(function() {
            addMessage('in', 'Ты прав. Но будь осторожен. Он работает в отделении №4.', { id: 'katya_end1' });
            GameTime.advance(2);
            return sleep(1000);
        }).then(function() {
            addMessage('in', 'Я соберу всё, что у меня есть. Встретимся завтра.', { id: 'katya_end2' });
            ClueSystem.findClue('c6');
            GameTime.advance(2);
            setContactStatus(t('was_online'), '');
            addChatSystem('Катя готовит документы');
            showToast('Катя собирает доказательства', 'Катя');
        });
    },

    reset() {
        this.active = false;
        this.chatStarted = false;
        this.usedMessages = [];
        this.timesContacted = 0;
        this.relationship = 50;
        this.knowsAboutWatcher = false;
        this.revealedSecret = false;
    }
};

// ═══════════════════════════════════════════════════════════════
// 24. СИСТЕМА ЗВОНКОВ (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const CallSystem = {
    active: false,
    caller: null,
    callStartTime: 0,
    callInterval: null,
    transcriptLines: [],
    isIncoming: false,

    incomingCall(caller) {
        if (this.active || this.isIncoming) return;
        this.caller = caller;
        this.isIncoming = true;

        const screen = document.getElementById('callScreen');
        const avatar = document.getElementById('callAvatar');
        const name = document.getElementById('callName');
        const status = document.getElementById('callStatus');
        const duration = document.getElementById('callDuration');
        const actions = document.getElementById('callActions');
        const transcript = document.getElementById('callTranscript');

        if (!screen || !avatar || !name || !status) return;

        screen.classList.add('active');
        avatar.textContent = caller.avatar || '📞';
        name.textContent = caller.name || 'Входящий вызов';
        status.textContent = 'входящий вызов...';
        if (duration) duration.style.display = 'none';
        if (actions) actions.style.display = 'flex';
        if (transcript) {
            transcript.style.display = 'none';
            transcript.innerHTML = '';
        }
        this.transcriptLines = [];

        // Вибрация (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }

        // Автоответчик через 10 секунд
        const self = this;
        this._autoAnswerTimeout = setTimeout(function() {
            if (self.isIncoming && self.caller) {
                self.accept();
            }
        }, 10000);
    },

    accept() {
        if (!this.caller || !this.isIncoming) return;
        this.isIncoming = false;
        this.active = true;
        this.callStartTime = Date.now();

        if (this._autoAnswerTimeout) {
            clearTimeout(this._autoAnswerTimeout);
            this._autoAnswerTimeout = null;
        }

        const status = document.getElementById('callStatus');
        const duration = document.getElementById('callDuration');
        const actions = document.getElementById('callActions');
        const transcript = document.getElementById('callTranscript');

        if (status) status.textContent = 'соединение...';
        if (actions) actions.style.display = 'none';

        // Останавливаем вибрацию
        if (navigator.vibrate) {
            navigator.vibrate(0);
        }

        const self = this;
        setTimeout(function() {
            if (status) status.textContent = 'разговор';
            if (duration) duration.style.display = 'block';
            if (transcript) {
                transcript.style.display = 'block';
                transcript.innerHTML = '';
            }
            self.updateCallDuration();
            self.callInterval = setInterval(function() {
                self.updateCallDuration();
            }, 1000);
            
            ReputationSystem.addXP('call_answered');
            
            if (self.caller && self.caller.script) {
                self.caller.script();
            }
        }, 1500);
    },

    decline() {
        if (this._autoAnswerTimeout) {
            clearTimeout(this._autoAnswerTimeout);
            this._autoAnswerTimeout = null;
        }

        const screen = document.getElementById('callScreen');
        if (screen) screen.classList.remove('active');
        this.active = false;
        this.isIncoming = false;

        if (this.callInterval) {
            clearInterval(this.callInterval);
            this.callInterval = null;
        }

        const transcript = document.getElementById('callTranscript');
        if (transcript) transcript.style.display = 'none';

        if (navigator.vibrate) {
            navigator.vibrate(0);
        }

        showToast(t('missed_call'), 'Телефон');

        if (this.caller && this.caller.onMissed) {
            const callerRef = this.caller;
            setTimeout(function() {
                callerRef.onMissed();
            }, 2000);
        }
        this.caller = null;
    },

    endCall() {
        const status = document.getElementById('callStatus');
        if (status) status.textContent = 'разговор завершён';
        
        if (this.callInterval) {
            clearInterval(this.callInterval);
            this.callInterval = null;
        }

        if (navigator.vibrate) {
            navigator.vibrate(0);
        }

        const self = this;
        setTimeout(function() {
            const screen = document.getElementById('callScreen');
            if (screen) screen.classList.remove('active');
            self.active = false;
            self.isIncoming = false;

            const transcript = document.getElementById('callTranscript');
            if (transcript) {
                transcript.style.display = 'none';
                transcript.innerHTML = '';
            }

            self.caller = null;
        }, 1500);
    },

    updateCallDuration() {
        const elapsed = Math.floor((Date.now() - this.callStartTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const duration = document.getElementById('callDuration');
        if (duration) {
            duration.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
        }
    },

    addTranscriptLine(speaker, text) {
        const transcript = document.getElementById('callTranscript');
        if (!transcript) return;

        const line = document.createElement('div');
        line.className = 'call-transcript-line ' + speaker;
        line.textContent = (speaker === 'you' ? 'Вы: ' : 'Собеседник: ') + text;
        transcript.appendChild(line);
        transcript.scrollTop = transcript.scrollHeight;
        this.transcriptLines.push({ speaker: speaker, text: text });
    },

    init() {
        const callScreen = document.getElementById('callScreen');
        const callTranscript = document.getElementById('callTranscript');
        const callDuration = document.getElementById('callDuration');
        const callActions = document.getElementById('callActions');

        if (callScreen) callScreen.classList.remove('active');
        if (callTranscript) callTranscript.style.display = 'none';
        if (callDuration) callDuration.style.display = 'none';
        if (callActions) callActions.style.display = 'flex';

        const acceptBtn = document.getElementById('callAcceptBtn');
        const declineBtn = document.getElementById('callDeclineBtn');
        const self = this;

        if (acceptBtn && !acceptBtn._callBound) {
            acceptBtn._callBound = true;
            acceptBtn.addEventListener('click', function() {
                self.accept();
            });
        }

        if (declineBtn && !declineBtn._callBound) {
            declineBtn._callBound = true;
            declineBtn.addEventListener('click', function() {
                self.decline();
            });
        }
    }
};

// Сценарии звонков
const CallScripts = {
    annaPanic: {
        avatar: '👤',
        name: 'Анна В.',
        script: function() {
            const self = this;
            CallSystem.addTranscriptLine('them', 'Миша? Миша, ты слышишь?');
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'ОН ЗДЕСЬ. Я слышу, как он поднимается по лестнице.');
            }, 2000);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Я заперлась в ванной. Но дверь... она не выдержит.');
            }, 3500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Пожалуйста, вызови полицию! Адрес: Тихая, 7!');
            }, 5500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Он уже здесь... я слышу его дыхание за дверью...');
            }, 8500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'ПРОЩАЙ.');
            }, 10000);
            
            setTimeout(function() {
                CallSystem.endCall();
                G.annaAlive = false;
                P.trust -= 20;
                P.guilt += 30;
                setTimeout(function() {
                    addChatSystem('Звонок прерван. Анна не отвечает.');
                    showToast('⚠️ Связь потеряна', 'Телефон');
                }, 2000);
            }, 11500);
        },
        onMissed: function() {
            addChatSystem('Пропущенный звонок от Анны');
            P.guilt += 40;
            
            const lkNotif = document.getElementById('lkNotif');
            const lkNotifTxt = document.getElementById('lkNotifTxt');
            const lkNotifTime = document.getElementById('lkNotifTime');
            if (lkNotif && lkNotifTxt && lkNotifTime) {
                lkNotifTxt.textContent = 'У вас пропущенный вызов от Анны';
                lkNotifTime.textContent = GameTime.getTimeString();
                lkNotif.classList.add('show');
                setTimeout(function() {
                    lkNotif.classList.remove('show');
                }, 5000);
            }
        }
    },

    katyaWarning: {
        avatar: '👩',
        name: 'Катя',
        script: function() {
            CallSystem.addTranscriptLine('them', 'Миша, это Катя. Не перебивай, просто слушай.');
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Я узнала, кто такой Наблюдатель. Это майор Стрельников.');
            }, 2000);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Он брат первой жертвы. И он мстит всем, кто живёт в том доме.');
            }, 4000);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'У меня есть доказательства. Но он знает, что я их нашла.');
            }, 6500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Я спрятала всё в библиотеке. В книге "Преступление и наказание".');
            }, 8500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Если со мной что-то случится — ты знаешь, где искать.');
            }, 10500);
            
            setTimeout(function() {
                CallSystem.endCall();
                ClueSystem.findClue('c7');
                ClueSystem.findClue('c8');
                G.killerKnown = true;
                setTimeout(function() {
                    addChatSystem('Катя отправила координаты');
                    showToast('📍 Новые данные на карте', 'Катя');
                }, 2000);
            }, 12500);
        }
    },

    unknownCaller: {
        avatar: '❓',
        name: 'Неизвестный номер',
        script: function() {
            CallSystem.addTranscriptLine('them', '...');
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Ты думаешь, что помогаешь ей.');
            }, 3000);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Но ты только делаешь хуже.');
            }, 5000);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Прекрати лезть в это дело. Пока не поздно.');
            }, 7000);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Следующее предупреждение будет последним.');
            }, 9000);
            
            setTimeout(function() {
                CallSystem.endCall();
                P.fear += 25;
                P.paranoia += 20;
                setTimeout(function() {
                    addChatSystem('Неизвестный номер больше не доступен');
                    showToast('⚠️ Вам угрожают', 'Телефон');
                }, 2000);
            }, 10000);
        }
    },

    mamaCall: {
        avatar: '🧑',
        name: 'Мама',
        script: function() {
            CallSystem.addTranscriptLine('them', 'Сынок, ты покушал?');
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Я волнуюсь за тебя. Ты такой бледный в последнее время.');
            }, 2500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'Приезжай в воскресенье. Я сварю борщ.');
            }, 4500);
            
            setTimeout(function() {
                CallSystem.addTranscriptLine('them', 'И не забудь шапку надеть!');
            }, 6000);
            
            setTimeout(function() {
                CallSystem.endCall();
                P.mentalState += 10;
                showToast('🧑 Мама звонила', 'Телефон');
            }, 7000);
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 25. СИСТЕМА ФЛЕШБЕКОВ
// ═══════════════════════════════════════════════════════════════

const FlashbackSystem = {
    overlay: null,
    content: null,
    onComplete: null,
    isActive: false,

    show(date, text, callback) {
        this.overlay = document.getElementById('flashbackOverlay');
        this.content = document.getElementById('flashbackContent');
        if (!this.overlay || !this.content) return;

        this.content.innerHTML = `
            <div class="flashback-date">${date}</div>
            <div class="flashback-text">${text}</div>
            <div class="flashback-continue">нажмите чтобы продолжить</div>
        `;

        this.overlay.classList.add('active');
        this.isActive = true;
        this.onComplete = callback;

        const self = this;
        const closeHandler = function(e) {
            if (e.target === self.overlay || e.target.classList.contains('flashback-vignette') || 
                e.target.classList.contains('flashback-continue') || e.target.closest('.flashback-content')) {
                self.hide();
                self.overlay.removeEventListener('click', closeHandler);
            }
        };
        this.overlay.addEventListener('click', closeHandler);
    },

    hide() {
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
        this.isActive = false;
        if (this.onComplete) {
            const cb = this.onComplete;
            setTimeout(function() {
                cb();
            }, 500);
            this.onComplete = null;
        }
    },

    init() {
        const overlay = document.getElementById('flashbackOverlay');
        if (overlay && !overlay._flashbackBound) {
            overlay._flashbackBound = true;
            const self = this;
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay || e.target.classList.contains('flashback-vignette')) {
                    self.hide();
                }
            });
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 26. МИНИ-ИГРА "ВЗЛОМ" (ПОЛНАЯ)
// ═══════════════════════════════════════════════════════════════

const HackGame = {
    active: false,
    targetPassword: '',
    attempts: 0,
    maxAttempts: 5,
    onSuccess: null,
    onFail: null,
    isLocked: false,

    start(targetPassword, clues, callback, failCallback) {
        this.active = true;
        this.targetPassword = targetPassword;
        this.attempts = 0;
        this.isLocked = false;
        this.onSuccess = callback;
        this.onFail = failCallback || null;

        const screen = document.getElementById('hackScreen');
        if (!screen) return;
        screen.classList.add('active');

        const attemptsEl = document.getElementById('hackAttempts');
        if (attemptsEl) {
            attemptsEl.textContent = 'Попыток: ' + this.maxAttempts;
        }

        // Сбрасываем точки
        for (let i = 0; i < 4; i++) {
            const dot = document.getElementById('dot' + i);
            if (dot) dot.className = 'hack-dot';
        }

        const terminal = document.getElementById('hackTerminal');
        if (terminal) terminal.innerHTML = '';

        const input = document.getElementById('hackInput');
        if (input) {
            input.value = '';
            input.disabled = false;
            setTimeout(function() {
                input.focus();
            }, 500);
        }

        const self = this;
        setTimeout(function() {
            self.addTerminalLine('Инициализация соединения...', 'info');
        }, 300);
        
        setTimeout(function() {
            self.addTerminalLine('Подключение к серверу МВД...', 'info');
        }, 600);
        
        setTimeout(function() {
            self.addTerminalLine('Обход файрвола...', 'info');
        }, 900);
        
        setTimeout(function() {
            self.addTerminalLine('УСТАНОВЛЕНО', 'success');
        }, 1200);
        
        setTimeout(function() {
            self.addTerminalLine('Введите пароль доступа (4 цифры)', 'warning');
        }, 1500);

        if (clues && clues.length > 0) {
            setTimeout(function() {
                self.addTerminalLine('--- НАЙДЕННЫЕ ПОДСКАЗКИ ---', 'info');
                clues.forEach(function(clue) {
                    self.addTerminalLine('• ' + clue, 'info');
                });
            }, 1800);
        }
    },

    addTerminalLine(text, type) {
        const terminal = document.getElementById('hackTerminal');
        if (!terminal) return;

        const line = document.createElement('div');
        line.className = 'hack-line ' + (type || '');
        const prefix = type ? '[' + type.toUpperCase() + '] ' : '';
        line.textContent = prefix + text;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    },

    tryPassword(input) {
        if (!this.active || this.isLocked) return;
        if (this.attempts >= this.maxAttempts) return;

        this.attempts++;
        const remaining = this.maxAttempts - this.attempts;

        const attemptsEl = document.getElementById('hackAttempts');
        if (attemptsEl) {
            attemptsEl.textContent = 'Попыток: ' + remaining;
        }

        // Обновляем точки
        for (let i = 0; i < 4; i++) {
            const dot = document.getElementById('dot' + i);
            if (dot) {
                if (i < input.length) {
                    dot.classList.add('filled');
                } else {
                    dot.classList.remove('filled');
                }
            }
        }

        // Проверяем пароль
        if (input === this.targetPassword) {
            this.addTerminalLine('ПАРОЛЬ ПРИНЯТ', 'success');
            this.addTerminalLine('Доступ разрешён. Загрузка файлов...', 'success');
            AchievementSystem.unlock('hack_complete');
            ReputationSystem.addXP('hack_success');
            G.hackCompleted = true;

            const self = this;
            setTimeout(function() {
                self.addTerminalLine('ФАЙЛЫ СКАЧАНЫ', 'success');
                self.addTerminalLine('Соединение разорвано', 'warning');
                setTimeout(function() {
                    const screen = document.getElementById('hackScreen');
                    if (screen) screen.classList.remove('active');
                    self.active = false;
                    if (self.onSuccess) self.onSuccess();
                }, 1500);
            }, 2000);
        } else {
            this.addTerminalLine('НЕВЕРНЫЙ ПАРОЛЬ', 'error');

            // Анимация ошибки на точках
            for (let j = 0; j < 4; j++) {
                const dotEl = document.getElementById('dot' + j);
                if (dotEl) {
                    dotEl.classList.add('wrong');
                    (function(dot) {
                        setTimeout(function() {
                            dot.classList.remove('wrong');
                        }, 500);
                    })(dotEl);
                }
            }

            const self = this;

            // Подсказки в зависимости от оставшихся попыток
            // БАГ #7 ИСПРАВЛЕН: добавлена подсказка при remaining === 2
            if (remaining === 3) {
                setTimeout(function() {
                    self.addTerminalLine('Подсказка: дата основания отделения', 'warning');
                }, 800);
            } else if (remaining === 2) {
                setTimeout(function() {
                    self.addTerminalLine('Подсказка: год основания + день', 'warning');
                }, 800);
            } else if (remaining === 1) {
                setTimeout(function() {
                    self.addTerminalLine('ПОСЛЕДНЯЯ ПОПЫТКА', 'warning');
                    self.addTerminalLine('Подсказка: 2305', 'warning');
                }, 800);
            } else if (remaining <= 0) {
                this.isLocked = true;
                this.addTerminalLine('СИСТЕМА ЗАБЛОКИРОВАНА', 'error');
                this.addTerminalLine('Соединение разорвано', 'error');
                
                const hackInput = document.getElementById('hackInput');
                if (hackInput) hackInput.disabled = true;
                
                setTimeout(function() {
                    const screen = document.getElementById('hackScreen');
                    if (screen) screen.classList.remove('active');
                    self.active = false;
                    if (self.onFail) self.onFail();
                }, 2000);
            }
        }
    },

    quit() {
        if (!this.active) return;
        this.addTerminalLine('Соединение разорвано пользователем', 'warning');
        const self = this;
        setTimeout(function() {
            const screen = document.getElementById('hackScreen');
            if (screen) screen.classList.remove('active');
            self.active = false;
        }, 500);
    },

    init() {
        const hackInput = document.getElementById('hackInput');
        if (hackInput && !hackInput._hackBound) {
            hackInput._hackBound = true;
            const self = this;
            hackInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && self.active) {
                    self.tryPassword(hackInput.value);
                    hackInput.value = '';
                }
                // Только цифры
                if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Enter') {
                    e.preventDefault();
                }
            });
            
            // Ограничение на 4 символа
            hackInput.addEventListener('input', function() {
                if (this.value.length > 4) {
                    this.value = this.value.slice(0, 4);
                }
            });
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 27. ПАСХАЛКИ (ПОЛНЫЕ)
// ═══════════════════════════════════════════════════════════════

const EasterEggs = {
    konamiSequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    konamiProgress: 0,
    secretButtonClicks: 0,
    secretDotAdded: false,
    ghostMessageTriggered: false,

    init() {
        this.addKonamiListener();
        this.addSecretButton();
        this.scheduleRandomEgg();
    },

    addKonamiListener() {
        const self = this;
        document.addEventListener('keydown', function(e) {
            const key = e.key;
            if (key === self.konamiSequence[self.konamiProgress]) {
                self.konamiProgress++;
                if (self.konamiProgress >= 5) {
                    const hint = document.getElementById('konamiHint');
                    if (hint) {
                        hint.classList.add('visible');
                        setTimeout(function() {
                            hint.classList.remove('visible');
                        }, 2000);
                    }
                }
                if (self.konamiProgress >= self.konamiSequence.length) {
                    self.activateKonami();
                    self.konamiProgress = 0;
                }
            } else {
                self.konamiProgress = 0;
            }
        });
    },

    activateKonami() {
        AchievementSystem.unlock('konami');
        // Открываем всю галерею
        const allGalleryIds = ['g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11'];
        allGalleryIds.forEach(function(id) {
            if (!G.galleryUnlocked.includes(id)) {
                G.galleryUnlocked.push(id);
            }
        });
        // Находим все улики
        ClueSystem.clues.forEach(function(c) {
            c.found = true;
        });
        // Максимальные параметры
        P.trust = 100;
        P.courage = 100;
        
        const screen = document.getElementById('screen');
        if (screen) {
            screen.classList.add('easter-egg-found');
            setTimeout(function() {
                screen.classList.remove('easter-egg-found');
            }, 1500);
        }
        
        showToast('🎮 Konami Code активирован! Всё открыто!', 'ПАСХАЛКА');
        ReputationSystem.addXP('secret_found', 200);
        
        if (G.gameStarted) {
            setTimeout(function() {
                addChatSystem('🐛 Ты нашёл секрет! Разработчик: @ArtemKoshkin');
                addMessage('in', 'Подожди... что это было? Всё стало... по-другому.', { id: 'konami_egg' });
            }, 2000);
        }
    },

    addSecretButton() {
        const settingsView = document.getElementById('settings');
        if (!settingsView) return;
        
        const self = this;
        const observer = new MutationObserver(function() {
            if (settingsView.classList.contains('active')) {
                if (!self.secretDotAdded) {
                    self.createSecretDot();
                }
            } else {
                self.removeSecretDot();
            }
        });
        observer.observe(settingsView, {
            attributes: true,
            attributeFilter: ['class']
        });
    },

    createSecretDot() {
        const settingsBody = document.getElementById('settingsBody');
        if (!settingsBody || this.secretDotAdded) return;
        
        const dot = document.createElement('div');
        dot.className = 'secret-dot';
        dot.id = 'secretDot';
        dot.style.cssText = 'top:8px;right:8px;position:absolute;cursor:pointer;z-index:10;';
        dot.title = '???';
        
        const self = this;
        dot.onclick = function(e) {
            e.stopPropagation();
            self.secretButtonClicks++;
            
            if (self.secretButtonClicks === 1) {
                showToast('Что-то блеснуло...', '???');
            } else if (self.secretButtonClicks === 3) {
                showToast('Ты настойчив...', '???');
            } else if (self.secretButtonClicks === 5) {
                showToast('Почти...', '???');
            } else if (self.secretButtonClicks === 7) {
                showToast('Ещё немного...', '???');
            } else if (self.secretButtonClicks >= 10) {
                AchievementSystem.unlock('secret_button');
                ReputationSystem.addXP('secret_found', 150);
                showToast('🔮 Ты нашёл секретную кнопку! +1 достижение', 'ПАСХАЛКА');
                self.removeSecretDot();
                if (G.gameStarted) {
                    setTimeout(function() {
                        addMessage('in', '...ты слышишь? Кто-то ещё здесь...', { id: 'secret_btn_egg' });
                    }, 3000);
                }
            }
        };
        
        settingsBody.style.position = 'relative';
        settingsBody.appendChild(dot);
        this.secretDotAdded = true;
    },

    removeSecretDot() {
        const dot = document.getElementById('secretDot');
        if (dot) dot.remove();
        this.secretDotAdded = false;
    },

    scheduleRandomEgg() {
        const self = this;
        setInterval(function() {
            if (Math.random() < 0.01 && G.gameStarted && !G.endingReached) {
                const eggs = [
                    function() {
                        showToast('🐱 Где-то мяукнул кот...', '???');
                        addChatSystem('*мяу*');
                    },
                    function() {
                        showToast('📺 Помехи на экране...', '???');
                        const screen = document.getElementById('screen');
                        if (screen) {
                            screen.classList.add('glitch-fx');
                            setTimeout(function() {
                                screen.classList.remove('glitch-fx');
                            }, 500);
                        }
                    },
                    function() {
                        showToast('👁️ Тебе показалось?', '???');
                        P.paranoia += 5;
                    },
                    function() {
                        if (!self.ghostMessageTriggered) {
                            self.ghostMessageTriggered = true;
                            const msgId = addMessage('in', 'п о м о г и', { id: 'ghost_egg_' + Date.now() });

                            // БАГ ИСПРАВЛЕН: достижение раньше выдавалось автоматически по таймеру,
                            // независимо от того, заметил ли игрок сообщение. Теперь засчитывается
                            // только если игрок успел тапнуть по сообщению до его удаления.
                            const row = document.querySelector('[data-msg-id="' + msgId + '"]');
                            let tapped = false;
                            if (row) {
                                row.style.cursor = 'pointer';
                                row.addEventListener('click', function onTap() {
                                    if (tapped) return;
                                    tapped = true;
                                    row.removeEventListener('click', onTap);
                                    AchievementSystem.unlock('ghost_whisperer');
                                });
                            }

                            setTimeout(function() {
                                deleteMessage(msgId);
                            }, 3000);
                        }
                    }
                ];
                eggs[Math.floor(Math.random() * eggs.length)]();
            }
        }, 300000); // Каждые 5 минут
    }
};

// ═══════════════════════════════════════════════════════════════
// 28. ЕЖЕДНЕВНЫЕ СОБЫТИЯ
// ═══════════════════════════════════════════════════════════════

const DailyEvents = {
    events: [
        {
            id: 'news_report',
            title: '📰 Сводка новостей',
            text: 'В районе Тихой улицы замечена подозрительная активность. Полиция просит жителей не выходить на улицу в тёмное время суток.',
            minAct: 1,
            weight: 30
        },
        {
            id: 'weather_warning',
            title: '🌧️ Штормовое предупреждение',
            text: 'Метеослужба предупреждает: сегодня ожидается сильная гроза. Будьте осторожны.',
            minAct: 1,
            weight: 25
        },
        {
            id: 'missing_person',
            title: '🚨 Пропал человек',
            text: 'В полицию поступило заявление о пропаже человека в районе улицы Тихой. Ведутся поиски.',
            minAct: 2,
            weight: 20
        },
        {
            id: 'katya_message',
            title: '👩 Сообщение от Кати',
            text: 'Катя оставила сообщение: "Я нашла ещё кое-что про дом 7. Перезвони мне."',
            minAct: 2,
            weight: 15
        },
        {
            id: 'police_statement',
            title: '👮 Заявление полиции',
            text: 'Официальное заявление: "Никакой связи между исчезновениями нет. Это совпадение."',
            minAct: 3,
            weight: 10
        },
        {
            id: 'anna_thought',
            title: '💭 Мысли Анны',
            text: 'Анна написала: "Иногда мне кажется, что стены смотрят на меня."',
            minAct: 2,
            weight: 20
        },
        {
            id: 'street_light',
            title: '💡 Странный свет',
            text: 'Жители сообщают о странном свете в окнах дома №7 по ночам.',
            minAct: 2,
            weight: 15
        }
    ],
    
    lastEventDate: null,
    shownToday: false,

    getTodaysEvent() {
        const today = new Date().toDateString();
        if (this.lastEventDate === today || this.shownToday) return null;
        
        const available = this.events.filter(function(e) {
            return G.act >= e.minAct;
        });
        
        if (available.length === 0) return null;
        
        const totalWeight = available.reduce(function(sum, e) {
            return sum + e.weight;
        }, 0);
        
        let roll = Math.random() * totalWeight;
        for (let i = 0; i < available.length; i++) {
            roll -= available[i].weight;
            if (roll <= 0) {
                this.lastEventDate = today;
                this.shownToday = true;
                this.save();
                return available[i];
            }
        }
        return available[0];
    },

    showEvent(event) {
        const chat = getChatElement();
        if (!chat) return;
        
        const banner = document.createElement('div');
        banner.className = 'daily-event';
        banner.innerHTML = `
            <div class="daily-event-title">${event.title}</div>
            <div>${event.text}</div>
        `;
        
        if (curView === 'home') {
            const widget = document.querySelector('.home-widget');
            if (widget && widget.parentNode) {
                widget.parentNode.insertBefore(banner, widget);
            }
        } else if (curView === 'msg') {
            chat.insertBefore(banner, chat.firstChild);
            scrollChatDown();
        }
        
        setTimeout(function() {
            if (banner.parentNode) {
                banner.style.opacity = '0';
                banner.style.transition = 'opacity 0.5s ease';
                setTimeout(function() {
                    if (banner.parentNode) banner.remove();
                }, 500);
            }
        }, 30000);
    },

    checkAndShow() {
        const event = this.getTodaysEvent();
        if (event) {
            const self = this;
            setTimeout(function() {
                self.showEvent(event);
            }, 5000);
            return true;
        }
        return false;
    },

    save() {
        try {
            localStorage.setItem('nez_daily_event_date', this.lastEventDate || '');
        } catch(e) {}
    },

    load() {
        this.lastEventDate = localStorage.getItem('nez_daily_event_date') || null;
        this.shownToday = false;
    },

    init() {
        this.load();
        // Сбрасываем флаг показа при смене дня
        const self = this;
        setInterval(function() {
            const today = new Date().toDateString();
            if (self.lastEventDate !== today) {
                self.shownToday = false;
            }
        }, 60000);
    }
};

// ═══════════════════════════════════════════════════════════════
// 29. СЛУЧАЙНЫЕ МЫСЛИ АННЫ
// ═══════════════════════════════════════════════════════════════

const RandomDialogues = {
    idleThoughts: [
        { text: 'Иногда мне кажется, что стены смотрят на меня.', mood: 'terrified', fear: 70 },
        { text: 'Ты здесь? Мне просто нужно знать, что кто-то рядом.', mood: 'worried', fear: 40 },
        { text: 'Я слышала сирену. Может быть, это за ним?', mood: 'anxious', fear: 55 },
        { text: 'Знаешь, о чём я мечтаю? О тихом вечере без страха.', mood: 'calm', fear: 20 },
        { text: 'Перечитала нашу переписку. Ты — единственное, что держит меня в здравом уме.', mood: 'relieved', fear: 30 },
        { text: 'Сегодня приснился кошмар. Будто я кричу, но никто не слышит.', mood: 'terrified', fear: 80 },
        { text: 'Кофе закончился. Мелочь, а расстраивает.', mood: 'calm', fear: 15 },
        { text: 'Проверила замки три раза. Всё на месте.', mood: 'anxious', fear: 45 },
        { text: 'Мне кажется, я схожу с ума. Или это реальность такая?', mood: 'scared', fear: 65 },
        { text: 'Сегодня я видела его. Он стоял у входа в парк. Просто смотрел.', mood: 'terrified', fear: 85 },
        { text: 'Я купила новый замок. Надеюсь, поможет.', mood: 'worried', fear: 50 },
        { text: 'Спасибо, что ты есть. Правда.', mood: 'relieved', fear: 25 }
    ],

    isScheduled: false,
    timeoutId: null,

    scheduleIdleThought() {
        if (this.isScheduled) return;
        this.isScheduled = true;
        
        const delay = 30000 + Math.random() * 120000;
        const self = this;
        
        this.timeoutId = setTimeout(function() {
            self.isScheduled = false;
            
            if (G.gameStarted && curView === 'msg' && G.act >= 2 && !G.endingReached) {
                const thought = self.idleThoughts[Math.floor(Math.random() * self.idleThoughts.length)];
                
                setContactStatus(t('online'), 'online');
                
                setTimeout(function() {
                    annaTyping(1500 + Math.random() * 2000, {
                        mood: thought.mood,
                        fear: thought.fear
                    }).then(function() {
                        addMessage('in', thought.text, { id: 'idle_' + Date.now() });
                        setContactStatus(t('was_online'), '');
                        self.scheduleIdleThought();
                    });
                }, 500);
            } else {
                self.scheduleIdleThought();
            }
        }, delay);
    },

    init() {
        this.scheduleIdleThought();
    },

    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            this.isScheduled = false;
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 30. КАЛЬКУЛЯТОР (С СЕКРЕТНЫМ КОДОМ)
// ═══════════════════════════════════════════════════════════════

const PhoneCalculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    secretAttempts: 0,
    secretUnlocked: false,

    init() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.secretAttempts = 0;
        this.secretUnlocked = false;
        this.updateDisplay();
    },

    inputDigit(d) {
        if (this.waitingForSecondOperand) {
            this.displayValue = String(d);
            this.waitingForSecondOperand = false;
        } else {
            this.displayValue = this.displayValue === '0' ? String(d) : this.displayValue + d;
        }
        this.updateDisplay();
        this.checkSecret();
    },

    inputDecimal() {
        if (this.waitingForSecondOperand) {
            this.displayValue = '0.';
            this.waitingForSecondOperand = false;
        } else if (this.displayValue.indexOf('.') === -1) {
            this.displayValue += '.';
        }
        this.updateDisplay();
    },

    handleOperator(op) {
        const val = parseFloat(this.displayValue);
        
        if (this.operator && this.waitingForSecondOperand) {
            this.operator = op;
            return;
        }
        
        if (this.firstOperand === null && !isNaN(val)) {
            this.firstOperand = val;
        } else if (this.operator) {
            const result = this.calculate(this.firstOperand, val, this.operator);
            this.displayValue = String(result);
            this.firstOperand = result;
        }
        
        this.waitingForSecondOperand = true;
        this.operator = op;
        this.updateDisplay();
    },

    calculate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 'Ошибка';
            default: return b;
        }
    },

    reset() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.updateDisplay();
    },

    updateDisplay() {
        const display = document.getElementById('calcResult');
        if (display) {
            let val = this.displayValue;
            if (val.length > 12 && !isNaN(parseFloat(val))) {
                val = parseFloat(val).toExponential(4);
            }
            display.textContent = val;
        }
    },

    checkSecret() {
        // БАГ #6 ИСПРАВЛЕН: секретный код 2305
        if (this.displayValue === '2305' && !this.secretUnlocked) {
            this.secretAttempts++;
            if (this.secretAttempts >= 1) {
                this.unlockSecretFile();
            }
        }
    },

    unlockSecretFile() {
        this.secretUnlocked = true;
        
        // Открываем секретное фото
        if (!G.galleryUnlocked.includes('g5')) {
            G.galleryUnlocked.push('g5');
            showToast('🔓 Секретный файл разблокирован!', 'Калькулятор');
            ReputationSystem.addXP('secret_found', 50);
        }
        
        const hint = document.getElementById('calcHint');
        if (hint) {
            hint.classList.add('visible');
            hint.textContent = '✓ РАЗБЛОКИРОВАН';
        }
        
        // Активируем квест
        if (typeof ContentUnlockSystem !== 'undefined') {
            ContentUnlockSystem.checkAndUnlock('act2_clue_found');
        }
    },

    getDisplayValue() {
        return this.displayValue;
    }
};

// ═══════════════════════════════════════════════════════════════
// 31. ИНИЦИАЛИЗАЦИЯ ВСЕХ СИСТЕМ
// ═══════════════════════════════════════════════════════════════

function initAllSystems() {
    // Загружаем сохранения
    AchievementSystem.load();
    ReputationSystem.load();
    EndingsSystem.load();
    ClueSystem.load();
    AppStore.load();
    ContentUnlockSystem.load();
    DailyEvents.load();
    
    // Инициализируем системы
    HackGame.init();
    CallSystem.init();
    FlashbackSystem.init();
    DailyEvents.init();
    RandomDialogues.init();
    EasterEggs.init();
    PhoneCalculator.init();
    
    // Запускаем погоду
    WeatherSystem.start();
    
    // Проверяем достижения
    AchievementSystem.checkAll();
    
    // Периодические проверки
    setInterval(function() {
        WeatherSystem.tick();
        AchievementSystem.checkAll();
        EndingsSystem.checkEndings();
    }, 30000);
    
    // БАГ #3 ИСПРАВЛЕН: звонок Кати с проверкой active
    let katyaCallScheduled = false;
    let annaCallScheduled = false;
    
    setInterval(function() {
        // Звонок Кати — только если активен Акт 2+
        if (G.act >= 2 && G.gameStarted && !G.endingReached && 
            !CallSystem.active && !CallSystem.isIncoming && 
            !katyaCallScheduled) {
            katyaCallScheduled = true;
            CallSystem.incomingCall(CallScripts.katyaWarning);
            // Сбрасываем через 5 минут, чтобы не спамить
            setTimeout(function() {
                katyaCallScheduled = false;
            }, 300000);
        }
        
        // Звонок Анны в панике — Акт 3+
        if (G.act >= 3 && G.gameStarted && !G.endingReached && 
            !CallSystem.active && !CallSystem.isIncoming && 
            P.fear >= 60 && G.annaAlive && !annaCallScheduled) {
            annaCallScheduled = true;
            CallSystem.incomingCall(CallScripts.annaPanic);
            setTimeout(function() {
                annaCallScheduled = false;
            }, 300000);
        }
    }, 60000);
    
    // БАГ #10 ИСПРАВЛЕН: защита от повторного срабатывания midnight_caller
    let midnightCalled = false;
    setInterval(function() {
        if (GameTime.hour === 3 && GameTime.minute === 0 && !midnightCalled) {
            midnightCalled = true;
            AchievementSystem.unlock('night_owl');
            if (G.gameStarted && !G.endingReached && !CallSystem.active) {
                CallSystem.incomingCall(CallScripts.unknownCaller);
            }
        }
        if (GameTime.hour !== 3) {
            midnightCalled = false;
        }
    }, 60000);
    
    console.log('✅ НЕЗНАКОМКА v8.0 — Часть 3 (Системы) загружена');
    console.log('🔍 Улик:', ClueSystem.getFoundCount() + '/8');
    console.log('📔 Записей дневника:', DiaryData.length);
    console.log('🏆 Концовок:', EndingsSystem.getUnlockedCount() + '/8');
    console.log('👩 Система Кати инициализирована');
    console.log('📞 Система звонков инициализирована');
    console.log('💻 Система взлома инициализирована');
    console.log('🎮 Пасхалки активированы');
    console.log('📅 Ежедневные события запущены');
    console.log('💭 Случайные мысли активированы');
    console.log('🔢 Калькулятор с секретом готов');
}
/* ═══════════════════════════════════════════════════════════════
   НЕЗНАКОМКА v8.0 — ПОЛНЫЙ JAVASCRIPT
   Часть 4 из 5: Рендеринг всех экранов (ИСПРАВЛЕННАЯ)
   Галерея, Браузер, Контакты, Заметки,
   Настройки, Диктофон, Карта, Калькулятор,
   Расследование, Дневник, Концовки, Магазин
   ВСЕ БАГИ ИСПРАВЛЕНЫ
═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 32. ГАЛЕРЕЯ (12 ФОТО)
// ═══════════════════════════════════════════════════════════════

const GALLERY_DATA = [
    { id: 'g0', icon: '🌃', title: 'Тёмный двор', desc: 'Снято автоматически в 23:17. Видна тень у подъезда.' },
    { id: 'g1', icon: '👤', title: 'Автопортрет', desc: 'Сделано на камеру телефона. Анна выглядит напуганной.' },
    { id: 'g2', icon: '📝', title: 'Записка', desc: 'Найдено у двери. "Я знаю, что ты дома".' },
    { id: 'g3', icon: '👥', title: 'Силуэт', desc: 'Размытое фото из окна. Кто-то стоит у фонаря.' },
    { id: 'g4', icon: '🚪', title: 'Дверь', desc: 'Снимок входной двери. Замок кажется взломанным.' },
    { id: 'g5', icon: '🔒', title: 'Секретный файл', desc: 'Доступ ограничен. Требуется код доступа.' },
    { id: 'g6', icon: '🌧️', title: 'Дождь', desc: 'Снято во время дождя. Капли на стекле.' },
    { id: 'g7', icon: '🕒', title: '3:00 AM', desc: 'Ночной снимок. На часах ровно 3:00.' },
    { id: 'g8', icon: '👣', title: 'Следы', desc: 'Следы на снегу. Ведут к дому.' },
    { id: 'g9', icon: '🔦', title: 'Фонарь', desc: 'Свет в окне напротив. Кто-то наблюдает.' },
    { id: 'g10', icon: '📱', title: 'Скриншот', desc: 'Сохранённая переписка. Важные данные.' },
    { id: 'g11', icon: '🏚️', title: 'Дом 7', desc: 'Улица Тихая, дом 7. Тот самый адрес.' }
];

function buildGallery() {
    var grid = document.getElementById('galGrid');
    if (!grid) return;
    
    var html = '';
    
    GALLERY_DATA.forEach(function(photo) {
        var isUnlocked = G.galleryUnlocked && G.galleryUnlocked.includes(photo.id);
        var isSecret = photo.id === 'g5';
        
        // БАГ #11 ИСПРАВЛЕН: безопасное экранирование
        var escapedDesc = photo.desc
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        
        var clickAction;
        if (!isUnlocked) {
            if (isSecret) {
                clickAction = "showToast('🔒 Секретный файл. Попробуйте калькулятор.', 'Галерея')";
            } else {
                clickAction = "showToast('🔒 Ещё не разблокировано', 'Галерея')";
            }
        } else {
            clickAction = "showToast('" + escapedDesc + "', '" + photo.title.replace(/'/g, "\\'") + "')";
        }
        
        html += '<div class="gallery-cell" onclick="' + clickAction + '">' +
            '<div class="gallery-cell-inner">' +
                '<div class="gallery-cell-icon">' + photo.icon + '</div>' +
                '<div style="font-size:8px;color:var(--text-tertiary);">' + (isUnlocked ? photo.title : '???') + '</div>' +
            '</div>' +
            (!isUnlocked ? '<div class="gallery-lock">🔒</div>' : '') +
            (isUnlocked && isSecret ? '<div style="position:absolute;top:4px;right:4px;font-size:10px;color:var(--gold);">⭐</div>' : '') +
        '</div>';
    });
    
    grid.innerHTML = html;
    
    // Обновляем счётчик в настройках
    var unlockedCount = G.galleryUnlocked ? G.galleryUnlocked.length : 0;
    var totalCount = GALLERY_DATA.length;
    var galleryCounter = document.getElementById('galleryCounter');
    if (galleryCounter) {
        galleryCounter.textContent = unlockedCount + '/' + totalCount;
    }
}

// ═══════════════════════════════════════════════════════════════
// 33. БРАУЗЕР (СТАТЬИ) — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

var BROWSER_ARTICLES = [
    {
        id: 'a1',
        title: 'Девушка пропала после обращения в полицию',
        desc: 'Анна В. обратилась в полицию за две недели до исчезновения...',
        full: 'Полный текст статьи о пропаже Анны Ворониной. Девушка неоднократно обращалась в полицию, но ей не верили. Последний раз её видели 9 мая у дома №7 на Тихой улице. Полиция отказалась комментировать дело.',
        url: 'news-portal.ru/crime/anna-v'
    },
    {
        id: 'a2',
        title: 'Как отличить паранойю от реальной угрозы',
        desc: 'Иногда страх оправдан. Иногда это симптом.',
        full: 'Психологи рассказывают о признаках реальной угрозы и паранойи. Эксперты отмечают, что в случае Анны Ворониной все признаки указывали на реальную опасность, а не на психическое расстройство.',
        url: 'psychology-today.ru/paranoia'
    },
    {
        id: 'a3',
        title: 'Кто такой «Наблюдатель»?',
        desc: 'Городская легенда или реальная сеть слежки?',
        full: 'Расследование о таинственной сети наблюдения. Местные жители утверждают, что "Наблюдатель" — это человек, который следит за жителями дома №7. По слухам, это бывший сотрудник полиции.',
        url: 'investigation.ru/watcher'
    },
    {
        id: 'a4',
        title: 'Исчезновения на Тихой улице: хронология',
        desc: 'Три человека пропали за два года.',
        full: 'Хронология исчезновений на Тихой улице:\n\n• Март 2023 — Виктор Стрельников\n• Август 2023 — Семья Ивановых (2 человека)\n• Май 2024 — Анна Воронина (пропала без вести)\n\nВсе исчезновения связаны с домом №7.',
        url: 'local-news.ru/tihaya'
    },
    {
        id: 'a5',
        title: 'Кот взломал Пентагон: реальная история',
        desc: 'Британский кот случайно запустил ядерную тревогу.',
        full: 'Забавная история о коте-хакере, который прошёлся по клавиатуре и едва не начал Третью мировую войну. Кота звали Мурзик, и он просто хотел есть.',
        url: 'funny-cats.ru/hacker-cat'
    },
    {
        id: 'a6',
        title: 'Бабушка прошла Dark Souls: рекорд',
        desc: '83-летняя пенсионерка удивила мир.',
        full: '"Ну, сложновато было", — говорит бабушка. Она прошла игру за 120 часов, используя только одну руку. Теперь она собирается пройти Sekiro.',
        url: 'gaming-news.ru/granny'
    },
    {
        id: 'a7',
        title: 'Топ-10 способов избежать слежки',
        desc: 'Советы экспертов по кибербезопасности.',
        full: 'Эксперты делятся советами по кибербезопасности. Особое внимание уделяется защите от слежки в городской среде. Рекомендуется менять маршруты и использовать приложения с шифрованием.',
        url: 'security.ru/top10'
    }
];

var currentArticle = null;
var browserHistory = [];

function buildBrowser() {
    var content = document.getElementById('browserContent');
    if (!content) return;
    
    // БАГ #8 ИСПРАВЛЕН: сохраняем состояние
    if (currentArticle !== null) {
        renderArticle(currentArticle);
        return;
    }
    
    var html = '';
    html += '<div class="browser-search-title">ПОИСК</div>';
    html += '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);margin-bottom:16px;">Найдено: ' + BROWSER_ARTICLES.length + ' результатов</div>';
    
    BROWSER_ARTICLES.forEach(function(article, index) {
        html += '<div class="browser-result" onclick="openBrowserArticle(' + index + ')">' +
            '<div class="browser-result-url">' + article.url + '</div>' +
            '<div class="browser-result-title">' + article.title + '</div>' +
            '<div class="browser-result-desc">' + article.desc + '</div>' +
        '</div>';
    });
    
    content.innerHTML = html;
}

function openBrowserArticle(index) {
    var article = BROWSER_ARTICLES[index];
    if (!article) return;
    
    currentArticle = index;
    renderArticle(index);
}

function renderArticle(index) {
    var article = BROWSER_ARTICLES[index];
    if (!article) return;
    
    var content = document.getElementById('browserContent');
    if (!content) return;
    
    var html = '';
    html += '<div class="browser-article">';
    html += '<div class="browser-article-back" onclick="closeBrowserArticle()">‹ Назад</div>';
    html += '<div class="browser-article-url" style="font-family:var(--fm);font-size:9px;color:var(--teal);margin-bottom:8px;">' + article.url + '</div>';
    html += '<div class="browser-article-title">' + article.title + '</div>';
    html += '<div class="browser-article-text">' + article.full.replace(/\n/g, '<br>') + '</div>';
    html += '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);margin-top:16px;border-top:1px solid var(--border-color);padding-top:12px;">Прочитано: ' + new Date().toLocaleDateString() + '</div>';
    html += '</div>';
    
    content.innerHTML = html;
    browserHistory.push(index);
}

function closeBrowserArticle() {
    currentArticle = null;
    // БАГ #3 ИСПРАВЛЕН: очистка истории
    browserHistory = [];
    buildBrowser();
}

function goBackInBrowser() {
    if (browserHistory.length > 1) {
        browserHistory.pop();
        var last = browserHistory[browserHistory.length - 1];
        currentArticle = last;
        renderArticle(last);
    } else {
        closeBrowserArticle();
    }
}

// ═══════════════════════════════════════════════════════════════
// 34. КОНТАКТЫ (С ИСТОРИЯМИ) — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

function buildContacts() {
    var list = document.getElementById('contactsList');
    var profile = document.getElementById('contactProfile');
    
    if (list) list.style.display = 'block';
    if (profile) {
        profile.style.display = 'none';
        profile.className = 'contacts-profile';
    }
    
    if (!list) return;
    
    // БАГ #2 ИСПРАВЛЕН: проверка на существование CONTACTS_DATA
    var contacts = (typeof CONTACTS_DATA !== 'undefined') ? CONTACTS_DATA : [];
    
    if (contacts.length === 0) {
        list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);font-family:var(--fm);">Нет контактов</div>';
        return;
    }
    
    var html = '';
    contacts.forEach(function(c) {
        var escapedName = escapeHTML(c.name);
        var escapedDesc = escapeHTML(c.description.substring(0, 40) + '...');
        var statusDot = c.status === 'online' ? '🟢' : c.status === 'была недавно' ? '🟡' : '⚪';
        
        html += '<div class="contact-item" onclick="openContactProfile(\'' + c.id + '\')">' +
            '<div class="contact-avatar">' + c.avatar + '</div>' +
            '<div class="contact-info-text">' +
                '<div class="contacts-name">' + escapedName + ' <span style="font-size:10px;">' + statusDot + '</span></div>' +
                '<div class="contact-detail">' + escapedDesc + '</div>' +
            '</div>' +
            '<div class="contact-chevron">›</div>' +
        '</div>';
    });
    
    list.innerHTML = html;
}

function openContactProfile(contactId) {
    var contacts = (typeof CONTACTS_DATA !== 'undefined') ? CONTACTS_DATA : [];
    var contact = null;
    
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === contactId) {
            contact = contacts[i];
            break;
        }
    }
    
    if (!contact) return;
    
    var list = document.getElementById('contactsList');
    var profile = document.getElementById('contactProfile');
    
    if (list) list.style.display = 'none';
    if (!profile) return;
    
    profile.style.display = 'block';
    profile.className = 'contacts-profile show';
    
    var statusDot = contact.status === 'online' ? '🟢' : contact.status === 'была недавно' ? '🟡' : '⚪';
    
    var tagsHtml = '';
    if (contact.tags) {
        for (var j = 0; j < contact.tags.length; j++) {
            tagsHtml += '<span style="background:rgba(124,92,252,0.1);border:1px solid rgba(124,92,252,0.15);border-radius:12px;padding:2px 10px;font-family:var(--fm);font-size:8px;color:var(--violet);">' + escapeHTML(contact.tags[j]) + '</span>';
        }
    }
    
    profile.innerHTML = 
        '<div style="text-align:center;padding:20px;">' +
            '<div class="contact-profile-avatar">' + contact.avatar + '</div>' +
            '<h2 class="contact-profile-name">' + escapeHTML(contact.name) + ' ' + statusDot + '</h2>' +
            '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);margin-bottom:8px;">' + escapeHTML(contact.relation) + ' · ' + escapeHTML(contact.mood) + '</div>' +
            '<p class="contact-profile-desc">' + escapeHTML(contact.description) + '</p>' +
            '<div style="margin:12px 0;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">' + tagsHtml + '</div>' +
            '<div style="background:var(--depth);border-radius:12px;padding:12px;text-align:left;margin:12px 0;font-family:var(--fm);font-size:10.5px;color:var(--text-secondary);line-height:1.8;">' +
                '<div style="font-weight:700;color:var(--violet);margin-bottom:4px;">📖 История</div>' +
                escapeHTML(contact.story) +
            '</div>' +
            '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);margin-bottom:12px;">📱 ' + escapeHTML(contact.phone) + '</div>' +
            '<button class="btn-primary contact-profile-btn" onclick="switchToChat(\'' + contact.id + '\')">💬 Написать</button>' +
            '<button class="btn-secondary contact-profile-btn" onclick="buildContacts()" style="margin-top:8px;">← Назад к контактам</button>' +
        '</div>';
}

function switchToChat(contactId) {
    showView('msg');
    clearChat();
    
    var contacts = (typeof CONTACTS_DATA !== 'undefined') ? CONTACTS_DATA : [];
    var contact = null;
    
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === contactId) {
            contact = contacts[i];
            break;
        }
    }
    
    if (!contact) return;
    
    var avatar = document.getElementById('msgAva');
    if (avatar) avatar.innerHTML = contact.avatar;
    
    setContactName(contact.name);
    setContactStatus(contact.status === 'online' ? t('online') : t('was_online'), contact.status === 'online' ? 'online' : '');
    
    addChatDivider();
    addChatSystem('Чат с ' + contact.name);
    
    // Специальные диалоги для разных контактов
    if (contactId === 'anna' && !G.gameStarted) {
        G.gameStarted = true;
        AchievementSystem.unlock('first_contact');
        setTimeout(function() {
            if (typeof startGame === 'function') {
                startGame();
            }
        }, 800);
    } else if (contactId === 'katya') {
        if (typeof KatyaSystem !== 'undefined' && KatyaSystem.startChat) {
            KatyaSystem.startChat();
        } else {
            addMessage('in', 'Привет! Это Катя. Я хотела поговорить о доме №7.', { id: 'katya_fallback' });
        }
    } else if (contactId === 'mama') {
        setTimeout(function() {
            annaTyping(1500, { mood: 'calm', fear: 10 }).then(function() {
                addMessage('in', 'Сынок, ты покушал? Опять в своём телефоне сидишь?', { id: 'mama_1' });
                GameTime.advance(1);
                return sleep(1000);
            }).then(function() {
                addMessage('in', 'Приходи в воскресенье на борщ. И не забудь шапку надеть!', { id: 'mama_2' });
            });
        }, 500);
    } else if (contactId === 'sergey') {
        setTimeout(function() {
            annaTyping(2000, { mood: 'worried', fear: 30 }).then(function() {
                addMessage('in', 'Ты из квартиры 14? Я слышал странные звуки в подвале.', { id: 'sergey_1' });
                GameTime.advance(2);
                return sleep(1000);
            }).then(function() {
                addMessage('in', 'Будь осторожна. В этом доме не всё так просто.', { id: 'sergey_2' });
            });
        }, 500);
    } else if (contactId === 'viktor') {
        setTimeout(function() {
            annaTyping(2000, { mood: 'serious', fear: 40 }).then(function() {
                addMessage('in', 'Это Виктор из полиции. Я звоню по поводу вашего заявления.', { id: 'viktor_1' });
                GameTime.advance(1);
                return sleep(1000);
            }).then(function() {
                addMessage('in', 'Я нашёл кое-что интересное в деле. Перезвоните мне.', { id: 'viktor_2' });
            });
        }, 500);
    } else {
        // Общий диалог для остальных контактов
        setTimeout(function() {
            annaTyping(1800, { mood: 'calm', fear: 20 }).then(function() {
                var greetings = [
                    'Привет! Рад(а) тебя видеть.',
                    'Как дела? Давно не общались.',
                    'Привет! Что нового?',
                    'О, привет! Как жизнь?'
                ];
                addMessage('in', greetings[Math.floor(Math.random() * greetings.length)], { id: 'generic_' + contactId });
            });
        }, 500);
    }
}

// ═══════════════════════════════════════════════════════════════
// 35. ЗАМЕТКИ (С СЕКРЕТНОЙ) — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

var NOTES_DATA = [
    {
        id: 'n1',
        title: '📋 Список дел',
        body: '— Купить хлеб\n— Позвонить врачу\n— Не забыть покормить кота\n\n[Добавлено позже]\nНЕ ОТКРЫВАЙ ДВЕРЬ\nОНИ УЖЕ ЗДЕСЬ',
        date: '9 мая'
    },
    {
        id: 'n2',
        title: '🔒 Важное [зашифровано]',
        body: 'Файл зашифрован.\nЕсли ты читаешь это — я не успела.\nПароль: 2305\n\nОна следила за тобой.\n— Катя',
        date: '7 мая',
        locked: true,
        password: '2305'
    },
    {
        id: 'n3',
        title: '😂 Забавный факт',
        body: 'Почему программисты путают Рождество и Хэллоуин?\n\nПотому что 25 Dec = 31 Oct!\n\n(для тех, кто понял — вы легенды)',
        date: '1 апреля'
    },
    {
        id: 'n4',
        title: '📝 Заметка с лекции',
        body: 'Тема: журналистские расследования\n\nВажно: всегда проверять источники.\nЕсли кто-то говорит "мне кажется" — это не источник.\n\nАнна была на этой лекции.',
        date: '3 мая'
    },
    {
        id: 'n5',
        title: '📞 Важные номера',
        body: 'Анна: +7 (999) 123-45-67\nКатя: +7 (999) 234-56-78\nМама: +7 (999) 345-67-89\nВиктор (полиция): +7 (999) 901-23-45\n\nСохрани в телефоне.',
        date: '5 мая'
    },
    {
        id: 'n6',
        title: '🔍 Улики',
        body: '1. Записка у двери\n2. Фото силуэта\n3. Газетная вырезка (Стрельников)\n4. Список жильцов\n5. Запись с диктофона\n6. Данные дежурного\n7. Адресная книга\n8. Личное дело',
        date: '8 мая'
    }
];

var currentNote = null;

function buildNotes() {
    var list = document.getElementById('noteList');
    var detail = document.getElementById('noteDet');
    var backBtn = document.getElementById('noteBack');
    
    if (list) list.style.display = 'block';
    if (detail) {
        detail.style.display = 'none';
        detail.className = 'notes-detail';
    }
    if (backBtn) backBtn.onclick = goHome;
    
    if (!list) return;
    
    currentNote = null;
    
    var html = '';
    NOTES_DATA.forEach(function(note) {
        var isLocked = note.locked && !G.notesUnlocked.includes(note.id);
        var preview = isLocked ? '🔒 Заблокировано' : note.body.substring(0, 50) + '...';
        
        html += '<div class="note-card" onclick="' + (isLocked ? "showToast('🔒 Требуется пароль: 2305', 'Заметки')" : "openNote('" + note.id + "')") + '">' +
            '<div class="note-card-title">' + note.title + '</div>' +
            '<div class="note-card-preview" style="' + (isLocked ? 'color:var(--text-tertiary);font-style:italic;' : '') + '">' +
                (isLocked ? '🔒 Введите пароль для просмотра' : preview) +
            '</div>' +
            '<div class="note-card-date">' + note.date + '</div>' +
            (isLocked ? '<div style="position:absolute;top:12px;right:12px;font-size:14px;">🔒</div>' : '') +
        '</div>';
    });
    
    list.innerHTML = html;
}

function openNote(noteId) {
    var note = null;
    for (var i = 0; i < NOTES_DATA.length; i++) {
        if (NOTES_DATA[i].id === noteId) {
            note = NOTES_DATA[i];
            break;
        }
    }
    
    if (!note) return;
    
    // БАГ #6 ИСПРАВЛЕН: проверка пароля с обработкой null
    if (note.locked && !G.notesUnlocked.includes(note.id)) {
        var password = prompt('Введите пароль для доступа к заметке:');
        // БАГ #4 ИСПРАВЛЕН: проверка на null
        if (password === null) return;
        if (password === note.password) {
            G.notesUnlocked.push(note.id);
            showToast('🔓 Заметка разблокирована!', 'Заметки');
            renderNoteDetail(note);
        } else {
            showToast('❌ Неверный пароль', 'Заметки');
        }
        return;
    }
    
    renderNoteDetail(note);
}

function renderNoteDetail(note) {
    var list = document.getElementById('noteList');
    var detail = document.getElementById('noteDet');
    var backBtn = document.getElementById('noteBack');
    
    if (list) list.style.display = 'none';
    if (detail) {
        detail.style.display = 'block';
        detail.className = 'notes-detail show';
        detail.innerHTML = 
            '<div class="note-detail-title">' + note.title + '</div>' +
            '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);margin-bottom:16px;">' + note.date + '</div>' +
            '<div class="note-detail-body">' + note.body + '</div>';
    }
    if (backBtn) {
        backBtn.onclick = function() {
            if (detail) {
                detail.style.display = 'none';
                detail.className = 'notes-detail';
            }
            if (list) {
                list.style.display = 'block';
                list.className = 'notes-list';
            }
            backBtn.onclick = goHome;
            currentNote = null;
        };
    }
    currentNote = note.id;
}

// ═══════════════════════════════════════════════════════════════
// 36. НАСТРОЙКИ (ПОЛНЫЕ) — ИСПРАВЛЕНЫ
// ═══════════════════════════════════════════════════════════════

function buildSettings() {
    var body = document.getElementById('settingsBody');
    if (!body) return;
    
    var currentTheme = localStorage.getItem('nez_theme') || 'midnight';
    var currentFont = localStorage.getItem('nez_font') || 'unbounded';
    var currentLang = localStorage.getItem('nez_lang') || 'ru';
    
    var themeIcons = {
        midnight: '🌙',
        black: '⬛',
        forest: '🌲',
        ocean: '🌊',
        sunset: '🌅',
        warm: '🔥',
        nature: '🌿',
        light: '☀️',
        white: '⬜',
        pink: '🌸',
        sky: '🩵',
        mint: '🌿',
        peach: '🍑'
    };
    
    var themeNames = {
        midnight: 'Полночь',
        black: 'Чёрная',
        forest: 'Лес',
        ocean: 'Океан',
        sunset: 'Закат',
        warm: 'Тёплая',
        nature: 'Природа',
        light: 'Светлая',
        white: 'Белая',
        pink: 'Розовая',
        sky: 'Голубая',
        mint: 'Мятная',
        peach: 'Персик'
    };
    
    var fontNames = {
        unbounded: 'Unbounded',
        inter: 'Inter',
        noto: 'Noto Sans',
        mono: 'Mono'
    };
    
    var langNames = {
        ru: '🇷🇺 Русский',
        en: '🇬🇧 English',
        es: '🇪🇸 Español'
    };
    
    // БАГ #11, #12 ИСПРАВЛЕНЫ: проверки на существование систем
    var unlockedAchievements = (typeof AchievementSystem !== 'undefined') ? AchievementSystem.getUnlockedCount() : 0;
    var totalAchievements = (typeof AchievementSystem !== 'undefined') ? AchievementSystem.getTotalCount() : 22;
    var unlockedEndings = (typeof EndingsSystem !== 'undefined') ? EndingsSystem.getUnlockedCount() : 0;
    var totalEndings = (typeof EndingsSystem !== 'undefined') ? EndingsSystem.getTotalCount() : 8;
    var foundClues = (typeof ClueSystem !== 'undefined') ? ClueSystem.getFoundCount() : 0;
    var totalClues = (typeof ClueSystem !== 'undefined') ? ClueSystem.clues.length : 8;
    var unlockedGallery = (G.galleryUnlocked) ? G.galleryUnlocked.length : 0;
    var totalGallery = 12;
    var reputationStars = (typeof ReputationSystem !== 'undefined') ? ReputationSystem.stars : 0;
    var reputationXP = (typeof ReputationSystem !== 'undefined') ? ReputationSystem.totalXP : 0;
    
    var html = '';
    html += '<div class="settings-section-label">🎨 Тёмные темы</div>';
    html += '<div class="settings-selector-row">';
    var darkThemes = ['midnight', 'black', 'forest', 'ocean', 'sunset', 'warm', 'nature'];
    for (var ti = 0; ti < darkThemes.length; ti++) {
        var theme = darkThemes[ti];
        html += '<div class="settings-option settings-option-theme ' + (currentTheme === theme ? 'selected' : '') + '" data-theme="' + theme + '" onclick="setTheme(\'' + theme + '\');buildSettings()" title="' + themeNames[theme] + '">' + themeIcons[theme] + '</div>';
    }
    html += '</div>';

    html += '<div class="settings-section-label">☀️ Светлые темы</div>';
    html += '<div class="settings-selector-row">';
    var lightThemes = ['light', 'white', 'pink', 'sky', 'mint', 'peach'];
    for (var li2 = 0; li2 < lightThemes.length; li2++) {
        var theme = lightThemes[li2];
        html += '<div class="settings-option settings-option-theme ' + (currentTheme === theme ? 'selected' : '') + '" data-theme="' + theme + '" onclick="setTheme(\'' + theme + '\');buildSettings()" title="' + themeNames[theme] + '">' + themeIcons[theme] + '</div>';
    }
    html += '</div>';
    
    html += '<div class="settings-section-label">🔤 Шрифт</div>';
    html += '<div class="settings-selector-row">';
    
    var fontKeys = Object.keys(fontNames);
    for (var fi = 0; fi < fontKeys.length; fi++) {
        var font = fontKeys[fi];
        html += '<div class="settings-option settings-option-font ' + (currentFont === font ? 'selected' : '') + '" data-font="' + font + '" onclick="setFont(\'' + font + '\');buildSettings()">' + fontNames[font] + '</div>';
    }
    html += '</div>';
    
    html += '<div class="settings-section-label">🌐 Язык</div>';
    html += '<div class="settings-selector-row">';
    
    var langKeys = Object.keys(langNames);
    for (var li = 0; li < langKeys.length; li++) {
        var lang = langKeys[li];
        html += '<div class="settings-option settings-option-lang ' + (currentLang === lang ? 'selected' : '') + '" onclick="setLanguage(\'' + lang + '\');buildSettings()">' + langNames[lang] + '</div>';
    }
    html += '</div>';
    
    html += '<div class="settings-section-label">📊 Прогресс</div>';
    html += '<div class="settings-row" onclick="showProgressDetails()">' +
        '<div class="settings-row-icon">📊</div>' +
        '<div class="settings-row-info">' +
            '<div class="settings-row-name">Прогресс игры</div>' +
            '<div class="settings-row-sub">Акт ' + G.act + ' · Доверие: ' + Math.floor(P.trust) + '% · Страх: ' + Math.floor(P.fear) + '%</div>' +
        '</div>' +
        '<div class="settings-chevron">›</div>' +
    '</div>';
    
    html += '<div class="settings-section-label">🏆 Достижения (' + unlockedAchievements + '/' + totalAchievements + ')</div>';
    html += '<div class="achievements-grid">';
    
    if (typeof AchievementSystem !== 'undefined') {
        var achKeys = Object.keys(AchievementSystem.achievements);
        var displayCount = Math.min(8, achKeys.length);
        for (var ai = 0; ai < displayCount; ai++) {
            var a = AchievementSystem.achievements[achKeys[ai]];
            html += '<div class="achievement-card ' + (a.unlocked ? 'unlocked' : 'locked') + '">' +
                '<div class="achievement-card-icon">' + (a.unlocked ? a.icon : '🔒') + '</div>' +
                '<div class="achievement-card-name">' + (a.unlocked ? a.name : '???') + '</div>' +
                '<div class="achievement-card-desc">' + (a.unlocked ? a.desc : (a.secret ? 'Секретное достижение' : 'Ещё не открыто')) + '</div>' +
            '</div>';
        }
    } else {
        html += '<div style="padding:10px;text-align:center;color:var(--text-tertiary);">Достижения загружаются...</div>';
    }
    html += '</div>';
    
    html += '<div class="settings-section-label">🔍 Улики (' + foundClues + '/' + totalClues + ')</div>';
    html += '<div style="padding:10px 18px;">' +
        '<div style="height:6px;background:var(--depth);border-radius:3px;overflow:hidden;">' +
            '<div style="height:100%;width:' + ((foundClues/totalClues)*100) + '%;background:linear-gradient(90deg,var(--violet),var(--teal));border-radius:3px;transition:width 0.5s ease;"></div>' +
        '</div>' +
        '<div style="font-family:var(--fm);font-size:8px;color:var(--text-tertiary);margin-top:4px;text-align:right;">' + foundClues + '/' + totalClues + '</div>' +
    '</div>';
    
    html += '<div class="settings-section-label">🖼️ Галерея (' + unlockedGallery + '/' + totalGallery + ')</div>';
    html += '<div style="padding:10px 18px;">' +
        '<div style="height:6px;background:var(--depth);border-radius:3px;overflow:hidden;">' +
            '<div style="height:100%;width:' + ((unlockedGallery/totalGallery)*100) + '%;background:linear-gradient(90deg,var(--crimson),var(--gold));border-radius:3px;transition:width 0.5s ease;"></div>' +
        '</div>' +
        '<div style="font-family:var(--fm);font-size:8px;color:var(--text-tertiary);margin-top:4px;text-align:right;">' + unlockedGallery + '/' + totalGallery + '</div>' +
    '</div>';
    
    html += '<div class="settings-section-label">🎬 Концовки (' + unlockedEndings + '/' + totalEndings + ')</div>';
    html += '<div style="padding:10px 18px;display:flex;flex-wrap:wrap;gap:4px;">';
    
    if (typeof EndingsSystem !== 'undefined') {
        var endKeys = Object.keys(EndingsSystem.endings);
        for (var ei = 0; ei < endKeys.length; ei++) {
            var e = EndingsSystem.endings[endKeys[ei]];
            html += '<span class="ending-badge ' + (e.unlocked ? 'unlocked' : 'locked') + '">' +
                (e.unlocked ? e.icon : '❓') + ' ' + (e.unlocked ? e.name : '???') +
            '</span>';
        }
    } else {
        html += '<span style="color:var(--text-tertiary);font-size:10px;">Загрузка...</span>';
    }
    html += '</div>';
    
    html += '<div class="settings-section-label">⭐ Репутация</div>';
    html += '<div style="text-align:center;padding:10px;">';
    
    if (typeof ReputationSystem !== 'undefined') {
        html += ReputationSystem.getStarsHTML();
    }
    html += '<div style="font-size:9px;color:var(--text-tertiary);margin-top:4px;">Опыт: ' + reputationXP + '</div>';
    html += '</div>';
    
    html += '<div class="settings-section-label">💾 Данные</div>';
    html += '<div class="settings-row" onclick="resetGame()">' +
        '<div class="settings-row-icon">🔄</div>' +
        '<div class="settings-row-info">' +
            '<div class="settings-row-name">Сбросить прогресс</div>' +
            '<div class="settings-row-sub">Начать игру заново</div>' +
        '</div>' +
        '<div class="settings-chevron">›</div>' +
    '</div>';
    
    html += '<div class="settings-row" onclick="checkAdmin()">' +
        '<div class="settings-row-icon">🛠️</div>' +
        '<div class="settings-row-info">' +
            '<div class="settings-row-name">Доступ разработчика</div>' +
            '<div class="settings-row-sub">Версия 8.0</div>' +
        '</div>' +
        '<div class="settings-chevron">›</div>' +
    '</div>';
    
    html += '<div class="settings-row" onclick="exportSaveData()">' +
        '<div class="settings-row-icon">💾</div>' +
        '<div class="settings-row-info">' +
            '<div class="settings-row-name">Экспорт сохранения</div>' +
            '<div class="settings-row-sub">Скачать файл с прогрессом</div>' +
        '</div>' +
        '<div class="settings-chevron">›</div>' +
    '</div>';
    
    html += '<div style="padding:16px;text-align:center;font-family:var(--fm);font-size:9px;color:var(--text-tertiary);">НЕЗНАКОМКА v8.0 · 2025<br>Сделано с ❤️</div>';
    
    body.innerHTML = html;
}

// БАГ #1 ИСПРАВЛЕН: глобальная функция экспорта
function exportSaveData() {
    var data = {
        version: '8.0',
        date: new Date().toISOString(),
        G: {
            act: G.act,
            step: G.step,
            gameStarted: G.gameStarted,
            endingReached: G.endingReached,
            endingType: G.endingType,
            annaAlive: G.annaAlive,
            truthRevealed: G.truthRevealed,
            killerKnown: G.killerKnown,
            galleryUnlocked: G.galleryUnlocked,
            endingsUnlocked: Array.from(G.endingsUnlocked),
            notesUnlocked: G.notesUnlocked,
            diaryUnlocked: G.diaryUnlocked,
            appsInstalled: G.appsInstalled,
            hackCompleted: G.hackCompleted,
            annaFirstContact: G.annaFirstContact
        },
        P: {
            trust: P.trust,
            fear: P.fear,
            stress: P.stress,
            dependency: P.dependency,
            suspicion: P.suspicion,
            mentalState: P.mentalState,
            paranoia: P.paranoia,
            guilt: P.guilt,
            courage: P.courage,
            truth: P.truth
        },
        gametime: {
            day: GameTime.day,
            month: GameTime.month,
            year: GameTime.year,
            hour: GameTime.hour,
            minute: GameTime.minute
        }
    };
    
    try {
        var json = JSON.stringify(data, null, 2);
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'neznakomka_save_' + Date.now() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('💾 Сохранение экспортировано!', 'Настройки');
    } catch(e) {
        showToast('❌ Ошибка экспорта', 'Настройки');
    }
}

function showProgressDetails() {
    var unlockedAchievements = (typeof AchievementSystem !== 'undefined') ? AchievementSystem.getUnlockedCount() : 0;
    var totalAchievements = (typeof AchievementSystem !== 'undefined') ? AchievementSystem.getTotalCount() : 22;
    var foundClues = (typeof ClueSystem !== 'undefined') ? ClueSystem.getFoundCount() : 0;
    var unlockedGallery = (G.galleryUnlocked) ? G.galleryUnlocked.length : 0;
    var unlockedEndings = (typeof EndingsSystem !== 'undefined') ? EndingsSystem.getUnlockedCount() : 0;
    var reputationStars = (typeof ReputationSystem !== 'undefined') ? ReputationSystem.stars : 0;
    var weatherLabel = (typeof WeatherSystem !== 'undefined') ? WeatherSystem.getWeatherLabel(WeatherSystem.current) : 'Неизвестно';
    
    var msg = '📊 ПРОГРЕСС ИГРЫ\n\n' +
        '🎯 Акт: ' + G.act + '\n' +
        '❤️ Доверие: ' + Math.floor(P.trust) + '%\n' +
        '😨 Страх: ' + Math.floor(P.fear) + '%\n' +
        '🧠 Психика: ' + Math.floor(P.mentalState) + '%\n' +
        '🕵️ Паранойя: ' + Math.floor(P.paranoia) + '%\n' +
        '💪 Храбрость: ' + Math.floor(P.courage) + '%\n\n' +
        '🏆 Достижений: ' + unlockedAchievements + '/' + totalAchievements + '\n' +
        '🔍 Улик: ' + foundClues + '/8\n' +
        '🖼️ Галерея: ' + unlockedGallery + '/12\n' +
        '🎬 Концовок: ' + unlockedEndings + '/8\n' +
        '⭐ Репутация: ' + reputationStars + ' звёзд\n\n' +
        '⏰ Время: ' + GameTime.getDateString() + ' ' + GameTime.getTimeString() + '\n' +
        '🌤️ Погода: ' + weatherLabel;
    
    showToast(msg, '📊 Прогресс');
}

// ═══════════════════════════════════════════════════════════════
// 37. ДИКТОФОН — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

var DICTAHONE_DATA = [
    {
        id: 'rec1',
        title: 'Ночной шум',
        date: '7 мая · 02:34',
        duration: '1:23',
        type: 'ambient',
        locked: false,
        icon: '🌙',
        transcription: [
            { speaker: 'anna', text: 'Я не знаю, зачем это записываю...' },
            { speaker: 'note', text: '[слышен скрип половиц]' },
            { speaker: 'anna-nervous', text: 'Опять этот звук. Третий раз за ночь.' },
            { speaker: 'note', text: '[пауза 15 секунд]' },
            { speaker: 'anna', text: 'Если кто-то найдёт эту запись... меня зовут Анна Воронина. Я живу на улице Тихой, дом 7.' },
            { speaker: 'note', text: '[громкий стук, запись обрывается]' }
        ],
        note: 'Запись автоматически отправлена в облако. Местоположение: ул. Тихая, 7.'
    },
    {
        id: 'rec2',
        title: 'Разговор с Катей',
        date: '6 мая · 19:15',
        duration: '4:07',
        type: 'call',
        locked: false,
        icon: '📞',
        transcription: [
            { speaker: 'anna', text: 'Катя, ты меня слышишь? Связь ужасная.' },
            { speaker: 'other', text: 'Да, слышу. Что случилось? Ты какая-то взволнованная.' },
            { speaker: 'anna', text: 'Мне кажется, за мной следят. Уже неделю.' },
            { speaker: 'other', text: 'Опять? Анна, мы это уже обсуждали. Ты накручиваешь себя.' },
            { speaker: 'anna-nervous', text: 'Нет, в этот раз всё серьёзно! Я видела человека у подъезда. Он стоял и смотрел на мои окна.' },
            { speaker: 'other', text: 'Может, просто сосед? Или кто-то ждал такси?' },
            { speaker: 'anna', text: 'В три часа ночи? Катя, пожалуйста, поверь мне.' },
            { speaker: 'other', text: 'Ладно... допустим. Что ты хочешь, чтобы я сделала?' },
            { speaker: 'anna', text: 'Ты говорила, у тебя есть знакомый... Миша? Который разбирается в таких делах.' },
            { speaker: 'other', text: '[пауза] Да, есть. Но он... специфический человек.' },
            { speaker: 'anna', text: 'Дай мне его номер. Пожалуйста.' },
            { speaker: 'other', text: 'Хорошо. Но будь осторожна. И... Анна? Не делай глупостей.' }
        ],
        note: 'Катя передала номер Миши через час после разговора.'
    },
    {
        id: 'rec3',
        title: 'Дополнительная запись',
        date: '8 мая · 23:57',
        duration: '2:45',
        type: 'voice',
        locked: false,
        icon: '🎙️',
        transcription: [
            { speaker: 'anna', text: 'Я провела расследование. Дом номер семь на Тихой улице.' },
            { speaker: 'note', text: '[шелест бумаг]' },
            { speaker: 'anna', text: 'Три человека исчезли отсюда за последние два года. ТРИ.' },
            { speaker: 'anna-nervous', text: 'И полиция ничего не сделала. Они даже не искали.' },
            { speaker: 'anna', text: 'Первый — Стрельников Виктор. Пропал в марте. Второй — молодая пара, Ивановы. Исчезли в августе.' },
            { speaker: 'note', text: '[долгая пауза, слышно дыхание]' },
            { speaker: 'anna', text: 'Я думаю... я знаю, кто за этим стоит. Но мне никто не поверит.' },
            { speaker: 'note', text: '[тихий шёпот]' },
            { speaker: 'anna-nervous', text: 'Он работает в полиции. Поэтому они ничего не нашли.' }
        ],
        note: 'Запись найдена в черновиках. Не была отправлена.'
    },
    {
        id: 'rec4',
        title: 'Последняя запись',
        date: '9 мая · 00:13',
        duration: '0:47',
        type: 'voice',
        locked: true,
        unlockAct: 3,
        icon: '⚠️',
        transcription: [
            { speaker: 'anna-nervous', text: 'Он здесь. Я слышу, как открывается дверь.' },
            { speaker: 'note', text: '[грохот, крик]' },
            { speaker: 'anna', text: 'Пожалуйста... не надо...' },
            { speaker: 'note', text: '[звук борьбы]' },
            { speaker: 'other', text: 'Ты слишком много знаешь, Анна.' },
            { speaker: 'note', text: '[запись обрывается]' }
        ],
        note: 'ЗАПИСЬ ВОССТАНОВЛЕНА ИЗ ОБЛАЧНОГО ХРАНИЛИЩА. Дата последнего доступа: 9 мая, 00:13.'
    },
    {
        id: 'rec5',
        title: 'Звонок в полицию',
        date: '5 мая · 14:22',
        duration: '5:31',
        type: 'interrogation',
        locked: true,
        unlockAct: 2,
        icon: '🚔',
        transcription: [
            { speaker: 'other', text: 'Дежурная часть, слушаю.' },
            { speaker: 'anna', text: 'Здравствуйте, меня зовут Анна Воронина. Я хочу сообщить о преследовании.' },
            { speaker: 'other', text: 'Назовите ваш адрес.' },
            { speaker: 'anna', text: 'Улица Тихая, дом 7, квартира 14.' },
            { speaker: 'note', text: '[долгая пауза]' },
            { speaker: 'other', text: '...Вы сказали, дом семь?' },
            { speaker: 'anna', text: 'Да. А что такое?' },
            { speaker: 'other', text: 'Ничего. Примите заявление по телефону или приезжайте в отделение.' },
            { speaker: 'anna-nervous', text: 'Но... вы можете прислать кого-нибудь? Прямо сейчас?' },
            { speaker: 'other', text: 'Девушка, у нас нет свободных экипажей. Позвоните завтра.' },
            { speaker: 'note', text: '[короткие гудки]' }
        ],
        note: 'Номер дежурного совпадает с номером из списка контактов "Наблюдателя".'
    }
];

function buildDictaphone() {
    var view = document.getElementById('dictaphone');
    if (!view) return;
    
    var list = view.querySelector('.dictaphone-list');
    var detail = view.querySelector('.dictaphone-detail');
    
    if (list) list.style.display = 'block';
    if (detail) detail.style.display = 'none';
    
    if (!list) return;
    
    // Проверяем условия разблокировки
    for (var i = 0; i < DICTAHONE_DATA.length; i++) {
        var rec = DICTAHONE_DATA[i];
        if (rec.unlockAct && G.act >= rec.unlockAct) {
            rec.locked = false;
        }
    }
    
    var html = '';
    for (var ri = 0; ri < DICTAHONE_DATA.length; ri++) {
        var rec = DICTAHONE_DATA[ri];
        var isLocked = rec.locked && G.act < (rec.unlockAct || 999);
        
        html += '<div class="record-item ' + (isLocked ? 'locked' : '') + '" onclick="' + (isLocked ? "showToast('🔒 Запись заблокирована', 'Диктофон')" : "openDictaphoneRecording('" + rec.id + "')") + '">' +
            '<div class="record-header">' +
                '<div class="record-icon ' + rec.type + '">' + rec.icon + '</div>' +
                '<div class="record-meta">' +
                    '<div class="record-title">' + (isLocked ? '🔒 Заблокировано' : rec.title) + '</div>' +
                    '<div class="record-date">' + rec.date + '</div>' +
                '</div>' +
                '<div class="record-duration">' + rec.duration + '</div>' +
            '</div>' +
            (!isLocked ? '<div class="record-preview">' + rec.transcription[0].text.substring(0, 70) + '...</div>' : '') +
        '</div>';
    }
    
    list.innerHTML = html;
}

function openDictaphoneRecording(id) {
    var rec = null;
    for (var i = 0; i < DICTAHONE_DATA.length; i++) {
        if (DICTAHONE_DATA[i].id === id) {
            rec = DICTAHONE_DATA[i];
            break;
        }
    }
    
    if (!rec || rec.locked) return;
    
    var view = document.getElementById('dictaphone');
    if (!view) return;
    
    var list = view.querySelector('.dictaphone-list');
    var detail = view.querySelector('.dictaphone-detail');
    
    if (list) list.style.display = 'none';
    if (detail) {
        detail.style.display = 'block';
        detail.className = 'dictaphone-detail show';
        
        var transcriptionHtml = '';
        for (var ti = 0; ti < rec.transcription.length; ti++) {
            var line = rec.transcription[ti];
            if (line.speaker === 'note') {
                transcriptionHtml += '<div class="transcription-line note">' + line.text + '</div>';
            } else {
                transcriptionHtml += '<div class="transcription-line ' + line.speaker + '">' + line.text + '</div>';
            }
        }
        
        detail.innerHTML = 
            '<div class="detail-header">' +
                '<div class="detail-play-btn" onclick="simulateDictaphonePlayback(this, \'' + rec.id + '\')">▶</div>' +
                '<div class="detail-info">' +
                    '<div class="detail-title">' + rec.title + '</div>' +
                    '<div class="detail-subtitle">' + rec.date + ' · ' + rec.duration + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="transcription-container">' +
                transcriptionHtml +
                (rec.note ? '<div class="transcription-note">📌 ' + rec.note + '</div>' : '') +
            '</div>' +
            '<button class="btn-secondary" onclick="buildDictaphone()" style="margin-top:16px;width:100%;">← Назад к записям</button>';
    }
}

function simulateDictaphonePlayback(btn, id) {
    if (!btn) return;
    
    if (btn.classList.contains('playing')) {
        btn.classList.remove('playing');
        btn.textContent = '▶';
        var allLines = document.querySelectorAll('#dictaphone .transcription-line');
        for (var li = 0; li < allLines.length; li++) {
            allLines[li].style.background = '';
        }
        return;
    }
    
    btn.classList.add('playing');
    btn.textContent = '⏸';
    
    var rec = null;
    for (var ri = 0; ri < DICTAHONE_DATA.length; ri++) {
        if (DICTAHONE_DATA[ri].id === id) {
            rec = DICTAHONE_DATA[ri];
            break;
        }
    }
    
    // БАГ #14 ИСПРАВЛЕН: проверка на rec
    if (!rec) {
        btn.classList.remove('playing');
        btn.textContent = '▶';
        return;
    }
    
    var durMatch = rec.duration.match(/(\d+):(\d+)/);
    var totalSecs = durMatch ? parseInt(durMatch[1]) * 60 + parseInt(durMatch[2]) : 60;
    
    var detail = btn.closest('.dictaphone-detail');
    var lines = detail ? detail.querySelectorAll('.transcription-line') : [];
    
    var index = 0;
    var interval = (totalSecs * 1000) / Math.max(lines.length, 1);
    
    function highlightNext() {
        if (index > 0 && lines[index - 1]) {
            lines[index - 1].style.background = '';
        }
        if (index < lines.length) {
            lines[index].style.background = 'rgba(124, 92, 252, 0.1)';
            lines[index].style.borderRadius = '4px';
            index++;
            setTimeout(highlightNext, interval);
        } else {
            btn.classList.remove('playing');
            btn.textContent = '▶';
        }
    }
    
    highlightNext();
}

// ═══════════════════════════════════════════════════════════════
// 38. КАРТА — ИСПРАВЛЕНА
// ═══════════════════════════════════════════════════════════════

var MAP_LOCATIONS = [
    { id: 'home', x: 45, y: 55, type: 'home', label: 'Дом Анны', desc: 'Улица Тихая, дом 7. Здесь живёт Анна Воронина. Последняя активность: сегодня.', distance: '0 м' },
    { id: 'station', x: 72, y: 30, type: 'investigation', label: 'Полицейский участок', desc: 'Отделение №4. Анна обращалась сюда три раза. Все заявления были отклонены.', distance: '2.3 км' },
    { id: 'library', x: 25, y: 40, type: 'investigation', label: 'Библиотека', desc: 'Здесь Анна нашла старые газеты об исчезновениях. Была здесь 8 мая.', distance: '1.1 км' },
    { id: 'katya', x: 60, y: 70, type: 'home', label: 'Дом Кати', desc: 'Лучшая подруга Анны. Последний раз выходила на связь 7 мая.', distance: '0.8 км' },
    { id: 'danger1', x: 35, y: 25, type: 'danger', label: 'Заброшенный склад', desc: 'Место, где нашли улики по делу Стрельникова. Следы взлома свежие.', distance: '1.7 км' },
    { id: 'danger2', x: 80, y: 60, type: 'danger', label: 'Последний сигнал', desc: 'Последнее известное местоположение телефона Анны. 9 мая, 00:13.', distance: '3.4 км' },
    { id: 'unknown', x: 55, y: 15, type: 'unknown', label: '???', desc: 'Неизвестная точка. Появилась после звонка в полицию.', distance: '2.8 км', locked: true }
];

function buildMap() {
    var mapView = document.getElementById('map');
    if (!mapView) return;
    
    var body = mapView.querySelector('.map-body');
    if (!body) return;
    
    // Разблокируем неизвестную точку в Акте 3
    for (var mi = 0; mi < MAP_LOCATIONS.length; mi++) {
        if (MAP_LOCATIONS[mi].id === 'unknown' && G.act >= 3) {
            MAP_LOCATIONS[mi].locked = false;
        }
    }
    
    var locationsHtml = '';
    for (var li = 0; li < MAP_LOCATIONS.length; li++) {
        var loc = MAP_LOCATIONS[li];
        var isLocked = loc.locked || (loc.id === 'unknown' && G.act < 3);
        var clickAction = isLocked ? "showToast('📍 Точка ещё не открыта', 'Карта')" : "showMapInfo('" + loc.id + "')";
        var styleAttr = isLocked ? 'opacity:0.3;filter:grayscale(0.8);' : '';
        
        locationsHtml += '<div class="map-location" style="left:' + loc.x + '%;top:' + loc.y + '%;' + styleAttr + '" onclick="' + clickAction + '">' +
            '<div class="map-dot ' + loc.type + '">' +
                '<div class="map-dot-ripple"></div>' +
            '</div>' +
            '<div class="map-label">' + (isLocked ? '???' : loc.label) + '</div>' +
        '</div>';
    }
    
    body.innerHTML = 
        '<div class="map-container" id="mapContainer">' +
            '<div class="map-grid-overlay"></div>' +
            locationsHtml +
            '<svg class="map-route-line" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">' +
                '<line x1="45%" y1="55%" x2="80%" y2="60%" stroke="rgba(255,58,112,0.3)" stroke-width="2" stroke-dasharray="8 4"/>' +
                '<line x1="45%" y1="55%" x2="72%" y2="30%" stroke="rgba(124,92,252,0.2)" stroke-width="1.5" stroke-dasharray="6 3"/>' +
                '<line x1="45%" y1="55%" x2="25%" y2="40%" stroke="rgba(0,229,176,0.2)" stroke-width="1.5" stroke-dasharray="6 3"/>' +
                '<line x1="45%" y1="55%" x2="60%" y2="70%" stroke="rgba(255,184,48,0.2)" stroke-width="1.5" stroke-dasharray="6 3"/>' +
                '<line x1="35%" y1="25%" x2="80%" y2="60%" stroke="rgba(255,58,112,0.15)" stroke-width="1" stroke-dasharray="4 4"/>' +
            '</svg>' +
        '</div>' +
        '<div class="map-info-panel" id="mapInfoPanel"></div>';
}

function showMapInfo(id) {
    var loc = null;
    for (var i = 0; i < MAP_LOCATIONS.length; i++) {
        if (MAP_LOCATIONS[i].id === id) {
            loc = MAP_LOCATIONS[i];
            break;
        }
    }
    if (!loc || loc.locked) return;
    
    var panel = document.getElementById('mapInfoPanel');
    // БАГ #13 ИСПРАВЛЕН: проверка на panel
    if (!panel) return;
    
    panel.innerHTML = 
        '<div class="map-info-title">' + loc.label + '</div>' +
        '<div class="map-info-desc">' + loc.desc + '</div>' +
        '<div class="map-info-distance">📍 ' + loc.distance + ' от вашего местоположения</div>';
    panel.classList.add('show');
    
    setTimeout(function() {
        if (panel) panel.classList.remove('show');
    }, 8000);
}

// ═══════════════════════════════════════════════════════════════
// 39. КАЛЬКУЛЯТОР — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

function buildCalculator() {
    var view = document.getElementById('calculator');
    if (!view) return;
    
    var body = view.querySelector('.calc-body');
    if (!body) return;
    
    // БАГ #6 ИСПРАВЛЕН: проверка на PhoneCalculator
    if (typeof PhoneCalculator === 'undefined') {
        body.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);">Калькулятор загружается...</div>';
        return;
    }
    
    PhoneCalculator.init();
    
    body.innerHTML = 
        '<div class="calc-display" style="background:var(--depth);border:1px solid var(--b0);border-radius:24px;padding:20px;text-align:right;margin-bottom:16px;min-height:100px;display:flex;flex-direction:column;justify-content:flex-end;">' +
            '<div class="calc-result" id="calcResult" style="font-family:var(--fh);font-size:48px;font-weight:700;color:var(--t0);word-break:break-all;">0</div>' +
        '</div>' +
        '<div class="calc-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 4px;">' +
            '<button onclick="PhoneCalculator.reset()" style="grid-column:span 2;background:rgba(255,58,112,0.2);border:1px solid rgba(255,58,112,0.3);color:var(--crimson);font-family:var(--fh);font-size:20px;font-weight:700;border-radius:18px;cursor:pointer;transition:all 0.15s ease;">C</button>' +
            '<button onclick="PhoneCalculator.handleOperator(\'÷\')" style="background:rgba(124,92,252,0.2);border:1px solid rgba(124,92,252,0.3);color:var(--violet);font-family:var(--fh);font-size:20px;font-weight:700;border-radius:18px;cursor:pointer;transition:all 0.15s ease;">÷</button>' +
            '<button onclick="PhoneCalculator.handleOperator(\'×\')" style="background:rgba(124,92,252,0.2);border:1px solid rgba(124,92,252,0.3);color:var(--violet);font-family:var(--fh);font-size:20px;font-weight:700;border-radius:18px;cursor:pointer;transition:all 0.15s ease;">×</button>' +
            '<button onclick="PhoneCalculator.inputDigit(7)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">7</button>' +
            '<button onclick="PhoneCalculator.inputDigit(8)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">8</button>' +
            '<button onclick="PhoneCalculator.inputDigit(9)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">9</button>' +
            '<button onclick="PhoneCalculator.handleOperator(\'-\')" style="background:rgba(124,92,252,0.2);border:1px solid rgba(124,92,252,0.3);color:var(--violet);font-family:var(--fh);font-size:20px;font-weight:700;border-radius:18px;cursor:pointer;transition:all 0.15s ease;">−</button>' +
            '<button onclick="PhoneCalculator.inputDigit(4)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">4</button>' +
            '<button onclick="PhoneCalculator.inputDigit(5)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">5</button>' +
            '<button onclick="PhoneCalculator.inputDigit(6)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">6</button>' +
            '<button onclick="PhoneCalculator.handleOperator(\'+\')" style="background:rgba(124,92,252,0.2);border:1px solid rgba(124,92,252,0.3);color:var(--violet);font-family:var(--fh);font-size:20px;font-weight:700;border-radius:18px;cursor:pointer;transition:all 0.15s ease;">+</button>' +
            '<button onclick="PhoneCalculator.inputDigit(1)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">1</button>' +
            '<button onclick="PhoneCalculator.inputDigit(2)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">2</button>' +
            '<button onclick="PhoneCalculator.inputDigit(3)" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">3</button>' +
            '<button onclick="PhoneCalculator.handleOperator(\'=\')" style="background:var(--violet);border-color:var(--violet);color:#fff;font-family:var(--fh);font-size:28px;font-weight:700;border-radius:18px;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">=</button>' +
            '<button onclick="PhoneCalculator.inputDigit(0)" style="grid-column:span 2;aspect-ratio:2/1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">0</button>' +
            '<button onclick="PhoneCalculator.inputDecimal()" style="aspect-ratio:1;border-radius:18px;border:1px solid var(--b0);background:var(--surface);color:var(--t1);font-family:var(--fh);font-size:22px;font-weight:600;cursor:pointer;transition:all 0.15s ease;display:flex;align-items:center;justify-content:center;">.</button>' +
        '</div>' +
        '<div class="calc-secret-hint' + (G.act >= 2 || PhoneCalculator.secretAttempts >= 3 ? ' visible' : '') + '" id="calcHint" style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);text-align:center;margin-top:16px;opacity:0;transition:opacity 2s;">' +
            (PhoneCalculator.secretUnlocked ? '✓ РАЗБЛОКИРОВАН' : 'Код: 2305') +
        '</div>';
    
    // Добавляем эффект нажатия для кнопок
    var buttons = body.querySelectorAll('.calc-grid button');
    for (var bi = 0; bi < buttons.length; bi++) {
        (function(btn) {
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.92)';
            });
            btn.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        })(buttons[bi]);
    }
}

// ═══════════════════════════════════════════════════════════════
// 40. ДОСКА РАССЛЕДОВАНИЯ — ИСПРАВЛЕНА
// ═══════════════════════════════════════════════════════════════

function buildInvestigationBoard() {
    var view = document.getElementById('investigation');
    if (!view) return;
    
    var body = view.querySelector('.investigation-body');
    if (!body) return;
    
    // БАГ #7 ИСПРАВЛЕН: проверка на ClueSystem
    if (typeof ClueSystem === 'undefined') {
        body.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);">Система улик загружается...</div>';
        return;
    }
    
    var foundClues = ClueSystem.getFoundCount();
    var totalClues = ClueSystem.clues.length;
    var criticalFound = ClueSystem.getCriticalFound();
    var totalCritical = 0;
    for (var ci = 0; ci < ClueSystem.clues.length; ci++) {
        if (ClueSystem.clues[ci].critical) totalCritical++;
    }
    
    var html = '';
    html += '<div style="font-family:var(--fh);font-size:12px;font-weight:700;color:var(--t0);margin-bottom:8px;">🕵️ ДОСКА РАССЛЕДОВАНИЯ</div>';
    html += '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);margin-bottom:16px;">Найдено улик: ' + foundClues + '/' + totalClues + ' · Критических: ' + criticalFound + '/' + totalCritical + '</div>';
    html += '<div style="height:4px;background:var(--depth);border-radius:2px;margin-bottom:16px;overflow:hidden;">' +
        '<div style="height:100%;width:' + ((foundClues/totalClues)*100) + '%;background:linear-gradient(90deg,var(--violet),var(--teal));border-radius:2px;transition:width 0.5s ease;"></div>' +
    '</div>';
    
    for (var cli = 0; cli < ClueSystem.clues.length; cli++) {
        var clue = ClueSystem.clues[cli];
        var escapedDesc = escapeHTML(clue.desc);
        
        html += '<div class="clue-card' + (clue.found ? ' found' : '') + (clue.critical ? ' critical' : '') + '" onclick="' + (clue.found ? "showToast('" + escapedDesc + "', '" + escapeHTML(clue.title) + "')" : "showToast('🔒 Улика ещё не найдена', 'Расследование')") + '">' +
            '<div class="clue-header">' +
                '<div class="clue-icon" style="background:' + (clue.found ? 'rgba(0,229,176,0.15)' : 'rgba(255,255,255,0.03)') + '">' + clue.icon + '</div>' +
                '<div class="clue-title">' + (clue.found ? clue.title : '???') + '</div>' +
                (clue.critical ? '<span style="font-family:var(--fm);font-size:7px;color:var(--crimson);background:rgba(255,58,112,0.1);padding:2px 6px;border-radius:4px;border:1px solid rgba(255,58,112,0.2);">КРИТИЧЕСКАЯ</span>' : '') +
            '</div>' +
            (clue.found ? '<div class="clue-desc">' + clue.desc + '</div>' : '<div class="clue-desc" style="color:var(--text-tertiary);font-style:italic;">Не обнаружено</div>') +
            '<div class="clue-status' + (clue.found ? ' found' : '') + '">' + (clue.found ? '✓ Найдено' : '○ Не найдено') + '</div>' +
        '</div>';
    }
    
    // Связи между уликами
    if (foundClues >= 4) {
        html += '<div class="board-connections"><strong>📊 СВЯЗИ:</strong><br>';
        for (var ci2 = 0; ci2 < ClueSystem.clues.length; ci2++) {
            var c = ClueSystem.clues[ci2];
            if (!c.found) continue;
            var connections = ClueSystem.getConnections(c.id);
            var foundConnections = [];
            for (var ci3 = 0; ci3 < connections.length; ci3++) {
                if (connections[ci3] && connections[ci3].found) {
                    foundConnections.push(connections[ci3].title);
                }
            }
            if (foundConnections.length > 0) {
                html += '• ' + c.title + ' → ' + foundConnections.join(', ') + '<br>';
            }
        }
        html += 'Продолжайте расследование, чтобы раскрыть полную картину.</div>';
    }
    
    body.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// 41. ДНЕВНИК АННЫ — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

function buildDiary() {
    var view = document.getElementById('diary');
    if (!view) return;
    
    var body = view.querySelector('.diary-body');
    if (!body) return;
    
    // БАГ #8 ИСПРАВЛЕН: проверка на DiaryData
    if (typeof DiaryData === 'undefined') {
        body.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);">Дневник загружается...</div>';
        return;
    }
    
    // БАГ #10 ИСПРАВЛЕН: начисляем XP только при первом открытии
    if (!G.diaryRead && G.act >= 2) {
        G.diaryRead = true;
        ReputationSystem.addXP('diary_read');
        AchievementSystem.check('diary_fan');
    }
    
    var html = '';
    for (var di = 0; di < DiaryData.length; di++) {
        var entry = DiaryData[di];
        var isLocked = entry.locked && (!entry.unlockAct || G.act < entry.unlockAct);
        var isUnlocked = !isLocked && (G.diaryUnlocked.includes(entry.id) || !entry.locked);
        
        var clickAction = isLocked ? "showToast('🔒 Запись заблокирована', 'Дневник')" : (isUnlocked ? "showDiaryEntry('" + entry.id + "')" : "showToast('🔒 Запись ещё не открыта', 'Дневник')");
        
        html += '<div class="diary-entry' + (isLocked ? ' locked' : '') + '" onclick="' + clickAction + '">' +
            '<div class="diary-mood">' + (isLocked ? '🔒' : entry.mood) + '</div>' +
            '<div class="diary-date">' + entry.date + '</div>' +
            '<div class="diary-title">' + (isLocked ? 'ЗАБЛОКИРОВАНО' : entry.title) + '</div>' +
            '<div class="diary-text">' + (isLocked ? 'Эта запись станет доступна позже по сюжету.' : entry.text) + '</div>' +
        '</div>';
    }
    
    body.innerHTML = html;
}

function showDiaryEntry(id) {
    if (typeof DiaryData === 'undefined') return;
    
    var entry = null;
    for (var i = 0; i < DiaryData.length; i++) {
        if (DiaryData[i].id === id) {
            entry = DiaryData[i];
            break;
        }
    }
    if (!entry || entry.locked) return;
    
    showToast(entry.text, '📔 ' + entry.title);
}

// ═══════════════════════════════════════════════════════════════
// 42. КОЛЛЕКЦИЯ КОНЦОВОК — ИСПРАВЛЕНА
// ═══════════════════════════════════════════════════════════════

function showEndingsCollection() {
    var body = document.getElementById('endingsBody');
    if (!body) return;
    
    // БАГ #9 ИСПРАВЛЕН: проверка на EndingsSystem
    var unlocked = (typeof EndingsSystem !== 'undefined') ? EndingsSystem.getUnlockedCount() : 0;
    var total = (typeof EndingsSystem !== 'undefined') ? EndingsSystem.getTotalCount() : 8;
    
    var html = '';
    html += '<div class="endings-progress">🏆 Открыто концовок: ' + unlocked + '/' + total;
    html += '<div style="height:4px;background:var(--depth);border-radius:2px;margin-top:8px;overflow:hidden;">' +
        '<div style="height:100%;width:' + ((unlocked/total)*100) + '%;background:linear-gradient(90deg,var(--gold),var(--teal));border-radius:2px;transition:width 0.5s ease;"></div>' +
    '</div></div>';
    
    if (typeof EndingsSystem !== 'undefined') {
        var endings = EndingsSystem.getAllEndings();
        var endKeys = Object.keys(endings);
        for (var ei = 0; ei < endKeys.length; ei++) {
            var ending = endings[endKeys[ei]];
            html += '<div class="diary-entry" style="' + (ending.unlocked ? '' : 'opacity:0.4;') + '">' +
                '<div class="diary-mood">' + (ending.unlocked ? ending.icon : '🔒') + '</div>' +
                '<div class="diary-title">' + (ending.unlocked ? ending.name : '???') + '</div>' +
                '<div class="diary-text">' + (ending.unlocked ? ending.desc : 'Эта концовка ещё не открыта.') + '</div>' +
                (ending.unlocked ? '<span class="ending-badge unlocked">✅ ОТКРЫТО</span>' : '<span class="ending-badge locked">🔒 ЗАКРЫТО</span>') +
                (ending.unlocked ? '<div style="font-family:var(--fm);font-size:8px;color:var(--text-tertiary);margin-top:4px;">ID: ' + endKeys[ei] + '</div>' : '') +
            '</div>';
        }
    } else {
        html += '<div style="padding:20px;text-align:center;color:var(--text-tertiary);">Система концовок загружается...</div>';
    }
    
    body.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// 43. МАГАЗИН ПРИЛОЖЕНИЙ — ИСПРАВЛЕН
// ═══════════════════════════════════════════════════════════════

function buildAppStore() {
    var body = document.getElementById('appstoreBody');
    if (!body) return;
    
    // БАГ #10 ИСПРАВЛЕН: проверка на AppStore
    if (typeof AppStore === 'undefined') {
        body.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);">Магазин загружается...</div>';
        return;
    }
    
    var lockedApps = AppStore.getLockedApps();
    var installedApps = AppStore.getAvailableApps();
    var totalApps = Object.keys(AppStore.apps).length;
    
    var html = '';
    html += '<div class="appstore-header">🏪 ' + t('app_store') + '</div>';
    html += '<div class="appstore-subtitle">' + installedApps.length + ' / ' + totalApps + ' приложений установлено</div>';
    
    if (lockedApps.length === 0) {
        html += '<div style="text-align:center;padding:40px 20px;background:var(--surface);border-radius:20px;border:1px solid var(--border-color);">' +
            '<div style="font-size:48px;margin-bottom:12px;">🎉</div>' +
            '<div style="font-family:var(--fh);font-size:16px;font-weight:700;color:var(--t0);">Все приложения установлены!</div>' +
            '<div style="font-family:var(--fm);font-size:10px;color:var(--text-tertiary);margin-top:8px;">Вы разблокировали все доступные приложения.</div>' +
        '</div>';
    } else {
        html += '<div style="font-family:var(--fh);font-size:10px;font-weight:700;color:var(--violet);letter-spacing:2px;margin:12px 0 8px;">📦 ДОСТУПНЫ ДЛЯ УСТАНОВКИ</div>';
        
        for (var la = 0; la < lockedApps.length; la++) {
            var app = lockedApps[la];
            var iconBg = app.gradient || 'linear-gradient(140deg,#1a1a2e,#2a2a4e)';
            html += '<div class="appstore-item locked">' +
                '<div class="appstore-item-icon" style="background:' + iconBg + ';">' + app.icon + '</div>' +
                '<div class="appstore-item-info">' +
                    '<div class="appstore-item-name">' + app.name + '</div>' +
                    '<div class="appstore-item-desc">' + (app.category || 'Приложение') + '</div>' +
                '</div>' +
                '<div class="appstore-item-btn get" onclick="showToast(\'🔒 Разблокируется по сюжету\', \'Магазин\')">УСТАНОВИТЬ</div>' +
            '</div>';
        }
        
        html += '<div style="font-family:var(--fh);font-size:10px;font-weight:700;color:var(--teal);letter-spacing:2px;margin:20px 0 8px;">✅ УСТАНОВЛЕНЫ</div>';
        
        var allApps = AppStore.apps;
        var appKeys = Object.keys(allApps);
        for (var ai = 0; ai < appKeys.length; ai++) {
            var app = allApps[appKeys[ai]];
            if (app.unlocked) {
                var iconBg2 = app.gradient || 'linear-gradient(140deg,#1a1a2e,#2a2a4e)';
                html += '<div class="appstore-item installed" style="opacity:0.7;">' +
                    '<div class="appstore-item-icon" style="background:' + iconBg2 + ';">' + app.icon + '</div>' +
                    '<div class="appstore-item-info">' +
                        '<div class="appstore-item-name">' + app.name + '</div>' +
                        '<div class="appstore-item-desc">' + (app.category || 'Приложение') + ' · Установлено</div>' +
                    '</div>' +
                    '<div class="appstore-item-btn installed">✅</div>' +
                '</div>';
            }
        }
    }
    
    html += '<div style="margin-top:20px;padding:16px;background:var(--depth);border-radius:16px;border:1px solid var(--border-color);">' +
        '<div style="font-family:var(--fm);font-size:9px;color:var(--text-tertiary);text-align:center;line-height:1.8;">' +
            '💡 Некоторые приложения разблокируются по ходу сюжета.<br>' +
            'Продолжайте играть, чтобы открыть новые возможности!' +
        '</div>' +
    '</div>';
    
    body.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// 44. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ═══════════════════════════════════════════════════════════════

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

console.log('✅ НЕЗНАКОМКА v8.0 — Часть 4 (Рендеринг) загружена');
console.log('🖼️ Галерея: ' + GALLERY_DATA.length + ' фото');
console.log('🌐 Браузер: ' + BROWSER_ARTICLES.length + ' статей');
console.log('👥 Контактов: ' + (typeof CONTACTS_DATA !== 'undefined' ? CONTACTS_DATA.length : 0));
console.log('📝 Заметок: ' + NOTES_DATA.length);
console.log('🎙️ Записей диктофона: ' + DICTAHONE_DATA.length);
console.log('📍 Точек на карте: ' + MAP_LOCATIONS.length);
console.log('📔 Записей дневника: ' + (typeof DiaryData !== 'undefined' ? DiaryData.length : 0));
console.log('🏪 Приложений в магазине: ' + (typeof AppStore !== 'undefined' ? Object.keys(AppStore.apps).length : 0));
console.log('✅ Все баги Части 4 исправлены');
/* ═══════════════════════════════════════════════════════════════
   НЕЗНАКОМКА v8.0 — ПОЛНЫЙ JAVASCRIPT
   Часть 5 из 5: Сюжет (Акты I, II, III),
   Концовки, Админ-панель,
   Финальная инициализация
   ВСЕ БАГИ ИСПРАВЛЕНЫ
═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 45. ВРЕМЕННЫЕ СООБЩЕНИЯ ДЛЯ СЮЖЕТА
// ═══════════════════════════════════════════════════════════════

var TimeMessages = {
    lateNight: [
        'Я не могу спать... снова эти звуки за окном.',
        'Прости, что так поздно. Мне просто нужно с кем-то поговорить.',
        'Ты тоже не спишь? Мне кажется, я схожу с ума.',
        'В три часа ночи всегда самое страшное время...',
        'Слышишь? Этот скрип. Он снова здесь.',
        'Я боюсь закрыть глаза. Вдруг я не проснусь?',
        'Ночью все звуки кажутся громче. Даже собственное сердце.',
        'Посмотри в окно. Видишь тот фонарь? Он мигает уже час.'
    ],
    deepNight: [
        'Три часа ночи. Говорят, это время демонов.',
        'Я слышала шаги на лестнице. Сейчас. Только что.',
        'Не спишь? Мне страшно. Очень страшно.',
        'Кто-то пробовал открыть дверь. Я слышала, как скрипнула ручка.',
        'Тишина... слишком тихо. Даже собаки не лают.',
        'Мне кажется, я видела тень в коридоре.',
        'В это время суток реальность и кошмар сливаются.'
    ],
    earlyMorning: [
        'Кажется, всё стихло. Может быть, сегодня будет спокойно.',
        'Я задремала на полчаса. Приснился кошмар.',
        'Солнце скоро встанет. При свете всегда легче.',
        'Кофе? Я бы сейчас выпила литр кофе.',
        'Птицы начинают петь. Это хороший знак, правда?',
        'Ещё немного — и ночь закончится. Я дожила до утра.'
    ],
    morning: [
        'Доброе утро. Я проверила дверь — всё на месте.',
        'Мне нужно на учёбу. Напишу позже.',
        'При свете дня всё кажется глупым. Может, я просто параноик?',
        'Спасибо, что был(а) со мной этой ночью.',
        'Я попробую вести себя нормально сегодня.',
        'На лекции. Профессор рассказывает про криминальную журналистику. Ирония.'
    ],
    day: [
        'Я в библиотеке. Здесь безопасно. Много людей.',
        'Нашла кое-что интересное про дом 7.',
        'Обедаю. Аппетита нет, но надо есть.',
        'Позвонила Кате. Она говорит, я преувеличиваю.',
        'Днём этот район выглядит почти нормально.',
        'Проверила новости. Ничего подозрительного. Пока.'
    ],
    evening: [
        'Солнце садится. Я чувствую, как страх возвращается.',
        'Пора домой. Не хочу идти одна.',
        'Снова этот вечер. Каждый раз как приговор.',
        'Стемнеет через час. Я уже начинаю нервничать.',
        'На улице тихо. Слишком тихо для вечера.',
        'Я купила новый замок. Надеюсь, поможет.'
    ],
    earlyNight: [
        'Уже темно. Я слышу те же звуки, что и вчера.',
        'Сижу дома. Все двери заперты.',
        'Катя не отвечает. Надеюсь, с ней всё в порядке.',
        'Он знает, что я дома. Я уверена.',
        'Соседи говорят, я всё придумываю. Но я не сумасшедшая.'
    ],

    getMessage: function() {
        var h = GameTime.hour;
        var pool;
        if (h >= 23 || h < 2) pool = this.lateNight;
        else if (h >= 2 && h < 5) pool = this.deepNight;
        else if (h >= 5 && h < 8) pool = this.earlyMorning;
        else if (h >= 8 && h < 12) pool = this.morning;
        else if (h >= 12 && h < 17) pool = this.day;
        else if (h >= 17 && h < 20) pool = this.evening;
        else pool = this.earlyNight;
        return pool[Math.floor(Math.random() * pool.length)];
    },

    getMood: function() {
        var h = GameTime.hour;
        if (h >= 2 && h < 5) return 'terrified';
        if (h >= 23 || h < 2) return 'scared';
        if (h >= 5 && h < 8) return 'relieved';
        if (h >= 8 && h < 17) return 'calm';
        if (h >= 17 && h < 20) return 'anxious';
        return 'worried';
    }
};

// ═══════════════════════════════════════════════════════════════
// 46. УТРЕННИЙ ДИАЛОГ
// ═══════════════════════════════════════════════════════════════

function triggerMorningDialogue() {
    if (G._morningTriggered) return;
    G._morningTriggered = true;
    
    setTimeout(function() {
        setContactStatus(t('online'), 'online');
        
        annaTyping(2000, { mood: 'relieved', fear: 20 }).then(function() {
            addMessage('in', 'Доброе утро! Я дожила до рассвета.', { id: 'morning_1' });
            GameTime.advance(2);
            return sleep(1000);
        }).then(function() {
            addMessage('in', 'Спасибо, что был(а) со мной этой ночью. Правда.', { id: 'morning_2' });
            GameTime.advance(1);
            return sleep(800);
        }).then(function() {
            addMessage('in', 'Мне нужно на учёбу. Но я напишу позже.', { id: 'morning_3' });
            setContactStatus(t('was_online'), '');
            addChatSystem('Анна ушла на учёбу · ' + GameTime.getTimeString());
        });
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// 47. АКТ I — ПЕРВЫЙ КОНТАКТ
// ═══════════════════════════════════════════════════════════════

function startGame() {
    G.act = 1;
    G._morningTriggered = false;
    GameTime.setTime(9, 11, 23, 41);
    GameTime.pause();
    clearChat();

    sleep(800).then(function() {
        addChatDivider('9 ноября · 23:41');
        showNotif('Zapregram', t('lock_notif'), 500);
        return sleep(2000);
    }).then(function() {
        GameTime.resume();
        setContactStatus(t('online'), 'online');
        return annaTyping(3200, {
            mood: 'scared',
            fear: 45,
            hesitation: 30,
            previewText: 'Прив...'
        });
    }).then(function() {
        addMessage('in', t('act1_msg1'), { id: 'msg1_1' });
        GameTime.advance(2);
        return sleep(1200);
    }).then(function() {
        return annaTyping(2500, { mood: 'worried', fear: 35, hesitation: 25 });
    }).then(function() {
        addMessage('in', t('act1_msg2'), { id: 'msg1_2' });
        GameTime.advance(1);
        return sleep(800);
    }).then(function() {
        showChoices([
            { id: 'a1_no', txt: t('act1_choice1'), p: { trust: +5, courage: +3 }, next: act1_s2 },
            { id: 'a1_yes', txt: t('act1_choice2'), p: { trust: -5, dependency: +5, guilt: +8 }, next: act1_s2 },
            { id: 'a1_silent', txt: t('act1_choice3'), dng: true, p: { trust: -12, stress: +10, guilt: +15 }, next: act1_s2 }
        ]);
    });
}

function act1_s2() {
    GameTime.advance(5);

    annaTyping(3800, {
        mood: 'terrified',
        fear: 70,
        hesitation: 50,
        previewText: 'Я не зн...'
    }).then(function() {
        addMessage('in', 'Происходят очень странные вещи. Уже несколько дней кто-то следит за мной.', { id: 'msg1_3' });
        GameTime.advance(3);
        return sleep(1000);
    }).then(function() {
        addMessage('in', '', {
            type: 'image',
            icon: '📷',
            imgLabel: 'Снято автоматически в ' + GameTime.getTimeString(),
            timestamp: GameTime.getDateString(),
            id: 'msg1_4'
        });
        GameTime.advance(2);
        return sleep(1500);
    }).then(function() {
        return addPause('Анна ждёт ответа...', 1800);
    }).then(function() {
        return annaTyping(2000, { mood: 'scared', fear: 60 });
    }).then(function() {
        addMessage('in', 'Видишь кого-то сзади на фото?', { id: 'msg1_5' });
        showChoices([
            { id: 'see', txt: 'Вижу силуэт. Ты в безопасности?', p: { trust: +14, fear: +12, courage: +10 }, next: act1_end },
            { id: 'shadow', txt: 'Нет, там просто тень.', p: { trust: +4, guilt: +6 }, next: act1_end }
        ]);
    });
}

function act1_end() {
    GameTime.advance(4);

    annaTyping(3000, { mood: 'scared', fear: 55 }).then(function() {
        addMessage('in', 'Меня зовут Анна. Анна Воронина.', { id: 'msg1_6' });
        GameTime.advance(2);
        return sleep(500);
    }).then(function() {
        setContactName('Анна В.');
        if (!G.galleryUnlocked.includes('g2')) {
            G.galleryUnlocked.push('g2');
        }
        addChatSystem('Контакт обновлён: Анна В.');
        setContactStatus(t('online'), 'online');
        ContentUnlockSystem.checkAndUnlock('act1_photo_sent');
        return sleep(3000);
    }).then(function() {
        return annaTyping(2500, { mood: 'terrified', fear: 80, hesitation: 60, previewText: 'Подож...' });
    }).then(function() {
        addMessage('in', '', {
            type: 'voice',
            duration: 22,
            mood: 'terrified',
            id: 'msg1_voice'
        });
        GameTime.advance(3);
        return sleep(2000);
    }).then(function() {
        deleteMessage('msg1_voice');
        addChatSystem('Анна удалила голосовое сообщение');
        ContentUnlockSystem.checkAndUnlock('act1_voice_sent');
        GameTime.jumpToNight();
        return sleep(4000);
    }).then(function() {
        setContactStatus(t('was_online'), '');
        addChatSystem('Анна перестала отвечать · ' + GameTime.getTimeString());
        return sleep(5000);
    }).then(function() {
        setContactStatus(t('online'), 'online');
        return annaTyping(2000, { mood: 'terrified', fear: 90 });
    }).then(function() {
        addMessage('in', 'Кажется, он здесь. Прямо сейчас.', {
            id: 'msg1_7',
            reaction: '😨'
        });
        GameTime.advance(2);
        return sleep(3000);
    }).then(function() {
        setContactStatus(t('was_online'), '');
        addChatSystem('Анна offline · ' + GameTime.getTimeString());
        ContentUnlockSystem.checkAndUnlock('act1_completed');
        showToast('История продолжается в Акте II...', t('system'));
        G._act1Done = true;
        setTimeout(function() {
            if (G._act1Done && G.act === 1 && !G.endingReached) {
                act2_enhanced_full();
            }
        }, 20000);
    });
}

// ═══════════════════════════════════════════════════════════════
// 48. АКТ II — НАРАСТАНИЕ УГРОЗЫ
// ═══════════════════════════════════════════════════════════════

function act2_enhanced_full() {
    if (G.act !== 1 && G.act !== 2) return; // защита от повторного вызова
    G.act = 2;
    G._act1Done = false;
    GameTime.jumpToNight();
    clearChat();

    WeatherSystem.forceWeather('rain', 60, 300);
    ContentUnlockSystem.checkAndUnlock('act2_started');

    addChatDivider();
    addChatSystem('Прошло два дня. Погода испортилась.');

    sleep(3000).then(function() {
        setContactStatus(t('online'), 'online');
        return annaTyping(4000, { mood: 'terrified', fear: 85, hesitation: 70 });
    }).then(function() {
        addMessage('in', WeatherSystem.getWeatherMessage(), { id: 'msg2_w1' });
        GameTime.advance(3);
        return sleep(1500);
    }).then(function() {
        return annaTyping(3000, { mood: 'scared', fear: 75 });
    }).then(function() {
        addMessage('in', 'Я пыталась уехать. Но он нашёл меня. Всегда находит.', {
            id: 'msg2_1',
            reaction: '😨'
        });
        ClueSystem.findClue('c1');
        ClueSystem.findClue('c2');
        GameTime.advance(5);
        return sleep(2000);
    }).then(function() {
        return addPause('Анна долго не отвечает...', 3000);
    }).then(function() {
        return annaTyping(3500, { mood: 'scared', fear: 70 });
    }).then(function() {
        addMessage('in', 'Я нашла кое-что в старых газетах. Три человека исчезли с улицы Тихой за последний год.', { id: 'msg2_3' });
        ClueSystem.findClue('c3');
        GameTime.advance(3);
        return sleep(1000);
    }).then(function() {
        addMessage('in', '', {
            type: 'image',
            icon: '📰',
            imgLabel: 'Вырезка из газеты · архив',
            timestamp: GameTime.getDateString(),
            id: 'msg2_photo'
        });
        return sleep(1500);
    }).then(function() {
        return annaTyping(4000, { mood: 'terrified', fear: 80, hesitation: 60 });
    }).then(function() {
        addMessage('in', 'Я боюсь, что стану четвёртой. Пожалуйста, помоги мне.', {
            id: 'msg2_4',
            reaction: '💔'
        });
        showChoices([
            { id: 'a2_protect', txt: 'Я тебя не оставлю. Мы справимся вместе.', p: { trust: +25, dependency: +10, courage: +15 }, next: act2_continue_full },
            { id: 'a2_police2', txt: 'Нужно передать это в полицию. Собери все доказательства.', p: { trust: +10, suspicion: +15 }, next: act2_continue_full },
            { id: 'a2_leave', txt: 'Уезжай. Прямо сейчас. Не жди.', p: { trust: +5, courage: +20 }, next: act2_continue_full }
        ]);
    });
}

function act2_continue_full() {
    GameTime.advance(10);
    WeatherSystem.forceWeather('storm', 80, 600);

    annaTyping(3000, { mood: 'scared', fear: 75 }).then(function() {
        addMessage('in', 'Спасибо... но я не могу просто уехать. Я должна узнать правду.', { id: 'msg2_5' });
        GameTime.advance(5);
        return sleep(2000);
    }).then(function() {
        addMessage('in', '', {
            type: 'voice',
            duration: 25,
            mood: 'terrified',
            id: 'msg2_voice3'
        });
        ClueSystem.findClue('c5');
        GameTime.advance(5);
        return sleep(3000);
    }).then(function() {
        setContactStatus(t('was_online'), '');
        addChatSystem('Анна offline · ' + GameTime.getTimeString());
        ContentUnlockSystem.checkAndUnlock('act2_completed');
        showToast('Расследование продолжается...', t('system'));
        setTimeout(act3_enhanced_full, 25000);
    });
}

// ═══════════════════════════════════════════════════════════════
// 49. АКТ III — РАССЛЕДОВАНИЕ И РАЗВЯЗКА
// ═══════════════════════════════════════════════════════════════

function act3_enhanced_full() {
    G.act = 3;
    GameTime.jumpToEvening();
    clearChat();

    WeatherSystem.forceWeather('fog', 70, 400);
    ContentUnlockSystem.checkAndUnlock('act3_started');

    addChatDivider();
    addChatSystem('Акт III: Расследование');

    sleep(3000).then(function() {
        setContactStatus(t('online'), 'online');
        return annaTyping(3500, { mood: 'anxious', fear: 60 });
    }).then(function() {
        addMessage('in', 'Я была в архиве. Нашла списки жильцов дома 7.', { id: 'msg3_1' });
        ClueSystem.findClue('c4');
        GameTime.advance(4);
        return sleep(1200);
    }).then(function() {
        return annaTyping(4000, { mood: 'scared', fear: 70, hesitation: 50 });
    }).then(function() {
        addMessage('in', 'Стрельников, Ивановы... и ещё одно имя. Засекречено.', { id: 'msg3_2' });
        GameTime.advance(3);
        return sleep(1000);
    }).then(function() {
        return annaTyping(3000, { mood: 'terrified', fear: 85 });
    }).then(function() {
        // БАГ #4 ИСПРАВЛЕН: проверка на дубли
        var galleryIds = ['g5', 'g10', 'g11'];
        for (var gi = 0; gi < galleryIds.length; gi++) {
            if (!G.galleryUnlocked.includes(galleryIds[gi])) {
                G.galleryUnlocked.push(galleryIds[gi]);
            }
        }
        addMessage('in', 'Я знаю, кто это. Он работает в полиции. Поэтому они ничего не нашли.', { id: 'msg3_3' });
        ClueSystem.findClue('c6');
        ClueSystem.findClue('c8');
        GameTime.advance(2);
        return sleep(1500);
    }).then(function() {
        WeatherSystem.forceWeather('storm', 90, 300);
        return addPause('Анна собирается с духом...', 2500);
    }).then(function() {
        return annaTyping(5000, {
            mood: 'terrified',
            fear: 95,
            hesitation: 90,
            previewText: 'Его зовут...'
        });
    }).then(function() {
        addMessage('in', 'Его фамилия Стрельников. Он родственник первой жертвы. И он мстит всем, кто живёт в этом доме.', {
            id: 'msg3_4',
            reaction: '😨'
        });
        G.killerKnown = true;
        G.truthRevealed = true;
        showChoices([
            { id: 'a3_call', txt: 'Звони 112! Это уже не шутки!', p: { trust: +10, courage: +20 }, next: function() { act3_ending_full('redemption'); } },
            { id: 'a3_hide', txt: 'Спрячься. Я еду к тебе.', p: { trust: +30, courage: +30, dependency: +20 }, next: function() { act3_ending_full('sacrifice'); } },
            { id: 'a3_evidence', txt: 'Отправь мне все доказательства. Я пойду в прокуратуру.', p: { trust: +20, courage: +25 }, next: function() { act3_ending_full('truth'); } }
        ]);
    });
}

function act3_ending_full(endingPath) {
    GameTime.jumpToNight();
    WeatherSystem.forceWeather('storm', 100, 600);

    sleep(2000).then(function() {
        if (endingPath === 'redemption') {
            return annaTyping(3000, { mood: 'terrified', fear: 90 }).then(function() {
                addMessage('in', 'Я вызвала полицию... но не местную. Федеральную. Они уже едут.', { id: 'msg3_e1' });
                GameTime.advance(5);
                return sleep(2000);
            }).then(function() {
                addMessage('in', 'Слышишь сирены? Это за мной? Или за ним?', { id: 'msg3_e2' });
            });
        } else if (endingPath === 'sacrifice') {
            return annaTyping(3000, { mood: 'terrified', fear: 95 }).then(function() {
                addMessage('in', 'Не приезжай! Он здесь! Он знает, что ты едешь!', { id: 'msg3_e1' });
                GameTime.advance(2);
                return sleep(1500);
            }).then(function() {
                addMessage('in', 'БЕГИ. ОН ВИДЕЛ НАШУ ПЕРЕПИСКУ.', { id: 'msg3_e2' });
            });
        } else {
            return annaTyping(3000, { mood: 'scared', fear: 80 }).then(function() {
                addMessage('in', 'Я отправила всё. Файлы, записи, фотографии.', { id: 'msg3_e1' });
                GameTime.advance(5);
                return sleep(2000);
            }).then(function() {
                addMessage('in', 'Если со мной что-то случится... ты знаешь, что делать.', { id: 'msg3_e2' });
            });
        }
    }).then(function() {
        // БАГ #7 ИСПРАВЛЕН: устанавливаем флаги ПОСЛЕ всех асинхронных операций
        if (endingPath === 'sacrifice') {
            G.annaAlive = false;
            P.courage = 100;
        } else {
            G.annaAlive = true;
        }
        
        GameTime.advance(3);
        return sleep(3000);
    }).then(function() {
        setContactStatus(t('was_online'), '');
        addChatSystem('Анна offline · ' + GameTime.getTimeString());
        return sleep(5000);
    }).then(function() {
        ContentUnlockSystem.checkAndUnlock('truth_revealed');
        var newEndings = EndingsSystem.checkEndings();
        
        if (newEndings.length > 0) {
            var lastEnding = newEndings[newEndings.length - 1];
            showEndingScreen(lastEnding.id);
        }
        
        G.endingReached = true;
        G.endingType = endingPath;
        AchievementSystem.check('diary_fan');
        AchievementSystem.checkAll();
    });
}

// ═══════════════════════════════════════════════════════════════
// 50. ПОКАЗ КОНЦОВКИ
// ═══════════════════════════════════════════════════════════════
function showEndingScreen(endingId) {
    if (typeof EndingsSystem === 'undefined') {
        showToast('Система концовок не загружена', 'Ошибка');
        return;
    }
    var actualId = endingId || G._lastEndingId;
    if (!actualId) {
        var keys = Object.keys(EndingsSystem.endings);
        for (var i = 0; i < keys.length; i++) {
            if (EndingsSystem.endings[keys[i]].unlocked) {
                actualId = keys[i];
                break;
            }
        }
    }
    
    var ending = EndingsSystem.getEndingById(actualId);
    if (!ending) return;

    var screen = document.createElement('div');
    screen.className = 'ending-screen';
    screen.innerHTML = 
        '<div class="ending-screen-icon">' + ending.icon + '</div>' +
        '<div class="ending-title">' + ending.name + '</div>' +
        '<div class="ending-sub">' + ending.desc + '</div>' +
        '<div style="font-family:var(--fm);font-size:10px;color:var(--text-tertiary);margin:12px 0;">' +
            'Концовка ' + (Object.keys(EndingsSystem.endings).indexOf(actualId) + 1) + ' из ' + EndingsSystem.getTotalCount() +
        '</div>' +
        '<div style="font-family:var(--fm);font-size:9px;color:var(--violet);">' +
            'Открыто: ' + EndingsSystem.getUnlockedCount() + '/' + EndingsSystem.getTotalCount() +
        '</div>' +
        '<button class="btn-primary" onclick="restartGame()">' + t('restart') + '</button>' +
        '<button class="btn-secondary" onclick="this.parentElement.remove();goHome()">' + t('close') + '</button>';

    var screenContainer = document.getElementById('screen');
    if (screenContainer) screenContainer.appendChild(screen);
}

// ═══════════════════════════════════════════════════════════════
// 51. ПЕРЕЗАПУСК ИГРЫ
// ═══════════════════════════════════════════════════════════════

function restartGame() {
    // БАГ #2 ИСПРАВЛЕН: сброс AppStore и ContentUnlockSystem
    if (typeof AppStore !== 'undefined') {
        // Сбрасываем только сюжетные приложения
        var appKeys = Object.keys(AppStore.apps);
        for (var i = 0; i < appKeys.length; i++) {
            var app = AppStore.apps[appKeys[i]];
            if (app.unlockCondition !== 'always') {
                app.unlocked = false;
            }
        }
        AppStore.save();
    }
    
    if (typeof ContentUnlockSystem !== 'undefined') {
        ContentUnlockSystem.unlockedContent = {
            gallery: [],
            dictaphone: [],
            diary: [],
            clues: [],
            notes: []
        };
        ContentUnlockSystem.save();
    }
    
    clearChat();
    document.querySelectorAll('.ending-screen').forEach(function(el) {
        el.remove();
    });
    
    G.act = 1;
    G.step = 0;
    G.gameStarted = false;
    G.endingReached = false;
    G.endingType = null;
    G._lastEndingId = null;
    G.annaAlive = true;
    G.truthRevealed = false;
    G.killerKnown = false;
    G.annaFirstContact = false;
    G.hackCompleted = false;
    G.diaryRead = false;
    G._morningTriggered = false;
    G._act1Done = false;
    G.choices = [];
    G.galleryUnlocked = ['g0', 'g1'];
    G.endingsUnlocked = new Set();
    G.notesUnlocked = [];
    G.diaryUnlocked = [];
    G.recordsUnlocked = [];
    G.cluesFound = [];
    G.contactsMet = [];
    G.appsInstalled = ['msg', 'contacts', 'gallery', 'browser', 'notes', 'settings', 'authors', 'camera', 'appstore'];
    G.lastMsgId = 0;
    G.msgHistory = [];
    G.choices = [];
    G.chatLocked = false;
    G.choiceMade = false;
    G.waitingForReply = false;
    G.isTyping = false;
    G._lastResponseContext = '';
    
    resetP();
    
    if (typeof ClueSystem !== 'undefined') {
        ClueSystem.clues.forEach(function(c) {
            c.found = false;
        });
        ClueSystem.save();
    }
    
    if (typeof EndingsSystem !== 'undefined') {
        var endKeys = Object.keys(EndingsSystem.endings);
        for (var ei = 0; ei < endKeys.length; ei++) {
            EndingsSystem.endings[endKeys[ei]].unlocked = false;
        }
        EndingsSystem.save();
    }
    
    if (typeof AchievementSystem !== 'undefined') {
        var achKeys = Object.keys(AchievementSystem.achievements);
        for (var ai = 0; ai < achKeys.length; ai++) {
            AchievementSystem.achievements[achKeys[ai]].unlocked = false;
        }
        AchievementSystem.save();
    }
    
    if (typeof ReputationSystem !== 'undefined') {
        ReputationSystem.stars = 0;
        ReputationSystem.totalXP = 0;
        ReputationSystem.save();
    }
    
    GameTime.resetToDefault();
    GameTime.updateAllDisplays();
    
    if (typeof WeatherSystem !== 'undefined') {
        WeatherSystem.setWeather('rain', 60);
    }
    
    showView('home');
// БАГ #23, #31: проверка на buildHomeGrid
if (typeof buildHomeGrid === 'function') {
    buildHomeGrid();
}
    
    showToast('🔄 Игра перезапущена', t('system'));
}

// ═══════════════════════════════════════════════════════════════
// 52. РАСПИСАНИЕ СЮЖЕТНЫХ ЗВОНКОВ
// ═══════════════════════════════════════════════════════════════

function scheduleStoryCalls() {
    // Звонки уже запланированы в initAllSystems().
    // Эта функция используется только для дополнительного
    // отложенного первого звонка мамы как секрет акта 1.
    if (G._storyCallsScheduled) return;
    G._storyCallsScheduled = true;
    
    // Звонок мамы через 3 минуты после старта если в акте 1
    setTimeout(function() {
        if (G.act === 1 && G.gameStarted && !G.endingReached &&
            typeof CallSystem !== 'undefined' && !CallSystem.active) {
            CallSystem.incomingCall(CallScripts.mamaCall);
        }
    }, 180000);
}

// ═══════════════════════════════════════════════════════════════
// 53. АДМИН-ПАНЕЛЬ
// ═══════════════════════════════════════════════════════════════

function checkAdmin() {
    var code = prompt('Введите код доступа:');
    if (code === '8537') {
        var panel = document.getElementById('adminPanel');
        if (panel) panel.classList.add('show');
    } else if (code !== null) {
        showToast('Неверный код доступа', 'Ошибка');
    }
}

function adminSkipToAct(act) {
    G.act = act;
    showView('msg');
    clearChat();
    
    if (act === 2 && typeof act2_enhanced_full === 'function') {
        act2_enhanced_full();
    } else if (act === 3 && typeof act3_enhanced_full === 'function') {
        act3_enhanced_full();
    } else {
        showToast('Акт ' + act + ' активирован', 'Админ');
    }
    
    var panel = document.getElementById('adminPanel');
    if (panel) panel.classList.remove('show');
}

function adminUnlockAll() {
    var allGalleryIds = ['g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11'];
    for (var i = 0; i < allGalleryIds.length; i++) {
        if (!G.galleryUnlocked.includes(allGalleryIds[i])) {
            G.galleryUnlocked.push(allGalleryIds[i]);
        }
    }
    
    if (typeof buildGallery === 'function') buildGallery();
    showToast('🖼️ Галерея полностью разблокирована', 'Админ');
    
    var panel = document.getElementById('adminPanel');
    if (panel) panel.classList.remove('show');
}

function adminTrustMax() {
    P.trust = 100;
    P.courage = 100;
    P.fear = 0;
    P.mentalState = 100;
    showToast('💎 Параметры максимальны', 'Админ');
    
    var panel = document.getElementById('adminPanel');
    if (panel) panel.classList.remove('show');
}

function adminAllEndings() {
    if (typeof EndingsSystem !== 'undefined') {
        var endKeys = Object.keys(EndingsSystem.endings);
        for (var i = 0; i < endKeys.length; i++) {
            EndingsSystem.endings[endKeys[i]].unlocked = true;
            G.endingsUnlocked.add(endKeys[i]);
        }
        EndingsSystem.save();
        if (typeof AchievementSystem !== 'undefined') {
            AchievementSystem.unlock('all_endings');
        }
    }
    showToast('🏆 Все концовки открыты', 'Админ');
    
    var panel = document.getElementById('adminPanel');
    if (panel) panel.classList.remove('show');
}

function adminUnlockAllApps() {
    if (typeof AppStore !== 'undefined') {
        var appKeys = Object.keys(AppStore.apps);
        for (var i = 0; i < appKeys.length; i++) {
            AppStore.apps[appKeys[i]].unlocked = true;
            if (!G.appsInstalled.includes(appKeys[i])) {
                G.appsInstalled.push(appKeys[i]);
            }
        }
        AppStore.save();
        buildHomeGrid();
    }
    showToast('📱 Все приложения разблокированы', 'Админ');
    
    var panel = document.getElementById('adminPanel');
    if (panel) panel.classList.remove('show');
}

function adminResetAll() {
    if (confirm('Полностью очистить все данные и перезагрузить?')) {
        localStorage.clear();
        location.reload();
    }
}

// ═══════════════════════════════════════════════════════════════
// ===============================================================
// ВОССТАНОВЛЕННЫЕ ФУНКЦИИ (setTheme, setFont, toggleFullscreen, initNewSystems)
// ===============================================================

function setTheme(theme) {
    if (!THEMES[theme]) theme = 'midnight';
    currentTheme = theme;
    localStorage.setItem('nez_theme', theme);
    var themeData = THEMES[theme];
    // Apply theme via data-theme attribute (CSS variables handle the rest)
    document.body.setAttribute('data-theme', theme);
    // Also update CSS custom props for dynamic elements that use them
    document.documentElement.style.setProperty('--bg-gradient', themeData.bg);
    document.documentElement.style.setProperty('--overlay-gradient', themeData.overlay);
    // Light theme class for any legacy selectors
    var lightThemes = ['light', 'white', 'pink', 'sky', 'mint', 'peach'];
    if (lightThemes.indexOf(theme) !== -1) {
        document.body.classList.add('theme-light');
    } else {
        document.body.classList.remove('theme-light');
    }
    // Force repaint on lock/home backgrounds so CSS vars update immediately
    var lockBg = document.querySelector('.lock-bg');
    var homeBg = document.querySelector('.home-bg');
    if (lockBg) { lockBg.style.display = 'none'; lockBg.offsetHeight; lockBg.style.display = ''; }
    if (homeBg) { homeBg.style.display = 'none'; homeBg.offsetHeight; homeBg.style.display = ''; }
}

function setFont(font) {
    if (!FONTS[font]) font = 'unbounded';
    currentFont = font;
    localStorage.setItem('nez_font', font);
    document.documentElement.style.setProperty('--font-main', FONTS[font].css);
    document.body.setAttribute('data-font', font);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        document.body.classList.add('fullscreen-mode');
        localStorage.setItem('nez_fullscreen', 'true');
    } else {
        document.exitFullscreen && document.exitFullscreen();
        document.body.classList.remove('fullscreen-mode');
        localStorage.setItem('nez_fullscreen', 'false');
    }
}

function initNewSystems() {
    // Инициализация дополнительных систем если они существуют
    if (typeof WeatherSystem !== 'undefined' && typeof WeatherSystem.init === 'function') {
        WeatherSystem.init();
    }
    if (typeof DailyEvents !== 'undefined' && typeof DailyEvents.init === 'function') {
        DailyEvents.init();
    }
    if (typeof ReputationSystem !== 'undefined' && typeof ReputationSystem.load === 'function') {
        ReputationSystem.load();
    }
    if (typeof AchievementSystem !== 'undefined' && typeof AchievementSystem.load === 'function') {
        AchievementSystem.load();
    }
    if (typeof EndingsSystem !== 'undefined' && typeof EndingsSystem.load === 'function') {
        EndingsSystem.load();
    }
    if (typeof ClueSystem !== 'undefined' && typeof ClueSystem.load === 'function') {
        ClueSystem.load();
    }
    if (typeof AppStore !== 'undefined' && typeof AppStore.load === 'function') {
        AppStore.load();
    }
    if (typeof GameLog !== 'undefined' && typeof GameLog.load === 'function') {
        GameLog.load();
    }
}

// 54. ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ
// ═══════════════════════════════════════════════════════════════

function initGame() {
    var savedTheme = localStorage.getItem('nez_theme') || 'midnight';
    var savedFont = localStorage.getItem('nez_font') || 'unbounded';

    setTheme(savedTheme);
    setFont(savedFont);
    applyTranslations();
    
    // Инициализируем имя контакта с правильным языком
    if (!G.annaName) G.annaName = t('unknown');

    GameTime.start();
    
    if (typeof GameLog !== 'undefined') {
        GameLog.load();
    }

    // Инициализация всех систем
// Инициализация всех систем
// БАГ #24, #25: проверки на системы
if (typeof initAllSystems === 'function') {
    initAllSystems();
}
if (typeof initNewSystems === 'function') {
    initNewSystems();
}

// Построение интерфейса
// БАГ #26: проверки на функции рендеринга
if (typeof buildHomeGrid === 'function') {
    buildHomeGrid();
}
if (typeof buildBrowser === 'function') {
    buildBrowser();
}

    // Инициализация экрана блокировки
    initLockScreen();

    // Установка контакта
    var cName = document.getElementById('cName');
    if (cName) cName.textContent = G.annaName || t('unknown');

    var cStatus = document.getElementById('cStatus');
    if (cStatus) cStatus.textContent = t('was_online');

    // Fullscreen
    var phoneContainer = document.getElementById('phoneContainer');
    if (phoneContainer) {
        phoneContainer.addEventListener('dblclick', toggleFullscreen);
    }
    if (localStorage.getItem('nez_fullscreen') === 'true') {
        document.body.classList.add('fullscreen-mode');
    }

    // Показ уведомлений
    setTimeout(function() {
        var lkNotif = document.getElementById('lkNotif');
        if (lkNotif) lkNotif.classList.add('show');
    }, 3000);

    setTimeout(function() {
        var msgBadge = document.getElementById('msgBadge');
        var hwBadge = document.getElementById('hwBadge');
        var hwSub = document.getElementById('hwSub');

        if (msgBadge) msgBadge.classList.add('show');
        if (hwBadge) hwBadge.classList.add('show');
        if (hwSub) hwSub.textContent = t('lock_notif');
    }, 9000);

    // Ежедневные события
    if (typeof DailyEvents !== 'undefined') {
        DailyEvents.checkAndShow();
    }

    // Сюжетные звонки
    scheduleStoryCalls();

    // БАГ #1 ИСПРАВЛЕН: только один initGame
    
    // Горячие клавиши
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key.toLowerCase()) {
            case 'escape':
                var donatModal = document.getElementById('donatModal');
                var adminPanel = document.getElementById('adminPanel');
                if (donatModal && donatModal.classList.contains('open')) {
                    closeModal('donatModal');
                } else if (adminPanel && adminPanel.classList.contains('show')) {
                    adminPanel.classList.remove('show');
                } else if (curView !== 'home' && curView !== 'lock') {
                    goHome();
                }
                break;

            case 'f':
                if (!e.ctrlKey && !e.metaKey) toggleFullscreen();
                break;

            case '1': case '2': case '3':
                var choicesArea = document.getElementById('choicesArea');
                if (choicesArea && choicesArea.classList.contains('show')) {
                    var buttons = choicesArea.querySelectorAll('.choice-btn');
                    var index = parseInt(e.key) - 1;
                    if (buttons[index]) buttons[index].click();
                }
                break;

            case ' ':
                if (curView === 'lock') {
                    e.preventDefault();
                    unlockPhone();
                }
                break;

            case 'h':
                if (!e.ctrlKey && !e.metaKey && curView !== 'lock') goHome();
                break;

            case 'm':
                if (!e.ctrlKey && !e.metaKey && curView === 'home') openApp('msg');
                break;

            case 'g':
                if (!e.ctrlKey && !e.metaKey && curView === 'home') openApp('gallery');
                break;

            case 'b':
                if (!e.ctrlKey && !e.metaKey && curView === 'home') openApp('browser');
                break;

            case 's':
                if (!e.ctrlKey && !e.metaKey && curView === 'home') openApp('settings');
                break;
        }
    });

    console.log('%c🎮 НЕЗНАКОМКА v8.0 %cГОТОВА К ИГРЕ',
        'font-size:22px;color:#7c5cfc;font-weight:bold;',
        'font-size:14px;color:#ff3a70;');
    console.log('%cВсе системы активированы. Удачи в расследовании.',
        'color:#a0a0c0;font-size:12px;');
    console.log('%c🕐 ' + GameTime.getDateString() + ' ' + GameTime.getTimeString(),
        'color:#ffd700;');
    console.log('%c🌐 ' + currentLang.toUpperCase() +
        ' | 🎨 ' + savedTheme +
        ' | 🔤 ' + savedFont,
        'color:#a0a0c0;');
    
    if (typeof AppStore !== 'undefined') {
        console.log('%c📱 AppStore: ' + AppStore.getAvailableApps().length + ' приложений',
            'color:#a0a0c0;');
    }

    if (typeof AchievementSystem !== 'undefined' && typeof ReputationSystem !== 'undefined' && typeof EndingsSystem !== 'undefined') {
        console.log('%c🏆 Достижений: ' + AchievementSystem.getUnlockedCount() + '/' + AchievementSystem.getTotalCount() +
            ' | ⭐ Репутация: ' + ReputationSystem.stars + ' звёзд' +
            ' | 🎬 Концовок: ' + EndingsSystem.getUnlockedCount() + '/8',
            'color:#ffd700;');
    }

    if (typeof ClueSystem !== 'undefined') {
        console.log('%c🔍 Улик: ' + ClueSystem.getFoundCount() + '/8' +
            ' | 📱 Галерея: ' + (G.galleryUnlocked ? G.galleryUnlocked.length : 0) + '/12',
            'color:#a0a0c0;');
    }

    console.log('%c💡 H — домой | M — мессенджер | 1-3 — выбор | ESC — назад | F — fullscreen',
        'color:#7c5cfc;font-style:italic;');
}

// ═══════════════════════════════════════════════════════════════
// 55. ЗАПУСК ИГРЫ — ТОЛЬКО ОДИН РАЗ
// ═══════════════════════════════════════════════════════════════

// БАГ #1 ИСПРАВЛЕН: только один запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Проверяем, не был ли уже вызван initGame
        if (!window._gameInitialized) {
            window._gameInitialized = true;
            initGame();
        }
    });
} else {
    if (!window._gameInitialized) {
        window._gameInitialized = true;
        initGame();
    }
}

console.log('✅ НЕЗНАКОМКА v8.0 — Часть 5 (Сюжет и финал) загружена');
console.log('📖 Сюжет: Акты I, II, III');
console.log('🏁 Концовок: 8');
console.log('🛠️ Админ-панель доступна (код: 8537)');
console.log('🚀 Игра готова к запуску!');

