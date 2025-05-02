import React from 'react';
import TabHeading from './TabHeading';
import { NotificationItem, EmptyNotification } from '../../common';
import { notifications } from '../../../data/mockdata';

const NotificationTab = () => {
    return (
        <div className="space-y-8">
            <TabHeading title="Trung tâm tin tức" />
            {notifications && notifications.length > 0 ? (
                <ul className='space-y-2'>
                    {notifications.slice(0, 3).map((notification, index) => (
                        <NotificationItem
                            key={index}
                            notification={notification}
                            isDropdown={false}
                        />
                    ))}
                </ul>
            ) : (
                <EmptyNotification />
            )}
        </div>
    );
};

export default NotificationTab;
