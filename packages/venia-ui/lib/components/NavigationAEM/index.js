import React from 'react';
import { MapTo, withModel } from '@adobe/aem-react-editable-components';
import {Link} from "react-router-dom";
import classes from './index.css';

const Navigation = ({ items }) => {
    const getLink = (item) => {
        if (!item || !item.url || !item.title) {
            return;
        }

        return <Link className={classes.nav_item} to={ item.url }>{ item.title }</Link>;
    }

    const getRecursiveNavigationContent = (item) => {
        if (!item || !item.url) {
            return;
        }

        let childItems;

        if (item.children && item.children.length) {
            childItems = <ul>
                { item.children && item.children.map((childItem) => {
                    return getRecursiveNavigationContent(childItem);
                })
                }</ul>;
        }

        return <li key={ item.url }>
            {getLink(item)}
            {childItems}
        </li>;
    }

    return (
        <header>
            <nav>
                <ul className={classes.nav_container}>
                    { items && items.map((item) =>
                        getRecursiveNavigationContent(item))
                    }
                </ul>
            </nav>
        </header>
    );
}
MapTo("we-retail-journal/components/navigation")(Navigation);

export default Navigation;

export const NavigationAEM =  withModel(Navigation, { injectPropsOnInit: true });
