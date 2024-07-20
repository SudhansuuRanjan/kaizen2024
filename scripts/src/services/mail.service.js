const sendMail = async (email, data, template) => {
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
        throw new Error(error.message);
    }

}

module.exports = sendMail;