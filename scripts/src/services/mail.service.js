const supabase = require('../config');

const sendMail = async (email, data, template) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const courier_options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.COURIER_API_KEY,
        },
        body: JSON.stringify({
            message: {
                to: {
                    email,
                },
                template,
                data,
                routing: {
                    method: "all",
                    channels: ["email"],
                },
            },
        }),
    };

    try {
        await fetch("https://api.courier.com/send", courier_options);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }

}

const addtoMailQueue = async (email, templateid, data, service, name) => {
    try {
        const { error } = await supabase
            .from('mail_queue')
            .insert(
                {
                    email,
                    templateid,
                    data,
                    service,
                    name
                }
            );

        if (error) {
            console.error('Error adding to mail queue:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in addtoMailQueue:', error.message);
        throw error;
    }
}

const bulkAddtoMailQueue = async (data) => {
    try {
        const { error } = await supabase
            .from('mail_queue')
            .insert(data);

        if (error) {
            console.error('Error adding to mail queue:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in addtoMailQueue:', error.message);
        throw error;
    }
}

const getMailQueue = async () => {
    try {
        const { data, error } = await supabase
            .from('mail_queue')
            .select('*')
            .eq('sent', false);

        if (error) {
            console.error('Error getting mail queue:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in getMailQueue:', error.message);
        throw error;
    }
}

const updateMailQueue = async (id, data) => {
    try {
        const { error } = await supabase
            .from('mail_queue')
            .update(data)
            .eq('id', id);

        if (error) {
            console.error('Error updating mail queue:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in updateMailQueue:', error.message);
        throw error;
    }
}


module.exports = { sendMail, addtoMailQueue, bulkAddtoMailQueue, getMailQueue, updateMailQueue };