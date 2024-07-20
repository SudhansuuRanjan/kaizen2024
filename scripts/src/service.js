const supabase = require('./config');

const getInternalTransactions = async (table) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')

    if (error) {
        console.log(error);
        throw new Error(error.message);
    }

    return data;
}

module.exports = { getInternalTransactions }