import { images } from '../assets';

export const storeInfo = [
    {
        text: '55 Dân Chủ, Bình Thọ, Tp. Thủ Đức',
        url: '/contact',
        icon: 'fi fi-rr-marker',
    },
    {
        text: 'Hotline: 1900 1919',
        url: 'tel:19001919',
        icon: 'fi fi-rr-chat-bubble-call',
    },
    {
        text: 'Mở cửa từ: 08:00 → 20:00',
        icon: 'fi fi-rr-clock-five',
        url: '',
    },
];

export const socials = [
    {
        text: 'Facebook',
        url: 'https://www.facebook.com/',
        icon: 'fi fi-brands-facebook',
    },
    {
        text: 'TikTok',
        url: 'https://www.tiktok.com/',
        icon: 'fi fi-brands-tik-tok',
    },
    {
        text: 'YouTube',
        url: 'https://www.youtube.com/',
        icon: 'fi fi-brands-youtube',
    },
];

export const products = [
    {
        url: '/product/1',
        name: 'Hạt mèo cho mọi lứa tuổi catsrang',
        normalPrice: 92000,
        discountPrice: 59000,
        image: images.product_1,
    },
    {
        url: '/product/2',
        name: 'Thức ăn cho mèo Royal Canin',
        normalPrice: 292000,
        discountPrice: 239000,
        image: images.product_2,
    },
    {
        url: '/product/3',
        name: 'Cát vệ sinh thú cưng',
        normalPrice: 108000,
        discountPrice: 72000,
        image: images.product_3,
    },
    {
        url: '/product/4',
        name: 'Pate mèo vị hải sản (dành cho mèo từ 6 tháng tuổi)',
        normalPrice: 82000,
        discountPrice: 67000,
        image: images.product_4,
    },
];

export const searchData = {
    text: 'Giảm giá 20% Royal Canin ...',
    icon: 'fi fi-rr-search',
    keywords: [
        'Cỏ mèo',
        'Thức ăn cho mèo',
        'Dụng cụ vệ sinh',
        'Cát vệ sinh mèo',
        'Vòng cổ cho chó',
        'Bảng tên mèo',
        'Dây xích thú cưng',
    ],
    products,
};

export const categories = [
    { icon: 'fi fi-rr-fish', text: 'Thức ăn', url: '/category/cat-food' },
    {
        icon: 'fi fi-rr-sleeping-cat',
        text: 'Giường ngủ',
        url: '/category/dog-food',
    },
    {
        icon: 'fi fi-rr-cat-head',
        text: 'Dụng cụ vệ sinh',
        url: '/category/cleaning',
    },
    { icon: 'fi fi-rr-cat-space', text: 'Phụ kiện', url: '/category/toys' },
];

export const helps = [
    {
        text: 'Hỗ trợ',
        url: 'tel: 19008198',
    },
    {
        text: 'Điều khoản',
        url: '/terms',
    },
    {
        text: 'Chính sách',
        url: '/policy',
    },
    {
        text: 'Tuyển dụng',
        url: '/career',
    },
];

export const services = [
    { icon: 'fi fi-rr-dorm-room', text: 'Khách sạn', url: '/services/hotel' },
    { icon: 'fi fi-rr-cat-dog', text: 'Spa và tỉa lông', url: '/services/spa' },
    { icon: 'fi fi-rr-doctor', text: 'Khám bệnh', url: '/services/medical' },
    {
        icon: 'fi fi-rr-venus-mars',
        text: 'Triệt sản',
        url: '/services/sterilization',
    },
    {
        icon: 'fi fi-rr-paw-heart',
        text: 'Chăm sóc tại nhà',
        url: '/services/home-care',
    },
];

export const posts = [
    {
        title: 'Chăm sóc mèo sau khi triệt sản cần lưu ý điều gì?',
        url: '/post_1',
        image: images.post_1,
        time: '28 Tháng 3, 2025',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione ...',
    },
    {
        title: 'Dấu hiệu nhận biết mèo tích nhiều búi lông trong bụng?',
        url: '/post_2',
        image: images.post_2,
        time: '26 Tháng 3, 2025',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione ...',
    },
];

export const notifications = [
    {
        id: 'notif-1', // Thêm id cho mỗi thông báo
        url: '/',
        title: 'Đơn hàng #ABC123 đã được giao thành công vào ngày 28/03/2025',
        time: '28 Tháng 3, 2025',
        content:
            'lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione',
        type: 'delivered',
        icon: 'fi fi-rr-box-circle-check',
        image: '',
        alt: '',
        isRead: false,
    },
    {
        id: 'notif-2', // Thêm id cho mỗi thông báo
        url: '/',
        title: 'Đã đến lịch hẹn tái khám, bạn vui lòng mang thú cưng đến vào ngày 28/03/2025',
        time: '27 Tháng 3, 2025',
        content:
            'lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione',
        type: 'warning',
        icon: 'fi fi-rr-calendar',
        image: '',
        alt: '',
        isRead: false,
    },
    {
        id: 'notif-3', // Thêm id cho mỗi thông báo
        url: '/',
        title: 'Giảm giá 25% khi đặt lịch tiêm vaccine phòng dại tại website',
        time: '26 Tháng 3, 2025',
        content:
            'lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nihil recusandae ratione',
        type: 'promotion',
        icon: 'fi fi-rr-ticket',
        image: '',
        alt: '',
        isRead: false,
    },
];

export const userMenu = [
    {
        title: 'Tài khoản',
        items: [
            {
                url: '/account/profile',
                text: 'Thông tin tài khoản',
                icon: 'fi fi-rr-user',
            },
            {
                url: '/account/pets',
                text: 'Thú cưng của tôi',
                icon: 'fi fi-rr-paw',
            },
        ],
    },
    {
        title: 'Mua sắm',
        items: [
            {
                url: '/account/orders',
                text: 'Đơn hàng của tôi',
                icon: 'fi fi-rr-shopping-bag',
            },
            {
                url: '/account/favorites',
                text: 'Sản phẩm yêu thích',
                icon: 'fi fi-rr-heart',
            },
            {
                url: '/account/address',
                text: 'Địa chỉ giao hàng',
                icon: 'fi fi-rr-marker',
            },
        ],
    },
    {
        title: '',
        items: [
            {
                url: '/',
                text: 'Đăng xuất',
                icon: 'fi fi-rr-sign-out-alt',
            },
        ],
    },
];

export const profileMenuItems = [
    {
        id: 'profile',
        label: 'Thông tin cá nhân',
        icon: 'fi fi-rr-user',
    },
    {
        id: 'address',
        label: 'Địa chỉ',
        icon: 'fi fi-rr-marker',
    },
    {
        id: 'payment',
        label: 'Thanh toán',
        icon: 'fi fi-rr-credit-card',
    },
    {
        id: 'pets',
        label: 'Thú cưng',
        icon: 'fi fi-rr-paw',
        count: 2,
    },
    {
        id: 'notifications',
        label: 'Thông Báo',
        icon: 'fi fi-rr-bell',
        count: 4,
    },
    {
        id: 'membership',
        label: 'Ưu Đãi Hội Viên',
        icon: 'fi fi-rr-gift-box-benefits',
    },
    {
        id: 'orders',
        label: 'Đơn Hàng',
        icon: 'fi fi-rr-shopping-bag',
    },
    {
        id: 'cart',
        label: 'Giỏ Hàng',
        icon: 'fi fi-rr-shopping-cart',
    },
    {
        id: 'favorites',
        label: 'Yêu Thích',
        icon: 'fi fi-rr-heart',
    },
];
