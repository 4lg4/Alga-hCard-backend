/**
 * Created by www.Alga.me on 27/2/18.
 */

export default async (promise) => {
    try {
        return [null, await promise];
    } catch (err){
        return [err];
    }
};
