import React, { useEffect, useRef, useState } from 'react';

function useIntersectionObs({ ref, callback, threshold = 0.5 }) {
    const handleIntersect = (entries) => {
        if (entries && entries.some((e) => e.isIntersecting)) {
            setObserved(true);
        } else {
            setObserved(false);
        }
    };

    const [observer] = useState(
        new IntersectionObserver(callback ? callback : handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: threshold,
        })
    );

    const [observed, setObserved] = useState(false);

    useEffect(() => {
        if (observer && ref.current) {
            observer.observe(ref.current);
            console.log('here', ref.current.innerHTML);
        } else {
            return;
        }
        // console.log(observed);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer, observed]);

    return { observed };
}

export default useIntersectionObs;
