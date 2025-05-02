import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook để quản lý trạng thái đóng mở modal
 * @returns {Object} Một object chứa các hàm và trạng thái để quản lý modal
 */
const useModal = () => {
    // Sử dụng useState để lưu trữ trạng thái hiển thị của modal
    const [isOpen, setIsOpen] = useState(false);

    // Sử dụng useCallback để tối ưu hiệu suất, tránh tạo lại hàm mỗi lần render
    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    // Ngăn cuộn trang khi modal đang mở
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup khi component unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Trả về một object chứa trạng thái và các hàm để điều khiển modal
    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
};

export default useModal;