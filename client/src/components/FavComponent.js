import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';


const FavComponent = ({isFavorite}) => {
    
    return (
        <>
            {isFavorite
            ? 
            <FavoriteIcon style={{ color: red[500] }}/> 
            :
            <FavoriteBorderIcon style={{ color: red[500] }}/>
            }
        </>
    );
};

export default FavComponent;