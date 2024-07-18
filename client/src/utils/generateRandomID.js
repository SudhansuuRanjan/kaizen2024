const generateRandomID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomID = 'KZN24';
    for (let i = 0; i < 6; i++) {
        randomID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomID;
}

export default generateRandomID;
