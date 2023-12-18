import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login/login';
import Home from './page/Homepage/home';
import Form_promotion from './page/Form/form_promotion';
import { Provider } from 'react-redux';
import store from './store';
import FromReqUser from './page/Form/form_requser';
import FromUpdateNotify from './page/Form/formupdatenotify';
import Form_Notify from './page/Form/form_notify';
import FormUpdatePromotion from './page/Form/formupdatesalehome';
import Form_notione from './page/Form/form_notione';
import Form_salehome from './page/Form/form_salehome';
import FormUpdateSaleHome from './page/Form/formupdatesalehome';
import Testopt from './page/Testopt';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp" element={<Testopt />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/from-promotion" element={<Form_promotion />} />
          <Route
            path="/update-promotion/:_id"
            element={<FormUpdatePromotion />}
          />
          <Route path="/update-requser/:_id" element={<FromReqUser />} />
          <Route path="/from-notify" element={<Form_Notify />} />
          <Route path="/from-notione" element={<Form_notione />} />
          <Route path="/update-notify/:_id" element={<FromUpdateNotify />} />
          <Route path="/from-salehome" element={<Form_salehome />} />
          <Route
            path="/update-salehome/:_id"
            element={<FormUpdateSaleHome />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
