import React,{Component} from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";
import classes from './index.css';

const navModel = {
    "id": "navigation-b125a126be",
    "items": [{
        "id": "navigation-b125a126be-item-712d63bc61",
        "path": "/content/we-retail-journal/react/en/home",
        "children": [],
        "level": 0,
        "active": false,
        "lastModified": 1528098629650,
        "url": "/content/we-retail-journal/react/en/home.html",
        "title": "We.Retail Journal",
        ":type": "we-retail-journal/react/components/structure/page"
    }, {
        "id": "navigation-b125a126be-item-b8a73d813a",
        "path": "/content/we-retail-journal/react/en/blog",
        "children": [{
            "id": "navigation-b125a126be-item-531ea29fc1",
            "path": "/content/we-retail-journal/react/en/blog/aboutus",
            "children": [],
            "level": 1,
            "active": false,
            "lastModified": 1518705477238,
            "url": "/content/we-retail-journal/react/en/blog/aboutus.html",
            "title": "About us",
            ":type": "we-retail-journal/react/components/structure/page"
        }, {
            "id": "navigation-b125a126be-item-8558facee0",
            "path": "/content/we-retail-journal/react/en/blog/weather",
            "children": [],
            "level": 1,
            "active": true,
            "lastModified": 1518705477238,
            "url": "/content/we-retail-journal/react/en/blog/weather.html",
            "title": "Weather",
            ":type": "we-retail-journal/react/components/structure/page"
        }],
        "level": 0,
        "active": true,
        "lastModified": 1518705477238,
        "url": "/content/we-retail-journal/react/en/blog.html",
        "title": "Blog",
        ":type": "we-retail-journal/react/components/structure/page"
    }],
    "cqType": "we-retail-journal/components/navigation",
    "cqPath": "/content/we-retail-journal/react/en/blog/jcr:content/root/navigation",
    "isInEditor": null,
    "containerProps": {
        "className": " aem-GridColumn aem-GridColumn--default--12"
    }
};

const NavigationContainer = (props) => {
  const { aemModel, cqPath } = props;
  // const componentModel = getComponentFromModel(aemModel, cqPath);
  return <Navigation cqPath={cqPath} cqType={navModel.cqType} items={navModel.items}/>;
};

export default NavigationContainer;

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
