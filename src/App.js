import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './app/layouts/login';
import TestComp from './app/components/ui/testComp';
import ProductProvider from './app/hooks/useProducts';
import AuthProvider from './app/hooks/useAuth';
import TabsComp from './app/components/tabs';
import CategoriesProvider from './app/hooks/useCategories';
import Products from './app/layouts/products';
import Admin from './app/components/adminPannel';
import ProductTable from './app/components/ui/productTable';

// import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <div className={'tabs-wrapper'}>
        <AuthProvider>
          <CategoriesProvider>
            <TabsComp />
            <ProductProvider>
              <Switch>
                <Route path="/login/:type?" exact component={Login} />
                <Route path="/test" exact component={TestComp} />
                <Route path="/showcase/:productId?/:edit?" exact={true} component={Products} />
                <Route path="/admin" exact={true} component={Admin} />
                <Route path="/admin/addproduct" exact={true} component={TestComp} />
                <Route path="/admin/products" exact={true} component={ProductTable} />
              </Switch>
            </ProductProvider>
          </CategoriesProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
