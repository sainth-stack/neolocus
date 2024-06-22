import React, { useState, useEffect } from 'react';
import LinearWithValueLabel from '../../../components/loader/index';

const ImageLoader = ({ imgSrc }) => {
    const [loaded, setLoaded] = useState(false);
    const [img, setImg] = useState(null);

    useEffect(() => {
        const image = new Image();
        image.src = imgSrc;
        image.onload = () => {
            setLoaded(true);
            setImg(imgSrc);
        };
    }, [imgSrc]);

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            {!loaded ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <LinearWithValueLabel />
                </div>
            ) : (
                <div>
                    <h2>Design</h2>
                    <img
                        src={img}
                        alt="new"
                        style={{ width: '100%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageLoader;
