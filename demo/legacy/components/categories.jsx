import React from 'react';

import Node from '@/public/archive-assets/images/jsx/categories/node';
import Launchpad from '@/public/archive-assets/images/jsx/categories/launchpad';
import Testnet from '@/public/archive-assets/images/jsx/categories/testnet';
import Nft from '@/public/archive-assets/images/jsx/categories/nft';

function Categories(props) {
    return (
        <div className="categories">
            <div className="categories__big-circle"></div>
            <div className="categories__medium-circle"></div>
            <div className="categories__small-circle"></div>
            <div className="categories__top-line"></div>
            <div className="categories__left-line"></div>
            <div className="categories__bottom-line"></div>
            <div className="categories__right-line"></div>
            <div className="categories__cube"></div>
            <Node/>
            <Launchpad/>
            <Testnet/>
            <Nft/>

        </div>
    );
}

export default Categories;