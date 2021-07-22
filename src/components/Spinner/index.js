import React from 'react';
import Lottie from 'react-lottie';

import spinner from '../../assets/animations/spinner';

export const Spinner = props => (<Lottie
    style={{overflow: 'unset'}}
    width={props.width ? props.width : 150}
    height={props.height ? props.height : 150}
    options={{
        loop: true,
        autoplay: props.play,
        animationData: spinner,
    }}
/>);
