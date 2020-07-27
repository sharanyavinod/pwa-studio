import React,{Component} from 'react';
import { Page, MapTo, withModel } from '@adobe/cq-react-editable-components';
import {Route} from "react-router-dom";
import classes from './index.css';

// This component is the application entry point
class TestApp extends Page {
    render() {
      return (
        <div>
            { this.childComponents }
            { this.childPages }
        </div>)
    }
}


const withRoute = (WrappedComponent, extension) => {
    return class CompositeRoute extends Component {
        render() {
            const routePath = this.props.cqPath;
            if (!routePath) {
                return <WrappedComponent {...this.props}/>;
            }

            extension = extension || 'html';

            // Context path + route path + optional extension
            return <Route key={ routePath } exact path={ '(.*)' + routePath + '(.' + extension + ')?'} render={ (routeProps) => {
                return <WrappedComponent {...this.props} {...routeProps}/>;
            } } />
        }
    }
};

class AppPage extends Page {
   get containerProps() {
       const attrs = super.containerProps;
       attrs.className = (attrs.className || '') + ' page ' + (this.props.cssClassNames || '');
       return attrs
   }
}
MapTo('we-retail-journal/react/components/structure/page')(withRoute(AppPage));

const TextEditConfig = {
     emptyLabel: 'Text',
     isEmpty: function(props) {
         return !props || !props.text || props.text.trim().length < 1;
     }
 };

 const Text = ({ cqPath, richText, text}) => {
     const richTextContent = () => (
         <div className={classes.aem_text} id={cqPath.substr(cqPath.lastIndexOf('/') + 1)} data-rte-editelement dangerouslySetInnerHTML={{__html: text}}/>
     );

     return richText ? richTextContent() : (<div className={classes.aem_text}>{text}</div>);
 }
MapTo('we-retail-journal/components/text')(Text, TextEditConfig);

export default withModel(TestApp);
