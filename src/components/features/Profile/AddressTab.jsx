import React from 'react';
import { Button } from '../../common';
import Modal from '../../common/Modal';
import TabHeading from './TabHeading';
import useModal from '../../../hooks/useModal';
import AddressEditForm from './AddressEditForm';

// Hàm lấy icon cho từng loại địa chỉ
const getAddressTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
        case 'nhà riêng':
            return 'fi fi-rr-home';
        case 'văn phòng':
            return 'fi fi-rr-building';
        default:
            return 'fi fi-rr-marker';
    }
};

const AddressCard = ({ address, onUpdate, onDelete, onSetDefault }) => {
    // Hàm xử lý khi click vào card
    const handleCardClick = () => {
        onUpdate && onUpdate(address);
    };

    return (
        <div 
            className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:shadow-md"
            onClick={handleCardClick}
        >
            {/* Icon và nút hành động */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <i className={getAddressTypeIcon(address.type)}></i>
                    <span className="text-gray-600">
                        {address.type}
                    </span>
                </div>
                <div className="flex items-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onUpdate && onUpdate(address);
                        }}
                        className="text-primary cursor-pointer"
                    >
                        Cập nhật
                    </button>
                    {!address.isDefault && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete && onDelete(address.id);
                            }}
                            className="cursor-pointer text-red-500"
                        >
                            Xóa
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-grow flex-col justify-between">
                {/* Thông tin người nhận */}
                <div className="mb-2 space-y-1">
                    <h3 className="font-semibold">{address.name}</h3>
                    <p className="text-sm">{address.phone}</p>
                    <p className="line-clamp-2 text-sm text-gray-500">
                        {`${address.address}, ${address.province}`}
                    </p>
                </div>

                {/* Phần đặt mặc định */}
                <div>
                    {!address.isDefault && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onSetDefault && onSetDefault(address.id);
                            }}
                            className="text-primary cursor-pointer text-sm"
                        >
                            Đặt làm mặc định
                        </button>
                    )}
                    {address.isDefault && (
                        <span className="text-sm font-bold text-amber-600">
                            Mặc định
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const AddressTab = ({ user }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const [selectedAddress, setSelectedAddress] = React.useState(null);
    const [addresses, setAddresses] = React.useState(user?.addresses || [
        {
            id: 1,
            name: 'Đặng Văn Trung',
            phone: '(+84) 337 336 487',
            type: 'Nhà Riêng',
            province: 'TP. Hồ Chí Minh, Thành Phố Thủ Đức, Phường Bình Thọ',
            address: 'Số 55 Dân Chủ',
            isDefault: true,
        },
        {
            id: 2,
            name: 'Nguyễn Ngọc Như Yến',
            phone: '(+84) 337 336 487',
            type: 'Văn Phòng',
            province: 'Hà Nội, Hai Bà Trưng, Bách Khoa',
            address: 'Số 1 Đại Cồ Việt',
            isDefault: false,
        },
    ]);

    // Xử lý các event
    const handleUpdateAddress = (address) => {
        setSelectedAddress(address);
        openModal();
    };

    const handleDeleteAddress = (id) => {
        // Xử lý xóa địa chỉ
        setAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const handleSetDefaultAddress = (id) => {
        // Xử lý đặt địa chỉ làm mặc định
        setAddresses(prev => prev.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const handleSaveAddress = (formData) => {
        // Xử lý lưu địa chỉ
        if (selectedAddress) {
            // Cập nhật địa chỉ hiện có
            setAddresses(prev => prev.map(addr => 
                addr.id === selectedAddress.id 
                    ? { ...addr, ...formData }
                    : addr
            ));
        } else {
            // Thêm địa chỉ mới
            const newAddress = {
                ...formData,
                id: Math.max(...addresses.map(a => a.id), 0) + 1,
                isDefault: addresses.length === 0
            };
            setAddresses(prev => [...prev, newAddress]);
        }
        closeModal();
    };

    const handleAddNewAddress = () => {
        setSelectedAddress(null); // Reset selected address để form trống
        openModal();
    };

    return (
        <div className="space-y-8">
            <TabHeading title="Địa chỉ giao hàng" />
            {addresses.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {[...addresses].sort((a, b) => {
                        if (a.isDefault === b.isDefault) return 0;
                        return a.isDefault ? -1 : 1;
                    }).map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onUpdate={handleUpdateAddress}
                            onDelete={handleDeleteAddress}
                            onSetDefault={handleSetDefaultAddress}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    Bạn chưa có địa chỉ giao hàng nào
                </p>
            )}
            <Button
                onClick={handleAddNewAddress}
                variant="filled"
                size="md"
                type="button"
            >
                + Thêm địa chỉ
            </Button>

            {/* Modal chỉnh sửa địa chỉ */}
            <Modal isOpen={isOpen}>
                <Modal.Overlay onClick={closeModal} />
                <Modal.Content size="lg">
                    <AddressEditForm
                        address={selectedAddress}
                        onClose={closeModal}
                        onSave={handleSaveAddress}
                    />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default AddressTab;
