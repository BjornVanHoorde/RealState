import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | RealState`;
    }, [title]);
}

export default useTitle;