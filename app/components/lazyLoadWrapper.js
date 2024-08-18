import React, { useState, useEffect, useRef } from 'react';

export default function LazyLoadWrapper(props) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!isVisible) setIsVisible(entry.isIntersecting);
        });

        if (ref.current) observer.observe(ref.current);
    }, []);

    return (
        <div ref={ref} className={props.childClassName}>
            {isVisible && props.children}
        </div>
    );
};