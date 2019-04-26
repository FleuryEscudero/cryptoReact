import React from 'react';

const Cryptocoin = ({cryptocoin}) => {

    const {FullName, Name} = cryptocoin.CoinInfo;
    

    return ( 
        <option value={Name}>
            {FullName}
        </option>
     );
}
 
export default Cryptocoin;