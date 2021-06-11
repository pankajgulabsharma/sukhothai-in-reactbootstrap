function getChecksum(...rest){
    const strJoined = rest.reduce((acc, curr, index, arr) => {
        if (index == (arr.length - 1)){
            return acc;
        } else if (index == 0){
            return curr;
        } else {
            return acc + '|' + String(curr);
        }
    }, "");
    return Adler.str(strJoined);
}

function verifyChecksum(checkA, checkB){
    return (checkA === checkB ? true : false);
}

export default function handler(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    const WorkingKey = "diux9vj27foywypwtmhwe9dbja251xvl";
    const { Order_Id, Merchant_Id, Amount, AuthDesc, Checksum } = req.body;
    const checksumMatch = verifychecksum(getChecksum(Merchant_Id, Order_Id, Amount,AuthDesc , WorkingKey), Checksum);

    const url = `/redirect?checksummatch=${checksumMatch}&authdesc=${AuthDesc}`;
    const testUrl = `/redirect?checksummatch=false&authdesc=Y`;
    
    res.redirect(testUrl);
}
