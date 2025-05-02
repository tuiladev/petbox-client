import React from 'react';

const EmptyNotification = () => {
    return (
        <div className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <i className="fi fi-rr-bell-ring text-3xl text-gray-400"></i>
            </div>
            <p className="mb-2 font-medium text-gray-800">
                Không có thông báo nào
            </p>
            <p className="mb-4 text-sm text-gray-500">
                Chúng tôi sẽ thông báo cho bạn khi có tin mới
            </p>
            <button className="text-primary hover:text-secondary text-sm transition-colors duration-300">
                Làm mới
            </button>
        </div>
    );
};

export default EmptyNotification;
