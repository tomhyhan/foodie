import { CSSProperties } from "react";

export const arrowStyles : CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
};

export const indicatorStyles: CSSProperties = {
    background: 'gray',
    opacity:0.8,
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 4px',
    borderRadius: "50%"
};
