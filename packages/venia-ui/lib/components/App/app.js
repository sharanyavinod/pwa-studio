import React, { useCallback, useState } from 'react';
import { array, func, shape, string } from 'prop-types';

import { useToasts } from '@magento/peregrine';
import { useApp } from '@magento/peregrine/lib/talons/App/useApp';

import globalCSS from '../../index.css';
import { HeadProvider, Title } from '../Head';
import Main from '../Main';
import Mask from '../Mask';
import Navigation from '../Navigation';
import Routes from '../Routes';
import ToastContainer from '../ToastContainer';
import Icon from '../Icon';

import TestApp from '../TestApp';
import NavigationAEM from '../NavigationAEM';
import aemClasses from './aem.css';

import { CustomModelClient } from './CustomModelClient';
import { ModelManager, Constants } from "@adobe/cq-spa-page-model-manager";

import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';

const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const ERROR_MESSAGE = 'Sorry! An unexpected error occurred.';

const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;

    const [, { addToast }] = useToasts();

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: 'You are offline. Some features may be unavailable.',
            timeout: 3000
        });
    }, [addToast]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: 'You are online.',
            timeout: 3000
        });
    }, [addToast]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorToastProps = {
                icon: ErrorIcon,
                message: `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);
        },
        [addToast]
    );

    const talonProps = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });

    const { hasOverlay, handleCloseDrawer } = talonProps;

    /* Fetch AEM model */
    const [aemModel, setAemModel] = useState();
    document.addEventListener('initializeModel', ({ detail }) => {
      const { apiHost, path } = detail || {};
        const modelClient = new CustomModelClient(apiHost);
        ModelManager.initialize({
          modelClient: modelClient,
          path
        }).then((model) => {
            setAemModel(model);
        });
    });


    if (renderError) {
        return (
            <HeadProvider>
                <Title>{`Home Page - ${STORE_NAME}`}</Title>
                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }

    return (
        <HeadProvider>
            <Title>{`Home Page - ${STORE_NAME}`}</Title>
            <Main isMasked={hasOverlay}>
                <Routes />
                {
                  aemModel && (
                  <div>
                    <h3 className={aemClasses.title}> AEM Component 1 - Page</h3>
                    <TestApp cqChildren={aemModel[Constants.CHILDREN_PROP]} cqItems={aemModel[Constants.ITEMS_PROP]} cqItemsOrder={aemModel[Constants.ITEMS_ORDER_PROP]} cqPath={aemModel[Constants.PATH_PROP]} />
                    <h3 className={aemClasses.title}> AEM Component 2 - Navigation</h3>
                    <NavigationAEM aemModel={aemModel} cqPath='/content/we-retail-journal/react/en/blog/jcr:content/root/navigation' />
                  </div>
                  )
                }
            </Main>
            <Mask isActive={hasOverlay} dismiss={handleCloseDrawer} />
            <Navigation />
            <ToastContainer />
        </HeadProvider>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
