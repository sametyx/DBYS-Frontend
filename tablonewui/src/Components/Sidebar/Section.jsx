import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import useMeasure from 'react-use-measure';
import { useSpring, animated } from 'react-spring';

function Section({title,children,icon}) {
    const [isOpen, setIsOpen] = useState(false);
    const [ref, { height: viewHeight }] = useMeasure();
    const animation = useSpring({
        height: isOpen ? viewHeight : 0,
        config: { tension: 500, friction: 40  }
    });

    return (
        <li className="section">
            <div className={`section-name ${isOpen && "active"}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="icon-name">
                    {icon && icon}
                    <span>{title}</span>
                </div>
                {isOpen ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </div>
            <animated.div style={{ overflow: 'hidden', ...animation }}>
                <div ref={ref} className="section-content">
                    {children}
                </div>
            </animated.div>
        </li>
    );
}

export default Section;