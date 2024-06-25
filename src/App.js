import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './app/layouts/login';
import TestComp from './app/components/ui/admin/addProduct';
import ProductProvider from './app/hooks/useProducts';
import AuthProvider from './app/hooks/useAuth';
import CategoriesProvider from './app/hooks/useCategories';
import Products from './app/layouts/products';
import Admin from './app/layouts/admin';
import OrderProvider from './app/hooks/useOrders';
import UsersProvider from './app/hooks/useUsers';
import NavBar from './app/components/common/navBar';
import ProtectedRoute from './app/components/ui/admin/protectedRoute';
import Loader from './app/components/common/loader';

// import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
      <div className={'tabs-wrapper'}>
        <AuthProvider>
          <CategoriesProvider>
            <NavBar />
            <OrderProvider>
              <ProductProvider>
                <Switch>
                  <Route path="/login/:type?" exact component={Login} />
                  <Route path="/test" exact component={TestComp} />
                  <Route path="/showcase/:productId?/:edit?" exact={true} component={Products} />
                  <Route path="/loader/" exact={true} component={Loader} />
                  {/* <OrderProvider> */}
                  <UsersProvider>
                    <ProtectedRoute
                      path="/admin/:option?/:parameter?"
                      exact={true}
                      component={Admin}
                    />
                  </UsersProvider>
                  {/* </OrderProvider> */}
                  {/* <Route path="/admin/products" exact={true} component={ProductTable} /> */}
                  {/* <Route path="/admin/addproduct" exact={true} component={TestComp} /> */}
                  {/* <Route path="/admin/:products?" exact={true} component={TestComp} /> */}
                  {/* <Route path="/admin/products" exact={true} component={ProductTable} /> */}
                </Switch>
              </ProductProvider>
            </OrderProvider>
          </CategoriesProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
