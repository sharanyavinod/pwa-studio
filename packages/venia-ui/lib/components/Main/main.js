import React from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';

import { mergeClasses } from '../../classify';
import Footer from '../Footer';
import Header from '../Header';
import defaultClasses from './main.css';

import Page from '../TestApp';
import { NavigationAEM } from '../NavigationAEM';
import aemClasses from './aem.css';

const Main = props => {
    const { children, isMasked, aemModel } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <Header />
            {
              aemModel && (
              <div>
                <h3 className={aemClasses.title}> We Retail Blog Page</h3>
                <Page
                  pagePath='/content/we-retail-journal/react/en/blog' />
              </div>
              )
            }
            <div className={pageClass}>{children}</div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};
