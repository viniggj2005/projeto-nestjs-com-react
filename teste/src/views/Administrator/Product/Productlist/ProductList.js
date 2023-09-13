import './ProductList.css';

import AdmProductLister from '../../../../componentes/Adm/AdmProductLister/AdmProductLister';
import NavigationbarAdm from '../../../../componentes/Adm/NavigationbarAdm/NavigationbarAdm';

const Productlist = () => {
    return (
        <>
            <NavigationbarAdm />

            <h1 className='h1-products'> Produtos </h1>
            <div className='teste'> <AdmProductLister className='adm-products'/> </div>
        </>
    );
}

export default Productlist;