import supabase from "../config/supabase";

export const getCurrentFeatures = async () => {
    try {
        const { data, error } = await supabase
            .from('features')
            .select(`*`)

        if (error) {
            throw new Error(error.message);
        }

        return data[0];
    } catch (error) {
        throw new Error(error.message);
    }
}