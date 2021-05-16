import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { green } from '@material-ui/core/colors';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const ShopComponent = ({isAdded}) => {
    
    return (
        <>
            {isAdded
            ?
            <RemoveShoppingCartIcon/>
            :
            <AddShoppingCartIcon style={{ color: green[500] }}/> 
            }
        </>
    );
};

export default ShopComponent;