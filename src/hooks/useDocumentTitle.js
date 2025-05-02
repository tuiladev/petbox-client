import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title ? `${title}` : 'PetShop';

        return () => {
            document.title = prevTitle;
        };
    }, [title]);
};
