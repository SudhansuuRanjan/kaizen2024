const supabase = require('../config');

const getInternalTransactions = async (table) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

const getInternalNonVerifiedTransactions = async (table) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('paymentVerified', false)


    if (error) {
        throw new Error(error.message);
    }

    return data;
}

const createInternalTransaction = async (table, data) => {
    const { data: transaction, error } = await supabase
        .from(table)
        .insert(data)
        .select('*')

    if (error) {
        throw new Error(error.message);
    }

    return transaction;
}

const getInternalTransaction = async (table, txnid) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('txnid', txnid)

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

const updateInternalTransaction = async (table, txnid, data) => {
    const { data: transaction, error } = await supabase
        .from(table)
        .update(data)
        .eq('txnid', txnid)
        .select('*')

    if (error) {
        throw new Error(error.message);
    }

    return transaction;
}

const deleteInternalTransaction = async (table, txnid) => {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('txnid', txnid)
        .select('*')

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

module.exports = { getInternalTransactions, deleteInternalTransaction, createInternalTransaction, getInternalTransaction, updateInternalTransaction, getInternalNonVerifiedTransactions };