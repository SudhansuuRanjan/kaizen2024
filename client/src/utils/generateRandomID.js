const generateRandomID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomID = 'KZN24';
    for (let i = 0; i < 6; i++) {
        randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomID;
}

export default generateRandomID;


export const generateTxnId = () => {
    const chars = '0123456789';
    const stringLength = 12;
    let randomString = '';
    for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomString += chars.substring(rnum, rnum + 1);
    }
    return randomString;
};